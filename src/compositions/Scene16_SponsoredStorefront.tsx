import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SCENE16_SPONSORED_STOREFRONT_CONFIG } from "../data/config";
import { THEME } from "../data/theme";

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const SponsoredLabel: React.FC<{ delay: number; compact?: boolean }> = ({
  delay,
  compact = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({
    frame: frame - delay,
    fps,
    config: { damping: 13, stiffness: 230, mass: 0.42 },
  });

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: compact ? 6 : 9,
        padding: compact ? "6px 9px" : "8px 13px",
        borderRadius: 999,
        color: "#FFFFFF",
        background: SCENE16_SPONSORED_STOREFRONT_CONFIG.sponsoredColor,
        boxShadow: "0 7px 20px rgba(255,59,48,0.3)",
        fontSize: compact ? 13 : 16,
        fontWeight: 900,
        letterSpacing: 0.2,
        lineHeight: 1,
        opacity: enter,
        transform: `scale(${0.55 + enter * 0.45}) translateY(${(1 - enter) * 16}px)`,
        transformOrigin: "center",
      }}
    >
      <span
        style={{
          width: compact ? 6 : 8,
          height: compact ? 6 : 8,
          borderRadius: "50%",
          background: "#FFFFFF",
        }}
      />
      SPONSORED
    </div>
  );
};

const GameArt: React.FC<{
  palette: readonly [string, string] | string[];
  variant: number;
}> = ({ palette, variant }) => (
  <div
    style={{
      position: "relative",
      width: "100%",
      height: "100%",
      overflow: "hidden",
      background: `linear-gradient(145deg, ${palette[0]}, ${palette[1]})`,
    }}
  >
    <div
      style={{
        position: "absolute",
        width: variant % 2 === 0 ? "78%" : "105%",
        height: variant % 2 === 0 ? "78%" : "52%",
        left: variant % 2 === 0 ? "35%" : "-16%",
        top: variant % 2 === 0 ? "-18%" : "53%",
        borderRadius: variant % 2 === 0 ? "50%" : "48% 48% 0 0",
        background: "rgba(255,255,255,0.22)",
        transform: `rotate(${variant * 17 - 18}deg)`,
      }}
    />
    <div
      style={{
        position: "absolute",
        width: "42%",
        aspectRatio: "1",
        left: variant % 2 === 0 ? "18%" : "48%",
        top: "27%",
        borderRadius: variant % 3 === 0 ? "18%" : "50%",
        background: "rgba(7,9,16,0.72)",
        border: "5px solid rgba(255,255,255,0.48)",
        boxShadow: "0 18px 38px rgba(0,0,0,0.3)",
        transform: `rotate(${variant % 2 === 0 ? -10 : 10}deg)`,
      }}
    />
    <div
      style={{
        position: "absolute",
        left: "15%",
        bottom: "11%",
        width: "70%",
        height: 7,
        borderRadius: 8,
        background: "rgba(255,255,255,0.62)",
      }}
    />
  </div>
);

const SponsoredGameCard: React.FC<{
  game: (typeof SCENE16_SPONSORED_STOREFRONT_CONFIG.sponsoredGames)[number];
  index: number;
  delay: number;
}> = ({ game, index, delay }) => (
  <div style={{ width: 260, flexShrink: 0 }}>
    <div
      style={{
        position: "relative",
        width: 260,
        height: 275,
        overflow: "hidden",
        borderRadius: 25,
        background: "#151518",
        boxShadow: "0 16px 34px rgba(0,0,0,0.42)",
      }}
    >
      <GameArt palette={game.palette} variant={index} />
      <div style={{ position: "absolute", left: 13, top: 13 }}>
        <SponsoredLabel delay={delay} compact />
      </div>
    </div>
    <div
      style={{
        marginTop: 12,
        color: "#F5F5F6",
        fontSize: 23,
        fontWeight: 850,
        letterSpacing: -0.7,
      }}
    >
      {game.name}
    </div>
    <div style={{ marginTop: 4, color: "#85858E", fontSize: 17, fontWeight: 600 }}>
      {game.category}
    </div>
  </div>
);

