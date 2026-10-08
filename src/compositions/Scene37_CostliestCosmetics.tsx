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
import { SCENE37_COSTLIEST_COSMETICS_CONFIG as CONFIG } from "../data/config";
import { THEME } from "../data/theme";

const Clip: React.FC<{
  src: string;
  startSeconds: number;
  foreground?: boolean;
  scale?: number;
}> = ({ src, startSeconds, foreground = false, scale = 1 }) => {
  const { fps } = useVideoConfig();
  return (
    <OffthreadVideo
      src={staticFile(src)}
      startFrom={startSeconds * fps}
      muted
      style={foreground ? {
        position: "absolute",
        left: 0,
        top: 475,
        width: 1080,
        height: 830,
        objectFit: "contain",
        background: "#000",
        transform: `scale(${scale})`,
        boxShadow: "0 28px 90px rgba(0,0,0,.82)",
      } : {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        filter: "blur(48px) brightness(.27) saturate(1.3)",
        transform: `scale(${1.28 * scale})`,
      }}
    />
  );
};

const HookMontage: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const punch = spring({ frame, fps, config: { damping: 13, stiffness: 170 } });
  const montage = [
    { src: "cosmetics-dragon-lore.mp4", start: 2 },
    { src: "cosmetics-ak661.mp4", start: 4 },
    { src: "cosmetics-karambit.f399.mp4", start: 3 },
  ];

  return (
    <AbsoluteFill style={{ background: "#000", overflow: "hidden" }}>
      {montage.map((clip, index) => (
        <Sequence key={clip.src} from={index * 40} durationInFrames={40}>
          <Clip src={clip.src} startSeconds={clip.start} />
          <Clip src={clip.src} startSeconds={clip.start} foreground scale={1.08} />
        </Sequence>
      ))}
      <AbsoluteFill style={{ background: "linear-gradient(180deg,rgba(0,0,0,.48),rgba(0,0,0,.18) 44%,rgba(0,0,0,.7))" }} />
      <div style={{
        position: "absolute",
        left: 48,
        right: 48,
        top: "50%",
        transform: `translateY(-50%) scale(${interpolate(punch, [0, 1], [.72, 1])})`,
        opacity: punch,
        textAlign: "center",
        fontFamily: THEME.fonts.display,
        color: "white",
        textShadow: "0 10px 36px #000, 0 3px 5px #000",
      }}>
        <div style={{
          display: "inline-block",
          padding: "10px 22px",
          marginBottom: 20,
          border: "2px solid rgba(255,255,255,.58)",
          borderRadius: 999,
          background: "rgba(0,0,0,.7)",
          fontSize: 25,
          fontWeight: 900,
          letterSpacing: 3,
        }}>{CONFIG.hook.kicker}</div>
        <div style={{ fontSize: 102, fontWeight: 950, lineHeight: .88, letterSpacing: -4.5 }}>
          {CONFIG.hook.lines[0]}
        </div>
        <div style={{
          marginTop: 10,
          color: CONFIG.accentColor,
          fontSize: 108,
          fontWeight: 950,
          lineHeight: .86,
          letterSpacing: -5,
          WebkitTextStroke: "3px #050505",
        }}>{CONFIG.hook.lines[1]}</div>
        <div style={{ marginTop: 10, fontSize: 94, fontWeight: 950, lineHeight: .9 }}>
          {CONFIG.hook.lines[2]}
        </div>
        <div style={{ marginTop: 32, fontSize: 30, fontWeight: 900, letterSpacing: 1.6 }}>
          #5 <span style={{ color: CONFIG.moneyColor }}>→</span> #1
        </div>
      </div>
      <SceneBranding light />
    </AbsoluteFill>
  );
};

