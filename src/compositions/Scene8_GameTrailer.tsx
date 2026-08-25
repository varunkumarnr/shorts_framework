import React from "react";
import {
  AbsoluteFill,
  Sequence,
  Video,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  GameTrailerTextOverlay,
  SCENE8_GAME_TRAILER_CONFIG,
} from "../data/config";
import { PixelPickedLogo, SceneBranding } from "../components/shared";
import { THEME } from "../data/theme";

const positionStyles: Record<
  GameTrailerTextOverlay["position"],
  React.CSSProperties
> = {
  "top-left": {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: "150px 110px",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
    padding: "80px 180px",
  },
  "bottom-left": {
    justifyContent: "flex-end",
    alignItems: "flex-start",
    padding: "110px",
  },
};

const TrailerText: React.FC<{
  overlay: GameTrailerTextOverlay;
  trailerDuration: number;
}> = ({ overlay, trailerDuration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const startFrame = Math.round(trailerDuration * overlay.startAt);
  const endFrame = Math.round(trailerDuration * overlay.endAt);
  const fadeFrames = Math.max(
    1,
    Math.min(24, Math.floor((endFrame - startFrame) / 4)),
  );
  const opacity = interpolate(
    frame,
    [startFrame, startFrame + fadeFrames, endFrame - fadeFrames, endFrame],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const enter = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 22, stiffness: 85, mass: 0.8 },
  });
  const isCentered = overlay.position === "center";

  if (!overlay.enabled || frame < startFrame || frame > endFrame) return null;

  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          opacity,
          background:
            overlay.position === "top-left"
              ? "linear-gradient(120deg, rgba(0,0,0,0.7), transparent 58%)"
              : overlay.position === "bottom-left"
                ? "linear-gradient(to top, rgba(0,0,0,0.78), transparent 58%)"
                : "rgba(0,0,0,0.22)",
        }}
      />
      <AbsoluteFill
        style={{
          ...positionStyles[overlay.position],
          opacity,
        }}
      >
        <div
          style={{
            maxWidth: isCentered ? 1250 : 1040,
            textAlign: isCentered ? "center" : "left",
            transform: `translateY(${(1 - enter) * 34}px)`,
          }}
        >
          <div
            style={{
              width: isCentered ? 100 : 72,
              height: 6,
              margin: isCentered ? "0 auto 22px" : "0 0 22px",
              borderRadius: 99,
              background: overlay.accentColor,
            }}
          />
          <div
            style={{
              fontFamily: THEME.fonts.display,
              fontSize: 78,
              lineHeight: 0.98,
              fontWeight: 900,
              letterSpacing: -3,
              color: "#FFFFFF",
              textShadow: "0 4px 30px rgba(0,0,0,0.4)",
            }}
          >
            {overlay.heading}
          </div>
          {overlay.subheading && (
            <div
              style={{
                marginTop: 20,
                fontFamily: THEME.fonts.body,
                fontSize: 29,
                lineHeight: 1.35,
                fontWeight: 500,
                color: "rgba(255,255,255,0.82)",
              }}
            >
              {overlay.subheading}
            </div>
          )}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const TrailerOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cfg = SCENE8_GAME_TRAILER_CONFIG.outro;
  const enter = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 90, mass: 0.8 },
  });
  const opacity = interpolate(
    frame,
    [0, 24, cfg.duration - 24, cfg.duration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const linkOpacity = interpolate(frame, [38, 72], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        opacity,
        background: cfg.backgroundColor,
        justifyContent: "center",
        alignItems: "center",
        color: cfg.textColor,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: `translateY(${(1 - enter) * 30}px) scale(${0.94 + enter * 0.06})`,
        }}
      >
        <PixelPickedLogo size={cfg.logoSize} showText={false} />
        <div
          style={{
            width: 74,
            height: 6,
            margin: "28px 0 24px",
            borderRadius: 99,
            background: cfg.accentColor,
          }}
        />
        <div
          style={{
            maxWidth: 1300,
            fontFamily: THEME.fonts.display,
            fontSize: 72,
            fontWeight: 900,
            letterSpacing: -3.2,
            lineHeight: 1.05,
            textAlign: "center",
          }}
        >
          {cfg.headline}
        </div>
        <div
          style={{
            opacity: linkOpacity,
            marginTop: 32,
            padding: "16px 28px",
            borderRadius: 14,
            background: cfg.textColor,
            fontFamily: THEME.fonts.body,
            fontSize: 25,
            fontWeight: 800,
            letterSpacing: 2.5,
            textTransform: "uppercase",
            color: cfg.backgroundColor,
          }}
        >
          {cfg.link}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Scene8_GameTrailer: React.FC = () => {
  const { durationInFrames } = useVideoConfig();
  const cfg = SCENE8_GAME_TRAILER_CONFIG;
  const outroDuration = cfg.outro.enabled ? cfg.outro.duration : 0;
  const trailerDuration = Math.max(1, durationInFrames - outroDuration);

  return (
    <AbsoluteFill
      style={{ background: cfg.backgroundColor, overflow: "hidden" }}
    >
      <Sequence durationInFrames={trailerDuration}>
        <AbsoluteFill>
          <Video
            src={cfg.trailer.src}
            style={{
              width: "100%",
              height: "100%",
              objectFit: cfg.trailer.fit,
              transform: `scale(${cfg.trailer.scale})`,
            }}
          />
          {cfg.watermark.enabled && (
            <SceneBranding light={cfg.watermark.light} />
          )}
          {cfg.textOverlays.enabled && (
            <>
              <TrailerText
                overlay={cfg.textOverlays.hook}
                trailerDuration={trailerDuration}
              />
              <TrailerText
                overlay={cfg.textOverlays.title}
                trailerDuration={trailerDuration}
              />
            </>
          )}
        </AbsoluteFill>
      </Sequence>

      {cfg.outro.enabled && (
        <Sequence from={trailerDuration} durationInFrames={outroDuration}>
          <TrailerOutro />
        </Sequence>
      )}
    </AbsoluteFill>
  );
};
