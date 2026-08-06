import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";
import { THEME } from "../data/theme";
import { SCENE2B_CONFIG, SCENE2B_TIMING } from "../data/config";
import { BgVideo, NoiseOverlay, SceneBranding } from "../components/shared";

// ── Pacing constants pulled from the SAME config the duration math uses ────
// Do not redefine these locally — that's exactly what caused clips 1 & 2 to
// vanish (cfg.duration() was using a stale hardcoded "28" while this file
// had SCREENSHOT_HOLD hardcoded to 150, and the two drifted apart).
const {
  clipTransition: CLIP_TRANSITION,
  screenshotHold: SCREENSHOT_HOLD,
  screenshotTransition: SCREENSHOT_TRANSITION,
} = SCENE2B_TIMING;
const LINE_STAGGER = 10; // frames between each hook line appearing
const DROP_FRAME = 6; // brief charge-up before the screenshot slams in

// ── Hook: title lines stack in one-by-one over showcase footage ─────────────
const HookLine: React.FC<{
  text: string;
  color: string;
  frame: number;
  fps: number;
}> = ({ text, color, frame, fps }) => {
  if (frame < 0) return <div style={{ height: 0 }} />;

  const pop = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 260, mass: 0.4 },
    from: 0.4,
    to: 1,
  });
  const op = interpolate(frame, [0, 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 220, mass: 0.5 },
    from: 40,
    to: 0,
  });

  return (
    <div
      style={{
        opacity: op,
        transform: `translateY(${y}px) scale(${pop})`,
        fontFamily: THEME.fonts.display,
        fontSize: 88,
        fontWeight: 900,
        color,
        letterSpacing: -3,
        textAlign: "center",
        lineHeight: 1.05,
        textShadow: "0 4px 24px rgba(0,0,0,0.85)",
      }}
    >
      {text}
    </div>
  );
};

const HookIntro: React.FC<{
  localFrame: number;
  fps: number;
  duration: number;
  videoSrc: string;
  lines: { text: string; color: string }[];
}> = ({ localFrame, fps, duration, videoSrc, lines }) => {
  const exitStart = duration - 14;
  const inExit = localFrame >= exitStart;
  const exitY = spring({
    frame: localFrame - exitStart,
    fps,
    config: { damping: 20, stiffness: 300, mass: 0.4 },
    from: 0,
    to: -160,
  });
  const exitOp = interpolate(localFrame, [exitStart, exitStart + 10], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <BgVideo src={videoSrc} startFrom={0} endScale={1.06} opacity={1} />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0.35) 100%)",
        }}
      />
      <NoiseOverlay />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 6,
          transform: `translateY(${inExit ? exitY : 0}px)`,
          opacity: inExit ? exitOp : 1,
        }}
      >
        {lines.map((line, i) => (
          <HookLine
            key={i}
            text={line.text}
            color={line.color}
            frame={localFrame - i * LINE_STAGGER}
            fps={fps}
          />
        ))}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ── Screenshot beat-drop: charge-up → hard punch → shockwave → hold ────────
