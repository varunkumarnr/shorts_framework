import http from "node:http";
import { Readable } from "node:stream";
import { spawn } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const UI_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_DIR = path.dirname(UI_DIR);
const PUBLIC_DIR = path.join(PROJECT_DIR, "public");
const UPLOAD_DIR = path.join(PUBLIC_DIR, "uploads");
const RENDER_DIR = path.join(PROJECT_DIR, "out", "ui-renders");
const REMOTION_CLI = path.join(
  PROJECT_DIR,
  "node_modules",
  "@remotion",
  "cli",
  "remotion-cli.js",
);
const PORT = Number(process.env.PIXELPICKED_UI_PORT || 4173);
const jobs = new Map();

await mkdir(UPLOAD_DIR, { recursive: true });
await mkdir(RENDER_DIR, { recursive: true });

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".mp4": "video/mp4",
};

const sendJson = (res, status, value) => {
  res.writeHead(status, { "Content-Type": mimeTypes[".json"] });
  res.end(JSON.stringify(value));
};

const safeName = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "") || "asset";

const parseJson = async (req) => {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
};

const run = (args, job) =>
  new Promise((resolve, reject) => {
    const remotionArgs = args[0] === "remotion" ? args.slice(1) : args;
    // Launch the JavaScript CLI with the currently running Node executable.
    // This avoids npx.cmd and cmd.exe, which can throw spawn EINVAL on Windows.
    const child = spawn(process.execPath, [REMOTION_CLI, ...remotionArgs], {
      cwd: PROJECT_DIR,
      stdio: ["ignore", "pipe", "pipe"],
      windowsHide: true,
    });
    const onOutput = (chunk) => {
      const text = chunk.toString();
      job.log = `${job.log}${text}`.slice(-12000);
      const rendered = [...text.matchAll(/Rendered (\d+)\/(\d+)/g)].at(-1);
      if (rendered) {
        job.progress = Math.round(
          (Number(rendered[1]) / Number(rendered[2])) * 100,
        );
      }
    };
    child.stdout.on("data", onOutput);
    child.stderr.on("data", onOutput);
    child.on("error", (error) => {
      job.log = `${job.log}\nCould not start Remotion: ${error.message}`;
      reject(error);
    });
    child.on("close", (code) =>
      code === 0
        ? resolve()
        : reject(new Error(`Renderer exited with code ${code}`)),
    );
  });

const startRender = async (job, payload) => {
  const jobDir = path.join(RENDER_DIR, job.id);
  await mkdir(jobDir, { recursive: true });
  const propsPath = path.join(jobDir, "props.json");
  await writeFile(propsPath, JSON.stringify(payload.props, null, 2));
  const common = ["src/index.ts"];

  if (payload.format === "trailer") {
    const output = path.join(jobDir, "trailer.mp4");
    await run(
      [
        "remotion",
        "render",
        ...common,
        "PixelPickedTrailer",
        output,
        "--props",
        propsPath,
        "--overwrite",
      ],
      job,
    );
    job.outputs = [`/renders/${job.id}/trailer.mp4`];
  } else if (payload.format === "top3") {
    const output = path.join(jobDir, "top-3-games.mp4");
    await run(
      [
        "remotion",
        "render",
        ...common,
        "Scene2B-GameOfWeek",
        output,
        "--props",
        propsPath,
        "--overwrite",
      ],
      job,
    );
    job.outputs = [`/renders/${job.id}/top-3-games.mp4`];
  } else if (payload.format === "carousel") {
    const slides = [
      payload.props.hookSlide,
      ...(payload.props.contentSlides || []),
      payload.props.ctaSlide,
    ];
    const duration = Number(payload.props.slideDuration || 180);
    job.outputs = [];
    for (let index = 0; index < slides.length; index += 1) {
      job.progress = Math.round((index / slides.length) * 100);
      const filename = `${String(index + 1).padStart(2, "0")}-slide.png`;
      const output = path.join(jobDir, filename);
      const frame = index * duration + Math.floor(duration / 2);
      await run(
        [
          "remotion",
          "still",
          ...common,
          "BisonAttack-InstagramCarousel",
          output,
          "--props",
          propsPath,
          "--frame",
          String(frame),
          "--overwrite",
        ],
        job,
      );
      job.outputs.push(`/renders/${job.id}/${filename}`);
    }
  } else if (payload.format === "launch") {
    const output = path.join(jobDir, "launch-campaign.png");
    await run(
      [
        "remotion",
        "still",
        ...common,
        "PixelPicked-Top3-Story",
        output,
        "--props",
        propsPath,
        "--frame",
        "0",
        "--overwrite",
      ],
      job,
    );
    job.outputs = [`/renders/${job.id}/launch-campaign.png`];
  } else {
    throw new Error("Unknown format");
  }

  job.progress = 100;
  job.status = "complete";
};

