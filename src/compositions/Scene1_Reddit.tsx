import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SCENE1_CONFIG } from "../data/config";
import { BgVideo, SceneBranding } from "../components/shared";

const CARD_HOLD_FRAMES = 350;

export const Scene1_Reddit: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cfg = SCENE1_CONFIG;

  const ENTER_START = 10;

  const cardOpacity = interpolate(
    frame,
    [ENTER_START, ENTER_START + 20],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  const cardY = spring({
    frame: frame - ENTER_START,
    fps,
    config: { damping: 18, stiffness: 120, mass: 0.8 },
    from: 60,
    to: 0,
  });
  const cardScale = spring({
    frame: frame - ENTER_START,
    fps,
    config: { damping: 16, stiffness: 140 },
    from: 0.95,
    to: 1,
  });

  const EXIT_START = ENTER_START + CARD_HOLD_FRAMES;
  const EXIT_END = EXIT_START + 22;
  const cardExitOpacity = interpolate(frame, [EXIT_START, EXIT_END], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cardExitY = interpolate(frame, [EXIT_START, EXIT_END], [0, 40], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const combinedOpacity = Math.min(cardOpacity, cardExitOpacity);
  const combinedY = cardY + cardExitY;

  const { title } = cfg.reddit;

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <BgVideo
        src={cfg.backgroundVideo}
        startFrom={cfg.backgroundVideoStartFrom}
        endScale={cfg.backgroundVideoPushScale}
        opacity={1}
      />

      {/* Standard top-right branding from Scene 2 */}
      <SceneBranding light />

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          opacity: combinedOpacity,
          transform: `translateY(${combinedY}px) scale(${cardScale})`,
        }}
      >
        <div
          style={{
            width: "92%", // Takes up almost the entire screen width like the reference
            maxWidth: "1000px",
            background: "#000000",
            borderRadius: "32px",
            padding: "48px 52px",
            display: "flex",
            flexDirection: "column",
            gap: "36px",
            // Forces clean, extremely heavy native system fonts
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          }}
        >
          {/* Header Row */}
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            {/* Standard Reddit Logo */}
            <svg
              width="88"
              height="88"
              viewBox="0 0 20 20"
              style={{ flexShrink: 0 }}
            >
              <circle cx="10" cy="10" r="10" fill="#FF4500" />
              <path
                fill="#FFF"
                d="M14.07 10.31c.21 0 .42-.04.62-.12a1.69 1.69 0 00-1.12-2.9 1.7 1.7 0 00-1.13.43c-1.07-.63-2.42-1.01-3.9-1.06l.83-3.92 2.73.58c.03.88.75 1.58 1.63 1.58.91 0 1.65-.74 1.65-1.65 0-.91-.74-1.65-1.65-1.65-.7 0-1.3.44-1.54 1.05l-3.05-.65c-.09-.02-.19.03-.22.13L7.96 6.6C6.46 6.66 5.09 7.05 4.01 7.69c-.31-.32-.73-.5-1.17-.5-.91 0-1.65.74-1.65 1.65 0 .68.41 1.27.99 1.51-.05.21-.08.43-.08.66 0 2.37 3.32 4.29 7.4 4.29s7.4-1.92 7.4-4.29c0-.25-.03-.49-.09-.72h.26zm-7.65 1.83c.72 0 1.3.58 1.3 1.3 0 .72-.58 1.3-1.3 1.3-.72 0-1.3-.58-1.3-1.3 0-.72.58-1.3 1.3-1.3zm6.66 0c.72 0 1.3.58 1.3 1.3 0 .72-.58 1.3-1.3 1.3-.72 0-1.3-.58-1.3-1.3 0-.72.58-1.3 1.3-1.3zm-3.33 3.63c-1.39 0-2.61-.41-3.23-1.05l.59-.62c.48.51 1.52.87 2.64.87 1.13 0 2.16-.36 2.64-.87l.59.62c-.62.64-1.84 1.05-3.23 1.05z"
              />
            </svg>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "2px" }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <span
                  style={{
                    color: "#FFFFFF",
                    fontSize: "48px",
                    fontWeight: 900,
                    letterSpacing: "-1px",
                    lineHeight: 1,
                  }}
                >
                  @PixelPicked
                </span>
                {/* Verified Badge */}
                <svg width="36" height="36" viewBox="0 0 24 24" fill="#1D9BF0">
                  <path d="M12 2l2.64 1.25 2.8-.57 1.36 2.53 2.76 1.05-.24 2.94 1.95 2.21-1.43 2.51.84 2.83-2.4 1.7-.38 2.92-2.83.6-1.57 2.4-2.88-.41L12 22l-2.64-1.25-2.8.57-1.36-2.53-2.76-1.05.24-2.94-1.95-2.21 1.43-2.51-.84-2.83 2.4-1.7.38-2.92 2.83-.6 1.57-2.4 2.88.41L12 2z" />
                  <path
                    fill="#FFF"
                    d="M10 16.4l-4.2-4.2 1.4-1.4 2.8 2.8 6.8-6.8 1.4 1.4z"
                  />
                </svg>
              </div>
              <div style={{ fontSize: "32px", marginTop: "4px" }}>
                🥳👻🚀☁️❤️🤖🧡🎉
              </div>
            </div>
          </div>

          {/* Massively Bold Title */}
          <div
            style={{
              fontSize: "64px",
              fontWeight: 900,
              color: "#FFFFFF",
              lineHeight: 1.15,
              letterSpacing: "-1.5px", // Tightens up the font drastically
            }}
          >
            {title}
          </div>

          {/* Footer Stats Row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "48px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                color: "#FFFFFF",
                fontSize: "26px",
                fontWeight: 800,
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="#FFFFFF">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              99+
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                color: "#FFFFFF",
                fontSize: "26px",
                fontWeight: 800,
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="#FFFFFF">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2z" />
              </svg>
              99+
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