const ScreenshotReveal: React.FC<{
  src: string;
  label: string;
  localFrame: number;
  fps: number;
  dropSfx?: string;
}> = ({ src, label, localFrame, fps, dropSfx }) => {
  const dropFrame = localFrame - DROP_FRAME; // >=0 once the hit lands

  const chargeOp = interpolate(localFrame, [0, DROP_FRAME], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const chargeScale = interpolate(localFrame, [0, DROP_FRAME], [0.2, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const punchScale = spring({
    frame: Math.max(0, dropFrame),
    fps,
    config: { damping: 8, stiffness: 220, mass: 0.6 },
    from: 1.5,
    to: 1,
  });
  const punchOp = interpolate(dropFrame, [0, 3], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const blur = interpolate(dropFrame, [0, 8], [10, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const shakeDecay = interpolate(dropFrame, [0, 10], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const shakeX =
    dropFrame >= 0 ? Math.sin(dropFrame * 3.1) * 14 * shakeDecay : 0;
  const shakeY =
    dropFrame >= 0 ? Math.cos(dropFrame * 2.6) * 14 * shakeDecay : 0;

  const ring = (delay: number) => {
    const rf = dropFrame - delay;
    return {
      scale: interpolate(rf, [0, 22], [0, 3.2], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
      op: interpolate(rf, [0, 22], [0.8, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
    };
  };
  const ringA = ring(0);
  const ringB = ring(4);

  const idlePulse =
    dropFrame > 20 ? 1 + Math.sin((dropFrame - 20) * 0.07) * 0.012 : 1;

  const flashStart = SCREENSHOT_HOLD - 4;
  const flashOp = interpolate(
    localFrame,
    [flashStart, flashStart + 4, flashStart + 8],
    [0, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill style={{ background: "#000", zIndex: 40 }}>
      {dropSfx && dropFrame === 0 && <Audio src={dropSfx} />}

      {dropFrame < 0 && (
        <AbsoluteFill
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <div
            style={{
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${THEME.colors.accent}55 0%, transparent 70%)`,
              opacity: chargeOp,
              transform: `scale(${chargeScale})`,
            }}
          />
        </AbsoluteFill>
      )}

      {dropFrame >= 0 && (
        <>
          <AbsoluteFill
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <div
              style={{
                width: 300,
                height: 300,
                borderRadius: "50%",
                border: `4px solid ${THEME.colors.accent}`,
                opacity: ringA.op,
                transform: `scale(${ringA.scale})`,
              }}
            />
          </AbsoluteFill>
          <AbsoluteFill
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <div
              style={{
                width: 300,
                height: 300,
                borderRadius: "50%",
                border: "2px solid #fff",
                opacity: ringB.op,
                transform: `scale(${ringB.scale})`,
              }}
            />
          </AbsoluteFill>
        </>
      )}

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          opacity: punchOp,
          transform: `translate(${shakeX}px, ${shakeY}px) scale(${
            punchScale * idlePulse
          })`,
          filter: `blur(${blur}px)`,
        }}
      >
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img
          src={src}
          style={{
            width: "82%",
            borderRadius: 28,
            boxShadow: `0 0 80px ${THEME.colors.accent}66, 0 20px 60px rgba(0,0,0,0.7)`,
          }}
        />
      </AbsoluteFill>

      <div
        style={{
          position: "absolute",
          top: 64,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: punchOp,
          transform: `translate(${shakeX * 0.5}px, ${shakeY * 0.5}px)`,
        }}
      >
        <div
          style={{
            background: THEME.colors.accent,
            borderRadius: 40,
            padding: "8px 28px",
            fontFamily: THEME.fonts.body,
            fontWeight: 900,
            fontSize: 24,
            color: "#000",
            letterSpacing: 1,
            textTransform: "uppercase",
          }}
        >
          {label}
        </div>
      </div>

      <AbsoluteFill
        style={{
          background: THEME.colors.accent,
          opacity: interpolate(dropFrame, [0, 2, 6], [0, 0.7, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />

      <AbsoluteFill style={{ background: "#fff", opacity: flashOp }} />
    </AbsoluteFill>
  );
};

// ── Big number badge top-left ─────────────────────────────────────────────────
const ClipNumber: React.FC<{
  number: number;
  localFrame: number;
  fps: number;
}> = ({ number, localFrame, fps }) => {
  const op = interpolate(localFrame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = spring({
    frame: localFrame,
    fps,
    config: { damping: 13, stiffness: 260, mass: 0.4 },
    from: 0.4,
    to: 1,
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 48,
        left: 48,
        opacity: op,
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        zIndex: 20,
      }}
    >
      <div
        style={{
          width: 120,
          height: 120,
          borderRadius: 32,
          background: THEME.colors.accent,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        }}
      >
        <div
          style={{
            fontFamily: THEME.fonts.body,
            fontSize: 13,
            fontWeight: 900,
            color: "rgba(0,0,0,0.45)",
            letterSpacing: 3,
            textTransform: "uppercase",
            lineHeight: 1,
            marginBottom: 2,
          }}
        >
          No.
        </div>
        <div
          style={{
            fontFamily: THEME.fonts.display,
            fontSize: 72,
            fontWeight: 900,
            color: "#000",
            letterSpacing: -3,
            lineHeight: 1,
          }}
        >
          {number}
        </div>
      </div>
    </div>
  );
};

// ── Game metadata bottom-left ──────────────────────────────────────────────────
const GameMeta: React.FC<{
  game: {
    name: string;
    genre: string;
    platform?: string;
    tagline?: string;
    downloads?: string;
  };
  localFrame: number;
  fps: number;
}> = ({ game, localFrame, fps }) => {
  const startAt = 6;
  const metaOp = interpolate(localFrame, [startAt, startAt + 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const metaX = spring({
    frame: localFrame - startAt,
    fps,
    config: { damping: 18, stiffness: 200, mass: 0.5 },
    from: -50,
    to: 0,
  });
  const dividerW = interpolate(
    localFrame,
    [startAt + 4, startAt + 22],
    [0, 80],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "flex-start",
        padding: "0 64px 100px",
        opacity: metaOp,
        transform: `translateX(${metaX}px)`,
        zIndex: 20,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <div
            style={{
              width: dividerW,
              height: 4,
              background: THEME.colors.accent,
              borderRadius: 2,
            }}
          />
          <div
            style={{
              fontFamily: THEME.fonts.body,
              fontSize: 22,
              fontWeight: 700,
              color: THEME.colors.accent,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            {game.genre}
          </div>
          {game.platform && (
            <>
              <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 22 }}>
                ·
              </div>
              <div
                style={{
                  fontFamily: THEME.fonts.body,
                  fontSize: 22,
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                {game.platform}
              </div>
            </>
          )}
        </div>

        <div
          style={{
            fontFamily: THEME.fonts.display,
            fontSize: 110,
            fontWeight: 900,
            color: "#FFF",
            letterSpacing: -4,
            lineHeight: 0.95,
          }}
        >
          {game.name}
        </div>

        {game.tagline && (
          <div
            style={{
              fontFamily: THEME.fonts.body,
              fontSize: 30,
              color: "rgba(255,255,255,0.6)",
              letterSpacing: -0.5,
            }}
          >
            {game.tagline}
          </div>
        )}

        {game.downloads && (
          <div
            style={{
              marginTop: 6,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 40,
              padding: "8px 22px",
              alignSelf: "flex-start",
            }}
          >
            <span style={{ fontSize: 20 }}>⬇️</span>
            <div
              style={{
                fontFamily: THEME.fonts.body,
                fontSize: 22,
                fontWeight: 700,
                color: "#FFF",
                letterSpacing: 0.5,
              }}
            >
              {game.downloads}
            </div>
            <div
              style={{
                fontFamily: THEME.fonts.body,
                fontSize: 16,
                color: "rgba(255,255,255,0.45)",
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              downloads
            </div>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

// ── Single clip: beat-drop screenshot → flash cut → gameplay ────────────────
const GameClip: React.FC<{
  clipNumber: number;
  fps: number;
  game: {
    name: string;
    genre: string;
    platform?: string;
    tagline?: string;
    downloads?: string;
    videoSrc: string;
    duration: number;
    screenshot?: { src: string; label: string; dropSfx?: string };
  };
  clipDuration: number;
}> = ({ clipNumber, fps, game, clipDuration }) => {
  const localFrame = useCurrentFrame();
  const preRoll = game.screenshot ? SCREENSHOT_HOLD + SCREENSHOT_TRANSITION : 0;
  const gameFrame = localFrame - preRoll;

  if (game.screenshot && localFrame < SCREENSHOT_HOLD) {
    return (
      <ScreenshotReveal
        src={game.screenshot.src}
        label={game.screenshot.label}
        dropSfx={game.screenshot.dropSfx}
        localFrame={localFrame}
        fps={fps}
      />
    );
  }

  if (gameFrame > clipDuration + CLIP_TRANSITION) return null;

  const op = Math.min(
    interpolate(gameFrame, [0, 6], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
    interpolate(
      gameFrame,
      [clipDuration - CLIP_TRANSITION, clipDuration],
      [1, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    ),
  );
  const videoOp = interpolate(gameFrame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: op }}>
      <div style={{ position: "absolute", inset: 0, opacity: videoOp }}>
        <BgVideo
          src={game.videoSrc}
          startFrom={0}
          endScale={1.04}
          opacity={1}
        />
      </div>

      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.2) 50%, transparent 75%)",
          pointerEvents: "none",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, transparent 35%)",
          pointerEvents: "none",
        }}
      />
      <NoiseOverlay />

      {game.screenshot && (
        <AbsoluteFill
          style={{
            background: "#fff",
            opacity: interpolate(gameFrame, [0, 5], [1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
      )}

      <ClipNumber number={clipNumber} localFrame={gameFrame} fps={fps} />

      <div
        style={{
          position: "absolute",
          top: 72,
          right: 56,
          zIndex: 20,
          opacity: interpolate(gameFrame, [4, 14], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <div
          style={{
            fontFamily: THEME.fonts.body,
            fontSize: 15,
            fontWeight: 800,
            color: "rgba(255,255,255,0.3)",
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          PixelPicked · Hidden Gems
        </div>
      </div>

      <GameMeta game={game} localFrame={gameFrame} fps={fps} />
    </AbsoluteFill>
  );
};

// ── Main scene ─────────────────────────────────────────────────────────────────
export const Scene2B_GameOfWeek: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cfg = SCENE2B_CONFIG;

  const SCREENSHOT_PREROLL = SCREENSHOT_HOLD + SCREENSHOT_TRANSITION;

  const gameFrames = cfg.games.map(
    (g: { duration: number; screenshot?: unknown }) =>
      g.duration + (g.screenshot ? SCREENSHOT_PREROLL : 0),
  );

  const clipStarts = cfg.games.map(
    (_: unknown, i: number) =>
      cfg.hook.duration +
      gameFrames.slice(0, i).reduce((sum: number, d: number) => sum + d, 0),
  );

  const sceneOpacity = interpolate(
    frame,
    [0, 10, cfg.duration - 15, cfg.duration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{ background: "#000", overflow: "hidden", opacity: sceneOpacity }}
    >
      <SceneBranding light />

      <Sequence
        from={0}
        durationInFrames={cfg.hook.duration + CLIP_TRANSITION}
        layout="none"
      >
        <HookIntro
          localFrame={frame}
          fps={fps}
          duration={cfg.hook.duration}
          videoSrc={cfg.hook.videoSrc}
          lines={cfg.hook.lines}
        />
      </Sequence>

      {cfg.games.map(
        (
          game: {
            name: string;
            genre: string;
            platform?: string;
            tagline?: string;
            downloads?: string;
            videoSrc: string;
            duration: number;
            screenshot?: { src: string; label: string; dropSfx?: string };
          },
          i: number,
        ) => (
          <Sequence
            key={i}
            from={clipStarts[i]}
            durationInFrames={gameFrames[i] + CLIP_TRANSITION}
            layout="none"
          >
            <GameClip
              clipNumber={cfg.games.length - i}
              fps={fps}
              game={game}
              clipDuration={game.duration}
            />
          </Sequence>
        ),
      )}
    </AbsoluteFill>
  );
};
