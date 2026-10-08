import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  Img,
  OffthreadVideo,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {SceneBranding} from "../components/shared";
import {
  RankingReelConfig,
  SCENE39_FUNNY_GAMING_RANKING_CONFIG,
} from "../data/config";
import {THEME} from "../data/theme";

export type Scene39RankingReelProps = {config?: RankingReelConfig};

const Headline: React.FC<{config: RankingReelConfig}> = ({config}) => (
  <div style={{
    position: "absolute", top: 74, left: 34, right: 34, zIndex: 8,
    fontFamily: THEME.fonts.display, textAlign: "center", color: "#fff",
    fontWeight: 950, fontSize: 57, lineHeight: .91, letterSpacing: -1.7,
    textShadow: "0 5px 0 #000, 0 0 16px #000, 3px 3px 0 #000",
  }}>
    <div>{config.titleLines[0]}</div>
    <div style={{color: config.accentColor, marginTop: 4}}>{config.titleLines[1]}</div>
  </div>
);

const RankingBoard: React.FC<{config: RankingReelConfig; currentIndex: number}> = ({config, currentIndex}) => {
  const rows = [...config.items].reverse();
  const isLongList = config.items.length > 5;
  return <div style={{
    position: "absolute", zIndex: 9, left: 42, top: 300, width: 650,
    fontFamily: THEME.fonts.display, textShadow: "0 3px 0 #000, 0 0 11px #000",
  }}>
    {rows.map((row) => {
      const sourceIndex = config.items.findIndex((item) => item.rank === row.rank);
      const revealed = sourceIndex <= currentIndex;
      const current = sourceIndex === currentIndex;
      return <div key={row.rank} style={{
        display: "flex", alignItems: "center", minHeight: isLongList ? 45 : 55, gap: 10,
        transform: current ? "scale(1.025)" : undefined,
        transformOrigin: "left center",
      }}>
        <span style={{width: 51, color: current ? config.accentColor : "#fff", fontSize: isLongList ? 34 : 39, fontWeight: 950}}>{row.rank}.</span>
        <span style={{
          color: current ? "#fff" : "rgba(255,255,255,.92)",
          fontSize: isLongList ? (row.title.length > 22 ? 23 : 26) : (row.title.length > 27 ? 25 : 29), fontWeight: 950,
          opacity: revealed ? 1 : 0,
          WebkitTextStroke: ".7px #000",
        }}>{row.title}</span>
      </div>;
    })}
  </div>;
};

const ActiveCaption: React.FC<{config: RankingReelConfig; index: number}> = ({config, index}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const item = config.items[index];
  const caption = item.captions.find((entry) => frame >= entry.from * fps && frame < entry.to * fps);
  if (!caption) return null;
  const local = frame - caption.from * fps;
  const pop = spring({frame: local, fps, config: {damping: 12, stiffness: 240}});
  return <div style={{
    position: "absolute", zIndex: 12, left: 40, right: 40, bottom: 232,
    textAlign: "center", fontFamily: THEME.fonts.display,
    color: caption.color ?? config.captionColor,
    fontSize: caption.text.length > 28 ? 59 : 72, fontWeight: 950,
    lineHeight: .91, letterSpacing: -2,
    transform: `scale(${interpolate(pop, [0, 1], [.72, 1])})`, opacity: pop,
    WebkitTextStroke: "2px #000",
    textShadow: "0 6px 0 #000, 0 0 22px #000",
  }}>{caption.text}</div>;
};

