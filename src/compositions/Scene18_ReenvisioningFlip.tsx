import React from "react";
import {
  AbsoluteFill,
  Audio,
  OffthreadVideo,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { SCENE18_REENVISIONING_FLIP_CONFIG } from "../data/config";
import { THEME } from "../data/theme";
import { PixelPickedLogo } from "../components/shared";

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const makeWoodKeyTap = (seed: number, pitch: number) => {
  const sampleRate = 48000;
  const sampleCount = Math.floor(sampleRate * 0.078);
  const wav = new ArrayBuffer(44 + sampleCount * 2);
  const view = new DataView(wav);
  const write = (offset: number, value: string) => {
    for (let index = 0; index < value.length; index++) {
      view.setUint8(offset + index, value.charCodeAt(index));
    }
  };

  write(0, "RIFF");
  view.setUint32(4, 36 + sampleCount * 2, true);
  write(8, "WAVE");
  write(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  write(36, "data");
  view.setUint32(40, sampleCount * 2, true);

  let noiseState = seed;
  let filteredNoise = 0;
  for (let index = 0; index < sampleCount; index++) {
    noiseState = (noiseState * 16807) % 2147483647;
    const noise = (noiseState / 2147483647) * 2 - 1;
    const time = index / sampleRate;
    filteredNoise = filteredNoise * 0.86 + noise * 0.14;
    const contact = filteredNoise * Math.exp(-time * 190) * 0.11;
    const lowWood =
      Math.sin(time * Math.PI * 2 * 172 * pitch) *
      Math.exp(-time * 48) *
      0.38;
    const woodBody =
      Math.sin(time * Math.PI * 2 * 286 * pitch + 0.65) *
      Math.exp(-time * 68) *
      0.24;
    const woodEdge =
      Math.sin(time * Math.PI * 2 * 438 * pitch + 1.25) *
      Math.exp(-time * 96) *
      0.1;
    const bottomOutTime = Math.max(0, time - 0.009);
    const bottomOut =
      time >= 0.009
        ? Math.sin(bottomOutTime * Math.PI * 2 * 138 * pitch) *
          Math.exp(-bottomOutTime * 92) *
          0.1
        : 0;
    const sample = Math.max(
      -1,
      Math.min(1, contact + lowWood + woodBody + woodEdge + bottomOut),
    );
    view.setInt16(44 + index * 2, Math.round(sample * 32767), true);
  }

  const bytes = new Uint8Array(wav);
  let binary = "";
  for (let index = 0; index < bytes.length; index++) {
    binary += String.fromCharCode(bytes[index]);
  }
  return `data:audio/wav;base64,${btoa(binary)}`;
};

const KEYBOARD_TAPS = [
  makeWoodKeyTap(173, 0.97),
  makeWoodKeyTap(431, 1.02),
  makeWoodKeyTap(887, 0.94),
  makeWoodKeyTap(1217, 1.05),
];

export const TypingTicks: React.FC<{
  text: string;
  start: number;
  framesPerCharacter: number;
}> = ({ text, start, framesPerCharacter }) => (
  <>
    {Array.from(text).map((character, index) => (
      <Sequence
        // The index is stable because this string never reorders.
        key={`${character}-${index}`}
        from={start + index * framesPerCharacter}
        durationInFrames={5}
        layout="none"
      >
        <Audio
          src={KEYBOARD_TAPS[index % KEYBOARD_TAPS.length]}
          volume={character === " " ? 0.19 : 0.38 + (index % 3) * 0.015}
        />
      </Sequence>
    ))}
  </>
);

export const CenteredClaim: React.FC<{ label: string; duration: number }> = ({
  label,
  duration,
}) => {
  const frame = useCurrentFrame();
  const cfg = SCENE18_REENVISIONING_FLIP_CONFIG;
  const prefixOpacity = interpolate(frame, [0, 6], [0, 1], clamp);
  const exit = interpolate(frame, [duration - 14, duration], [1, 0], clamp);
  const typeStart = 10;
  const framesPerCharacter = 2;
  const completeWord = `${label.toLowerCase()}.`;
  const typedCharacters = Math.max(
    0,
    Math.floor((frame - typeStart) / framesPerCharacter),
  );
  const typedWord = completeWord.slice(0, typedCharacters);

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        background: cfg.colors.background,
        opacity: exit,
        fontFamily: THEME.fonts.display,
      }}
    >
      <div
        style={{
          position: "relative",
          color: cfg.colors.text,
          fontSize: label.length > 10 ? 90 : 106,
          fontWeight: 650,
          letterSpacing: -5.5,
          lineHeight: 1.03,
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ visibility: "hidden" }}>
          Re-envisioning {completeWord}
        </span>
        <span style={{ position: "absolute", inset: 0 }}>
          <span style={{ opacity: prefixOpacity }}>Re-envisioning </span>
          <span>{typedWord}</span>
        </span>
      </div>
      <TypingTicks
        text={completeWord}
        start={typeStart}
        framesPerCharacter={framesPerCharacter}
      />
    </AbsoluteFill>
  );
};

