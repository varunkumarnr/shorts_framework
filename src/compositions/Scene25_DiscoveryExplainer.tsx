import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { SCENE25_DISCOVERY_EXPLAINER_CONFIG } from "../data/config";
import { THEME } from "../data/theme";
import { TypingTicks } from "./Scene18_ReenvisioningFlip";

const cfg = SCENE25_DISCOVERY_EXPLAINER_CONFIG;
const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const CopyBeat: React.FC<{
  fixed: string;
  typed: string;
  duration: number;
}> = ({ fixed, typed, duration }) => {
  const frame = useCurrentFrame();
  const fixedOpacity = interpolate(frame, [0, 8], [0, 1], clamp);
  const exit = interpolate(frame, [duration - 20, duration], [1, 0], clamp);
  const characters = Math.max(
    0,
    Math.floor((frame - cfg.typeStartFrame) / cfg.framesPerCharacter),
  );
  const visibleTyped = typed.slice(0, characters);

  return (
    <AbsoluteFill style={{ opacity: exit }}>
      <div
        style={{
          position: "absolute",
          left: 116,
          top: 0,
          bottom: 0,
          width: 790,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          fontFamily: THEME.fonts.display,
          color: "#F1EEE8",
        }}
      >
        <div
          style={{
            fontSize: 86,
            lineHeight: 1.02,
            fontWeight: 650,
            letterSpacing: -4.8,
            opacity: fixedOpacity,
          }}
        >
          {fixed}
        </div>
        <div
          style={{
            position: "relative",
            marginTop: 18,
            minHeight: 190,
            fontSize: 86,
            lineHeight: 1.02,
            fontWeight: 650,
            letterSpacing: -4.8,
            color: "#A7ABA8",
          }}
        >
          <span style={{ visibility: "hidden" }}>{typed}</span>
          <span style={{ position: "absolute", inset: 0 }}>{visibleTyped}</span>
        </div>
      </div>
      <TypingTicks
        text={typed}
        start={cfg.typeStartFrame}
        framesPerCharacter={cfg.framesPerCharacter}
      />
    </AbsoluteFill>
  );
};

export const Scene25_DiscoveryExplainer: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <OffthreadVideo
      src={staticFile(cfg.video)}
      muted
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
    {cfg.beats.map((beat, index) => (
      <Sequence
        key={beat.fixed}
        from={index * cfg.beatDuration}
        durationInFrames={cfg.beatDuration}
        premountFor={18}
      >
        <CopyBeat fixed={beat.fixed} typed={beat.typed} duration={cfg.beatDuration} />
      </Sequence>
    ))}
  </AbsoluteFill>
);
