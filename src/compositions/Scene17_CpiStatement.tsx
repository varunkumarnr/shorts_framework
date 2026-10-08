import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SCENE17_CPI_STATEMENT_CONFIG } from "../data/config";
import { THEME } from "../data/theme";

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const Cursor: React.FC<{ red?: boolean; visible: boolean; height: number }> = ({
  red = false,
  visible,
  height,
}) => (
  <span
    style={{
      display: "inline-block",
      width: 5,
      height,
      marginLeft: 10,
      verticalAlign: -Math.round(height * 0.12),
      borderRadius: 2,
      background: red ? "#FF3B30" : "#FFFFFF",
      boxShadow: red ? "0 0 15px rgba(255,59,48,0.64)" : "none",
      opacity: visible ? 1 : 0,
    }}
  />
);

export const Scene17_CpiStatement: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cfg = SCENE17_CPI_STATEMENT_CONFIG;

  const countProgress = interpolate(
    frame,
    [cfg.counterStartFrame, cfg.counterEndFrame],
    [0, 1],
    { ...clamp, easing: Easing.in(Easing.exp) },
  );
  const value = interpolate(
    countProgress,
    [0, 1],
    [cfg.startValue, cfg.endValue],
    clamp,
  );
  const counterEntrance = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 180, mass: 0.55 },
  });
  const peak = spring({
    frame: frame - cfg.counterEndFrame,
    fps,
    config: { damping: 9, stiffness: 230, mass: 0.4 },
  });
  const danger = interpolate(countProgress, [0.52, 1], [0, 1], clamp);
  const arrowScale = interpolate(countProgress, [0.15, 1], [0.18, 1], clamp);

  const line1End = cfg.line1.length;
  const line2Start = line1End + 4;
  const line2End = line2Start + cfg.line2.length;
  const line3Start = line2End + 6;
  const line3End = line3Start + cfg.line3.length;
  const typed = Math.max(
    0,
    Math.floor((frame - cfg.typeStartFrame) / cfg.framesPerCharacter),
  );
  const line1 = cfg.line1.slice(0, Math.min(typed, line1End));
  const line2 = cfg.line2.slice(
    0,
    Math.max(0, Math.min(cfg.line2.length, typed - line2Start)),
  );
  const line3 = cfg.line3.slice(
    0,
    Math.max(0, Math.min(cfg.line3.length, typed - line3Start)),
  );
  const activeLine = typed < line2Start ? 1 : typed < line3Start ? 2 : 3;
  const finished = typed >= line3End;
  const blink = finished ? Math.floor(frame / 17) % 2 === 0 : true;
  const quoteEntrance = interpolate(frame, [8, 22], [0, 1], clamp);
  const finalLineFrame = cfg.typeStartFrame + line3Start * cfg.framesPerCharacter;
  const finalLineImpact = spring({
    frame: frame - finalLineFrame,
    fps,
    config: { damping: 13, stiffness: 190, mass: 0.48 },
  });
  const sceneOpacity = interpolate(
    frame,
    [0, 7, cfg.duration - 16, cfg.duration],
    [0, 1, 1, 0],
    clamp,
  );
  const strike =
    finished || frame < cfg.typeStartFrame
      ? 0
      : frame % cfg.framesPerCharacter === 0
        ? -1.2
        : 0;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "transparent",
        overflow: "hidden",
        opacity: sceneOpacity,
        fontFamily: THEME.fonts.display,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 110,
          top: 305,
          width: 520,
          opacity: counterEntrance,
          transform: `translateY(${(1 - counterEntrance) * 24}px) scale(${
            0.96 + counterEntrance * 0.04 + peak * 0.035
          })`,
          transformOrigin: "left center",
        }}
      >
        <div
          style={{
            color: "rgba(255,255,255,0.86)",
            fontSize: 29,
            fontWeight: 900,
            letterSpacing: 5,
            textShadow: "0 4px 16px rgba(0,0,0,0.92)",
          }}
        >
          COST PER INSTALL
        </div>
        <div
          style={{
            marginTop: 18,
            minWidth: 390,
            color: danger > 0.48 ? cfg.accentColor : "#FFFFFF",
            fontSize: 164,
            fontWeight: 950,
            fontVariantNumeric: "tabular-nums",
            letterSpacing: -10,
            lineHeight: 0.92,
            textShadow: "0 7px 20px rgba(0,0,0,0.94)",
          }}
        >
          ${value.toFixed(2)}
        </div>
        <div
          style={{
            position: "absolute",
            left: 402,
            bottom: -58,
            width: 110,
            height: 285,
            opacity: interpolate(countProgress, [0.1, 0.24], [0, 1], clamp),
            filter: "drop-shadow(0 0 15px rgba(255,59,48,0.7))",
            color: cfg.accentColor,
            fontSize: 275,
            fontWeight: 950,
            lineHeight: 1,
            textAlign: "center",
            transform: `scaleY(${arrowScale})`,
            transformOrigin: "bottom center",
          }}
        >
          ↑
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 730,
          top: 310,
          width: 1080,
          opacity: quoteEntrance,
          transform: `translateY(${strike}px)`,
          fontFamily:
            "Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
          textAlign: "left",
          textShadow: "0 5px 20px rgba(0,0,0,0.94)",
        }}
      >
        <div
          style={{
            height: 75,
            color: "rgba(255,255,255,0.78)",
            fontSize: 42,
            fontWeight: 750,
            letterSpacing: -1.8,
            lineHeight: 1.2,
          }}
        >
          {line1}
          {activeLine === 1 && <Cursor visible={blink} height={43} />}
        </div>
        <div
          style={{
            height: 105,
            color: "#FFFFFF",
            fontSize: 78,
            fontWeight: 900,
            letterSpacing: -4.5,
            lineHeight: 1,
          }}
        >
          {line2}
          {activeLine === 2 && <Cursor visible={blink} height={74} />}
        </div>
        <div
          style={{
            height: 120,
            color: cfg.accentColor,
            fontSize: 89,
            fontWeight: 950,
            letterSpacing: -5.5,
            lineHeight: 1,
            transform: `translateX(${(1 - finalLineImpact) * 18}px) scale(${
              0.975 + finalLineImpact * 0.025
            })`,
            transformOrigin: "left center",
          }}
        >
          {line3}
          {activeLine === 3 && <Cursor red visible={blink} height={84} />}
        </div>
      </div>
    </AbsoluteFill>
  );
};