const ProductProof: React.FC<{
  label: string;
  recording: string;
  duration: number;
}> = ({ label, recording, duration }) => {
  const frame = useCurrentFrame();
  const cfg = SCENE18_REENVISIONING_FLIP_CONFIG;
  const enter = interpolate(frame, [0, 12], [0, 1], clamp);
  const exit = interpolate(frame, [duration - 12, duration], [1, 0], clamp);
  const opacity = Math.min(enter, exit);

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        background: cfg.colors.background,
        opacity,
      }}
    >
      {recording ? (
        <OffthreadVideo
          src={staticFile(recording)}
          muted
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      ) : (
        <div
          style={{
            color: "#34373B",
            fontFamily: THEME.fonts.display,
            fontSize: 21,
            fontWeight: 500,
            letterSpacing: 0.2,
          }}
        >
          {label.toLowerCase()} screen recording
        </div>
      )}
    </AbsoluteFill>
  );
};

const FeatureBeat: React.FC<{
  label: string;
  recording: string;
  duration: number;
}> = ({ label, recording, duration }) => {
  const claimDuration = 66;
  const proofStart = 56;

  return (
    <AbsoluteFill>
      <Sequence durationInFrames={claimDuration}>
        <CenteredClaim label={label} duration={claimDuration} />
      </Sequence>
      <Sequence
        from={proofStart}
        durationInFrames={duration - proofStart}
        premountFor={12}
      >
        <ProductProof
          label={label}
          recording={recording}
          duration={duration - proofStart}
        />
      </Sequence>
    </AbsoluteFill>
  );
};

const BrandReveal: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const cfg = SCENE18_REENVISIONING_FLIP_CONFIG;
  const enter = interpolate(frame, [0, 18], [0, 1], clamp);
  const exit = interpolate(frame, [duration - 18, duration], [1, 0], clamp);
  const opacity = Math.min(enter, exit);
  const ctaOpacity = interpolate(frame, [35, 56], [0, 1], clamp);
  const y = interpolate(enter, [0, 1], [30, 0], clamp);

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        background: cfg.colors.background,
        opacity,
        fontFamily: THEME.fonts.display,
      }}
    >
      <div
        style={{
          transform: `translateY(${y}px)`,
        }}
      >
        <PixelPickedLogo size={132} showText={false} />
      </div>
      <div
        style={{
          marginTop: 34,
          color: cfg.colors.text,
          fontSize: 118,
          fontWeight: 700,
          letterSpacing: -6.4,
          lineHeight: 1,
          textAlign: "center",
          transform: `translateY(${y}px)`,
        }}
      >
        PixelPicked
      </div>
      <div
        style={{
          marginTop: 22,
          color: cfg.colors.muted,
          fontSize: 31,
          fontWeight: 500,
          letterSpacing: 1.5,
          lineHeight: 1.2,
          textAlign: "center",
          textTransform: "uppercase",
          transform: `translateY(${y}px)`,
        }}
      >
        The missing layer of mobile gaming
      </div>
      <div
        style={{
          marginTop: 62,
          display: "flex",
          alignItems: "center",
          gap: 15,
          color: cfg.colors.text,
          fontSize: 26,
          fontWeight: 550,
          opacity: ctaOpacity,
          border: `1px solid ${cfg.colors.line}`,
          borderRadius: 999,
          padding: "15px 24px 16px 27px",
        }}
      >
        <span>pixelpicked.com</span>
        <span>→</span>
      </div>
    </AbsoluteFill>
  );
};

const FinalBeat: React.FC<{ duration: number }> = ({ duration }) => {
  const statementDuration = 120;
  const brandStart = 104;

  return (
    <AbsoluteFill>
      <Sequence durationInFrames={statementDuration}>
        <CenteredClaim label="MOBILE GAMING" duration={statementDuration} />
      </Sequence>
      <Sequence
        from={brandStart}
        durationInFrames={duration - brandStart}
        premountFor={20}
      >
        <BrandReveal duration={duration - brandStart} />
      </Sequence>
    </AbsoluteFill>
  );
};

export const Scene18_ReenvisioningFlip: React.FC = () => {
  const cfg = SCENE18_REENVISIONING_FLIP_CONFIG;
  const finalStart = cfg.pillars.length * cfg.segmentDuration;

  return (
    <AbsoluteFill style={{ background: cfg.colors.background }}>
      {cfg.pillars.map((pillar, index) => (
        <Sequence
          key={pillar.label}
          from={index * cfg.segmentDuration}
          durationInFrames={cfg.segmentDuration}
          premountFor={20}
        >
          <FeatureBeat
            label={pillar.label}
            recording={pillar.recording}
            duration={cfg.segmentDuration}
          />
        </Sequence>
      ))}

      <Sequence
        from={finalStart}
        durationInFrames={cfg.finalDuration}
        premountFor={24}
      >
        <FinalBeat duration={cfg.finalDuration} />
      </Sequence>
    </AbsoluteFill>
  );
};
