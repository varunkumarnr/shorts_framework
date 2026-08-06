import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { THEME } from "../data/theme";
import { SCENE2_CONFIG } from "../data/config";
import {
  BgVideo,
  NoiseOverlay,
  SceneBranding,
  PixelPickedLogo,
  Display,
  Body,
} from "../components/shared";

const INTRO_DURATION = 150;
const INTRO_FADE = 25; // fade in / fade out length

export const Scene2_Gameplay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cfg = SCENE2_CONFIG;

  // ── Gameplay frame is offset by the intro duration ──
  const gFrame = Math.max(0, frame - INTRO_DURATION);

  // ─────────────────────────────────────────────────────────────────────────
  // INTRO ANIMATIONS
  // ─────────────────────────────────────────────────────────────────────────
  const introOp = Math.min(
    interpolate(frame, [0, INTRO_FADE], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
    interpolate(frame, [INTRO_DURATION - INTRO_FADE, INTRO_DURATION], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );

  const logoScale = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 90, mass: 0.7 },
    from: 0.75,
    to: 1,
  });

  const nameY = spring({
    frame: frame - 10,
    fps,
    config: { damping: 22, stiffness: 75 },
    from: 30,
    to: 0,
  });
  const nameOp = interpolate(frame, [10, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const tagY = spring({
    frame: frame - 30,
    fps,
    config: { damping: 22, stiffness: 70 },
    from: 30,
    to: 0,
  });
  const tagOp = interpolate(frame, [30, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const dividerW = interpolate(frame, [50, 100], [0, 120], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ─────────────────────────────────────────────────────────────────────────
  // GAMEPLAY ANIMATIONS (same as original but using gFrame instead of frame)
  // ─────────────────────────────────────────────────────────────────────────
  const sceneOpacity = interpolate(
    gFrame,
    [0, 30, cfg.duration - 30, cfg.duration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const videoOpacity = interpolate(gFrame, [60, 150], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const overlayOp = interpolate(gFrame, [20, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const line1Y = spring({
    frame: gFrame - 20,
    fps,
    config: { damping: 24, stiffness: 70 },
    from: 60,
    to: 0,
  });
  const line2Op = interpolate(gFrame, [60, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const line2Y = spring({
    frame: gFrame - 60,
    fps,
    config: { damping: 24, stiffness: 70 },
    from: 60,
    to: 0,
  });
  const metaOp = interpolate(gFrame, [180, 230], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const metaX = spring({
    frame: gFrame - 180,
    fps,
    config: { damping: 22, stiffness: 75 },
    from: -50,
    to: 0,
  });
  const dividerWGame = interpolate(gFrame, [200, 260], [0, 60], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const float = Math.sin(gFrame * 0.02) * 4;
  const game = cfg.game;

  return (
    <AbsoluteFill style={{ background: "#000", overflow: "hidden" }}>
      {/* ── INTRO: White screen with logo + title ── */}
      {frame < INTRO_DURATION + INTRO_FADE && (
        <AbsoluteFill
          style={{
            background: "#FAFAFA",
            opacity: introOp,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 0,
            zIndex: 10,
          }}
        >
          {/* Subtle background gradient matching Scene4 style */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, #FFFFFF 0%, #F5F5F5 100%)",
              pointerEvents: "none",
            }}
          />
          <NoiseOverlay />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
              position: "relative",
            }}
          >
            {/* Logo */}
            <div style={{ transform: `scale(${logoScale})` }}>
              <PixelPickedLogo size={72} showText={false} />
            </div>

            {/* Brand name */}
            <div
              style={{
                opacity: nameOp,
                transform: `translateY(${nameY}px)`,
              }}
            >
              <Display size={96} weight={900} letterSpacing={-5}>
                PixelPicked
              </Display>
            </div>

            {/* Divider */}
            <div
              style={{
                width: dividerW,
                height: 2,
                background: THEME.colors.accent,
                borderRadius: 2,
              }}
            />

            {/* Tagline */}
            <div
              style={{
                opacity: tagOp,
                transform: `translateY(${tagY}px)`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
              }}
            >
              <div
                style={{
                  fontFamily: THEME.fonts.body,
                  fontSize: 14,
                  fontWeight: 800,
                  color: THEME.colors.accent,
                  letterSpacing: 5,
                  textTransform: "uppercase",
                }}
              >
                Indie · Underrated
              </div>
              <div
                style={{
                  fontFamily: THEME.fonts.display,
                  fontSize: 52,
                  fontWeight: 900,
                  color: THEME.colors.primary,
                  letterSpacing: -2,
                  lineHeight: 1.05,
                  textAlign: "center",
                }}
              >
                Game of the Week
              </div>
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* ── GAMEPLAY (offset by INTRO_DURATION) ── */}
      {frame >= INTRO_DURATION - INTRO_FADE && (
        <AbsoluteFill style={{ opacity: sceneOpacity }}>
          <div
            style={{ position: "absolute", inset: 0, opacity: videoOpacity }}
          >
            <BgVideo
              src={cfg.backgroundVideo}
              startFrom={cfg.backgroundVideoStartFrom}
              endScale={1.05}
              opacity={1}
            />
          </div>
          <AbsoluteFill
            style={{
              background: `rgba(0,0,0,${interpolate(gFrame, [60, 150], [0.92, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })})`,
              pointerEvents: "none",
            }}
          />
          <AbsoluteFill
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 40%, transparent 65%)",
              pointerEvents: "none",
            }}
          />
          <NoiseOverlay />
          <SceneBranding light />

          {cfg.overlayText.enabled && (
            <AbsoluteFill
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                paddingBottom: 320,
              }}
            >
              <div
                style={{
                  opacity: overlayOp,
                  transform: `translateY(${line1Y}px)`,
                  fontFamily: THEME.fonts.display,
                  fontSize: 130,
                  fontWeight: 900,
                  color: "#FFF",
                  letterSpacing: -5,
                  lineHeight: 0.95,
                  textAlign: "center",
                }}
              >
                {cfg.overlayText.line1}
              </div>
              <div
                style={{
                  opacity: line2Op,
                  transform: `translateY(${line2Y}px)`,
                  fontFamily: THEME.fonts.display,
                  fontSize: 130,
                  fontWeight: 900,
                  color: THEME.colors.accent,
                  letterSpacing: -5,
                  lineHeight: 0.95,
                  textAlign: "center",
                }}
              >
                {cfg.overlayText.line2}
              </div>
            </AbsoluteFill>
          )}

          <AbsoluteFill
            style={{
              justifyContent: "flex-end",
              alignItems: "flex-start",
              padding: "0 72px 160px",
              opacity: metaOp,
              transform: `translateX(${metaX}px) translateY(${float}px)`,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div
                style={{
                  width: dividerWGame,
                  height: 3,
                  background: THEME.colors.accent,
                  borderRadius: 2,
                  marginBottom: 4,
                }}
              />
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <div
                  style={{
                    fontFamily: THEME.fonts.body,
                    fontSize: 15,
                    fontWeight: 600,
                    color: THEME.colors.accent,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                  }}
                >
                  {game.genre}
                </div>
                {game.platform && (
                  <>
                    <div style={{ color: "rgba(255,255,255,0.3)" }}>·</div>
                    <div
                      style={{
                        fontFamily: THEME.fonts.body,
                        fontSize: 15,
                        color: "rgba(255,255,255,0.5)",
                      }}
                    >
                      {game.platform}
                    </div>
                  </>
                )}
              </div>
              <div
                style={{
                  fontFamily: THEME.fonts.display,
                  fontSize: 80,
                  fontWeight: 900,
                  color: "#FFF",
                  letterSpacing: -3,
                  lineHeight: 0.95,
                }}
              >
                {game.name}
              </div>
              {game.tagline && (
                <div
                  style={{
                    fontFamily: THEME.fonts.body,
                    fontSize: 24,
                    color: "rgba(255,255,255,0.65)",
                  }}
                >
                  {game.tagline}
                </div>
              )}
            </div>
          </AbsoluteFill>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
