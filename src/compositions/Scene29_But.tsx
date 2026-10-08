import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { SCENE29_BUT_CONFIG } from "../data/config";
import { THEME } from "../data/theme";
import { TypingTicks } from "./Scene18_ReenvisioningFlip";

const cfg = SCENE29_BUT_CONFIG;
const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export const Scene29_But: React.FC = () => {
  const frame = useCurrentFrame();
  const characters = Math.max(
    0,
    Math.floor((frame - cfg.typeStartFrame) / cfg.framesPerCharacter),
  );
  const typed = cfg.text.slice(0, characters);
  const exit = interpolate(frame, [52, 59], [1, 0], clamp);

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
          position: "relative",
          fontSize: 112,
          fontWeight: 650,
          lineHeight: 1,
          letterSpacing: -5.5,
        }}
      >
        <span style={{ visibility: "hidden" }}>{cfg.text}</span>
        <span style={{ position: "absolute", inset: 0 }}>{typed}</span>
      </div>
      <TypingTicks
        text={cfg.text}
        start={cfg.typeStartFrame}
        framesPerCharacter={cfg.framesPerCharacter}
      />
    </AbsoluteFill>
  );
};
