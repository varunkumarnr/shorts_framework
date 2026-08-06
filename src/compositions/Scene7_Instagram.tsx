import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SCENE7_CONFIG, Scene7TextOverlay } from "../data/config";
import { BgVideo, SceneBranding } from "../components/shared";

// ─── Single text overlay pill ────────────────────────────────────────────────
const TextPill: React.FC<{
  overlay: Scene7TextOverlay;
  frame: number;
  fps: number;
}> = ({ overlay, frame, fps }) => {
  const { startFrame, endFrame, text, fontSize, style } = overlay;

  // Determine if we're inside the visible window
  const FADE_IN = 12;
  const FADE_OUT = 10;

  const enterProgress = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 20, stiffness: 160, mass: 0.7 },
    from: 0,
    to: 1,
  });

  const opacity = interpolate(
    frame,
    [startFrame, startFrame + FADE_IN, endFrame - FADE_OUT, endFrame],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const translateY = interpolate(
    frame,
    [startFrame, startFrame + FADE_IN],
    [-18, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const scale = interpolate(
    frame,
    [startFrame, startFrame + FADE_IN],
    [0.92, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  if (frame < startFrame || frame > endFrame) return null;

  // Style variants
  const pillStyles: Record<string, React.CSSProperties> = {
    white: {
      background: "rgba(255, 255, 255, 0.92)",
      color: "#000000",
      backdropFilter: "blur(8px)",
    },
    black: {
      background: "rgba(0, 0, 0, 0.82)",
      color: "#FFFFFF",
      backdropFilter: "blur(8px)",
    },
    accent: {
      background: "rgba(234, 179, 8, 0.95)",
      color: "#000000",
      backdropFilter: "blur(8px)",
    },
    transparent_white: {
      background: "rgba(0,0,0,0.55)",
      color: "#FFFFFF",
      backdropFilter: "blur(12px)",
      border: "2px solid rgba(255,255,255,0.18)",
    },
  };

  const chosenStyle = pillStyles[style ?? "white"];

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        ...chosenStyle,
        borderRadius: "22px",
        padding: "22px 34px",
        fontSize: fontSize ?? 64,
        fontWeight: 900,
        lineHeight: 1.18,
        letterSpacing: "-1.5px",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif',
        maxWidth: "88%",
        textAlign: "center",
        boxShadow: "0 8px 40px rgba(0,0,0,0.28)",
        // Stroke for readability on any bg
        WebkitTextStroke:
          style === "white" || style === "accent" ? "0px" : "0px",
      }}
    >
      {text}
    </div>
  );
};

// ─── Scene 7 ─────────────────────────────────────────────────────────────────
export const Scene7_InstagramText: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cfg = SCENE7_CONFIG;

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {/* Background video — same source as Scene 1 (reddit.mov) */}
      <BgVideo
        src={cfg.backgroundVideo}
        startFrom={cfg.backgroundVideoStartFrom}
        endScale={cfg.backgroundVideoPushScale}
        opacity={1}
      />

      {/* PixelPicked branding — top-right, same as other scenes */}
      <SceneBranding light />

      {/* Text overlays — stacked vertically in the upper area */}
      <AbsoluteFill
        style={{
          justifyContent: "flex-start",
          alignItems: "center",
          paddingTop: cfg.textAreaTopOffset ?? 180,
          gap: 28,
          display: "flex",
          flexDirection: "column",
          pointerEvents: "none",
        }}
      >
        {cfg.textOverlays.map((overlay, i) => (
          <TextPill key={i} overlay={overlay} frame={frame} fps={fps} />
        ))}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
