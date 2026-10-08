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
import { SCENE38_HIGHEST_GROSSING_GAMES_CONFIG as CONFIG } from "../data/config";
import { THEME } from "../data/theme";

const Clip: React.FC<{src: string; startSeconds: number; foreground?: boolean; scale?: number}> = ({
  src,
  startSeconds,
  foreground = false,
  scale = 1,
}) => {
  const {fps} = useVideoConfig();
  return <OffthreadVideo
    src={staticFile(src)}
    startFrom={startSeconds * fps}
    muted
    style={foreground ? {
      position: "absolute",
      left: 0,
      top: 470,
      width: 1080,
      height: 840,
      objectFit: "contain",
      background: "#000",
      transform: `scale(${scale})`,
      boxShadow: "0 28px 90px rgba(0,0,0,.85)",
    } : {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      filter: "blur(50px) brightness(.25) saturate(1.35)",
      transform: `scale(${1.3 * scale})`,
    }}
  />;
};

const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const punch = spring({frame, fps, config: {damping: 13, stiffness: 175}});
  const zoom = interpolate(frame, [0, CONFIG.hook.duration], [1.05, 1.13], {extrapolateRight: "clamp"});
  return <AbsoluteFill style={{background: "#000", overflow: "hidden"}}>
    <OffthreadVideo
      src={staticFile(CONFIG.hook.video)}
      startFrom={CONFIG.hook.startSeconds * fps}
      muted
      style={{width: "100%", height: "100%", objectFit: "cover", transform: `scale(${zoom})`}}
    />
    <AbsoluteFill style={{background: "linear-gradient(180deg,rgba(0,0,0,.35),rgba(0,0,0,.2) 40%,rgba(0,0,0,.7))"}} />
    <div style={{
      position: "absolute", left: 45, right: 45, top: "50%",
      transform: `translateY(-50%) scale(${interpolate(punch, [0, 1], [.7, 1])})`,
      opacity: punch, textAlign: "center", fontFamily: THEME.fonts.display,
      color: "white", textShadow: "0 10px 36px #000,0 3px 6px #000",
    }}>
      <div style={{fontSize: 96, fontWeight: 950, lineHeight: .9, letterSpacing: -4}}>{CONFIG.hook.lines[0]}</div>
      <div style={{fontSize: 86, fontWeight: 950, lineHeight: .92, letterSpacing: -3}}>{CONFIG.hook.lines[1]}</div>
      <div style={{marginTop: 8, color: CONFIG.accentColor, fontSize: 112, fontWeight: 950, lineHeight: .86, letterSpacing: -5, WebkitTextStroke: "3px #050505"}}>{CONFIG.hook.lines[2]}</div>
      <div style={{display: "inline-block", marginTop: 30, padding: "11px 22px", borderRadius: 999, background: "rgba(0,0,0,.78)", border: "2px solid rgba(255,255,255,.65)", fontSize: 25, fontWeight: 900, letterSpacing: 2.5}}>{CONFIG.hook.kicker}</div>
      <div style={{marginTop: 20, fontSize: 30, fontWeight: 950}}>#5 <span style={{color: CONFIG.moneyColor}}>→</span> #1</div>
    </div>
    <SceneBranding light />
  </AbsoluteFill>;
};

const RankingItem: React.FC<{index: number}> = ({index}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const item = CONFIG.items[index];
  const entrance = spring({frame, fps, config: {damping: 15, stiffness: 155}});
  const zoom = interpolate(frame, [0, item.duration], [1, 1.055], {extrapolateRight: "clamp"});
  const flash = interpolate(frame, [0, 4, 12], [.9, .2, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const exit = interpolate(frame, [item.duration - 10, item.duration], [1, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const nameSize = item.name.length > 21 ? 61 : item.name.length > 16 ? 68 : 78;
  return <AbsoluteFill style={{background: "#020202", overflow: "hidden", opacity: exit}}>
    <Clip src={item.video} startSeconds={item.startSeconds} scale={zoom} />
    <Clip src={item.video} startSeconds={item.startSeconds} foreground scale={zoom} />
    <AbsoluteFill style={{background: "linear-gradient(180deg,rgba(0,0,0,.94),rgba(0,0,0,.55) 26%,transparent 48%,transparent 69%,rgba(0,0,0,.95) 84%)"}} />
    <div style={{position: "absolute", left: 45, right: 45, top: 76, textAlign: "center", fontFamily: THEME.fonts.display, transform: `translateY(${interpolate(entrance, [0, 1], [-70, 0])}px)`, opacity: entrance, textShadow: "0 7px 24px #000"}}>
      <div style={{color: "white", fontSize: 84, fontWeight: 950, lineHeight: .9}}>{item.rank}</div>
      <div style={{color: CONFIG.accentColor, marginTop: 14, fontSize: nameSize, fontWeight: 950, lineHeight: .92, letterSpacing: -2.5, WebkitTextStroke: "2px #070707"}}>{item.name}</div>
    </div>
    <div style={{position: "absolute", left: 45, right: 45, bottom: 205, textAlign: "center", fontFamily: THEME.fonts.display, transform: `translateY(${interpolate(entrance, [0, 1], [70, 0])}px)`, opacity: entrance, textShadow: "0 7px 24px #000"}}>
      <div style={{color: CONFIG.moneyColor, fontSize: 100, fontWeight: 950, lineHeight: .9, letterSpacing: -4, WebkitTextStroke: "2px #050505"}}>{item.value}</div>
      <div style={{display: "inline-block", marginTop: 24, padding: "10px 20px", border: `2px solid ${CONFIG.moneyColor}`, borderRadius: 8, background: "rgba(0,0,0,.82)", color: "white", fontSize: 27, fontWeight: 950, letterSpacing: 2.4}}>{item.label}</div>
    </div>
    <div style={{position: "absolute", left: 74, right: 74, bottom: 120, display: "flex", gap: 11}}>
      {CONFIG.items.map((_, dotIndex) => <div key={dotIndex} style={{flex: 1, height: 7, borderRadius: 99, background: dotIndex <= index ? CONFIG.accentColor : "rgba(255,255,255,.2)", boxShadow: dotIndex === index ? `0 0 18px ${CONFIG.accentColor}` : undefined}} />)}
    </div>
    <AbsoluteFill style={{background: "white", opacity: flash, pointerEvents: "none"}} />
    <SceneBranding light />
  </AbsoluteFill>;
};

export const Scene38_HighestGrossingGames: React.FC = () => {
  let cursor = CONFIG.hook.duration;
  return <AbsoluteFill style={{background: "#000"}}>
    <Audio src={staticFile(CONFIG.music)} startFrom={CONFIG.musicStartSeconds * CONFIG.canvas.fps} volume={(frame) => CONFIG.musicVolume * interpolate(frame, [0, 18, CONFIG.duration - 30, CONFIG.duration], [0, 1, 1, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp"})} />
    <Sequence durationInFrames={CONFIG.hook.duration}><Hook /></Sequence>
    {CONFIG.items.map((item, index) => {
      const from = cursor;
      cursor += item.duration;
      return <Sequence key={item.rank} from={from} durationInFrames={item.duration}><RankingItem index={index} /></Sequence>;
    })}
  </AbsoluteFill>;
};
