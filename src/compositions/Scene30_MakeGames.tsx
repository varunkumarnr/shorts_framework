import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { SCENE30_MAKE_GAMES_CONFIG } from "../data/config";
import { THEME } from "../data/theme";

const cfg = SCENE30_MAKE_GAMES_CONFIG;
const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export const Scene30_MakeGames: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [0, 8, cfg.duration - 10, cfg.duration - 1],
    [0, 1, 1, 0],
    clamp,
  );

  return (
    <AbsoluteFill style={{ background: "#000", overflow: "hidden" }}>
      <OffthreadVideo
        src={staticFile(cfg.video)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "brightness(0.48) saturate(0.72) contrast(1.08)",
        }}
      />
      <AbsoluteFill style={{ background: "rgba(4, 7, 10, 0.14)" }} />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            color: cfg.textColor,
            fontFamily: THEME.fonts.display,
            fontSize: 174,
            fontWeight: 500,
            letterSpacing: -7,
            lineHeight: 1,
            opacity,
          }}
        >
          {cfg.text}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
