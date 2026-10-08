import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {useAudioData, visualizeAudio} from "@remotion/media-utils";

const audioSrc = staticFile("guess-ost/guess-02.mp3");
const specks = Array.from({length: 42}, (_, index) => ({
  left: 4 + ((index * 47) % 92),
  top: 4 + ((index * 31) % 88),
  size: 1 + (index % 3),
  delay: index * 7,
}));

export const Scene77_GuessTheSound: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const audioData = useAudioData(audioSrc);
  const values = audioData
    ? visualizeAudio({audioData, frame, fps, numberOfSamples: 64, smoothing: true})
    : Array.from({length: 64}, () => 0.04);
  const secondsLeft = Math.max(0, 12 - Math.floor(frame / fps));
  const ringPulse = 1 + Math.min(0.08, Math.max(...values) * 0.16);
  const labelOpacity = interpolate(frame, [0, 12], [0, 1], {extrapolateRight: "clamp"});

  return (
    <AbsoluteFill style={{background: "#020304", color: "#F7F7F4", fontFamily: "Arial Black, Arial, Helvetica, sans-serif", overflow: "hidden"}}>
      <Audio src={audioSrc} />
      <Img
        src={staticFile("logo.png")}
        style={{position: "absolute", top: 34, left: 48, width: 175, height: "auto", zIndex: 2}}
      />
      {specks.map((speck, index) => (
        <div key={index} style={{position: "absolute", left: `${speck.left}%`, top: `${speck.top}%`, width: speck.size, height: speck.size, borderRadius: 99, background: "#D8EDFF", opacity: 0.15 + ((Math.sin((frame + speck.delay) / 18) + 1) / 2) * 0.5}} />
      ))}
      <div style={{position: "absolute", width: 1000, height: 1000, left: 460, top: 40, borderRadius: "50%", background: "radial-gradient(circle, transparent 47%, rgba(100,183,255,0.06) 52%, rgba(88,164,255,0.2) 56%, rgba(184,230,255,0.82) 58%, rgba(95,195,255,0.17) 61%, transparent 70%)", filter: "blur(1px)", transform: `scale(${ringPulse})`}} />
      <div style={{position: "absolute", width: 765, height: 765, left: 578, top: 158, borderRadius: "50%", border: "1px solid rgba(190,230,255,0.26)", boxShadow: "0 0 38px rgba(101,203,255,0.34), inset 0 0 45px rgba(74,172,255,0.12)"}} />
      <div style={{position: "absolute", width: 616, height: 616, left: 652, top: 232, borderRadius: "50%", background: "radial-gradient(circle at 44% 36%, #101c28 0%, #06090d 53%, #000 74%)", boxShadow: "inset 0 0 115px rgba(0,0,0,0.95)"}} />
      <div style={{position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", paddingBottom: 10}}>
        <div style={{fontFamily: "Arial Black, Impact, sans-serif", fontSize: 250, lineHeight: 0.82, letterSpacing: -20, textShadow: "0 3px 0 #BFDFFF", color: "#FAFAF6"}}>{String(secondsLeft).padStart(2, "0")}</div>
      </div>
      <div style={{position: "absolute", left: 82, bottom: 66, opacity: labelOpacity}}>
        <div style={{fontSize: 17, letterSpacing: 4, color: "#8CD8FF", marginBottom: 11}}>SOUND ON</div>
        <div style={{fontSize: 43, letterSpacing: -2.4, lineHeight: 0.95}}>GUESS THE GAME.</div>
      </div>
      <div style={{position: "absolute", right: 82, bottom: 78, display: "flex", alignItems: "flex-end", gap: 4, height: 84, opacity: labelOpacity}}>
        {values.map((value, index) => {
          const normalized = Math.min(1, Math.sqrt(value) * 1.9);
          return <div key={index} style={{width: 4, height: 8 + normalized * 62, borderRadius: 99, background: "#D8F1FF", opacity: 0.26 + normalized * 0.74}} />;
        })}
      </div>
    </AbsoluteFill>
  );
};
