const form = document.querySelector("#creator-form");
const panels = [...document.querySelectorAll(".format-panel")];
const navButtons = [...document.querySelectorAll(".nav")];
const title = document.querySelector("#page-title");
const previewFormat = document.querySelector("#preview-format");
const previewCard = document.querySelector("#preview-card");
const carouselPreviewNav = document.querySelector("#carousel-preview-nav");
const previewSlideLabel = document.querySelector("#preview-slide-label");
const status = document.querySelector("#render-status");
const progress = status.querySelector(".progress i");
const statusText = status.querySelector("p");
const statusLog = status.querySelector("pre");
const outputs = document.querySelector("#outputs");
const renderButton = document.querySelector(".render-button");
const renderLabel = document.querySelector("#render-label");
let activeFormat = "trailer";
let carouselCount = 0;
let carouselPreviewIndex = 0;
const previewObjectUrls = new WeakMap();

const formatMeta = {
  trailer: ["Game trailer", "MP4 · 1920 × 1080", ""],
  top3: ["Top 3 games", "MP4 · 1080 × 1920", "portrait"],
  carousel: ["Carousel", "PNG SET · 1080 × 1080", "square"],
  launch: ["Launch campaign", "PNG · 1080 × 1350", "portrait"],
};

const escapeHtml = (text) => String(text).replace(/[&<>'"]/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;",
}[character]));

const highlightedHtml = (text, highlight, color = "#FF8A1F", highlightWeight = 900) => {
  const source = String(text || "");
  const needle = String(highlight || "");
  const index = needle ? source.toLowerCase().indexOf(needle.toLowerCase()) : -1;
  if (index < 0) return escapeHtml(source);
  return `${escapeHtml(source.slice(0, index))}<em style="color:${escapeHtml(color)};font-weight:${Number(highlightWeight)}">${escapeHtml(source.slice(index, index + needle.length))}</em>${escapeHtml(source.slice(index + needle.length))}`;
};

const objectUrl = (selectedFile) => {
  if (!selectedFile) return "";
  if (!previewObjectUrls.has(selectedFile)) previewObjectUrls.set(selectedFile, URL.createObjectURL(selectedFile));
  return previewObjectUrls.get(selectedFile);
};

const emptyPreview = () => {
  previewCard.innerHTML = `<div class="preview-logo">PP<span>.</span></div><h3>Ready to create</h3><p>Complete the fields, upload your media, and render.</p>`;
};

const carouselPreviewSlides = () => [
  { type: "hook", image: file("carousel_hook_image"), text: value("carousel_hook"), highlight: value("carousel_hook_highlight"), color: value("carousel_hook_color"), font: value("carousel_hook_font"), weight: value("carousel_hook_weight"), highlightWeight: value("carousel_hook_highlight_weight") },
  ...[...document.querySelectorAll("[data-carousel-index]")].map((card) => {
    const index = card.dataset.carouselIndex;
    return { type: "story", image: file(`carousel_${index}_image`), text: value(`carousel_${index}_headline`), highlight: value(`carousel_${index}_highlight`), color: value(`carousel_${index}_color`), font: value(`carousel_${index}_font`), weight: value(`carousel_${index}_weight`), highlightWeight: value(`carousel_${index}_highlight_weight`) };
  }),
  { type: "cta", text: value("carousel_cta"), highlight: value("carousel_cta_highlight"), color: value("carousel_cta_color"), font: value("carousel_cta_font"), weight: value("carousel_cta_weight"), highlightWeight: value("carousel_cta_highlight_weight") },
];

const renderCarouselPreview = () => {
  if (activeFormat !== "carousel") return;
  const slides = carouselPreviewSlides();
  carouselPreviewIndex = Math.max(0, Math.min(carouselPreviewIndex, slides.length - 1));
  const slide = slides[carouselPreviewIndex];
  const gameName = value("carousel_game") || "Your Game";
  const dots = slides.map((_, index) => `<i class="${index === carouselPreviewIndex ? "active" : ""}"></i>`).join("");
  const media = slide.type === "cta"
    ? `<div class="carousel-live-media"><div class="carousel-live-cta-logo"><span>PP<span class="dot">.</span></span>PixelPicked.</div></div>`
    : `<div class="carousel-live-media">${slide.image ? `<img src="${objectUrl(slide.image)}" alt="Preview" />` : `<div class="empty-media">Choose an image to preview</div>`}<div class="carousel-live-brand"><i></i>PixelPicked</div></div>`;
  previewCard.innerHTML = `<div class="carousel-live ${slide.type}">${media}<div class="carousel-live-divider"></div><div class="carousel-live-mark">PP</div><div class="carousel-live-copy"><h4 style="font-family:${escapeHtml(slide.font)};font-weight:${Number(slide.weight)}">${highlightedHtml(slide.text, slide.highlight, slide.color, slide.highlightWeight)}</h4></div><div class="carousel-live-footer"><div class="carousel-live-dots">${dots}</div><div class="carousel-live-index">${slide.type === "cta" ? "PIXELPICKED" : escapeHtml(gameName)} · ${String(carouselPreviewIndex + 1).padStart(2, "0")}</div></div></div>`;
  previewSlideLabel.textContent = `Slide ${carouselPreviewIndex + 1} of ${slides.length}`;
};