export const Scene16_SponsoredStorefront: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cfg = SCENE16_SPONSORED_STOREFRONT_CONFIG;
  const entrance = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 105, mass: 0.85 },
  });
  const takeover = spring({
    frame: frame - 148,
    fps,
    config: { damping: 14, stiffness: 170, mass: 0.5 },
  });
  const organicPush = takeover * 245;
  const finalZoom = interpolate(frame, [210, 278], [1, 1.055], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  const redWash = interpolate(frame, [155, 265], [0, 0.055], clamp);
  const problemBanner = interpolate(frame, [3, 12], [0, 1], clamp);
  const promotedGame = cfg.sponsoredGames[3];

  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        background: "#030303",
        fontFamily: THEME.fonts.display,
      }}
    >
      <div
        style={{
          position: "absolute",
          zIndex: 20,
          left: "50%",
          top: 26,
          display: "flex",
          alignItems: "center",
          gap: 18,
          padding: "11px 18px",
          border: "2px solid rgba(255,59,48,0.72)",
          borderRadius: 10,
          background: "rgba(15,8,8,0.94)",
          boxShadow: "0 12px 35px rgba(0,0,0,0.42)",
          opacity: problemBanner,
          transform: `translateX(-50%) translateY(${(1 - problemBanner) * -12}px)`,
          fontFamily: THEME.fonts.display,
          whiteSpace: "nowrap",
        }}
      >
        <span
          style={{
            color: "#FF3B30",
            fontSize: 18,
            fontWeight: 900,
            letterSpacing: 1.5,
          }}
        >
          PAID DISCOVERY
        </span>
        <span style={{ width: 1, height: 21, background: "#56302D" }} />
        <span
          style={{
            color: "#F1EEE8",
            fontSize: 18,
            fontWeight: 720,
            letterSpacing: -0.15,
          }}
        >
          Ad spend decides what gets seen
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 73% 34%,rgba(255,59,48,0.035),transparent 31%), #070708",
          opacity: entrance,
          transform: `scale(${0.975 + entrance * 0.025}) scale(${finalZoom})`,
          transformOrigin: "70% 53%",
        }}
      >
        <header style={{ padding: "26px 74px 0" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "#777780",
              fontSize: 17,
              fontWeight: 750,
            }}
          >
            <span>9:41</span>
            <span style={{ letterSpacing: 6 }}>● ● ▰</span>
          </div>
          <div
            style={{
              marginTop: 20,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ color: "#F7F7F8", fontSize: 64, fontWeight: 920, letterSpacing: -3.5 }}>
              Games
            </div>
            <div
              style={{
                width: 58,
                height: 58,
                display: "grid",
                placeItems: "center",
                borderRadius: "50%",
                color: "#FFFFFF",
                background: "linear-gradient(145deg,#1E293B,#475569)",
                fontSize: 18,
                fontWeight: 900,
              }}
            >
              YOU
            </div>
          </div>
          <nav
            style={{
              display: "flex",
              gap: 48,
              marginTop: 18,
              paddingBottom: 17,
              borderBottom: "2px solid #252529",
              color: "#777780",
              fontSize: 20,
              fontWeight: 800,
            }}
          >
            <span style={{ color: "#FF5A52" }}>Featured Ads</span>
            <span>Top Charts</span>
            <span>New</span>
            <span>Categories</span>
          </nav>
        </header>

        <main
          style={{
            position: "absolute",
            left: 74,
            right: 74,
            top: 205,
            bottom: 86,
            display: "grid",
            gridTemplateColumns: "720px 1fr",
            gap: 54,
          }}
        >
          <section
            style={{
              position: "relative",
              height: 750,
              overflow: "hidden",
              borderRadius: 38,
              color: "#FFFFFF",
              background: "linear-gradient(140deg,#0F172A 0%,#312E81 48%,#DC2626 150%)",
              boxShadow: "0 25px 62px rgba(15,23,42,0.24)",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: 570,
                height: 570,
                right: -145,
                top: -110,
                borderRadius: "50%",
                border: "76px solid rgba(255,255,255,0.1)",
              }}
            />
            <div
              style={{
                position: "absolute",
                right: 52,
                bottom: -70,
                width: 315,
                height: 505,
                borderRadius: "160px 160px 42px 42px",
                background: "linear-gradient(#F59E0B,#7F1D1D)",
                border: "10px solid rgba(255,255,255,0.25)",
                transform: "rotate(8deg)",
                boxShadow: "0 24px 58px rgba(0,0,0,0.34)",
              }}
            />
            <div style={{ position: "absolute", left: 38, top: 34 }}>
              <SponsoredLabel delay={2} />
            </div>
            <div style={{ position: "absolute", left: 40, bottom: 48, width: 510 }}>
              <div style={{ fontSize: 51, fontWeight: 950, letterSpacing: -2.4 }}>
                {cfg.hero.name}
              </div>
              <div style={{ marginTop: 11, fontSize: 25, fontWeight: 700 }}>{cfg.hero.tagline}</div>
              <div style={{ marginTop: 7, color: "rgba(255,255,255,0.68)", fontSize: 19 }}>
                {cfg.hero.category}
              </div>
            </div>
          </section>

          <section style={{ position: "relative", overflow: "hidden" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: 22,
              }}
            >
              <span style={{ color: "#F5F5F6", fontSize: 35, fontWeight: 900, letterSpacing: -1.4 }}>
                Paid placements
              </span>
              <span style={{ color: "#FF6B63", fontSize: 18, fontWeight: 800 }}>
                Ranked by ad spend
              </span>
            </div>

            <div style={{ display: "flex", gap: 21 }}>
              {cfg.sponsoredGames.slice(0, 3).map((game, index) => (
                <SponsoredGameCard
                  key={game.name}
                  game={game}
                  index={index}
                  delay={[5, 9, 13][index]}
                />
              ))}
            </div>

            <div style={{ position: "absolute", left: 0, right: 0, top: 438 + organicPush }}>
              <div style={{ color: "#F5F5F6", fontSize: 30, fontWeight: 900, letterSpacing: -1 }}>
                Organic discovery
              </div>
              <div
                style={{
                  marginTop: 17,
                  display: "flex",
                  gap: 21,
                  padding: 16,
                  borderRadius: 27,
                  background: "#111113",
                  border: "2px solid #27272A",
                  boxShadow: "0 14px 36px rgba(0,0,0,0.34)",
                }}
              >
                <div style={{ width: 155, height: 155, borderRadius: 21, overflow: "hidden", flexShrink: 0 }}>
                  <GameArt palette={cfg.organicGame.palette} variant={7} />
                </div>
                <div style={{ paddingTop: 11 }}>
                  <div style={{ color: "#F5F5F6", fontSize: 29, fontWeight: 900 }}>
                    {cfg.organicGame.name}
                  </div>
                  <div style={{ marginTop: 6, color: "#85858E", fontSize: 17, fontWeight: 650 }}>
                    {cfg.organicGame.category}
                  </div>
                  <div style={{ marginTop: 13, color: "#B5B5BC", fontSize: 18, lineHeight: 1.3 }}>
                    {cfg.organicGame.tagline}
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 432,
                height: 205,
                display: "flex",
                alignItems: "center",
                gap: 22,
                padding: 18,
                boxSizing: "border-box",
                borderRadius: 28,
                background: "#111113",
                border: "3px solid rgba(255,59,48,0.42)",
                boxShadow: "0 22px 55px rgba(0,0,0,0.5)",
                opacity: takeover,
                transform: `translateX(${(1 - takeover) * 360}px) scale(${0.92 + takeover * 0.08})`,
              }}
            >
              <div style={{ width: 168, height: 168, borderRadius: 23, overflow: "hidden", flexShrink: 0 }}>
                <GameArt palette={promotedGame.palette} variant={4} />
              </div>
              <div style={{ flex: 1 }}>
                <SponsoredLabel delay={148} />
                <div style={{ marginTop: 13, color: "#F5F5F6", fontSize: 31, fontWeight: 900 }}>
                  {promotedGame.name}
                </div>
                <div style={{ marginTop: 5, color: "#85858E", fontSize: 18, fontWeight: 650 }}>
                  {promotedGame.category}
                </div>
              </div>
              <div
                style={{
                  padding: "12px 25px",
                  borderRadius: 999,
                  color: "#FFFFFF",
                  background: "#3B82F6",
                  fontSize: 18,
                  fontWeight: 900,
                }}
              >
                GET
              </div>
            </div>
          </section>
        </main>

        <footer
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 76,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 105,
            borderTop: "2px solid rgba(255,255,255,0.08)",
            background: "rgba(7,7,8,0.97)",
            color: "#686872",
            fontSize: 16,
            fontWeight: 750,
          }}
        >
          <span>Today</span>
          <span style={{ color: "#FFFFFF" }}>Games</span>
          <span>Apps</span>
          <span>Arcade</span>
          <span>Search</span>
        </footer>

        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `rgba(255,59,48,${redWash})`,
            pointerEvents: "none",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
