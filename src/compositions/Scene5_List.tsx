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
import { SCENE5_CONFIG } from "../data/config";
import { BgVideo, NoiseOverlay, SceneBranding } from "../components/shared";

const TITLE_DURATION = 90;
const ITEM_DURATION = 180;
const TRANSITION = 25;

const TitleCard: React.FC<{
  localFrame: number;
  fps: number;
  title: string;
}> = ({ localFrame, fps, title }) => {
  const opacity = Math.min(
    interpolate(localFrame, [0, 30], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
    interpolate(localFrame, [TITLE_DURATION - 20, TITLE_DURATION], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const titleY = spring({
    frame: localFrame,
    fps,
    config: { damping: 22, stiffness: 70 },
    from: 60,
    to: 0,
  });
  const lineW = interpolate(localFrame, [20, 70], [0, 80], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill
      style={{
        opacity,
        justifyContent: "center",
        alignItems: "center",
        padding: "0 72px",
      }}
    >
      <div
        style={{ transform: `translateY(${titleY}px)`, textAlign: "center" }}
      >
        {title.split("\n").map((line, i) => (
          <div
            key={i}
            style={{
              fontFamily: THEME.fonts.display,
              fontSize: 90,
              fontWeight: 900,
              color: "#FFF",
              letterSpacing: -4,
              lineHeight: 1.02,
            }}
          >
            {line}
          </div>
        ))}
        <div
          style={{
            margin: "28px auto 0",
            width: lineW,
            height: 4,
            background: THEME.colors.accent,
            borderRadius: 2,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

const ItemSlide: React.FC<{
  item: (typeof SCENE5_CONFIG)["items"][0];
  localFrame: number;
  fps: number;
}> = ({ item, localFrame, fps }) => {
  const opacity = Math.min(
    interpolate(localFrame, [0, TRANSITION], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
    interpolate(
      localFrame,
      [ITEM_DURATION - TRANSITION, ITEM_DURATION],
      [1, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    ),
  );
  const numY = spring({
    frame: localFrame,
    fps,
    config: { damping: 22, stiffness: 80 },
    from: -40,
    to: 0,
  });
  const headY = spring({
    frame: localFrame - 8,
    fps,
    config: { damping: 22, stiffness: 75 },
    from: 50,
    to: 0,
  });
  const imgOp = interpolate(localFrame, [25, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const imgY = spring({
    frame: localFrame - 15,
    fps,
    config: { damping: 20, stiffness: 60, mass: 1.2 },
    from: 80,
    to: 0,
  });

  return (
    <AbsoluteFill
      style={{
        opacity,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        paddingTop: 140,
        paddingInline: 64,
      }}
    >
      <div
        style={{
          transform: `translateY(${numY}px)`,
          fontFamily: THEME.fonts.display,
          fontSize: 22,
          fontWeight: 800,
          color: item.accentColor,
          letterSpacing: 3,
          marginBottom: 12,
        }}
      >
        {item.number}
      </div>
      <div style={{ transform: `translateY(${headY}px)`, marginBottom: 44 }}>
        <div style={{ fontSize: 56, marginBottom: 12 }}>{item.icon}</div>
        <div
          style={{
            fontFamily: THEME.fonts.display,
            fontSize: 80,
            fontWeight: 900,
            lineHeight: 1.0,
            letterSpacing: -3,
            color: "#FFF",
          }}
        >
          {item.heading.split("\n").map((line, i) => (
            <div key={i}>{line}</div>
          ))}
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
        }}
      >
        <Img
          src={item.image}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    </AbsoluteFill>
  );
};

export const Scene5_List: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cfg = SCENE5_CONFIG;

  const sceneOpacity = interpolate(
    frame,
    [0, 30, cfg.duration - 30, cfg.duration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{
        background: "#0A0A0A",
        overflow: "hidden",
        opacity: sceneOpacity,
      }}
    >
      <BgVideo
        src={cfg.backgroundVideo}
        endScale={cfg.backgroundVideoPushScale}
        opacity={0.3}
      />
      <AbsoluteFill
        style={{ background: "rgba(0,0,0,0.55)", pointerEvents: "none" }}
      />
      <NoiseOverlay />
      <SceneBranding light />
      {frame < TITLE_DURATION + 20 && (
        <TitleCard localFrame={frame} fps={fps} title={cfg.title} />
      )}
      {cfg.items.map((item, i) => {
        const start = TITLE_DURATION + i * ITEM_DURATION;
        const localFrame = frame - start;
        if (localFrame < -TRANSITION || localFrame > ITEM_DURATION + TRANSITION)
          return null;
        return (
          <ItemSlide
            key={i}
            item={item}
            localFrame={Math.max(0, localFrame)}
            fps={fps}
          />
        );
      })}
    </AbsoluteFill>
  );
};