const switchFormat = (format) => {
  activeFormat = format;
  navButtons.forEach((button) => button.classList.toggle("active", button.dataset.format === format));
  panels.forEach((panel) => panel.classList.toggle("active", panel.dataset.panel === format));
  const [name, output, shape] = formatMeta[format];
  title.textContent = name;
  previewFormat.textContent = output;
  previewCard.className = `preview-card ${shape}`.trim();
  renderLabel.textContent = `Render ${name.toLowerCase()} only`;
  carouselPreviewNav.classList.toggle("hidden", format !== "carousel");
  if (format === "carousel") renderCarouselPreview();
  else emptyPreview();
  outputs.innerHTML = "";
};

navButtons.forEach((button) => button.addEventListener("click", () => switchFormat(button.dataset.format)));

const top3Container = document.querySelector("#top3-games");
const top3Defaults = [
  ["Monument Valley 3", "Puzzle · Adventure", "Android · iOS", "500K+"],
  ["The Gardens Between", "Puzzle · Adventure", "Android · iOS", "50K+"],
  ["GRIS", "Platformer · Puzzle", "Android · iOS", "100K+"],
];

top3Defaults.forEach((game, index) => {
  const card = document.createElement("div");
  card.className = "game-card";
  card.innerHTML = `
    <div class="card-heading"><strong>#${3 - index} Game ${index + 1}</strong><span>Video + screenshot</span></div>
    <div class="grid-2">
      <div class="field"><label>Name</label><input name="game_${index}_name" value="${game[0]}" /></div>
      <div class="field"><label>Genre</label><input name="game_${index}_genre" value="${game[1]}" /></div>
      <div class="field"><label>Platforms</label><input name="game_${index}_platform" value="${game[2]}" /></div>
      <div class="field"><label>Downloads</label><input name="game_${index}_downloads" value="${game[3]}" /></div>
    </div>
    <div class="field"><label>Description</label><textarea name="game_${index}_tagline">A beautiful mobile game worth discovering.</textarea></div>
    <div class="grid-2">
      <div class="field"><label>Gameplay video</label><input type="file" name="game_${index}_video" accept="video/*" /></div>
      <div class="field"><label>Screenshot</label><input type="file" name="game_${index}_image" accept="image/*" /></div>
    </div>`;
  top3Container.append(card);
});

const carouselContainer = document.querySelector("#carousel-slides");
const addCarouselSlide = () => {
  const index = carouselCount++;
  const card = document.createElement("div");
  card.className = "slide-card";
  card.dataset.carouselIndex = index;
  card.innerHTML = `
    <div class="card-heading"><strong>Story slide ${index + 2}</strong><button type="button" class="remove-slide">Remove</button></div>
    <div class="field"><label>Image</label><input type="file" name="carousel_${index}_image" accept="image/*" /></div>
    <div class="field"><label>Slide text</label><textarea name="carousel_${index}_headline">Add the next part of the story.</textarea></div>
    <div class="field"><label>Important text</label><input name="carousel_${index}_highlight" placeholder="Important phrase" /></div>
    <div class="type-controls">
      <div class="field"><label>Important-text color</label><input type="color" name="carousel_${index}_color" value="#FF8A1F" /></div>
      <div class="field"><label>Font</label><select name="carousel_${index}_font"><option value="'Arial Narrow', Arial, sans-serif">Arial Narrow</option><option value="Impact, 'Arial Narrow', sans-serif">Impact</option><option value="Inter, Arial, sans-serif">Inter</option><option value="Georgia, serif">Georgia</option></select></div>
      <div class="field"><label>All text</label><select name="carousel_${index}_weight"><option value="500">Regular</option><option value="900">Bold</option></select></div>
      <div class="field"><label>Important text</label><select name="carousel_${index}_highlight_weight"><option value="900">Bold</option><option value="500">Regular</option></select></div>
    </div>`;
  card.querySelector(".remove-slide").addEventListener("click", () => {
    card.remove();
    renderCarouselPreview();
  });
  carouselContainer.append(card);
  renderCarouselPreview();
};
document.querySelector("#add-slide").addEventListener("click", addCarouselSlide);
addCarouselSlide(); addCarouselSlide(); addCarouselSlide();

