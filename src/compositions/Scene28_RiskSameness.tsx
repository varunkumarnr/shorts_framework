import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { SCENE28_RISK_SAMENESS_CONFIG } from "../data/config";
import { THEME } from "../data/theme";
import { TypingTicks } from "./Scene18_ReenvisioningFlip";

const cfg = SCENE28_RISK_SAMENESS_CONFIG;
const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export const Scene28_RiskSameness: React.FC = () => {
  const frame = useCurrentFrame();
  const fixedOpacity = interpolate(frame, [0, 8], [0, 1], clamp);
  const exit = interpolate(frame, [cfg.duration - 18, cfg.duration], [1, 0], clamp);
  const characters = Math.max(
    0,
    Math.floor((frame - cfg.typeStartFrame) / cfg.framesPerCharacter),
  );
  const typed = cfg.typed.slice(0, characters);

  return (
    <AbsoluteFill
      style={{
        background: "#0B0C0E",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: THEME.fonts.display,
        color: "#F1EEE8",
        opacity: exit,
      }}
    >
      <div style={{ width: 1640, textAlign: "center" }}>
        <div
          style={{
            fontSize: 92,
            fontWeight: 650,
            lineHeight: 1.04,
            letterSpacing: -5,
            opacity: fixedOpacity,
          }}
        >
          {cfg.fixed}
        </div>
        <div
          style={{
            position: "relative",
            minHeight: 110,
            marginTop: 24,
            fontSize: 92,
            fontWeight: 650,
            lineHeight: 1.04,
            letterSpacing: -5,
          }}
        >
          <span style={{ visibility: "hidden" }}>{cfg.typed}</span>
          <span style={{ position: "absolute", inset: 0 }}>{typed}</span>
        </div>
      </div>
      <TypingTicks
        text={cfg.typed}
        start={cfg.typeStartFrame}
        framesPerCharacter={cfg.framesPerCharacter}
      />
    </AbsoluteFill>
  );
};
