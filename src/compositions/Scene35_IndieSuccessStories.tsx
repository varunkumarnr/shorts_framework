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
import { SCENE35_INDIE_SUCCESS_STORIES_CONFIG as CONFIG } from "../data/config";
import { THEME } from "../data/theme";

const Trailer: React.FC<{ src: string; startFrom: number; foreground?: boolean }> = ({
  src,
  startFrom,
  foreground = false,
}) => (
  <OffthreadVideo
    src={staticFile(src)}
    startFrom={startFrom}
    muted
    style={
      foreground
        ? {
            position: "absolute",
            left: 0,
            top: 500,
            width: 1080,
            height: 810,
            objectFit: "contain",
            background: "#000",
            boxShadow: "0 28px 90px rgba(0,0,0,.7)",
          }
        : {
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "blur(44px) brightness(.32) saturate(1.15)",
            transform: "scale(1.24)",
          }
    }
  />
);

const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const reveal = spring({ frame, fps, config: { damping: 14, stiffness: 135 } });
  const second = spring({ frame: frame - 9, fps, config: { damping: 14, stiffness: 135 } });

  return (
    <AbsoluteFill style={{ background: "#000", overflow: "hidden" }}>
      <OffthreadVideo
        src={staticFile(CONFIG.hook.video)}
        startFrom={CONFIG.hook.startSeconds * fps}
        muted
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <AbsoluteFill style={{ background: "linear-gradient(180deg,rgba(0,0,0,.32),rgba(0,0,0,.08) 40%,rgba(0,0,0,.7))" }} />
      <div
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          top: "50%",
          transform: "translateY(-50%)",
          textAlign: "center",
          fontFamily: THEME.fonts.display,
          color: "white",
        }}
      >
        <div
          style={{
            display: "inline-block",
            background: "rgba(0,0,0,.76)",
            border: "2px solid rgba(255,255,255,.45)",
            borderRadius: 999,
            padding: "11px 21px",
            marginBottom: 20,
            fontSize: 25,
            fontWeight: 900,
            letterSpacing: 2.6,
            opacity: interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          {CONFIG.hook.kicker}
        </div>
        <div
          style={{
            fontSize: 96,
            fontWeight: 950,
            lineHeight: 0.92,
            letterSpacing: -4,
            textShadow: "0 8px 30px rgba(0,0,0,.95)",
            transform: `translateY(${interpolate(reveal, [0, 1], [65, 0])}px) scale(${interpolate(reveal, [0, 1], [.84, 1])})`,
            opacity: reveal,
          }}
        >
          {CONFIG.hook.lines[0]}
        </div>
        <div
          style={{
            marginTop: 13,
            color: CONFIG.accentColor,
            fontSize: 102,
            fontWeight: 950,
            lineHeight: 0.9,
            letterSpacing: -5,
            WebkitTextStroke: "3px #0a0a0a",
            textShadow: "0 8px 30px rgba(0,0,0,.95)",
            transform: `translateY(${interpolate(second, [0, 1], [65, 0])}px) scale(${interpolate(second, [0, 1], [.84, 1])})`,
            opacity: second,
          }}
        >
          {CONFIG.hook.lines[1]}
        </div>
      </div>
      <SceneBranding light />
    </AbsoluteFill>
  );
};

const SuccessGame: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const game = CONFIG.games[index];
  const half = Math.floor(game.duration / 2);
  const secondCut = frame >= half;
  const localFrame = secondCut ? frame - half : frame;
  const selectedStart = game.cuts[secondCut ? 1 : 0] * fps;
  const videoStart = selectedStart - (secondCut ? half : 0);
  const entrance = spring({ frame, fps, config: { damping: 16, stiffness: 145 } });
  const resultEntrance = spring({ frame: frame - 10, fps, config: { damping: 15, stiffness: 150 } });
  const flash = interpolate(localFrame, [0, 5, 11], [.78, .14, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitOpacity = interpolate(frame, [game.duration - 9, game.duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: "#040404", overflow: "hidden", opacity: exitOpacity }}>
      <Trailer src={game.video} startFrom={videoStart} />
      <Trailer src={game.video} startFrom={videoStart} foreground />
      <AbsoluteFill style={{ background: "linear-gradient(180deg,rgba(0,0,0,.91),rgba(0,0,0,.62) 29%,transparent 49%,transparent 72%,rgba(0,0,0,.84))" }} />
      <div
        style={{
          position: "absolute",
          top: 92,
          left: 48,
          right: 48,
          textAlign: "center",
          fontFamily: THEME.fonts.display,
          transform: `translateY(${interpolate(entrance, [0, 1], [-45, 0])}px)`,
          opacity: entrance,
        }}
      >
        <div
          style={{
            color: CONFIG.accentColor,
            fontSize: game.name.length > 17 ? 72 : 86,
            fontWeight: 950,
            lineHeight: .96,
            letterSpacing: -2.5,
            WebkitTextStroke: "3px #080808",
            textShadow: "0 8px 24px rgba(0,0,0,.95)",
          }}
        >
          {game.name}
        </div>
        <div style={{ marginTop: 22, display: "flex", alignItems: "center", justifyContent: "center", gap: 18 }}>
          <span style={{ color: "white", fontSize: 39, fontWeight: 900, textShadow: "0 6px 18px #000" }}>{game.start}</span>
          <span style={{ color: CONFIG.accentColor, fontSize: 52, fontWeight: 950 }}>→</span>
          <span
            style={{
              color: CONFIG.resultColor,
              fontSize: game.result.length > 19 ? 38 : 43,
              fontWeight: 950,
              textShadow: "0 6px 18px #000",
              transform: `scale(${interpolate(resultEntrance, [0, 1], [.72, 1])})`,
              opacity: resultEntrance,
            }}
          >
            {game.result}
          </span>
        </div>
      </div>

      <div style={{ position: "absolute", left: 76, right: 76, bottom: 150, display: "flex", gap: 12 }}>
        {CONFIG.games.map((item, itemIndex) => (
          <div
            key={item.name}
            style={{
              height: 6,
              flex: 1,
              borderRadius: 99,
              background: itemIndex <= index ? CONFIG.accentColor : "rgba(255,255,255,.24)",
              boxShadow: itemIndex === index ? `0 0 18px ${CONFIG.accentColor}` : undefined,
            }}
          />
        ))}
      </div>
      <AbsoluteFill style={{ background: "white", opacity: flash, pointerEvents: "none" }} />
      <SceneBranding light />
    </AbsoluteFill>
  );
};

export const Scene35_IndieSuccessStories: React.FC = () => {
  let cursor = CONFIG.hook.duration;
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Audio
        src={staticFile(CONFIG.music)}
        startFrom={CONFIG.musicStartSeconds * CONFIG.canvas.fps}
        volume={(frame) =>
          CONFIG.musicVolume *
          interpolate(frame, [0, 18, CONFIG.duration - 30, CONFIG.duration], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
      />
      <Sequence durationInFrames={CONFIG.hook.duration}>
        <Hook />
      </Sequence>
      {CONFIG.games.map((game, index) => {
        const from = cursor;
        cursor += game.duration;
        return (
          <Sequence key={game.name} from={from} durationInFrames={game.duration}>
            <SuccessGame index={index} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