document.querySelector("#preview-prev").addEventListener("click", () => {
  const count = carouselPreviewSlides().length;
  carouselPreviewIndex = (carouselPreviewIndex - 1 + count) % count;
  renderCarouselPreview();
});
document.querySelector("#preview-next").addEventListener("click", () => {
  const count = carouselPreviewSlides().length;
  carouselPreviewIndex = (carouselPreviewIndex + 1) % count;
  renderCarouselPreview();
});
form.addEventListener("input", renderCarouselPreview);
form.addEventListener("change", renderCarouselPreview);

const launchContainer = document.querySelector("#launch-products");
[1, 2, 3].forEach((rank) => {
  const card = document.createElement("div");
  card.className = "product-card";
  card.innerHTML = `
    <div class="card-heading"><strong>#${rank} Game</strong><span>Launch ranking</span></div>
    <div class="grid-2">
      <div class="field"><label>Game name</label><input name="launch_${rank}_name" value="Game ${rank}" /></div>
      <div class="field"><label>Votes</label><input type="number" name="launch_${rank}_votes" value="0" min="0" /></div>
    </div>
    <div class="field"><label>Artwork</label><input type="file" name="launch_${rank}_image" accept="image/*" /></div>`;
  launchContainer.append(card);
});

const value = (name) => form.elements[name]?.value?.trim() || "";
const file = (name) => form.elements[name]?.files?.[0];
const frames = (seconds, fps) => Math.max(1, Math.round(Number(seconds) * fps));

const upload = async (selectedFile) => {
  if (!selectedFile) throw new Error("Please select every required media file.");
  const body = new FormData();
  body.append("file", selectedFile);
  const response = await fetch("/api/upload", { method: "POST", body });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "Upload failed");
  return result.src;
};

const segments = (text, highlight, options = {}) => {
  const {
    uppercase = false,
    color = "#FF8A1F",
    baseWeight = 500,
    highlightWeight = 900,
  } = options;
  const source = uppercase ? text.toUpperCase() : text;
  const needle = uppercase ? highlight.toUpperCase() : highlight;
  if (!needle) return [{ text: source, color: "#FFFFFF", fontWeight: baseWeight }];
  const index = source.toLowerCase().indexOf(needle.toLowerCase());
  if (index < 0) return [{ text: source, color: "#FFFFFF", fontWeight: baseWeight }];
  return [
    { text: source.slice(0, index), color: "#FFFFFF", fontWeight: baseWeight },
    { text: source.slice(index, index + needle.length), color, fontWeight: highlightWeight },
    { text: source.slice(index + needle.length), color: "#FFFFFF", fontWeight: baseWeight },
  ].filter((part) => part.text);
};

const buildTrailer = async () => ({
  trailer: { src: await upload(file("trailer_video")), fit: value("trailer_fit"), scale: Number(value("trailer_scale") || 1) },
  watermark: { enabled: true, light: true },
  textOverlays: {
    enabled: true,
    hook: { enabled: true, startAt: 0.04, endAt: 0.25, heading: value("trailer_hook"), subheading: value("trailer_hook_sub"), position: "center", accentColor: "#FF8A1F" },
    title: { enabled: true, startAt: 0.58, endAt: 0.82, heading: value("trailer_title"), subheading: value("trailer_description"), position: "top-left", accentColor: "#FF8A1F" },
  },
  outro: { enabled: true, duration: 180, headline: value("trailer_outro"), link: value("trailer_link"), accentColor: "#FF8A1F" },
});

const buildTop3 = async () => {
  const games = await Promise.all([0, 1, 2].map(async (index) => ({
    name: value(`game_${index}_name`), genre: value(`game_${index}_genre`), platform: value(`game_${index}_platform`),
    downloads: value(`game_${index}_downloads`), tagline: value(`game_${index}_tagline`), duration: 360,
    videoSrc: await upload(file(`game_${index}_video`)),
    screenshot: { src: await upload(file(`game_${index}_image`)), label: "PixelPicked" },
  })));
  return {
    hook: { videoSrc: await upload(file("top3_hook_video")), duration: 180, lines: [
      { text: value("top3_line_1"), color: "#FF3DAA" }, { text: value("top3_line_2"), color: "#FFFFFF" }, { text: value("top3_line_3"), color: "#F5A623" },
    ] },
    games,
    outro: { duration: 180, headline: value("top3_outro"), tagline: "The missing layer of mobile gaming", cta: value("top3_cta") },
  };
};

