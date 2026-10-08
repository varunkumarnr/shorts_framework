import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { SCENE20_WAITLIST_GROWTH_CONFIG } from "../data/config";
import { THEME } from "../data/theme";

const cfg = SCENE20_WAITLIST_GROWTH_CONFIG;
const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export const Scene20_WaitlistGrowth: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [12, cfg.duration - 48], [0, 1], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const count = Math.round(
    interpolate(progress, [0, 1], [cfg.startCount, cfg.endCount]),
  );

  return (
    <AbsoluteFill
      style={{
        background: "#0B0D10",
        alignItems: "center",
        justifyContent: "center",
        color: "#F3F4F5",
        fontFamily: THEME.fonts.display,
      }}
    >
      <div
        style={{
          fontSize: 34,
          fontWeight: 650,
          letterSpacing: 8,
          marginBottom: 38,
          color: "#929AA5",
        }}
      >
        WAITLIST
      </div>
      <div
        style={{
          fontSize: 178,
          lineHeight: 1,
          fontWeight: 730,
          letterSpacing: -9,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {count.toLocaleString("en-US")}
      </div>
    </AbsoluteFill>
  );
};