const RankingItem: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const item = CONFIG.items[index];
  const entrance = spring({ frame, fps, config: { damping: 15, stiffness: 155 } });
  const flash = interpolate(frame, [0, 4, 11], [.88, .18, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const zoom = interpolate(frame, [0, item.duration], [1, 1.055], { extrapolateRight: "clamp" });
  const exit = interpolate(frame, [item.duration - 10, item.duration], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "#030303", overflow: "hidden", opacity: exit }}>
      {item.video ? <>
        <Clip src={item.video} startSeconds={item.startSeconds} scale={zoom} />
        <Clip src={item.video} startSeconds={item.startSeconds} foreground scale={zoom} />
      </> : null}
      <AbsoluteFill style={{ background: "linear-gradient(180deg,rgba(0,0,0,.92),rgba(0,0,0,.58) 26%,transparent 49%,transparent 69%,rgba(0,0,0,.93) 84%)" }} />
      <div style={{
        position: "absolute",
        left: 48,
        right: 48,
        top: 72,
        textAlign: "center",
        fontFamily: THEME.fonts.display,
        transform: `translateY(${interpolate(entrance, [0, 1], [-70, 0])}px)`,
        opacity: entrance,
        textShadow: "0 7px 24px #000",
      }}>
        <div style={{ color: "white", fontSize: 80, fontWeight: 950, lineHeight: .9 }}>{item.rank}</div>
        <div style={{ color: CONFIG.accentColor, marginTop: 12, fontSize: item.name.length > 21 ? 64 : 76, fontWeight: 950, lineHeight: .92, letterSpacing: -2.5, WebkitTextStroke: "2px #070707" }}>{item.name}</div>
        <div style={{ color: "rgba(255,255,255,.88)", marginTop: 15, fontSize: 27, fontWeight: 900, letterSpacing: 3 }}>{item.game}</div>
      </div>
      <div style={{
        position: "absolute",
        left: 48,
        right: 48,
        bottom: 205,
        textAlign: "center",
        fontFamily: THEME.fonts.display,
        transform: `translateY(${interpolate(entrance, [0, 1], [70, 0])}px)`,
        opacity: entrance,
        textShadow: "0 7px 24px #000",
      }}>
        <div style={{ color: CONFIG.moneyColor, fontSize: item.value.length > 11 ? 91 : 108, fontWeight: 950, lineHeight: .9, letterSpacing: -4, WebkitTextStroke: "2px #060606" }}>{item.value}</div>
        <div style={{ display: "inline-block", marginTop: 22, padding: "10px 20px", border: `2px solid ${CONFIG.moneyColor}`, borderRadius: 8, background: "rgba(0,0,0,.8)", color: "white", fontSize: 28, fontWeight: 950, letterSpacing: 2.5 }}>{item.status}</div>
        {item.detail ? <div style={{ marginTop: 18, color: "rgba(255,255,255,.86)", fontSize: 25, fontWeight: 800, letterSpacing: 1.8 }}>{item.detail}</div> : null}
      </div>
      <div style={{ position: "absolute", left: 74, right: 74, bottom: 120, display: "flex", gap: 11 }}>
        {CONFIG.items.map((_, dotIndex) => <div key={dotIndex} style={{ flex: 1, height: 7, borderRadius: 99, background: dotIndex <= index ? CONFIG.accentColor : "rgba(255,255,255,.2)", boxShadow: dotIndex === index ? `0 0 18px ${CONFIG.accentColor}` : undefined }} />)}
      </div>
      <AbsoluteFill style={{ background: "white", opacity: flash, pointerEvents: "none" }} />
      <SceneBranding light />
    </AbsoluteFill>
  );
};

export const Scene37_CostliestCosmetics: React.FC = () => {
  let cursor = CONFIG.hook.duration;
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Audio
        src={staticFile(CONFIG.music)}
        startFrom={CONFIG.musicStartSeconds * CONFIG.canvas.fps}
        volume={(frame) => CONFIG.musicVolume * interpolate(frame, [0, 18, CONFIG.duration - 30, CONFIG.duration], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
      />
      <Sequence from={990} durationInFrames={CONFIG.duration - 990}>
        <Audio
          src={staticFile(CONFIG.music)}
          volume={(frame) => CONFIG.musicVolume * interpolate(frame, [0, 30, CONFIG.duration - 1020, CONFIG.duration - 990], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        />
      </Sequence>
      <Sequence durationInFrames={CONFIG.hook.duration}><HookMontage /></Sequence>
      {CONFIG.items.map((item, index) => {
        const from = cursor;
        cursor += item.duration;
        return <Sequence key={item.rank} from={from} durationInFrames={item.duration}><RankingItem index={index} /></Sequence>;
      })}
    </AbsoluteFill>
  );
};