const slideFromCard = async (card) => {
  const index = card.dataset.carouselIndex;
  const headline = value(`carousel_${index}_headline`);
  const color = value(`carousel_${index}_color`);
  const fontWeight = Number(value(`carousel_${index}_weight`));
  return {
    layout: "left", media: { type: "image", src: await upload(file(`carousel_${index}_image`)), fit: "cover", position: "center" },
    headline, headlineSegments: segments(headline, value(`carousel_${index}_highlight`), { color, baseWeight: fontWeight, highlightWeight: Number(value(`carousel_${index}_highlight_weight`)) }), accentColor: color, decorations: false,
    fontFamily: value(`carousel_${index}_font`), fontWeight,
    headlineSize: 48, panelBackground: "linear-gradient(135deg, #17100A 0%, #050505 72%)",
  };
};

const buildCarousel = async () => {
  const hook = value("carousel_hook");
  const cta = value("carousel_cta");
  const hookColor = value("carousel_hook_color");
  const hookWeight = Number(value("carousel_hook_weight"));
  const ctaColor = value("carousel_cta_color");
  const ctaWeight = Number(value("carousel_cta_weight"));
  return {
    gameName: value("carousel_game"), slideDuration: frames(value("carousel_seconds") || 3, 60),
    hookSlide: { layout: "cover", media: { type: "image", src: await upload(file("carousel_hook_image")), fit: "cover", position: "center" }, headline: hook,
      headlineSegments: segments(hook, value("carousel_hook_highlight"), { uppercase: true, color: hookColor, baseWeight: hookWeight, highlightWeight: Number(value("carousel_hook_highlight_weight")) }), accentColor: hookColor, decorations: false, headlineSize: 66,
      fontFamily: value("carousel_hook_font"), fontWeight: hookWeight, panelBackground: "linear-gradient(135deg, #17100A 0%, #050505 72%)" },
    contentSlides: await Promise.all([...document.querySelectorAll("[data-carousel-index]")].map(slideFromCard)),
    ctaSlide: { layout: "cta", media: { type: "brand", backgroundColor: "#F4F4F0", foregroundColor: "#050505", accentColors: ["#FF4D8D", "#C7F000", "#8B5CF6"] },
      headline: cta, headlineSegments: segments(cta, value("carousel_cta_highlight"), { color: ctaColor, baseWeight: ctaWeight, highlightWeight: Number(value("carousel_cta_highlight_weight")) }), accentColor: ctaColor, decorations: false, headlineSize: 48,
      fontFamily: value("carousel_cta_font"), fontWeight: ctaWeight, panelBackground: "linear-gradient(135deg, #17100A 0%, #050505 72%)" },
  };
};

const buildLaunch = async () => ({
  products: await Promise.all([1, 2, 3].map(async (rank) => ({ rank, name: value(`launch_${rank}_name`), votes: Number(value(`launch_${rank}_votes`) || 0), artwork: await upload(file(`launch_${rank}_image`)) }))),
  campaign: { date: value("launch_date"), dayLabel: value("launch_day"), totalVotes: value("launch_total"), cta: value("launch_cta"), link: value("launch_link") },
});

const builders = { trailer: buildTrailer, top3: buildTop3, carousel: buildCarousel, launch: buildLaunch };

const showOutputs = (links) => {
  outputs.innerHTML = links.map((href, index) => `<a class="output-link" href="${href}" target="_blank" download><span>${links.length > 1 ? `Slide ${index + 1}` : "Download render"}</span><b>↓</b></a>`).join("");
};

const waitForJob = async (jobId) => {
  while (true) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await fetch(`/api/jobs/${jobId}`);
    const job = await response.json();
    progress.style.width = `${Math.max(2, job.progress || 0)}%`;
    statusText.textContent = job.status === "complete" ? "Render complete" : `Rendering… ${job.progress || 0}%`;
    statusLog.textContent = (job.log || "").split("\n").slice(-3).join("\n");
    if (job.status === "complete") return job.outputs;
    if (job.status === "error") throw new Error(job.error || "Render failed");
  }
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  renderButton.disabled = true;
  outputs.innerHTML = "";
  status.classList.remove("hidden");
  progress.style.width = "2%";
  progress.style.background = "#ff861f";
  statusText.textContent = "Uploading media…";
  statusLog.textContent = "";
  try {
    const props = await builders[activeFormat]();
    statusText.textContent = "Starting renderer…";
    const response = await fetch("/api/render", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ format: activeFormat, props }) });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Could not start render");
    showOutputs(await waitForJob(result.jobId));
  } catch (error) {
    statusText.textContent = error.message;
    progress.style.width = "100%";
    progress.style.background = "#ff5f5f";
  } finally {
    renderButton.disabled = false;
  }
});
