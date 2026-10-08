import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { SCENE23_USED_BY_CONFIG } from "../data/config";
import { THEME } from "../data/theme";
import { TypingTicks } from "./Scene18_ReenvisioningFlip";

const cfg = SCENE23_USED_BY_CONFIG;
const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const SwitchingWord: React.FC<{
  word: string;
  start: number;
  duration: number;
}> = ({ word, start, duration }) => {
  const frame = useCurrentFrame();
  const local = frame - start;
  const typedCharacters = Math.max(0, Math.floor(local / 3));
  const typed = word.slice(0, typedCharacters);
  const visible = local >= 0 && local < duration;
  const exitOpacity = interpolate(local, [duration - 7, duration], [1, 0], clamp);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: visible ? exitOpacity : 0,
        fontSize: 112,
        fontWeight: 650,
        letterSpacing: -5.5,
        color: "#F1EEE8",
      }}
    >
      {typed}
    </div>
  );
};

export const Scene23_UsedBy: React.FC = () => {
  const frame = useCurrentFrame();
  const prefixOpacity = interpolate(frame, [0, 8], [0, 1], clamp);
  const exit = interpolate(frame, [cfg.duration - 18, cfg.duration], [1, 0], clamp);

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
      <div style={{ textAlign: "center", transform: "translateY(-28px)" }}>
        <div
          style={{
            fontSize: 74,
            lineHeight: 1,
            fontWeight: 520,
            letterSpacing: -3.4,
            color: "#A6AAA7",
            opacity: prefixOpacity,
          }}
        >
          {cfg.prefix}
        </div>
        <div
          style={{
            position: "relative",
            width: 1200,
            height: 150,
            marginTop: 28,
            overflow: "hidden",
          }}
        >
          {cfg.audiences.map((word, index) => (
            <React.Fragment key={word}>
              <SwitchingWord
                word={word}
                start={cfg.firstWordFrame + index * cfg.wordDuration}
                duration={cfg.wordDuration}
              />
              <TypingTicks
                text={word}
                start={cfg.firstWordFrame + index * cfg.wordDuration}
                framesPerCharacter={3}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
