import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { SCENE31_BUILT_PIXELPICKED_CONFIG } from "../data/config";
import { THEME } from "../data/theme";

const cfg = SCENE31_BUILT_PIXELPICKED_CONFIG;
const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export const Scene31_BuiltPixelPicked: React.FC = () => {
  const frame = useCurrentFrame();
  const ease = Easing.bezier(0.22, 1, 0.36, 1);
  const introOpacity = interpolate(frame, [2, 12], [0, 1], clamp);
  const introY = interpolate(frame, [2, 14], [15, 0], {
    ...clamp,
    easing: ease,
  });
  const ruleWidth = interpolate(frame, [10, 25], [0, 850], {
    ...clamp,
    easing: ease,
  });
  const reveal = interpolate(frame, [18, 35], [100, 0], {
    ...clamp,
    easing: ease,
  });
  const brandY = interpolate(frame, [18, 35], [48, 0], {
    ...clamp,
    easing: ease,
  });
  const tracking = interpolate(frame, [18, 38], [2, -7], {
    ...clamp,
    easing: ease,
  });
  const exit = interpolate(frame, [51, 59], [1, 0], clamp);

  return (
    <AbsoluteFill
      style={{
        background: "#0B0C0E",
        alignItems: "center",
        justifyContent: "center",
        color: "#F1EEE8",
        fontFamily: THEME.fonts.display,
        opacity: exit,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: "translateY(-12px)",
        }}
      >
        <div
          style={{
            fontSize: 43,
            fontWeight: 520,
            letterSpacing: -1.6,
            opacity: introOpacity,
            transform: `translateY(${introY}px)`,
          }}
        >
          {cfg.fixed.trim()}
        </div>

        <div
          style={{
            width: ruleWidth,
            height: 2,
            marginTop: 22,
            background: "rgba(241, 238, 232, 0.72)",
          }}
        />

        <div
          style={{
            height: 150,
            marginTop: 8,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              fontSize: 148,
              fontWeight: 680,
              lineHeight: 1,
              letterSpacing: tracking,
              transform: `translateY(${brandY}px)`,
              clipPath: `inset(${reveal}% 0 0 0)`,
              whiteSpace: "nowrap",
            }}
          >
            {cfg.typed}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
