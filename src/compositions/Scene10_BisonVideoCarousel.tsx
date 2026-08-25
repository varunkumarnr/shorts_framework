import React from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  Video,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  InstagramCarouselSlide,
  SCENE10_BISON_VIDEO_CAROUSEL_CONFIG,
} from "../data/config";
import {
  PixelPickedLogo,
  SceneBranding,
} from "../components/shared";
import { THEME } from "../data/theme";

const FullBleedMedia: React.FC<{ slide: InstagramCarouselSlide }> = ({
  slide,
}) => {
  const frame = useCurrentFrame();
  if (slide.media.type === "brand") {
    return (
      <AbsoluteFill
        style={{
          background: slide.media.backgroundColor ?? "#F4F4F0",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <PixelPickedLogo size={190} showText />
      </AbsoluteFill>
    );
  }

  const mediaStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: slide.media.fit ?? "cover",
    objectPosition: slide.media.position ?? "center",
    transform: `scale(${1.04 + frame * 0.00008})`,
  };

  return slide.media.type === "image" ? (
    <Img src={slide.media.src} style={mediaStyle} />
  ) : (
    <Video
      src={slide.media.src}
      startFrom={slide.media.startFrom ?? 0}
      muted
      style={mediaStyle}
    />
  );
};

const MotionText: React.FC<{
  slide: InstagramCarouselSlide;
  align?: "left" | "center";
  headlineSize: number;
}> = ({ slide, align = "left", headlineSize }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cfg = SCENE10_BISON_VIDEO_CAROUSEL_CONFIG;
  const enter = spring({
    frame: frame - 8,
    fps,
    config: { damping: 22, stiffness: 92, mass: 0.8 },
  });
  const opacity = interpolate(
    frame,
    [0, 18, cfg.slideDuration - 22, cfg.slideDuration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${(1 - enter) * 28}px)`,
        textAlign: align,
        display: "flex",
        flexDirection: "column",
        alignItems: align === "center" ? "center" : "flex-start",
      }}
    >
      <div
        style={{
          marginBottom: 20,
          fontFamily: THEME.fonts.body,
          fontSize: 18,
          fontWeight: 900,
          letterSpacing: 3.4,
          color: slide.accentColor ?? THEME.colors.accent,
          textTransform: "uppercase",
        }}
      >
        {slide.eyebrow}
      </div>
      <div
        style={{
          fontFamily: THEME.fonts.display,
          fontSize: slide.headlineSize ?? headlineSize,
          fontWeight: 950,
          letterSpacing: -4.2,
          lineHeight: 0.91,
          whiteSpace: "pre-line",
          color: slide.textColor ?? "#FFFFFF",
          textShadow: "0 6px 28px rgba(0,0,0,0.35)",
        }}
      >
        {slide.headline}
      </div>
      {slide.body && (
        <div
          style={{
            marginTop: 26,
            maxWidth: 820,
            fontFamily: THEME.fonts.body,
            fontSize: slide.bodySize ?? 27,
            fontWeight: 600,
            letterSpacing: -0.5,
            lineHeight: 1.35,
            color: "rgba(255,255,255,0.78)",
          }}
        >
          {slide.body}
        </div>
      )}
      {slide.detail && (
        <div
          style={{
            marginTop: 24,
            padding: "12px 18px",
            border: `2px solid ${slide.accentColor ?? THEME.colors.accent}`,
            borderRadius: 10,
            fontFamily: THEME.fonts.body,
            fontSize: 18,
            fontWeight: 850,
            letterSpacing: 1.4,
            color: "#FFFFFF",
            textTransform: "uppercase",
          }}
        >
          {slide.detail}
        </div>
      )}
    </div>
  );
};

const MotionDots: React.FC<{ index: number }> = ({ index }) => {
  const cfg = SCENE10_BISON_VIDEO_CAROUSEL_CONFIG;
  return (
    <div
      style={{
        position: "absolute",
        left: 54,
        bottom: 42,
        display: "flex",
        gap: 8,
        zIndex: 30,
      }}
    >
      {cfg.slides.map((_, dotIndex) => (
        <div
          key={dotIndex}
          style={{
            width: dotIndex === index ? 34 : 8,
            height: 8,
            borderRadius: 99,
            background:
              dotIndex === index ? THEME.colors.accent : "rgba(255,255,255,0.28)",
          }}
        />
      ))}
    </div>
  );
};

const MotionSlide: React.FC<{
  slide: InstagramCarouselSlide;
  index: number;
}> = ({ slide, index }) => {
  const frame = useCurrentFrame();
  const cfg = SCENE10_BISON_VIDEO_CAROUSEL_CONFIG;
  const fade = Math.min(cfg.transitionDuration, cfg.slideDuration / 3);
  const opacity = interpolate(
    frame,
    [0, fade, cfg.slideDuration - fade, cfg.slideDuration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const isCover = slide.layout === "cover";
  const isCta = slide.layout === "cta";

  return (
    <AbsoluteFill style={{ opacity, background: cfg.backgroundColor }}>
      <FullBleedMedia slide={slide} />
      <AbsoluteFill
        style={{
          background: isCta
            ? "linear-gradient(145deg, rgba(0,0,0,0.92), rgba(0,0,0,0.68))"
            : isCover
              ? "linear-gradient(to top, #050505 0%, rgba(5,5,5,0.94) 30%, rgba(5,5,5,0.08) 72%)"
              : slide.layout === "split"
                ? "linear-gradient(90deg, rgba(0,0,0,0.91) 0%, rgba(0,0,0,0.62) 54%, rgba(0,0,0,0.08) 100%)"
                : "linear-gradient(115deg, rgba(0,0,0,0.91) 0%, rgba(0,0,0,0.58) 60%, rgba(0,0,0,0.08) 100%)",
        }}
      />

      {cfg.branding.enabled && !isCta && (
        <SceneBranding light={cfg.branding.light} />
      )}

      {isCover ? (
        <AbsoluteFill style={{ justifyContent: "flex-end", padding: "0 64px 130px" }}>
          <MotionText slide={slide} headlineSize={96} />
        </AbsoluteFill>
      ) : isCta ? (
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: "80px 72px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 26,
              width: "100%",
            }}
          >
            <PixelPickedLogo size={88} showText={false} />
            <MotionText slide={slide} align="center" headlineSize={82} />
            <div
              style={{
                fontFamily: THEME.fonts.display,
                fontSize: 34,
                fontWeight: 900,
                color: "#FFFFFF",
              }}
            >
              PixelPicked
            </div>
          </div>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill
          style={{
            justifyContent: slide.layout === "split" ? "center" : "flex-start",
            padding: slide.layout === "split" ? "80px 64px" : "150px 64px",
          }}
        >
          <MotionText
            slide={slide}
            headlineSize={slide.layout === "split" ? 82 : 88}
          />
        </AbsoluteFill>
      )}

      <MotionDots index={index} />
      <div
        style={{
          position: "absolute",
          right: 50,
          bottom: 40,
          fontFamily: THEME.fonts.body,
          fontSize: 15,
          fontWeight: 800,
          letterSpacing: 2.2,
          color: "rgba(255,255,255,0.46)",
          textTransform: "uppercase",
        }}
      >
        Bison Attack! · {String(index + 1).padStart(2, "0")}
      </div>
    </AbsoluteFill>
  );
};

export const Scene10_BisonVideoCarousel: React.FC = () => {
  const cfg = SCENE10_BISON_VIDEO_CAROUSEL_CONFIG;
  return (
    <AbsoluteFill style={{ background: cfg.backgroundColor, overflow: "hidden" }}>
      {cfg.slides.map((slide, index) => (
        <Sequence
          key={`${slide.headline}-${index}`}
          from={index * cfg.slideDuration}
          durationInFrames={cfg.slideDuration}
        >
          <MotionSlide slide={slide} index={index} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
