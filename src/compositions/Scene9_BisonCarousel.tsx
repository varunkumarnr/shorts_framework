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
  InstagramEditorialCarouselProps,
  InstagramCarouselSlide,
  SCENE9_BISON_CAROUSEL_CONFIG,
} from "../data/config";
import {
  PixelPickedLogo,
  resolveStudioMedia,
  SceneBranding,
} from "../components/shared";
import { THEME } from "../data/theme";

const HOOK_FONT =
  "Impact, 'Arial Narrow', 'Helvetica Neue Condensed Bold', sans-serif";
const STORY_FONT =
  "'Arial Narrow', 'Helvetica Neue Condensed', 'Roboto Condensed', sans-serif";

const EditorialText: React.FC<{
  slide: InstagramCarouselSlide;
  slideDuration: number;
  isHook: boolean;
  headlineSize?: number;
}> = ({ slide, slideDuration, isHook, headlineSize = 74 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({
    frame: frame - 8,
    fps,
    config: { damping: 22, stiffness: 92, mass: 0.8 },
  });
  const opacity = interpolate(
    frame,
    [0, 18, slideDuration - 22, slideDuration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${(1 - enter) * 28}px)`,
        width: "100%",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontFamily: slide.fontFamily ?? (isHook ? HOOK_FONT : STORY_FONT),
          fontSize: slide.headlineSize ?? headlineSize,
          fontWeight: slide.fontWeight ?? (isHook ? 900 : 500),
          fontStretch: "condensed",
          letterSpacing: isHook ? -1.8 : -1.2,
          lineHeight: isHook ? 0.94 : 1.03,
          whiteSpace: "pre-line",
          color: slide.textColor ?? "#FFFFFF",
          textTransform: isHook ? "uppercase" : "none",
          textShadow: "0 6px 28px rgba(0,0,0,0.35)",
        }}
      >
        {slide.headlineSegments?.length
          ? slide.headlineSegments.map((segment, index) => (
              <span
                key={`${segment.text}-${index}`}
                style={{
                  color: segment.color,
                  fontWeight: segment.fontWeight ?? "inherit",
                }}
              >
                {segment.text}
              </span>
            ))
          : slide.headline}
      </div>
      {slide.body && (
        <div
          style={{
            marginTop: 18,
            maxWidth: 820,
            fontFamily: THEME.fonts.body,
            fontSize: slide.bodySize ?? 23,
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
            marginTop: 16,
            padding: "10px 15px",
            border: `2px solid ${slide.accentColor ?? THEME.colors.accent}`,
            borderRadius: 10,
            fontFamily: THEME.fonts.body,
            fontSize: 16,
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

const SlideCounter: React.FC<{
  index: number;
  slideCount: number;
  accentColor?: string;
}> = ({ index, slideCount, accentColor }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: 54,
        bottom: 28,
        display: "flex",
        gap: 8,
        zIndex: 30,
      }}
    >
      {Array.from({ length: slideCount }, (_, dotIndex) => (
        <div
          key={dotIndex}
          style={{
            width: dotIndex === index ? 34 : 8,
            height: 8,
            borderRadius: 99,
            background:
              dotIndex === index
                ? accentColor ?? THEME.colors.accent
                : "rgba(255,255,255,0.28)",
          }}
        />
      ))}
    </div>
  );
};

const PixelPickedBrandMedia: React.FC<{
  backgroundColor?: string;
  foregroundColor?: string;
  accentColors?: [string, string, string];
}> = ({
  backgroundColor = "#F4F4F0",
  foregroundColor = "#050505",
  accentColors = ["#FF4D8D", "#C7F000", "#8B5CF6"],
}) => (
  <AbsoluteFill
    style={{
      background: backgroundColor,
      color: foregroundColor,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: 0.06,
        backgroundImage: `linear-gradient(${foregroundColor} 1px, transparent 1px), linear-gradient(90deg, ${foregroundColor} 1px, transparent 1px)`,
        backgroundSize: "58px 58px",
      }}
    />
    <div
      style={{
        position: "absolute",
        width: 330,
        height: 330,
        borderRadius: "50%",
        left: -90,
        top: -105,
        background: accentColors[0],
        opacity: 0.92,
      }}
    />
    <div
      style={{
        position: "absolute",
        width: 250,
        height: 250,
        borderRadius: 44,
        right: -55,
        bottom: -62,
        background: accentColors[1],
        transform: "rotate(18deg)",
        opacity: 0.94,
      }}
    />
    <div
      style={{
        position: "absolute",
        width: 118,
        height: 118,
        borderRadius: "50%",
        right: 105,
        top: 70,
        border: `22px solid ${accentColors[2]}`,
      }}
    />
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 24,
      }}
    >
      <PixelPickedLogo size={150} showText={false} />
      <div
        style={{
          fontFamily: THEME.fonts.display,
          fontSize: 82,
          fontWeight: 950,
          letterSpacing: -5,
          lineHeight: 1,
        }}
      >
        PixelPicked.
      </div>
      <div
        style={{
          fontFamily: THEME.fonts.body,
          fontSize: 20,
          fontWeight: 850,
          letterSpacing: 3.2,
          textTransform: "uppercase",
          opacity: 0.58,
        }}
      >
        The missing layer of mobile gaming
      </div>
    </div>
  </AbsoluteFill>
);

const CarouselSlide: React.FC<{
  slide: InstagramCarouselSlide;
  index: number;
  slideCount: number;
  slideDuration: number;
  gameName: string;
}> = ({ slide, index, slideCount, slideDuration, gameName }) => {
  const cfg = SCENE9_BISON_CAROUSEL_CONFIG;
  const frame = useCurrentFrame();
  const fade = Math.min(cfg.transitionDuration, slideDuration / 3);
  const sceneOpacity = interpolate(
    frame,
    [0, fade, slideDuration - fade, slideDuration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const isCover = slide.layout === "cover";
  const isCta = slide.layout === "cta";
  const mediaHeight = cfg.layout.topMediaHeight;
  const headlineSize = isCover
    ? 80
    : isCta
      ? 66
      : slide.layout === "split"
        ? 61
        : index === 3
          ? 70
          : 64;

  return (
    <AbsoluteFill style={{ background: "#050505", opacity: sceneOpacity }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: mediaHeight,
          overflow: "hidden",
        }}
      >
        {slide.media.type === "brand" ? (
          <PixelPickedBrandMedia
            backgroundColor={slide.media.backgroundColor}
            foregroundColor={slide.media.foregroundColor}
            accentColors={slide.media.accentColors}
          />
        ) : slide.media.type === "image" ? (
          <Img
            src={resolveStudioMedia(slide.media.src)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: slide.media.fit ?? "cover",
              objectPosition: slide.media.position ?? "center",
              imageRendering: slide.media.pixelated ? "pixelated" : "auto",
            }}
          />
        ) : (
          <Video
            src={resolveStudioMedia(slide.media.src)}
            startFrom={slide.media.startFrom ?? 0}
            muted
            style={{
              width: "100%",
              height: "100%",
              objectFit: slide.media.fit ?? "cover",
              objectPosition: slide.media.position ?? "center",
              transform: `scale(${1.04 + frame * 0.00008})`,
            }}
          />
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.02), rgba(0,0,0,0.32))",
          }}
        />
        {slide.decorations !== false && slide.media.type !== "brand" && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(135deg, transparent 55%, ${slide.accentColor ?? "#FF4D8D"} 145%)`,
              mixBlendMode: "screen",
              opacity: 0.5,
            }}
          />
        )}
        {cfg.branding.enabled && slide.media.type !== "brand" && (
          <SceneBranding light={cfg.branding.light} />
        )}
      </div>

      <div
        style={{
          position: "absolute",
          top: mediaHeight - 1,
          left: 54,
          right: 54,
          height: 2,
          background: cfg.layout.dividerColor,
          zIndex: 20,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: mediaHeight - 27,
          left: "50%",
          transform: "translateX(-50%)",
          width: 54,
          height: 54,
          borderRadius: "50%",
          background: "#FFFFFF",
          border: "3px solid #050505",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 21,
        }}
      >
        <PixelPickedLogo size={34} showText={false} />
      </div>

      <div
        style={{
          position: "absolute",
          top: mediaHeight,
          left: 0,
          right: 0,
          bottom: 0,
          background: slide.panelBackground ?? cfg.layout.panelBackground,
          padding: "38px 64px 58px",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
        }}
      >
        {slide.decorations !== false && (
          <>
            <div
              style={{
                position: "absolute",
                width: 210,
                height: 210,
                borderRadius: "50%",
                border: `18px solid ${slide.secondaryAccentColor ?? slide.accentColor ?? "#FF4D8D"}`,
                right: -68,
                bottom: -70,
                opacity: 0.17,
              }}
            />
            <div
              style={{
                position: "absolute",
                right: 54,
                top: 34,
                display: "grid",
                gridTemplateColumns: "repeat(2, 14px)",
                gap: 8,
                transform: "rotate(10deg)",
                opacity: 0.72,
              }}
            >
              {[0, 1, 2, 3].map((square) => (
                <div
                  key={square}
                  style={{
                    width: 14,
                    height: 14,
                    background:
                      square % 2 === 0
                        ? slide.accentColor ?? "#FF4D8D"
                        : slide.secondaryAccentColor ?? "#C7F000",
                  }}
                />
              ))}
            </div>
            <div
              style={{
                position: "absolute",
                right: 78,
                top: 92,
                fontFamily: THEME.fonts.display,
                fontSize: 50,
                fontWeight: 950,
                color: slide.secondaryAccentColor ?? "#C7F000",
                transform: "rotate(-12deg)",
                opacity: 0.8,
              }}
            >
              ↗
            </div>
          </>
        )}
        <EditorialText
          slide={slide}
          slideDuration={slideDuration}
          isHook={isCover}
          headlineSize={headlineSize}
        />
      </div>

      <div
        style={{
          position: "absolute",
          right: 50,
          bottom: 26,
          fontFamily: THEME.fonts.body,
          fontSize: 15,
          fontWeight: 800,
          letterSpacing: 2.2,
          color: "rgba(255,255,255,0.46)",
          textTransform: "uppercase",
        }}
      >
        {isCta ? "PIXELPICKED" : gameName} · {String(index + 1).padStart(2, "0")}
      </div>
      <SlideCounter
        index={index}
        slideCount={slideCount}
        accentColor={slide.accentColor}
      />
    </AbsoluteFill>
  );
};

export const Scene9_BisonCarousel: React.FC<
  InstagramEditorialCarouselProps
> = ({ hookSlide, contentSlides, ctaSlide, gameName, slideDuration }) => {
  const cfg = SCENE9_BISON_CAROUSEL_CONFIG;
  const resolvedSlides = [
    hookSlide ?? cfg.hookSlide,
    ...(contentSlides ?? cfg.contentSlides),
    ctaSlide ?? cfg.ctaSlide,
  ];
  const resolvedDuration = slideDuration ?? cfg.slideDuration;
  const resolvedGameName = gameName ?? cfg.game.name;

  return (
    <AbsoluteFill style={{ background: "#050505", overflow: "hidden" }}>
      {resolvedSlides.map((slide, index) => (
        <Sequence
          key={`${slide.headline}-${index}`}
          from={index * resolvedDuration}
          durationInFrames={resolvedDuration}
        >
          <CarouselSlide
            slide={slide}
            index={index}
            slideCount={resolvedSlides.length}
            slideDuration={resolvedDuration}
            gameName={resolvedGameName}
          />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
