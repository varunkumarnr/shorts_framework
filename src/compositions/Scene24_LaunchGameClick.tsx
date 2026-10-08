import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { SCENE24_LAUNCH_GAME_CLICK_CONFIG } from "../data/config";
import { THEME } from "../data/theme";

const cfg = SCENE24_LAUNCH_GAME_CLICK_CONFIG;
const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export const Scene24_LaunchGameClick: React.FC = () => {
  const frame = useCurrentFrame();
  const move = interpolate(frame, [18, 65], [0, 1], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const cursorX = interpolate(move, [0, 1], [1250, 1070]);
  const cursorY = interpolate(move, [0, 1], [780, 575]);
  const cursorOpacity = interpolate(frame, [8, 18, 140, 158], [0, 1, 1, 0], clamp);
  const pressed = frame >= 68 && frame < 78;
  const launching = frame >= 78 && frame < 126;
  const launched = frame >= 126;
  const progress = interpolate(frame, [80, 124], [0, 1], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const ripple = interpolate(frame, [69, 101], [0, 1], clamp);
  const exit = interpolate(frame, [164, 179], [1, 0], clamp);

  return (
    <AbsoluteFill
      style={{
        background: "#0B0C0E",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: THEME.fonts.display,
        opacity: exit,
      }}
    >
      <div style={{ position: "relative" }}>
        {frame >= 69 && frame < 104 ? (
          <div
            style={{
              position: "absolute",
              inset: -30,
              border: "3px solid #F2EFE8",
              borderRadius: 26,
              opacity: (1 - ripple) * 0.55,
              transform: `scale(${0.86 + ripple * 0.28})`,
            }}
          />
        ) : null}
        <div
          style={{
            position: "relative",
            width: 520,
            height: 116,
            borderRadius: 20,
            background: "#F2EFE8",
            color: launched ? "#167453" : "#0B0C0E",
            border: "2px solid #F2EFE8",
            display: "grid",
            placeItems: "center",
            fontSize: 31,
            fontWeight: 780,
            letterSpacing: 1.6,
            transform: `scale(${pressed ? 0.96 : 1})`,
            overflow: "hidden",
          }}
        >
          {launching ? "LAUNCHING…" : launched ? "GAME LAUNCHED  ✓" : cfg.buttonLabel}
          {launching ? (
            <div
              style={{
                position: "absolute",
                left: 0,
                bottom: 0,
                height: 7,
                width: `${progress * 100}%`,
                background: "#50A982",
              }}
            />
          ) : null}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: cursorX,
          top: cursorY,
          opacity: cursorOpacity,
          transform: `scale(${pressed ? 0.88 : 1})`,
          transformOrigin: "top left",
          filter: "drop-shadow(0 4px 5px rgba(0,0,0,.5))",
        }}
      >
        <svg width="55" height="66" viewBox="0 0 48 58">
          <path d="M4 3v39l11-10 9 21 9-4-9-20h16L4 3Z" fill="#F7F4ED" stroke="#090A0B" strokeWidth="4" strokeLinejoin="round" />
        </svg>
      </div>
    </AbsoluteFill>
  );
};
