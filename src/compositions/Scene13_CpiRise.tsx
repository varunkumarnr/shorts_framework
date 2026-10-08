import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SCENE13_CPI_RISE_CONFIG } from "../data/config";
import { THEME } from "../data/theme";

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const GRAPH = {
  left: 150,
  top: 260,
  width: 1620,
  height: 600,
};

const PointChip: React.FC<{
  x: number;
  y: number;
  value: string;
  year: string;
  index: number;
  active: boolean;
}> = ({ x, y, value, year, index, active }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const delay = SCENE13_CPI_RISE_CONFIG.pointFrames[index];
  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, stiffness: 210, mass: 0.55 },
  });
  const opacity = interpolate(frame, [delay - 4, delay + 5], [0, 1], clamp);
  const chipX =
    index === 0
      ? x + 8
      : index === SCENE13_CPI_RISE_CONFIG.points.length - 1
        ? x - 158
        : x - 74;

  return (
    <g opacity={opacity}>
      <circle
        cx={x}
        cy={y}
        r={active ? 17 + Math.sin(frame * 0.45) * 3 : 11}
        fill={SCENE13_CPI_RISE_CONFIG.colors.line}
        stroke="rgba(0,0,0,0.68)"
        strokeWidth={6}
      />
      <foreignObject
        x={chipX}
        y={y - 112 - 16 * entrance}
        width={166}
        height={82}
        style={{ overflow: "visible" }}
      >
        <div
          style={{
            display: "inline-flex",
            padding: "12px 17px",
            borderRadius: 15,
            background: active
              ? SCENE13_CPI_RISE_CONFIG.colors.line
              : "rgba(9,9,9,0.88)",
            border: `2px solid ${
              active
                ? SCENE13_CPI_RISE_CONFIG.colors.line
                : "rgba(255,255,255,0.28)"
            }`,
            boxShadow: active
              ? `0 0 34px ${SCENE13_CPI_RISE_CONFIG.colors.glow}`
              : "0 8px 26px rgba(0,0,0,0.32)",
            color: active ? "#080808" : "#FFFFFF",
            fontFamily: THEME.fonts.display,
            fontSize: 30,
            fontWeight: 950,
            letterSpacing: -1.2,
            lineHeight: 1,
            transform: `scale(${0.7 + entrance * 0.3})`,
            transformOrigin: "bottom center",
            whiteSpace: "nowrap",
          }}
        >
          {value}
        </div>
      </foreignObject>
      <text
        x={x}
        y={GRAPH.top + GRAPH.height + 54}
        textAnchor="middle"
        fill="rgba(255,255,255,0.76)"
        stroke="rgba(0,0,0,0.7)"
        strokeWidth={5}
        paintOrder="stroke"
        fontFamily={THEME.fonts.body}
        fontSize={25}
        fontWeight={800}
        letterSpacing={0.5}
      >
        {year}
      </text>
    </g>
  );
};

export const Scene13_CpiRise: React.FC = () => {
  const frame = useCurrentFrame();
  const cfg = SCENE13_CPI_RISE_CONFIG;

  const points = cfg.points.map((point, index) => ({
    ...point,
    x: GRAPH.left + (index / (cfg.points.length - 1)) * GRAPH.width,
    y: GRAPH.top + GRAPH.height * (1 - point.normalizedValue),
  }));

  const linePath = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${
    GRAPH.top + GRAPH.height
  } L ${points[0].x} ${GRAPH.top + GRAPH.height} Z`;

  const lineProgress = interpolate(
    frame,
    [cfg.lineStartFrame, cfg.lineEndFrame],
    [0, 1],
    { ...clamp, easing: Easing.inOut(Easing.cubic) },
  );
  const gridOpacity = interpolate(frame, [0, 15], [0, 0.72], clamp);
  const titleEntrance = spring({
    frame: frame - 3,
    fps: cfg.canvas.fps,
    config: { damping: 18, stiffness: 170 },
  });
  const finalPoint = points[points.length - 1];
  const spike = interpolate(frame, [105, 132], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.exp),
  });
  const cameraScale = interpolate(frame, [104, 140], [1, 1.075], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  const jitter = frame > 118 && frame < 137 ? Math.sin(frame * 2.4) * 3 : 0;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "transparent",
        color: "#FFFFFF",
        fontFamily: THEME.fonts.display,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `translate(${jitter}px, ${-jitter * 0.45}px) scale(${cameraScale})`,
          transformOrigin: "76% 43%",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 92,
            top: 112,
            opacity: titleEntrance,
            transform: `translateY(${(1 - titleEntrance) * 30}px)`,
            fontSize: 36,
            fontWeight: 950,
            letterSpacing: 5,
            textShadow: "0 3px 14px rgba(0,0,0,0.9)",
          }}
        >
          COST PER INSTALL
        </div>

        <svg
          width="1920"
          height="1080"
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", inset: 0, overflow: "visible" }}
        >
          <defs>
            <linearGradient id="cpi-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={cfg.colors.line} stopOpacity="0.22" />
              <stop offset="100%" stopColor={cfg.colors.line} stopOpacity="0" />
            </linearGradient>
            <filter id="cpi-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="12" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <clipPath id="cpi-reveal">
              <rect
                x={GRAPH.left - 30}
                y={GRAPH.top - 160}
                width={(GRAPH.width + 70) * lineProgress}
                height={GRAPH.height + 260}
              />
            </clipPath>
          </defs>

          <g opacity={gridOpacity}>
            {[0, 0.25, 0.5, 0.75, 1].map((step) => {
              const y = GRAPH.top + GRAPH.height * step;
              return (
                <line
                  key={step}
                  x1={GRAPH.left}
                  x2={GRAPH.left + GRAPH.width}
                  y1={y}
                  y2={y}
                  stroke="rgba(255,255,255,0.22)"
                  strokeWidth={2}
                  strokeDasharray="8 14"
                />
              );
            })}
            <line
              x1={GRAPH.left}
              x2={GRAPH.left + GRAPH.width}
              y1={GRAPH.top + GRAPH.height}
              y2={GRAPH.top + GRAPH.height}
              stroke="rgba(255,255,255,0.62)"
              strokeWidth={4}
            />
          </g>

          <g clipPath="url(#cpi-reveal)">
            <path d={areaPath} fill="url(#cpi-area)" />
            <path
              d={linePath}
              fill="none"
              stroke={cfg.colors.line}
              strokeWidth={18}
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#cpi-glow)"
            />
          </g>

          {points.map((point, index) => (
            <PointChip
              key={point.year}
              x={point.x}
              y={point.y}
              value={point.value}
              year={point.year}
              index={index}
              active={index === points.length - 1 && spike > 0.2}
            />
          ))}

          {spike > 0 && (
            <>
              <circle
                cx={finalPoint.x}
                cy={finalPoint.y}
                r={32 + spike * 32}
                fill="none"
                stroke={cfg.colors.line}
                strokeWidth={5}
                opacity={(1 - spike) * 0.85}
              />
              <path
                d={`M ${finalPoint.x - 25} ${finalPoint.y - 64} L ${
                  finalPoint.x
                } ${finalPoint.y - 104} L ${finalPoint.x + 25} ${
                  finalPoint.y - 64
                }`}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth={9}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={spike}
              />
            </>
          )}
        </svg>
      </div>
    </AbsoluteFill>
  );
};
