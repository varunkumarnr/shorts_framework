import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SCENE22_TAPROACH_CHALLENGE_CONFIG } from "../data/config";
import { THEME } from "../data/theme";

const cfg = SCENE22_TAPROACH_CHALLENGE_CONFIG;
const C = {
  paper: "#171815",
  ink: "#F0E8D6",
  outline: "#090A08",
  tomato: "#D96850",
  mustard: "#CDA63D",
  blue: "#617E9B",
  mint: "#6E9A82",
  white: "#262720",
};
const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const Roach: React.FC<{ size?: number }> = ({ size = 124 }) => (
  <svg width={size} height={size} viewBox="0 0 140 140">
    <g fill="none" stroke={C.outline} strokeWidth="8" strokeLinecap="round">
      <path d="M53 36 38 17M87 36l15-19M40 62 16 9M100 62l-16 9M35 91l20-6M105 91l-20-6M45 118l16-19M95 118 79 99" />
    </g>
    <ellipse cx="70" cy="75" rx="33" ry="49" fill={C.tomato} stroke={C.outline} strokeWidth="8" />
    <path d="M70 29v93M42 72h56" stroke={C.outline} strokeWidth="7" strokeLinecap="round" />
    <circle cx="58" cy="48" r="4" fill={C.white} />
    <circle cx="82" cy="48" r="4" fill={C.white} />
  </svg>
);

const Confetti: React.FC = () => {
  const frame = useCurrentFrame();
  const pieces = [
    [170, 146, -18, C.tomato], [330, 820, 22, C.blue], [1570, 164, 16, C.mustard],
    [1740, 790, -24, C.mint], [1420, 906, 30, C.tomato], [520, 136, 14, C.mint],
    [112, 650, 28, C.mustard], [1810, 410, -12, C.blue], [1270, 120, -30, C.blue],
  ] as const;
  return (
    <>
      {pieces.map(([x, y, rotate, color], index) => {
        const drift = Math.sin(frame / 18 + index) * 7;
        return (
          <div
            key={index}
            style={{
              position: "absolute",
              left: x,
              top: y + drift,
              width: index % 3 === 0 ? 32 : 20,
              height: index % 3 === 0 ? 13 : 22,
              borderRadius: index % 2 ? "50%" : 3,
              background: color,
              transform: `rotate(${rotate + drift}deg)`,
              border: `3px solid ${C.outline}`,
            }}
          />
        );
      })}
    </>
  );
};

const MalePortrait: React.FC<{ variant: "varun" | "saksham" }> = ({ variant }) => {
  const isVarun = variant === "varun";
  const skin = isVarun ? "#A96843" : "#C9875A";
  const shirt = isVarun ? C.tomato : C.mustard;
  return (
    <svg width="132" height="132" viewBox="0 0 132 132" style={{ borderRadius: "50%" }}>
      <rect width="132" height="132" fill={isVarun ? C.mustard : C.blue} />
      <path d="M23 134c3-29 18-43 43-43s40 14 43 43" fill={shirt} stroke={C.outline} strokeWidth="5" />
      <path d="M55 80h22v25H55z" fill={skin} stroke={C.outline} strokeWidth="5" />
      <ellipse cx="66" cy="57" rx="31" ry="37" fill={skin} stroke={C.outline} strokeWidth="5" />
      {isVarun ? (
        <path d="M35 51c0-27 13-40 34-40 19 0 31 12 31 34-12-1-24-8-31-18-7 12-18 20-34 24Z" fill={C.outline} />
      ) : (
        <path d="M34 48c1-25 14-38 34-38 20 0 32 13 32 37-8-7-17-11-27-12-12 8-24 12-39 13Z" fill={C.outline} />
      )}
      <circle cx="54" cy="58" r="3.5" fill={C.outline} />
      <circle cx="78" cy="58" r="3.5" fill={C.outline} />
      <path d="M58 74c5 4 11 4 16 0" fill="none" stroke={C.outline} strokeWidth="4" strokeLinecap="round" />
      {isVarun ? <path d="M48 67c4 17 31 17 36 0-7 7-29 7-36 0Z" fill={C.outline} opacity="0.9" /> : null}
    </svg>
  );
};

const Avatar: React.FC<{
  name: string;
  color: string;
  portrait: "varun" | "saksham";
  delay: number;
}> = ({ name, color, portrait, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 120, mass: 0.7 } });
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", opacity: p, transform: `scale(${0.6 + p * 0.4}) rotate(${(1 - p) * -8}deg)` }}>
      <div
        style={{
          width: 146,
          height: 146,
          borderRadius: "50%",
          background: color,
          border: `7px solid ${C.outline}`,
          boxShadow: `8px 9px 0 ${C.outline}`,
          display: "grid",
          placeItems: "center",
          overflow: "hidden",
        }}
      >
        <MalePortrait variant={portrait} />
      </div>
      <div style={{ marginTop: 24, fontSize: 25, fontWeight: 850, letterSpacing: 2 }}>{name}</div>
    </div>
  );
};

