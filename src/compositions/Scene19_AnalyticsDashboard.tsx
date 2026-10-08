import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SCENE19_ANALYTICS_DASHBOARD_CONFIG } from "../data/config";
import { THEME } from "../data/theme";

const cfg = SCENE19_ANALYTICS_DASHBOARD_CONFIG;
const C = {
  background: "#0B0D10",
  surface: "#14171D",
  surface2: "#191D24",
  border: "#282D36",
  text: "#F2F3F5",
  muted: "#8E96A3",
  green: "#51D6A0",
  violet: "#7C83FF",
  amber: "#F1BD62",
  red: "#F06C72",
};
const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const Card: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
  delay?: number;
}> = ({ children, style, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 20, stiffness: 115, mass: 0.7 },
  });
  return (
    <div
      style={{
        border: `1px solid ${C.border}`,
        borderRadius: 22,
        background: C.surface,
        opacity: entrance,
        transform: `translateY(${(1 - entrance) * 26}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      color: C.text,
      fontSize: 25,
      fontWeight: 650,
      letterSpacing: -0.6,
      marginBottom: 18,
    }}
  >
    {children}
  </div>
);

const MetricCard: React.FC<{
  metric: (typeof cfg.metrics)[number];
  index: number;
}> = ({ metric, index }) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [18 + index * 7, 74 + index * 7], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  const numeric = Math.round(metric.value * progress);
  const displayed = metric.display.includes("m")
    ? `${Math.floor(numeric / 60)}m ${numeric % 60}s`
    : metric.display.includes("%")
      ? `${numeric}%`
      : numeric.toLocaleString("en-US");
  return (
    <Card
      delay={12 + index * 7}
      style={{ width: 462, height: 164, padding: "25px 27px" }}
    >
      <div style={{ color: C.muted, fontSize: 20 }}>{metric.label}</div>
      <div
        style={{
          color: C.text,
          fontSize: 48,
          fontWeight: 700,
          letterSpacing: -2.2,
          marginTop: 9,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {displayed}
      </div>
      <div style={{ color: C.green, fontSize: 17, marginTop: 4 }}>
        ↑ {metric.delta}
      </div>
    </Card>
  );
};

const RetentionCard: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [70, 160], [0, 1], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const width = 850;
  const height = 220;
  const points = cfg.retention.map((value, index) => ({
    x: 20 + (index / (cfg.retention.length - 1)) * (width - 40),
    y: 18 + ((100 - value) / 80) * (height - 52),
  }));
  const path = points
    .map((point, index) => `${index === 0 ? "M" : "L"}${point.x},${point.y}`)
    .join(" ");
  return (
    <Card delay={48} style={{ padding: 28, height: 360 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <SectionTitle>Player retention</SectionTitle>
        <div style={{ color: C.green, fontSize: 19 }}>D7 · 31%</div>
      </div>
      <svg width="100%" height={238} viewBox={`0 0 ${width} ${height}`}>
        {[0, 1, 2, 3].map((row) => (
          <line
            key={row}
            x1={20}
            x2={width - 20}
            y1={20 + row * 52}
            y2={20 + row * 52}
            stroke={C.border}
            strokeWidth={1}
          />
        ))}
        <path
          d={path}
          fill="none"
          stroke={C.green}
          strokeWidth={7}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - progress}
        />
        {points.map((point, index) => (
          <g key={index} opacity={interpolate(progress, [index / 9, index / 9 + 0.12], [0, 1], clamp)}>
            <circle cx={point.x} cy={point.y} r={7} fill={C.background} stroke={C.green} strokeWidth={4} />
            <text x={point.x} y={height - 6} textAnchor="middle" fill={C.muted} fontSize={15}>
              D{index}
            </text>
          </g>
        ))}
      </svg>
    </Card>
  );
};

const FunnelCard: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Card delay={95} style={{ padding: 28, height: 420 }}>
      <SectionTitle>Discovery → feedback funnel</SectionTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: 17 }}>
        {cfg.funnel.map((step, index) => {
          const progress = interpolate(frame, [115 + index * 13, 175 + index * 13], [0, 1], {
            ...clamp,
            easing: Easing.out(Easing.cubic),
          });
          return (
            <div key={step.label}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ color: C.text, fontSize: 18 }}>{step.label}</span>
                <span style={{ color: C.muted, fontSize: 17 }}>
                  {step.value.toLocaleString("en-US")} · {step.percent}%
                </span>
              </div>
              <div style={{ height: 17, borderRadius: 9, background: C.surface2, overflow: "hidden" }}>
                <div
                  style={{
                    width: `${step.percent * progress}%`,
                    height: "100%",
                    borderRadius: 9,
                    background: index < 2 ? C.violet : C.green,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

const HeatmapCard: React.FC = () => {
  const frame = useCurrentFrame();
  const hotspots = [
    { x: 54, y: 68, size: 82, color: C.red },
    { x: 76, y: 35, size: 62, color: C.amber },
    { x: 30, y: 42, size: 48, color: C.violet },
    { x: 64, y: 78, size: 42, color: C.red },
  ];
  return (
    <Card delay={145} style={{ padding: 28, height: 555 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <SectionTitle>Interaction heatmap</SectionTitle>
        <span style={{ color: C.muted, fontSize: 17 }}>12,482 sessions</span>
      </div>
      <div
        style={{
          position: "relative",
          height: 445,
          borderRadius: 15,
          overflow: "hidden",
          background: "#222733",
          border: `1px solid ${C.border}`,
        }}
      >
        <div style={{ position: "absolute", left: 40, top: 38, width: 350, height: 28, borderRadius: 8, background: "#39404E" }} />
        <div style={{ position: "absolute", left: 40, top: 84, width: 260, height: 18, borderRadius: 7, background: "#303744" }} />
        <div style={{ position: "absolute", left: 70, right: 70, top: 150, bottom: 76, borderRadius: 24, border: "2px solid #39404E" }} />
        <div style={{ position: "absolute", left: 330, bottom: 26, width: 220, height: 48, borderRadius: 24, background: "#3A4150" }} />
        {hotspots.map((spot, index) => {
          const entrance = interpolate(frame, [175 + index * 15, 220 + index * 15], [0, 1], clamp);
          const pulse = 1 + Math.sin((frame - index * 11) * 0.12) * 0.09;
          return (
            <div
              key={index}
              style={{
                position: "absolute",
                left: `${spot.x}%`,
                top: `${spot.y}%`,
                width: spot.size,
                height: spot.size,
                borderRadius: "50%",
                background: spot.color,
                opacity: entrance * 0.42,
                filter: "blur(13px)",
                transform: `translate(-50%, -50%) scale(${pulse})`,
              }}
            />
          );
        })}
      </div>
    </Card>
  );
};

const SignalCard: React.FC<{
  title: string;
  items: ReadonlyArray<{ label: string; value: string }>;
  delay: number;
  accent: string;
}> = ({ title, items, delay, accent }) => (
  <Card delay={delay} style={{ width: 462, minHeight: 345, padding: 27 }}>
    <SectionTitle>{title}</SectionTitle>
    <div style={{ display: "flex", flexDirection: "column", gap: 21 }}>
      {items.map((item, index) => (
        <div key={item.label} style={{ display: "flex", justifyContent: "space-between", gap: 18 }}>
          <span style={{ color: C.muted, fontSize: 17 }}>{item.label}</span>
          <span style={{ color: index === 0 ? accent : C.text, fontSize: 17, fontWeight: 650, textAlign: "right" }}>
            {item.value}
          </span>
        </div>
      ))}
    </div>
  </Card>
);

const FeedbackCard: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [285, 390], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  return (
    <Card delay={255} style={{ padding: 28, height: 380 }}>
      <SectionTitle>Player feedback</SectionTitle>
      <div style={{ display: "flex", gap: 32, alignItems: "baseline" }}>
        <span style={{ color: C.text, fontSize: 68, fontWeight: 720, letterSpacing: -3 }}>82%</span>
        <span style={{ color: C.green, fontSize: 20 }}>positive sentiment</span>
      </div>
      <div style={{ display: "flex", height: 18, borderRadius: 9, overflow: "hidden", margin: "22px 0 28px" }}>
        <div style={{ width: `${82 * progress}%`, background: C.green }} />
        <div style={{ width: `${12 * progress}%`, background: C.amber }} />
        <div style={{ width: `${6 * progress}%`, background: C.red }} />
      </div>
      <div style={{ color: C.muted, fontSize: 17, marginBottom: 14 }}>Recurring signals</div>
      {["Controls feel immediate", "Checkpoint 3 is unclear", "Players want longer runs"].map((signal, index) => (
        <div key={signal} style={{ display: "flex", justifyContent: "space-between", padding: "13px 0", borderTop: `1px solid ${C.border}`, color: C.text, fontSize: 17 }}>
          <span>{signal}</span><span style={{ color: C.muted }}>{[284, 96, 71][index]} mentions</span>
        </div>
      ))}
    </Card>
  );
};

export const Scene19_AnalyticsDashboard: React.FC = () => {
  const frame = useCurrentFrame();
  const scrollY = interpolate(frame, [165, 520], [0, -1120], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const pageOpacity = interpolate(frame, [0, 14, cfg.duration - 18, cfg.duration], [0, 1, 1, 0], clamp);

  return (
    <AbsoluteFill
      style={{
        background: C.background,
        color: C.text,
        fontFamily: THEME.fonts.display,
        overflow: "hidden",
        opacity: pageOpacity,
      }}
    >
      <div
        style={{
          position: "absolute",
          zIndex: 5,
          left: 0,
          right: 0,
          top: 0,
          height: 205,
          padding: "54px 60px 30px",
          background: C.background,
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ color: C.text, fontSize: 38, fontWeight: 700, letterSpacing: -1.6 }}>Player analytics</div>
            <div style={{ color: C.muted, fontSize: 18, marginTop: 9 }}>{cfg.game} · {cfg.build}</div>
          </div>
          <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 17px", color: C.muted, fontSize: 17 }}>{cfg.period}</div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 60,
          right: 60,
          top: 240,
          transform: `translateY(${scrollY}px)`,
        }}
      >
        <SectionTitle>Overview</SectionTitle>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 18 }}>
          {cfg.metrics.map((metric, index) => <MetricCard key={metric.label} metric={metric} index={index} />)}
        </div>
        <div style={{ height: 30 }} />
        <RetentionCard />
        <div style={{ height: 24 }} />
        <FunnelCard />
        <div style={{ height: 24 }} />
        <HeatmapCard />
        <div style={{ height: 24 }} />
        <div style={{ display: "flex", gap: 18 }}>
          <SignalCard title="Challenge behavior" items={cfg.behavior} delay={205} accent={C.violet} />
          <SignalCard title="Stability & friction" items={cfg.stability} delay={220} accent={C.green} />
        </div>
        <div style={{ height: 24 }} />
        <FeedbackCard />
        <div style={{ height: 80 }} />
      </div>
    </AbsoluteFill>
  );
};
