import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  OffthreadVideo,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SceneBranding } from "../components/shared";
import { SCENE33_BEST_GAMES_BY_YEAR_CONFIG } from "../data/config";
import { THEME } from "../data/theme";

export interface BestGamesByYearConfig {
  canvas: { width: number; height: number; fps: number };
  accentColor: string;
  hook: {
    video: string;
    startSeconds: number;
    duration: number;
    eyebrow: string;
    lines: string[];
  };
  games: Array<{
    year: string;
    name: string;
    award?: string;
    video: string;
    duration: number;
    cuts: number[];
  }>;
  music: string;
  musicStartSeconds: number;
  musicVolume: number;
  duration: number;
}

export interface BestGamesByYearProps extends Record<string, unknown> {
  config?: BestGamesByYearConfig;
}

const MediaLayer: React.FC<{
  src: string;
  startFrom: number;
  muted?: boolean;
  foreground?: boolean;
}> = ({ src, startFrom, muted = true, foreground = false }) => (
  <OffthreadVideo
    src={staticFile(src)}
    startFrom={startFrom}
    muted={muted}
    style={
      foreground
        ? {
            position: "absolute",
            left: 0,
            top: 495,
            width: 1080,
            height: 810,
            objectFit: "contain",
            background: "#000",
            boxShadow: "0 30px 90px rgba(0,0,0,.65)",
          }
        : {
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "blur(42px) brightness(.34) saturate(1.15)",
            transform: "scale(1.22)",
          }
    }
  />
);

const Hook: React.FC<{ config: BestGamesByYearConfig }> = ({ config }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cfg = config.hook;
  const reveal = spring({ frame, fps, config: { damping: 14, stiffness: 130 } });
  const line2 = spring({ frame: frame - 10, fps, config: { damping: 14, stiffness: 130 } });

  return (
    <AbsoluteFill style={{ background: "#000", overflow: "hidden" }}>
      <OffthreadVideo
        src={staticFile(cfg.video)}
        startFrom={cfg.startSeconds * fps}
        muted
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg,rgba(0,0,0,.20) 0%,rgba(0,0,0,.04) 38%,rgba(0,0,0,.74) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 62,
          right: 62,
          top: "50%",
          fontFamily: THEME.fonts.display,
          textAlign: "center",
          color: "white",
          textShadow: "0 8px 30px rgba(0,0,0,.9)",
          transform: "translateY(-50%)",
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "12px 22px",
            marginBottom: 22,
            borderRadius: 999,
            background: "rgba(0,0,0,.68)",
            border: "2px solid rgba(255,255,255,.42)",
            fontSize: 27,
            fontWeight: 800,
            letterSpacing: 3,
            opacity: interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          {cfg.eyebrow}
        </div>
        <div
          style={{
            fontSize: 102,
            fontWeight: 950,
            lineHeight: 0.89,
            letterSpacing: -6,
            transform: `translateY(${interpolate(reveal, [0, 1], [70, 0])}px) scale(${interpolate(reveal, [0, 1], [.84, 1])})`,
            opacity: reveal,
          }}
        >
          {cfg.lines[0]}
        </div>
        <div
          style={{
            marginTop: 12,
            color: config.accentColor,
            fontSize: 102,
            fontWeight: 950,
            lineHeight: 0.89,
            letterSpacing: -6,
            WebkitTextStroke: "3px #111",
            transform: `translateY(${interpolate(line2, [0, 1], [70, 0])}px) scale(${interpolate(line2, [0, 1], [.84, 1])})`,
            opacity: line2,
          }}
        >
          {cfg.lines[1]}
        </div>
      </div>
      <SceneBranding light />
    </AbsoluteFill>
  );
};

