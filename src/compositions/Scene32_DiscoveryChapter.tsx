import React from "react";
import {
  AbsoluteFill,
  Easing,
  OffthreadVideo,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { SCENE32_DISCOVERY_CHAPTER_CONFIG } from "../data/config";
import { THEME } from "../data/theme";

const cfg = SCENE32_DISCOVERY_CHAPTER_CONFIG;
const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

type TextBeatProps = {
  duration: number;
  fixed: string;
  typed: string;
  typeStart?: number;
  framesPerCharacter?: number;
  fontSize?: number;
  maxWidth?: number;
  zoomOrigin?: string;
  zoomTo?: number;
};

/** A full-frame editorial type beat: fixed phrase, typed phrase, then a word-focused push. */
const TextBeat: React.FC<TextBeatProps> = ({
  duration,
  fixed,
  typed,
  typeStart = 7,
  framesPerCharacter = 1.15,
  fontSize = 100,
  maxWidth = 1540,
  zoomOrigin = "50% 50%",
  zoomTo = 2.55,
}) => {
  const frame = useCurrentFrame();
  const visibleCharacters = Math.max(
    0,
    Math.min(typed.length, Math.floor((frame - typeStart) / framesPerCharacter)),
  );
  const typedText = typed.slice(0, visibleCharacters);
  const enter = interpolate(frame, [0, 8], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  const scale = interpolate(frame, [duration - 15, duration], [1, zoomTo], {
    ...clamp,
    easing: Easing.in(Easing.cubic),
  });
  const fade = interpolate(frame, [duration - 5, duration], [1, 0], clamp);
  const cursorVisible =
    visibleCharacters < typed.length && frame >= typeStart && frame % 16 < 9;

  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        backgroundColor: "#08090B",
        alignItems: "center",
        justifyContent: "center",
        opacity: fade,
      }}
    >
      <div
        style={{
          width: maxWidth,
          color: "#F1EEE8",
          fontFamily: THEME.fonts.display,
          fontSize,
          fontWeight: 690,
          letterSpacing: -5.5,
          lineHeight: 1.02,
          textAlign: "center",
          transform: `scale(${scale}) translateY(${(1 - enter) * 24}px)`,
          transformOrigin: zoomOrigin,
          opacity: enter,
          filter: `blur(${(1 - enter) * 8}px)`,
          willChange: "transform",
        }}
      >
        <span style={{ color: "#8E9390", fontWeight: 560 }}>{fixed}</span>
        <span>{typedText}</span>
        <span
          style={{
            display: "inline-block",
            width: 3,
            height: "0.76em",
            marginLeft: 8,
            background: "#F1EEE8",
            opacity: cursorVisible ? 0.82 : 0,
            verticalAlign: "-0.02em",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

const FootageBeat: React.FC<{
  src: string;
  duration: number;
  startFrom: number;
  position?: string;
  startScale?: number;
  endScale?: number;
}> = ({
  src,
  duration,
  startFrom,
  position = "50% 50%",
  startScale = 1.68,
  endScale = 1.82,
}) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, duration], [startScale, endScale], {
    ...clamp,
    easing: Easing.inOut(Easing.quad),
  });
  const fade = interpolate(
    frame,
    [0, 4, duration - 4, duration],
    [0, 1, 1, 0],
    clamp,
  );

  return (
    <AbsoluteFill style={{ background: "#08090B", opacity: fade }}>
      <OffthreadVideo
        src={staticFile(src)}
        startFrom={startFrom}
        muted
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: position,
          transform: `scale(${scale})`,
          filter: "saturate(0.92) contrast(1.04) brightness(0.91)",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 48%, transparent 42%, rgba(4,5,7,0.28) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};

export const Scene32_DiscoveryChapter: React.FC = () => {
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: "#08090B" }}>
      <Sequence from={0} durationInFrames={50} premountFor={12}>
        <TextBeat
          duration={50}
          fixed="Re-envisioning "
          typed="discovery."
          fontSize={116}
          zoomOrigin="67% 52%"
          zoomTo={3.1}
        />
      </Sequence>

      <Sequence from={50} durationInFrames={45} premountFor={20}>
        <FootageBeat
          src={cfg.taproachVideo}
          duration={45}
          startFrom={218}
          position="50% 54%"
          endScale={1.84}
        />
      </Sequence>

      <Sequence from={95} durationInFrames={50} premountFor={12}>
        <TextBeat
          duration={50}
          fixed="A "
          typed="personalised game feed."
          fontSize={112}
          zoomOrigin="42% 51%"
          zoomTo={2.75}
        />
      </Sequence>

      <Sequence from={145} durationInFrames={45} premountFor={20}>
        <FootageBeat
          src={cfg.islandFishingVideo}
          duration={45}
          startFrom={205}
          position="50% 62%"
          endScale={1.8}
        />
      </Sequence>

      <Sequence from={190} durationInFrames={52} premountFor={12}>
        <TextBeat
          duration={52}
          fixed="Play before launch. "
          typed="Shape what ships."
          fontSize={102}
          zoomOrigin="66% 51%"
          zoomTo={2.65}
        />
      </Sequence>

      <Sequence from={242} durationInFrames={46} premountFor={20}>
        <FootageBeat
          src={cfg.taproachVideo}
          duration={46}
          startFrom={305}
          position="50% 57%"
          startScale={1.72}
          endScale={1.88}
        />
      </Sequence>

      <Sequence from={288} durationInFrames={55} premountFor={12}>
        <TextBeat
          duration={55}
          fixed="No installs. Swipe. "
          typed="Play. Keep exploring."
          typeStart={5}
          framesPerCharacter={1.05}
          fontSize={98}
          zoomOrigin="58% 51%"
          zoomTo={2.5}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