const serveFile = async (res, filePath) => {
  try {
    const body = await readFile(filePath);
    res.writeHead(200, {
      "Content-Type":
        mimeTypes[path.extname(filePath).toLowerCase()] ||
        "application/octet-stream",
      "Cache-Control": "no-store",
    });
    res.end(body);
  } catch {
    sendJson(res, 404, { error: "Not found" });
  }
};

const server = http.createServer(async (req, res) => {
  const url = new URL(
    req.url || "/",
    `http://${req.headers.host || "localhost"}`,
  );

  if (req.method === "POST" && url.pathname === "/api/upload") {
    try {
      const request = new Request(url, {
        method: "POST",
        headers: req.headers,
        body: Readable.toWeb(req),
        duplex: "half",
      });
      const form = await request.formData();
      const file = form.get("file");
      if (!file || typeof file.arrayBuffer !== "function") {
        return sendJson(res, 400, { error: "No file supplied" });
      }
      const originalName = file.name || "asset";
      const ext = path.extname(originalName).toLowerCase();
      const base = safeName(path.basename(originalName, ext));
      const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}-${base}${ext}`;
      await writeFile(
        path.join(UPLOAD_DIR, filename),
        Buffer.from(await file.arrayBuffer()),
      );
      return sendJson(res, 200, {
        src: `/uploads/${filename}`,
        name: originalName,
      });
    } catch (error) {
      return sendJson(res, 500, { error: error.message });
    }
  }

  if (req.method === "POST" && url.pathname === "/api/render") {
    try {
      const payload = await parseJson(req);
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const job = {
        id,
        status: "rendering",
        progress: 0,
        log: "",
        outputs: [],
      };
      jobs.set(id, job);
      startRender(job, payload).catch((error) => {
        job.status = "error";
        job.error = error.message;
      });
      return sendJson(res, 202, { jobId: id });
    } catch (error) {
      return sendJson(res, 400, { error: error.message });
    }
  }

  if (req.method === "GET" && url.pathname.startsWith("/api/jobs/")) {
    const job = jobs.get(url.pathname.split("/").pop());
    return job
      ? sendJson(res, 200, job)
      : sendJson(res, 404, { error: "Unknown render job" });
  }

  if (req.method === "GET" && url.pathname.startsWith("/renders/")) {
    const relative = decodeURIComponent(url.pathname.slice("/renders/".length));
    const filePath = path.resolve(RENDER_DIR, relative);
    if (!filePath.startsWith(`${RENDER_DIR}${path.sep}`)) {
      return sendJson(res, 403, { error: "Invalid path" });
    }
    return serveFile(res, filePath);
  }

  const staticFiles = {
    "/": "index.html",
    "/index.html": "index.html",
    "/app.js": "app.js",
    "/styles.css": "styles.css",
  };
  const filename = staticFiles[url.pathname];
  return filename
    ? serveFile(res, path.join(UI_DIR, filename))
    : sendJson(res, 404, { error: "Not found" });
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`PixelPicked Creator Studio: http://localhost:${PORT}`);
});