const RankingClip: React.FC<{config: RankingReelConfig; index: number}> = ({config, index}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const item = config.items[index];
  const enter = interpolate(frame, [0, 5], [0, 1], {extrapolateRight: "clamp"});
  const exit = interpolate(frame, [item.duration - 8, item.duration], [1, 0], {extrapolateLeft: "clamp"});
  const volume = (f: number) => interpolate(f, [0, 5, item.duration - 8, item.duration], [0, 1, 1, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const focusX = item.focusShift
    ? interpolate(
      frame,
      item.focusShift.times.map((time) => time * fps),
      item.focusShift.x,
      {extrapolateLeft: "clamp", extrapolateRight: "clamp"},
    )
    : null;
  return <AbsoluteFill style={{background: "#000", overflow: "hidden", opacity: Math.min(enter, exit)}}>
    {!config.fullScreenClips ? <Img
      src={staticFile(item.poster)}
      style={{width: "100%", height: "100%", objectFit: "cover", transform: "scale(1.22)", filter: "blur(38px) brightness(.43) saturate(1.25)"}}
    /> : null}
    <div style={config.fullScreenClips ? {
      position: "absolute", inset: 0, background: "#000",
    } : {
      position: "absolute", left: 0, right: 0, top: config.items.length > 5 ? 630 : 560,
      height: 760, background: "#000", boxShadow: "0 18px 60px rgba(0,0,0,.8)",
    }}>
      <OffthreadVideo
        src={staticFile(item.video)} startFrom={item.startSeconds * fps} volume={config.muteClipAudio ? 0 : volume}
        style={{
          width: "100%",
          height: "100%",
          objectFit: config.fullScreenClips ? "cover" : "contain",
          objectPosition: focusX === null ? (item.objectPosition ?? "50% 50%") : `${focusX}% 50%`,
        }}
      />
    </div>
    <AbsoluteFill style={{background: config.fullScreenClips
      ? "linear-gradient(180deg,rgba(0,0,0,.66) 0%,rgba(0,0,0,.20) 31%,transparent 54%,rgba(0,0,0,.55) 100%)"
      : "linear-gradient(180deg,rgba(0,0,0,.24),transparent 44%,rgba(0,0,0,.32))"}} />
    <Headline config={config} />
    <RankingBoard config={config} currentIndex={index} />
    <ActiveCaption config={config} index={index} />
    <div style={{position: "absolute", zIndex: 10, left: 45, bottom: 142, padding: "8px 14px", borderRadius: 6, background: "rgba(0,0,0,.7)", color: "rgba(255,255,255,.78)", fontFamily: THEME.fonts.display, fontSize: 22, fontWeight: 900, letterSpacing: 2}}>{item.game}</div>
    <SceneBranding light />
  </AbsoluteFill>;
};

const Cta: React.FC<{config: RankingReelConfig}> = ({config}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pop = spring({frame, fps, config: {damping: 12, stiffness: 180}});
  const last = config.items[config.items.length - 1];
  return <AbsoluteFill style={{background: "#050505", overflow: "hidden"}}>
    <Img src={staticFile(last.poster)} style={{width: "100%", height: "100%", objectFit: "cover", filter: "blur(35px) brightness(.24)", transform: "scale(1.25)"}} />
    <AbsoluteFill style={{background: "rgba(0,0,0,.42)"}} />
    <div style={{position: "absolute", left: 45, right: 45, top: "50%", transform: `translateY(-50%) scale(${interpolate(pop, [0, 1], [.7, 1])})`, opacity: pop, textAlign: "center", fontFamily: THEME.fonts.display, color: "#fff", textShadow: "0 7px 0 #000,0 0 24px #000"}}>
      <div style={{fontSize: 91, fontWeight: 950, lineHeight: .9}}>{config.cta.line1}</div>
      <div style={{marginTop: 22, color: config.accentColor, fontSize: 53, fontWeight: 950}}>{config.cta.line2}</div>
    </div>
    <SceneBranding light />
  </AbsoluteFill>;
};

export const Scene39_RankingReel: React.FC<Scene39RankingReelProps> = ({config = SCENE39_FUNNY_GAMING_RANKING_CONFIG}) => {
  let cursor = 0;
  return <AbsoluteFill style={{background: "#000"}}>
    {config.music ? <Audio
      src={staticFile(config.music.src)}
      startFrom={config.music.startSeconds * config.canvas.fps}
      volume={(frame) => {
        const base = config.music?.volume ?? 0;
        const ctaStart = config.duration - config.cta.duration;
        return interpolate(
          frame,
          [0, 15, ctaStart, ctaStart + 12, config.duration - 10, config.duration],
          [0, base, base, Math.min(base * 1.55, 1), Math.min(base * 1.55, 1), 0],
          {extrapolateLeft: "clamp", extrapolateRight: "clamp"},
        );
      }}
    /> : null}
    {config.items.map((item, index) => {
      const from = cursor;
      cursor += item.duration;
      return <Sequence key={`${item.rank}-${item.title}`} from={from} durationInFrames={item.duration}><RankingClip config={config} index={index} /></Sequence>;
    })}
    {config.cta.enabled ? <Sequence from={cursor} durationInFrames={config.cta.duration}><Cta config={config} /></Sequence> : null}
  </AbsoluteFill>;
};
