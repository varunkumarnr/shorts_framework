import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Img,
} from "remotion";
import { THEME } from "../data/theme";
import { SCENE6_CONFIG } from "../data/config";
import { NoiseOverlay, SceneBranding } from "../components/shared";

const SLIDE_DURATION = 150;
const TRANSITION = 25;

interface Slide {
  phase: "BEFORE" | "AFTER";
  phaseColor: string;
  icon: string;
  text: string;
  image: string;
}

const SingleSlide: React.FC<{
  slide: Slide;
  localFrame: number;
  fps: number;
}> = ({ slide, localFrame, fps }) => {
  const opacity = Math.min(
    interpolate(localFrame, [0, TRANSITION], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
    interpolate(
      localFrame,
      [SLIDE_DURATION - TRANSITION, SLIDE_DURATION],
      [1, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    ),
  );
  const labelY = spring({
    frame: localFrame,
    fps,
    config: { damping: 22, stiffness: 80 },
    from: -30,
    to: 0,
  });
  const textY = spring({
    frame: localFrame - 10,
    fps,
    config: { damping: 22, stiffness: 75 },
    from: 50,
    to: 0,
  });
  const imgY = spring({
    frame: localFrame - 20,
    fps,
    config: { damping: 20, stiffness: 65, mass: 1.2 },
    from: 80,
    to: 0,
  });
  const imgOp = interpolate(localFrame, [20, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const isBefore = slide.phase === "BEFORE";

  return (
    <AbsoluteFill
      style={{
        opacity,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 140,
        paddingInline: 60,
      }}
    >
      <div
        style={{
          transform: `translateY(${labelY}px)`,
          marginBottom: 28,
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <div
          style={{
            width: 40,
            height: 3,
            background: slide.phaseColor,
            borderRadius: 2,
          }}
        />
        <div
          style={{
            fontFamily: THEME.fonts.body,
            fontSize: 16,
            fontWeight: 800,
            color: slide.phaseColor,
            letterSpacing: 5,
            textTransform: "uppercase",
          }}
        >
          {slide.phase}
        </div>
        <div
          style={{
            width: 40,
            height: 3,
            background: slide.phaseColor,
            borderRadius: 2,
          }}
        />
      </div>
      <div
        style={{
          transform: `translateY(${textY}px)`,
          textAlign: "center",
          marginBottom: 50,
        }}
      >
        <div style={{ fontSize: 52, marginBottom: 16 }}>{slide.icon}</div>
        <div
          style={{
            fontFamily: THEME.fonts.display,
            fontSize: 76,
            fontWeight: 900,
            color: THEME.colors.primary,
            letterSpacing: -3,
            lineHeight: 1.05,
            textDecoration: isBefore ? "line-through" : "none",
            textDecorationColor: "rgba(0,0,0,0.15)",
            textDecorationThickness: 4,
          }}
        >
          {slide.text}
        </div>
      </div>
      <div
        style={{
          opacity: imgOp,
          transform: `translateY(${imgY}px)`,
          width: "100%",
          flex: 1,
          borderRadius: 24,
          overflow: "hidden",
          maxHeight: 820,
        }}
      >
        <Img
          src={slide.image}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    </AbsoluteFill>
  );
};

export const Scene6_BeforeAfter: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cfg = SCENE6_CONFIG;

  const sceneOpacity = interpolate(
    frame,
    [0, 30, cfg.duration - 30, cfg.duration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const slides: Slide[] = [
    ...cfg.before.items.map((item) => ({
      phase: "BEFORE" as const,
      phaseColor: cfg.before.labelColor,
      icon: item.icon,
      text: item.text,
      image: item.image,
    })),
    ...cfg.after.items.map((item) => ({
      phase: "AFTER" as const,
      phaseColor: cfg.after.labelColor,
      icon: item.icon,
      text: item.text,
      image: item.image,
    })),
  ];

  return (
    <AbsoluteFill
      style={{
        background: "#FAFAFA",
        overflow: "hidden",
        opacity: sceneOpacity,
      }}
    >
      <NoiseOverlay />
      <SceneBranding />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, #FFFFFF 0%, #F5F5F5 100%)",
          pointerEvents: "none",
        }}
      />
      {slides.map((slide, i) => {
        const localFrame = frame - i * SLIDE_DURATION;
        if (
          localFrame < -TRANSITION ||
          localFrame > SLIDE_DURATION + TRANSITION
        )
          return null;
        return (
          <SingleSlide
            key={i}
            slide={slide}
            localFrame={Math.max(0, localFrame)}
            fps={fps}
          />
        );
      })}
    </AbsoluteFill>
  );
};
