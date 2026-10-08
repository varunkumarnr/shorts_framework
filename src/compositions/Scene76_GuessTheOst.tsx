import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {useAudioData, visualizeAudio} from "@remotion/media-utils";

const audioSrc = staticFile("guess-ost/guess-01.mp3");

export const Scene76_GuessTheOst: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const audioData = useAudioData(audioSrc);
  const values = audioData
    ? visualizeAudio({audioData, frame, fps, numberOfSamples: 64, smoothing: true})
    : Array.from({length: 64}, () => 0.08);
  const intro = interpolate(frame, [0, 12], [0, 1], {extrapolateRight: "clamp"});
  const outro = interpolate(frame, [fps * 11, fps * 12], [1, 0], {extrapolateRight: "clamp"});
  const opacity = Math.min(intro, outro);

  return (
    <AbsoluteFill style={{background: "#090909", color: "#F5F5F3", fontFamily: "Inter, Helvetica, Arial, sans-serif", overflow: "hidden"}}>
      <Audio src={audioSrc} />
      <div style={{position: "absolute", inset: 44, border: "1px solid rgba(255,255,255,0.12)"}} />
      <div style={{position: "absolute", left: 78, right: 78, top: 76, display: "flex", justifyContent: "space-between", fontWeight: 800, letterSpacing: 2.8, fontSize: 17, color: "rgba(255,255,255,0.56)"}}>
        <span>PIXELPICKED</span><span>01 / 01</span>
      </div>
      <div style={{position: "absolute", top: 212, left: 84, right: 84, textAlign: "center", opacity}}>
        <div style={{fontSize: 72, fontWeight: 900, letterSpacing: -4.5, lineHeight: 0.93}}>GUESS THE GAME</div>
        <div style={{marginTop: 18, fontSize: 22, fontWeight: 720, letterSpacing: 3.6, color: "rgba(255,255,255,0.52)"}}>FROM ITS OST</div>
      </div>
      <div style={{position: "absolute", left: 82, right: 82, top: 494, height: 190, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, opacity}}>
        {values.map((value, index) => {
          const normalized = Math.min(1, Math.sqrt(value) * 1.85);
          const height = 10 + normalized * 166;
          return <div key={index} style={{width: 5, height, borderRadius: 100, background: index % 8 === 0 ? "#FF6B2C" : "#F0EEE9", opacity: 0.52 + normalized * 0.48}} />;
        })}
      </div>
      <div style={{position: "absolute", left: 84, right: 84, bottom: 112, textAlign: "center", opacity, fontSize: 22, fontWeight: 720, letterSpacing: 0.2, color: "rgba(255,255,255,0.62)"}}>COMMENT YOUR GUESS ↓</div>
    </AbsoluteFill>
  );
};
