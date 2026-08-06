// src/compositions/Scene4_Outro.tsx
// ─────────────────────────────────────────────────────────────────────────────
// SCENE 4: PixelPicked outro
// Sequence: Logo alone → shrinks → CTA (top) + "PixelPicked" + tagline + CTA
// (bottom) → HOLD → fade out
// ─────────────────────────────────────────────────────────────────────────────
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { THEME } from "../data/theme";
import { SCENE4_CONFIG } from "../data/config";
import {
  Display,
  Body,
  PixelPickedLogo,
  NoiseOverlay,
} from "../components/shared";

// ── Title hold duration ───────────────────────────────────────────────────────
// How long "PixelPicked" + tagline + CTAs stays fully visible before the scene
// fades out. Change this one constant to adjust. 150 = 5 s at 30 fps.
const TITLE_HOLD_FRAMES = 300;

// ── Reusable CTA banner ────────────────────────────────────────────────────────
const CTABanner: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      textAlign: "center",
      padding: "14px 32px",
      borderRadius: 16,
      background: "#000",
      border: "2px solid #FFC93C",
      maxWidth: 720,
    }}
  >
    <Display size={40} weight={900} letterSpacing={-1}>
      {children}
    </Display>
  </div>
);

// ── Scene ─────────────────────────────────────────────────────────────────────

export const Scene4_Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cfg = SCENE4_CONFIG;

  // ── Phase 1: Logo alone (0 → logoAloneDuration)
  const LOGO_ALONE_END = cfg.logoAloneDuration;
  const LOGO_SHRINK_END = LOGO_ALONE_END + cfg.logoShrinkDuration;
  const TAGLINE_START = LOGO_SHRINK_END;
  const TAGLINE_VISIBLE_END = TAGLINE_START + 80; // tagline fully faded in
  const CTA_START = TAGLINE_VISIBLE_END + 20;
  const CTA_VISIBLE_END = CTA_START + 40; // CTA fully faded in
  // ── HOLD: brand + tagline + CTAs stay visible for TITLE_HOLD_FRAMES before exiting
  const TITLE_HOLD_END = CTA_VISIBLE_END + TITLE_HOLD_FRAMES;
  // Scene ends shortly after the hold
  const SCENE_END = TITLE_HOLD_END + 20;

  const logoAloneOp = interpolate(
    frame,
    [0, 30, LOGO_ALONE_END - 20, LOGO_ALONE_END],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const logoAloneScale = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 100, mass: 0.6 },
    from: 0.8,
    to: 1,
  });

  // ── Phase 2: Logo shrinks + brand name appears
  const brandOp = interpolate(
    frame,
    [LOGO_ALONE_END, LOGO_SHRINK_END],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  // Brand fades out only AFTER the hold, as the scene closes
  const brandFadeOut = interpolate(
    frame,
    [TITLE_HOLD_END - 20, TITLE_HOLD_END],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const brandY = spring({
    frame: frame - LOGO_ALONE_END,
    fps,
    config: { damping: 22, stiffness: 75 },
    from: 30,
    to: 0,
  });

  const taglineOp = interpolate(
    frame,
    [TAGLINE_START, TAGLINE_START + 40],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const ctaOp = interpolate(frame, [CTA_START, CTA_START + 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ctaY = spring({
    frame: frame - CTA_START,
    fps,
    config: { damping: 20, stiffness: 90 },
    from: 16,
    to: 0,
  });
  // Gentle pulse after entrance to pull the eye — helps the CTA register
  // even on autoplaying/muted short-form feeds.
  const ctaPulse =
    frame > CTA_START + 40
      ? 1 + Math.sin((frame - CTA_START - 40) * 0.09) * 0.03
      : 1;
  // Combined visibility: only shows once the brand block is in and holding.
  const ctaVisibility = brandOp * brandFadeOut * ctaOp;

  // Scene fade out at the very end
  const sceneOp = interpolate(frame, [SCENE_END - 20, SCENE_END], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: THEME.colors.bg,
        overflow: "hidden",
        opacity: sceneOp,
      }}
    >
      <NoiseOverlay />

      {/* ── Phase 1: Large logo alone ── */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          opacity: logoAloneOp,
          transform: `scale(${logoAloneScale})`,
        }}
      >
        <PixelPickedLogo size={300} />
      </AbsoluteFill>

      {/* ── CTA above the logo, centered ── */}
      <AbsoluteFill
        style={{
          justifyContent: "flex-start",
          alignItems: "center",
          paddingTop: 600,
          opacity: ctaVisibility,
          transform: `translateY(${ctaY}px) scale(${ctaPulse})`,
        }}
      >
        <CTABanner>
          <span style={{ color: "#FF3B81" }}>Find more</span>{" "}
          <span style={{ color: "#FFFFFF" }}>games like this</span>{" "}
          <span style={{ color: "#FFFFFF" }}>on</span>{" "}
          <span style={{ color: "#FFC93C" }}>PixelPicked</span>
        </CTABanner>
      </AbsoluteFill>

      {/* ── Phase 2: Shrunk logo + brand name + tagline (holds, then fades out) ── */}
      <AbsoluteFill
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 16,
          opacity: brandOp * brandFadeOut,
          transform: `translateY(${brandY}px)`,
        }}
      >
        <PixelPickedLogo size={100} showText={false} />
        <Display size={100} weight={900} letterSpacing={-5}>
          {cfg.brand.name}
        </Display>
        <div style={{ opacity: taglineOp }}>
          <Body size={28} color={THEME.colors.secondary} letterSpacing={-0.5}>
            {cfg.brand.tagline}
          </Body>
        </div>
      </AbsoluteFill>

      {/* ── CTA below the logo, centered ── */}
      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 500,
          opacity: ctaVisibility,
          transform: `translateY(${ctaY}px) scale(${ctaPulse})`,
        }}
      >
        <CTABanner>
          <span style={{ color: "#FF3B81" }}>Link In</span>{" "}
          <span style={{ color: "#FFFFFF" }}>Comments</span>
        </CTABanner>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
