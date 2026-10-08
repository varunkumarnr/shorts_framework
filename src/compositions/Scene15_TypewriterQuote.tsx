import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SCENE15_TYPEWRITER_QUOTE_CONFIG } from "../data/config";

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const Caret: React.FC<{ red?: boolean; visible: boolean; height: number }> = ({
  red = false,
  visible,
  height,
}) => (
  <span
    style={{
      display: "inline-block",
      width: 6,
      height,
      marginLeft: 13,
      verticalAlign: -Math.round(height * 0.12),
      borderRadius: 2,
      background: red ? "#FF3B30" : "#FFFFFF",
      boxShadow: red
        ? "0 0 20px rgba(255,59,48,0.72)"
        : "0 2px 12px rgba(0,0,0,0.65)",
      opacity: visible ? 1 : 0,
    }}
  />
);

export const Scene15_TypewriterQuote: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cfg = SCENE15_TYPEWRITER_QUOTE_CONFIG;
  const line1End = cfg.line1.length;
  const line2Start = line1End + 5;
  const line2End = line2Start + cfg.line2.length;
  const line3Start = line2End + 7;
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
  const blink = finished ? Math.floor((frame - cfg.typeStartFrame) / 17) % 2 === 0 : true;
  const lastLineStartFrame =
    cfg.typeStartFrame + line3Start * cfg.framesPerCharacter;
  const finalImpact = spring({
    frame: frame - lastLineStartFrame,
    fps,
    config: { damping: 13, stiffness: 190, mass: 0.5 },
  });
  const opacity = interpolate(
    frame,
    [0, 8, cfg.duration - 18, cfg.duration],
    [0, 1, 1, 0],
    clamp,
  );
  const keyStrike =
    finished || frame < cfg.typeStartFrame
      ? 0
      : frame % cfg.framesPerCharacter === 0
        ? -1.6
        : 0;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "transparent",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        opacity,
      }}
    >
      <div
        style={{
          width: 1580,
          transform: `translateY(${keyStrike}px)`,
          fontFamily:
            "Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
          textAlign: "left",
          textShadow: "0 5px 24px rgba(0,0,0,0.96)",
        }}
      >
        <div
          style={{
            height: 90,
            color: "rgba(255,255,255,0.82)",
            fontSize: 54,
            fontWeight: 750,
            letterSpacing: -2.4,
            lineHeight: 1.2,
          }}
        >
          {line1}
          {activeLine === 1 && <Caret visible={blink} height={55} />}
        </div>

        <div
          style={{
            height: 132,
            color: "#FFFFFF",
            fontSize: 104,
            fontWeight: 900,
            letterSpacing: -6,
            lineHeight: 1,
          }}
        >
          {line2}
          {activeLine === 2 && <Caret visible={blink} height={98} />}
        </div>

        <div
          style={{
            height: 146,
            color: cfg.accentColor,
            fontSize: 116,
            fontWeight: 950,
            letterSpacing: -7,
            lineHeight: 1,
            transform: `translateX(${(1 - finalImpact) * 24}px) scale(${
              0.97 + finalImpact * 0.03
            })`,
            transformOrigin: "left center",
            textShadow: "0 6px 18px rgba(0,0,0,0.9)",
          }}
        >
          {line3}
          {activeLine === 3 && <Caret red visible={blink} height={108} />}
        </div>
      </div>
    </AbsoluteFill>
  );
};