export const Scene22_TaproachChallenge: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const card = spring({ frame: frame - 8, fps, config: { damping: 15, stiffness: 88, mass: 0.82 } });
  const target = spring({ frame: frame - 70, fps, config: { damping: 11, stiffness: 125, mass: 0.65 } });
  const scoreProgress = interpolate(frame, [76, 145], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  const score = Math.round(cfg.targetScore * scoreProgress / 50) * 50;
  const send = spring({ frame: frame - 155, fps, config: { damping: 13, stiffness: 118, mass: 0.72 } });
  const sent = interpolate(frame, [205, 225], [0, 1], clamp);
  const buttonY = interpolate(send, [0, 1], [30, 0]);
  const arrowDraw = interpolate(frame, [172, 215], [0, 1], clamp);
  const cardExit = interpolate(frame, [267, 296], [1, 0], clamp);

  return (
    <AbsoluteFill
      style={{
        background: C.paper,
        color: C.ink,
        fontFamily: THEME.fonts.display,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.14,
          backgroundImage: `radial-gradient(${C.ink} 0.8px, transparent 0.8px)`,
          backgroundSize: "18px 18px",
        }}
      />
      <Confetti />

      <div style={{ position: "absolute", left: 185, top: 402 }}>
        <Avatar name={cfg.challenger} color={C.mustard} portrait="varun" delay={30} />
      </div>
      <div style={{ position: "absolute", right: 185, top: 402 }}>
        <Avatar name={cfg.friend} color={C.blue} portrait="saksham" delay={190} />
      </div>

      <svg
        viewBox="0 0 500 130"
        style={{ position: "absolute", left: 710, top: 452, width: 500, opacity: arrowDraw }}
      >
        <path
          d="M20 74 C150 12 330 16 450 65"
          fill="none"
          stroke={C.ink}
          strokeWidth="8"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - arrowDraw}
        />
        <path d="m425 42 31 24-37 12" fill="none" stroke={C.ink} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" opacity={arrowDraw} />
      </svg>

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 880,
          height: 790,
          marginLeft: -440,
          marginTop: -395,
          background: C.white,
          border: `8px solid ${C.outline}`,
          borderRadius: 38,
          boxShadow: `18px 20px 0 ${C.outline}`,
          opacity: card * cardExit,
          transform: `translateY(${(1 - card) * 90}px) rotate(${(1 - card) * -3}deg) scale(${0.9 + card * 0.1})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "52px 72px",
          boxSizing: "border-box",
        }}
      >
        <div style={{ position: "absolute", top: -67, transform: `rotate(${Math.sin(frame / 15) * 3}deg)` }}>
          <Roach />
        </div>
        <div style={{ marginTop: 34, color: C.tomato, fontSize: 25, fontWeight: 900, letterSpacing: 4 }}>
          FRIEND CHALLENGE
        </div>
        <div style={{ fontSize: 72, lineHeight: 1.02, fontWeight: 900, letterSpacing: -3, marginTop: 27 }}>
          Challenge a friend
        </div>
        <div style={{ fontSize: 35, fontWeight: 620, marginTop: 24 }}>to score</div>

        <div
          style={{
            marginTop: 25,
            padding: "15px 38px 20px",
            background: C.mustard,
            color: C.outline,
            border: `6px solid ${C.outline}`,
            borderRadius: 20,
            boxShadow: `8px 9px 0 ${C.outline}`,
            fontSize: 108,
            lineHeight: 1,
            fontWeight: 950,
            letterSpacing: -6,
            fontVariantNumeric: "tabular-nums",
            opacity: target,
            transform: `scale(${0.72 + target * 0.28}) rotate(${(1 - target) * 4}deg)`,
          }}
        >
          {score.toLocaleString("en-US")}
        </div>
        <div style={{ fontSize: 30, fontWeight: 720, marginTop: 27 }}>in Taproach</div>

        <div
          style={{
            marginTop: 38,
            width: 460,
            height: 86,
            borderRadius: 18,
            background: frame >= 210 ? C.mint : C.tomato,
            color: C.ink,
            border: `6px solid ${C.outline}`,
            boxShadow: frame >= 210 ? "none" : `7px 8px 0 ${C.outline}`,
            display: "grid",
            placeItems: "center",
            fontSize: 29,
            fontWeight: 900,
            letterSpacing: 1.5,
            opacity: send,
            transform: `translateY(${buttonY}px) translate(${frame >= 205 ? 5 : 0}px, ${frame >= 205 ? 6 : 0}px)`,
          }}
        >
          <span style={{ opacity: 1 - sent, position: "absolute" }}>CHALLENGE {cfg.friend} →</span>
          <span style={{ opacity: sent, position: "absolute" }}>CHALLENGE SENT! ✓</span>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          right: 82,
          bottom: 52,
          fontSize: 21,
          fontWeight: 850,
          letterSpacing: 2,
          transform: "rotate(-2deg)",
        }}
      >
        PIXELPICKED
      </div>
    </AbsoluteFill>
  );
};