const GameBeat: React.FC<{ gameIndex: number; config: BestGamesByYearConfig }> = ({
  gameIndex,
  config,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const game = config.games[gameIndex];
  const half = Math.floor(game.duration / 2);
  const isSecondCut = frame >= half;
  const localFrame = isSecondCut ? frame - half : frame;
  const selectedStart = game.cuts[isSecondCut ? 1 : 0] * fps;
  const videoStart = selectedStart - (isSecondCut ? half : 0);
  const entrance = spring({ frame, fps, config: { damping: 16, stiffness: 150 } });
  const flash = interpolate(localFrame, [0, 5, 11], [0.86, 0.18, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exit = interpolate(frame, [game.duration - 10, game.duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: "#050505", overflow: "hidden", opacity: exit }}>
      <MediaLayer src={game.video} startFrom={videoStart} />
      <MediaLayer src={game.video} startFrom={videoStart} foreground />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg,rgba(0,0,0,.86) 0%,rgba(0,0,0,.54) 25%,transparent 46%,transparent 70%,rgba(0,0,0,.78) 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 96,
          left: 62,
          right: 62,
          textAlign: "center",
          fontFamily: THEME.fonts.display,
          transform: `translateY(${interpolate(entrance, [0, 1], [-44, 0])}px)`,
          opacity: entrance,
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 148,
            fontWeight: 950,
            lineHeight: 0.82,
            letterSpacing: -8,
            textShadow: "0 8px 28px rgba(0,0,0,.9)",
          }}
        >
          {game.year}
        </div>
        <div
          style={{
            color: config.accentColor,
            marginTop: 22,
            fontSize: game.name.length > 17 ? 70 : 88,
            fontWeight: 950,
            lineHeight: 0.95,
            letterSpacing: -3,
            WebkitTextStroke: "3px #080808",
            textShadow: "0 8px 22px rgba(0,0,0,.9)",
          }}
        >
          {game.name}
        </div>
        {game.award ? (
          <div
            style={{
              display: "inline-block",
              marginTop: 18,
              padding: "10px 20px 9px",
              borderRadius: 10,
              background: "rgba(0,0,0,.72)",
              border: `2px solid ${config.accentColor}`,
              color: "white",
              fontFamily: THEME.fonts.body,
              fontSize: 29,
              fontWeight: 900,
              letterSpacing: 2.2,
              textShadow: "0 4px 14px rgba(0,0,0,.9)",
            }}
          >
            {game.award}
          </div>
        ) : null}
      </div>

      <div
        style={{
          position: "absolute",
          left: 78,
          right: 78,
          bottom: 155,
          display: "flex",
          alignItems: "center",
          gap: 17,
        }}
      >
        {config.games.map((item, index) => (
          <React.Fragment key={item.year}>
            <div
              style={{
                fontFamily: THEME.fonts.body,
                color: index === gameIndex ? config.accentColor : "rgba(255,255,255,.45)",
                fontSize: 25,
                fontWeight: 800,
              }}
            >
              {item.year}
            </div>
            {index < config.games.length - 1 ? (
              <div style={{ height: 3, flex: 1, background: index < gameIndex ? config.accentColor : "rgba(255,255,255,.25)" }} />
            ) : null}
          </React.Fragment>
        ))}
      </div>

      <AbsoluteFill style={{ background: "white", opacity: flash, pointerEvents: "none" }} />
      <SceneBranding light />
    </AbsoluteFill>
  );
};

export const Scene33_BestGamesByYear: React.FC<BestGamesByYearProps> = ({
  config = SCENE33_BEST_GAMES_BY_YEAR_CONFIG,
}) => {
  let cursor = config.hook.duration;
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Audio
        src={staticFile(config.music)}
        startFrom={config.musicStartSeconds * config.canvas.fps}
        volume={(frame) =>
          config.musicVolume *
          interpolate(frame, [0, 18, config.duration - 30, config.duration], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
      />
      <Sequence durationInFrames={config.hook.duration}>
        <Hook config={config} />
      </Sequence>
      {config.games.map((game, index) => {
        const from = cursor;
        cursor += game.duration;
        return (
          <Sequence key={game.year} from={from} durationInFrames={game.duration}>
            <GameBeat gameIndex={index} config={config} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
