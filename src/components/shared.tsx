import React from "react";
import {
  AbsoluteFill,
  Video,
  Img,
  interpolate,
  useCurrentFrame,
  staticFile,
} from "remotion";
import { THEME } from "../data/theme";

interface TextProps {
  children: React.ReactNode;
  size?: number;
  weight?: number;
  color?: string;
  letterSpacing?: number;
  lineHeight?: number;
  align?: "left" | "center" | "right";
  style?: React.CSSProperties;
}

export const Display: React.FC<TextProps> = ({
  children,
  size = 72,
  weight = 900,
  color = THEME.colors.primary,
  letterSpacing = -2,
  lineHeight = 1,
  align = "center",
  style,
}) => (
  <div
    style={{
      fontFamily: THEME.fonts.display,
      fontSize: size,
      fontWeight: weight,
      color,
      letterSpacing,
      lineHeight,
      textAlign: align,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Body: React.FC<TextProps> = ({
  children,
  size = 24,
  weight = 400,
  color = THEME.colors.secondary,
  letterSpacing = -0.3,
  lineHeight = 1.5,
  align = "center",
  style,
}) => (
  <div
    style={{
      fontFamily: THEME.fonts.body,
      fontSize: size,
      fontWeight: weight,
      color,
      letterSpacing,
      lineHeight,
      textAlign: align,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Label: React.FC<TextProps> = ({
  children,
  size = 12,
  weight = 600,
  color = THEME.colors.tertiary,
  letterSpacing = 3,
  style,
}) => (
  <div
    style={{
      fontFamily: THEME.fonts.body,
      fontSize: size,
      fontWeight: weight,
      color,
      letterSpacing,
      textTransform: "uppercase",
      ...style,
    }}
  >
    {children}
  </div>
);

export const LOGO_SRC: string | null = staticFile("favicon.svg");

/** Resolve files uploaded by Creator Studio without changing existing URLs. */
export const resolveStudioMedia = (src: string) =>
  src.startsWith("/uploads/") ? staticFile(src.slice(1)) : src;

interface LogoProps {
  size?: number;
  showText?: boolean;
  opacity?: number;
  color?: string;
}

export const PixelPickedLogo: React.FC<LogoProps> = ({
  size = 400,
  showText = false,
  opacity = 1,
  color = "#000000",
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: showText ? 16 : 0,
      opacity,
    }}
  >
    {/* Logo mark */}
    {LOGO_SRC ? (
      <img
        src={LOGO_SRC}
        style={{ width: size, height: size, objectFit: "contain" }}
      />
    ) : (
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="4" y="4" width="9" height="9" rx="2" fill={color} />
        <rect x="16" y="4" width="9" height="9" rx="2" fill={color} />
        <rect x="28" y="4" width="9" height="9" rx="2" fill={color} />
        <rect x="4" y="16" width="9" height="9" rx="2" fill={color} />
        <rect x="28" y="16" width="9" height="9" rx="2" fill={color} />
        <rect x="4" y="28" width="9" height="9" rx="2" fill={color} />
        <rect x="16" y="28" width="9" height="9" rx="2" fill={color} />
        <rect
          x="4"
          y="40"
          width="9"
          height="9"
          rx="2"
          fill={color}
          opacity="0.25"
        />
        <rect
          x="16"
          y="40"
          width="9"
          height="9"
          rx="2"
          fill={THEME.colors.accent}
        />
      </svg>
    )}

    {/* Text BELOW the icon — no overlap */}
    {showText && (
      <div
        style={{
          fontFamily: THEME.fonts.display,
          fontSize: size * 0.55,
          fontWeight: 700,
          color,
          letterSpacing: -1.5,
          lineHeight: 1,
          textAlign: "center",
        }}
      >
        PixelPicked
      </div>
    )}
  </div>
);

export const SceneBranding: React.FC<{ light?: boolean }> = ({
  light = false,
}) => {
  const color = light ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.6)";
  const dotColor = light ? "#FFFFFF" : THEME.colors.primary;
  const dotSize = 5;
  const gap = 2;
  return (
    <div
      style={{
        position: "absolute",
        top: 52,
        right: 52,
        display: "flex",
        alignItems: "center",
        gap: 10,
        zIndex: 100,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          width: 18,
          height: 18,
          display: "grid",
          gridTemplateColumns: `repeat(3, ${dotSize}px)`,
          gridTemplateRows: `repeat(3, ${dotSize}px)`,
          gap,
        }}
      >
        {[1, 1, 0, 1, 0, 1, 0, 1, 1].map((on, i) => (
          <div
            key={i}
            style={{
              width: dotSize,
              height: dotSize,
              background: on ? dotColor : "transparent",
              borderRadius: 0.5,
            }}
          />
        ))}
      </div>
      <div
        style={{
          fontFamily: THEME.fonts.display,
          fontSize: 22,
          fontWeight: 700,
          color,
          letterSpacing: -0.5,
        }}
      >
        PixelPicked
      </div>
    </div>
  );
};

export const LaptopMockup: React.FC<{
  children: React.ReactNode;
  width?: number;
}> = ({ children, width = 860 }) => {
  const height = width * 0.625;
  const baseW = width * 1.06;
  const baseH = height * 0.06;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.18))",
      }}
    >
      <div
        style={{
          width,
          height,
          background: "#1a1a1a",
          borderRadius: 16,
          padding: `${height * 0.05}px ${width * 0.06}px ${height * 0.04}px`,
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: height * 0.025,
            left: "50%",
            transform: "translateX(-50%)",
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#333",
          }}
        />
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "#FFF",
            borderRadius: 6,
            overflow: "hidden",
          }}
        >
          {children}
        </div>
      </div>
      <div
        style={{
          width: baseW,
          height: baseH,
          background: "linear-gradient(180deg, #C8C8C8 0%, #A8A8A8 100%)",
          borderRadius: "0 0 12px 12px",
          borderTop: "2px solid #E0E0E0",
        }}
      />
    </div>
  );
};

export const BgVideo: React.FC<{
  src: string;
  startFrom?: number;
  endScale?: number;
  opacity?: number;
  muted?: boolean;
}> = ({
  src,
  startFrom = 0,
  endScale = 1.08,
  opacity = 1,
  muted = false,
}) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 400], [1, endScale], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ opacity }}>
      <Video
        src={src}
        startFrom={startFrom}
        muted={muted}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.35) 100%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};

export const NoiseOverlay: React.FC = () => (
  <AbsoluteFill
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
      opacity: 0.4,
      pointerEvents: "none",
      mixBlendMode: "overlay",
    }}
  />
);

export const WhiteFlash: React.FC<{ opacity: number }> = ({ opacity }) => (
  <AbsoluteFill
    style={{ background: "#FFF", opacity, pointerEvents: "none" }}
  />
);

export const AccentDivider: React.FC<{
  width?: number | string;
  height?: number;
  color?: string;
  style?: React.CSSProperties;
}> = ({ width = 80, height = 3, color = THEME.colors.accent, style }) => (
  <div
    style={{ width, height, background: color, borderRadius: 2, ...style }}
  />
);
