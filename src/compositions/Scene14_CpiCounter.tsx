import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SCENE14_CPI_COUNTER_CONFIG } from "../data/config";
import { THEME } from "../data/theme";

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export const Scene14_CpiCounter: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cfg = SCENE14_CPI_COUNTER_CONFIG;

  const progress = interpolate(
    frame,
    [cfg.countStartFrame, cfg.countEndFrame],
    [0, 1],
    { ...clamp, easing: Easing.in(Easing.exp) },
  );
  const value = interpolate(
    progress,
    [0, 1],
    [cfg.startValue, cfg.endValue],
    clamp,
  );
  const entrance = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 190, mass: 0.55 },
  });
  const danger = interpolate(progress, [0.62, 1], [0, 1], clamp);
  const peakPunch = spring({
    frame: frame - cfg.countEndFrame,
    fps,
    config: { damping: 8, stiffness: 250, mass: 0.35 },
  });
  const scale = 0.82 + entrance * 0.18 + peakPunch * 0.1;
  const shake =
    frame >= cfg.countEndFrame && frame < cfg.countEndFrame + 13
      ? Math.sin(frame * 2.8) * 5 * (1 - peakPunch * 0.55)
      : 0;
  const arrowHeight = interpolate(progress, [0.25, 1], [80, 370], clamp);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "transparent",
        alignItems: "center",
        justifyContent: "center",
        color: "#FFFFFF",
        fontFamily: THEME.fonts.display,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "relative",
          width: 1220,
          height: 650,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transform: `translateX(${shake}px) scale(${scale})`,
          opacity: entrance,
        }}
      >
        <div
          style={{
            fontSize: 38,
            fontWeight: 950,
            letterSpacing: 7,
            marginBottom: 38,
            textShadow: "0 4px 18px rgba(0,0,0,0.95)",
          }}
        >
          {cfg.label}
        </div>

        <div
          style={{
            minWidth: 690,
            textAlign: "center",
            fontSize: 210,
            fontWeight: 950,
            fontVariantNumeric: "tabular-nums",
            letterSpacing: -13,
            lineHeight: 0.9,
            color: danger > 0.5 ? cfg.accentColor : "#FFFFFF",
            WebkitTextStroke: "5px rgba(0,0,0,0.5)",
            paintOrder: "stroke fill",
            textShadow: `0 10px 28px rgba(0,0,0,0.92), 0 0 ${
              15 + danger * 65
            }px rgba(255,59,48,${0.22 + danger * 0.58})`,
          }}
        >
          ${value.toFixed(2)}
        </div>

        <div
          style={{
            position: "absolute",
            right: 34,
            bottom: 100,
            width: 74,
            height: arrowHeight,
            opacity: interpolate(progress, [0.12, 0.3], [0, 1], clamp),
            filter: `drop-shadow(0 0 22px ${cfg.accentColor})`,
          }}
        >
          <div
            style={{
              position: "absolute",
              right: 25,
              bottom: 0,
              width: 24,
              height: "100%",
              borderRadius: 20,
              background: cfg.accentColor,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: -4,
              left: 7,
              width: 58,
              height: 58,
              borderTop: `24px solid ${cfg.accentColor}`,
              borderLeft: `24px solid ${cfg.accentColor}`,
              transform: "rotate(45deg)",
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
