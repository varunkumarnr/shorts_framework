import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Img,
  Video,
} from "remotion";
import { THEME } from "../data/theme";
import { SCENE3_CONFIG } from "../data/config";
import { NoiseOverlay, SceneBranding } from "../components/shared";

const PhoneScreenContent: React.FC<{
  config: (typeof SCENE3_CONFIG)["media"];
  frame: number;
}> = ({ config, frame }) => {
  if (config.type === "video")
    return (
      <Video
        src={config.sources[0]}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    );
  if (config.type === "image")
    return (
      <Img
        src={config.sources[0]}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    );
  const { carouselDuration, transitionDuration, sources } = config;
  const loopedFrame = frame % (sources.length * carouselDuration);
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {sources.map((src, i) => {
        const start = i * carouselDuration;
        const end = start + carouselDuration;
        const fadeIn = interpolate(
          loopedFrame,
          [start, start + transitionDuration],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
        const fadeOut = interpolate(
          loopedFrame,
          [end - transitionDuration, end],
          [1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              inset: 0,
              opacity: Math.min(fadeIn, fadeOut),
            }}
          >
            <Img
              src={src}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        );
      })}
      <div
        style={{
          position: "absolute",
          bottom: 14,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 6,
        }}
      >
        {sources.map((_, i) => {
          const isActive = Math.floor(loopedFrame / carouselDuration) === i;
          return (
            <div
              key={i}
              style={{
                width: isActive ? 18 : 7,
                height: 7,
                borderRadius: 4,
                background: isActive ? "#FFF" : "rgba(255,255,255,0.4)",
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export const Scene3_Mockup: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cfg = SCENE3_CONFIG;

  const sceneOpacity = interpolate(
    frame,
    [0, 30, cfg.duration - 30, cfg.duration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const headlineOp = interpolate(frame, [15, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const headlineY = spring({
    frame: frame - 15,
    fps,
    config: { damping: 22, stiffness: 80 },
    from: -30,
    to: 0,
  });
  const phoneOp = interpolate(frame, [40, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const phoneY = spring({
    frame: frame - 40,
    fps,
    config: { damping: 20, stiffness: 60, mass: 1.3 },
    from: 100,
    to: 0,
  });
  const phoneScale = spring({
    frame: frame - 40,
    fps,
    config: { damping: 22, stiffness: 75 },
    from: 0.88,
    to: 1,
  });
  const float = Math.sin(frame * 0.018) * 8;
  const captionOp = interpolate(frame, [160, 200], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const PHONE_HEIGHT = 1400;
  const PHONE_WIDTH = Math.round(PHONE_HEIGHT / 2.16);

  return (
    <AbsoluteFill
      style={{
        background: THEME.colors.bg,
        overflow: "hidden",
        opacity: sceneOpacity,
      }}
    >
      <NoiseOverlay />
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(234,179,8,0.05) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />
      <SceneBranding />

      <AbsoluteFill
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: 100,
        }}
      >
        <div
          style={{
            opacity: headlineOp,
            transform: `translateY(${headlineY}px)`,
            textAlign: "center",
            marginBottom: 40,
            paddingInline: 60,
          }}
        >
          {cfg.headline.split("\n").map((line, i) => (
            <div
              key={i}
              style={{
                fontFamily: THEME.fonts.display,
                fontSize: 58,
                fontWeight: 900,
                color: THEME.colors.primary,
                letterSpacing: -2,
                lineHeight: 1.1,
              }}
            >
              {line}
            </div>
          ))}
        </div>

        <div
          style={{
            opacity: phoneOp,
            transform: `translateY(${phoneY + float}px) scale(${phoneScale})`,
          }}
        >
          <div
            style={{
              width: PHONE_WIDTH,
              height: PHONE_HEIGHT,
              background: "#111",
              borderRadius: PHONE_WIDTH * 0.1,
              border: "3px solid #2A2A2A",
              position: "relative",
              filter: "drop-shadow(0 60px 120px rgba(0,0,0,0.2))",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 18,
                left: "50%",
                transform: "translateX(-50%)",
                width: PHONE_WIDTH * 0.32,
                height: 34,
                background: "#000",
                borderRadius: 20,
                zIndex: 10,
              }}
            />
            <div
              style={{
                position: "absolute",
                right: -4,
                top: 140,
                width: 4,
                height: 80,
                background: "#222",
                borderRadius: "0 3px 3px 0",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: -4,
                top: 120,
                width: 4,
                height: 55,
                background: "#222",
                borderRadius: "3px 0 0 3px",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: -4,
                top: 190,
                width: 4,
                height: 55,
                background: "#222",
                borderRadius: "3px 0 0 3px",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 4,
                borderRadius: PHONE_WIDTH * 0.09,
                overflow: "hidden",
                background: "#FFF",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "18px 28px 6px",
                  background: "#FFF",
                  position: "relative",
                  zIndex: 5,
                }}
              >
                <div
                  style={{
                    fontFamily: THEME.fonts.body,
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#000",
                  }}
                >
                  {cfg.phone.statusBarTime}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "#000",
                    display: "flex",
                    gap: 5,
                  }}
                >
                  <span>•••</span>
                  <span>WiFi</span>
                  <span>▮</span>
                </div>
              </div>
              <div style={{ height: "calc(100% - 52px)", overflow: "hidden" }}>
                <PhoneScreenContent config={cfg.media} frame={frame} />
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                inset: 4,
                borderRadius: PHONE_WIDTH * 0.09,
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 45%)",
                pointerEvents: "none",
                zIndex: 20,
              }}
            />
          </div>
        </div>
      </AbsoluteFill>

      {cfg.caption && (
        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: 0,
            right: 0,
            textAlign: "center",
            opacity: captionOp,
          }}
        >
          <div
            style={{
              fontFamily: THEME.fonts.body,
              fontSize: 24,
              fontWeight: 600,
              color: THEME.colors.secondary,
              letterSpacing: -0.3,
            }}
          >
            {cfg.caption}
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
