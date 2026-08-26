import React from "react";
import { AbsoluteFill, Img } from "remotion";
import { PixelPickedLogo, resolveStudioMedia } from "../components/shared";
import { SCENE11_LAUNCH_TOP3_STORY_CONFIG } from "../data/config";
import { THEME } from "../data/theme";

const cfg = SCENE11_LAUNCH_TOP3_STORY_CONFIG;
type Product = (typeof cfg.products)[number];

export interface Scene11LaunchCard {
  rank: number;
  name: string;
  votes: number;
  artwork: string;
}

export interface Scene11LaunchCampaign {
  date: string;
  dayLabel: string;
  totalVotes: string;
  cta: string;
  link: string;
}

export interface Scene11LaunchProps {
  [key: string]: unknown;
  products?: Scene11LaunchCard[];
  campaign?: Partial<Scene11LaunchCampaign>;
}

const Brand: React.FC<{ dark?: boolean; label?: string }> = ({
  dark = false,
  label = "DAY 1",
}) => (
  <div
    style={{
      position: "absolute",
      left: 60,
      right: 60,
      top: 58,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      zIndex: 20,
      color: dark ? "#080808" : "#FFFFFF",
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
      <PixelPickedLogo size={48} showText={false} />
      <div style={{ fontSize: 28, fontWeight: 850, letterSpacing: -1 }}>
        PixelPicked<span style={{ color: dark ? "#080808" : cfg.colors.accent }}>.</span>
      </div>
    </div>
    <div style={{ fontSize: 17, fontWeight: 850, letterSpacing: 1.4 }}>
      {label}
    </div>
  </div>
);

const StoryDots: React.FC<{ active: number }> = ({ active }) => (
  <div
    style={{
      position: "absolute",
      bottom: 36,
      left: 0,
      right: 0,
      display: "flex",
      justifyContent: "center",
      gap: 10,
      zIndex: 20,
    }}
  >
    {[0, 1, 2, 3].map((index) => (
      <div
        key={index}
        style={{
          width: index === active ? 36 : 9,
          height: 9,
          borderRadius: 20,
          background: index === active ? "#FFFFFF" : "rgba(255,255,255,0.42)",
        }}
      />
    ))}
  </div>
);

const CoverSlide: React.FC<{
  products: Scene11LaunchCard[];
  campaign: Scene11LaunchCampaign;
}> = ({ products, campaign }) => (
  <AbsoluteFill
    style={{
      overflow: "hidden",
      fontFamily: THEME.fonts.display,
      background:
        "radial-gradient(circle at 82% 24%,rgba(255,255,255,0.055),transparent 34%), linear-gradient(155deg,#050505 0%,#090909 54%,#111111 100%)",
      color: "#FFFFFF",
    }}
  >
    <div
      style={{
        position: "absolute",
        width: 600,
        height: 600,
        left: -310,
        top: 50,
        border: "2px solid rgba(255,255,255,0.07)",
        borderRadius: 110,
        transform: "rotate(14deg)",
      }}
    />
    <div
      style={{
        position: "absolute",
        width: 520,
        height: 520,
        right: -250,
        top: 205,
        border: "2px solid rgba(255,255,255,0.08)",
        borderRadius: 100,
        transform: "rotate(-12deg)",
      }}
    />
    <Brand label={campaign.dayLabel} />

    <div style={{ position: "absolute", left: 40, right: 40, top: 112, height: 455 }}>
      {products.map((product, index) => {
        const positions = [
          { left: 270, top: 0, width: 460, height: 325, rotate: 2 },
          { left: 0, top: 235, width: 420, height: 275, rotate: -2 },
          { left: 605, top: 250, width: 370, height: 265, rotate: 2 },
        ];
        const pos = positions[index];
        return (
          <div
            key={product.rank}
            style={{
              position: "absolute",
              left: pos.left,
              top: pos.top,
              width: pos.width,
              height: pos.height,
              transform: `rotate(${pos.rotate}deg)`,
              borderRadius: 34,
              overflow: "hidden",
              border:
                product.rank === 1
                  ? "6px solid rgba(255,255,255,0.88)"
                  : "5px solid rgba(255,255,255,0.30)",
              background: "#0A0A0A",
              boxShadow: "0 28px 65px rgba(0,0,0,0.58)",
            }}
          >
            <Img
              src={resolveStudioMedia(product.artwork)}
              style={{
                width: "100%",
                height: "calc(100% - 58px)",
                objectFit: "cover",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 18,
                top: 18,
                width: 58,
                height: 58,
                borderRadius: 17,
                background:
                  product.rank === 1 ? "#FFFFFF" : "rgba(18,18,18,0.94)",
                color: product.rank === 1 ? "#050505" : "#FFFFFF",
                border:
                  product.rank === 1
                    ? "none"
                    : "1px solid rgba(255,255,255,0.30)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 26,
                fontWeight: 950,
              }}
            >
              #{product.rank}
            </div>
            {product.rank === 1 && (
              <div
                style={{
                  position: "absolute",
                  right: 18,
                  top: 18,
                  padding: "12px 17px",
                  borderRadius: 14,
                  background: "rgba(5,5,5,0.90)",
                  color: "#FFFFFF",
                  border: "1px solid rgba(255,255,255,0.18)",
                  fontSize: 18,
                  fontWeight: 880,
                  letterSpacing: -0.35,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: 3,
                }}
              >
                <span>{product.name}</span>
                <span
                  style={{
                    color: "#D4D4D4",
                    fontSize: 13,
                    fontWeight: 900,
                    letterSpacing: 0.5,
                  }}
                >
                  ▲ {product.votes} VOTES
                </span>
              </div>
            )}
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: 58,
                padding: "0 16px",
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                justifyContent:
                  product.rank === 1 ? "flex-end" : "space-between",
                gap: 12,
                background: "#090909",
                color: "#FFFFFF",
              }}
            >
              {product.rank !== 1 && (
                <div
                  style={{
                    minWidth: 0,
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    fontSize: product.name.length > 22 ? 13 : 18,
                    fontWeight: 880,
                    letterSpacing: -0.45,
                  }}
                >
                  {product.name}
                </div>
              )}
              <div
                style={{
                  flexShrink: 0,
                  color: product.rank === 1 ? "#FFFFFF" : "#B8B8B8",
                  fontSize: 14,
                  fontWeight: 900,
                  letterSpacing: 0.2,
                }}
              >
                ▲ {product.votes} VOTES
              </div>
            </div>
          </div>
        );
      })}
    </div>

    <div style={{ position: "absolute", left: 60, right: 60, top: 665 }}>
      <div
        style={{
          display: "inline-flex",
          padding: "11px 18px",
          borderRadius: 12,
          background: "rgba(12,12,12,0.92)",
          color: "#FFFFFF",
          border: "1px solid rgba(255,255,255,0.30)",
          fontSize: 16,
          fontWeight: 850,
          letterSpacing: 1.3,
        }}
      >
        {campaign.date}
      </div>
      <div
        style={{
          marginTop: 18,
          fontSize: 92,
          lineHeight: 0.82,
          fontWeight: 950,
          letterSpacing: -4.8,
        }}
      >
        <span style={{ color: "#FFFFFF" }}>TOP</span>
        <br />
        <span style={{ color: "#D6D6D6" }}>LAUNCHES</span>
      </div>
      <div
        style={{
          marginTop: 12,
          fontSize: 38,
          fontWeight: 900,
          letterSpacing: -2,
          color: cfg.colors.muted,
        }}
      >
        This week on PixelPicked
      </div>
    </div>

    <div
      style={{
        position: "absolute",
        left: 60,
        right: 60,
        bottom: 44,
        height: 172,
        borderRadius: 30,
        background: "#F5F5F5",
        color: "#050505",
        border: "2px solid #D4D4D4",
        padding: "27px 34px",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div>
        <div style={{ color: "#5A5A5A", fontSize: 16, fontWeight: 900, letterSpacing: 1.35 }}>
          {campaign.dayLabel} OF 7 · {campaign.totalVotes.toUpperCase()} SO FAR
        </div>
        <div style={{ marginTop: 7, fontSize: 40, fontWeight: 920, letterSpacing: -1.3 }}>
          {campaign.cta}
        </div>
        <div style={{ marginTop: 5, fontSize: 17, fontWeight: 700, color: "#666666" }}>
          {campaign.link}
        </div>
      </div>
      <div style={{ fontSize: 62, fontWeight: 900, color: "#111111" }}>→</div>
    </div>
  </AbsoluteFill>
);

const ProductSlide: React.FC<{ product: Product; active: number }> = ({
  product,
  active,
}) => (
  <AbsoluteFill
    style={{
      overflow: "hidden",
      fontFamily: THEME.fonts.display,
      background: "#0A0A0A",
      color: "#FFFFFF",
    }}
  >
    <Img
      src={resolveStudioMedia(product.artwork)}
      style={{
        position: "absolute",
        inset: -110,
        width: 1300,
        height: 1300,
        objectFit: "cover",
        filter: "blur(75px) saturate(1.2)",
        opacity: 0.72,
      }}
    />
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(180deg,rgba(0,0,0,0.08) 15%,rgba(0,0,0,0.18) 44%,#17110A 69%,#080808 100%)",
      }}
    />
    <Brand />

    <div
      style={{
        position: "absolute",
        left: 60,
        right: 60,
        top: 145,
        height: 920,
        overflow: "hidden",
        borderRadius: 50,
        border: "6px solid rgba(255,255,255,0.9)",
        boxShadow: "0 45px 100px rgba(0,0,0,0.52)",
      }}
    >
      <Img
        src={resolveStudioMedia(product.artwork)}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg,transparent 55%,rgba(0,0,0,0.72) 100%)",
        }}
      />
    </div>

    <div
      style={{
        position: "absolute",
        left: 65,
        right: 65,
        top: 1000,
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: 75,
          lineHeight: 0.93,
          fontWeight: 950,
          letterSpacing: -4.2,
          textShadow: "0 5px 20px rgba(0,0,0,0.55)",
        }}
      >
        #{product.rank} {product.name}
      </div>
      <div style={{ marginTop: 18, fontSize: 28, fontWeight: 850 }}>
        on <span style={{ color: cfg.colors.accent }}>PixelPicked</span>
      </div>
      <div
        style={{
          margin: "24px auto 0",
          width: 780,
          color: "rgba(255,255,255,0.80)",
          fontSize: 22,
          lineHeight: 1.38,
        }}
      >
        {product.description}
      </div>
    </div>

    <div
      style={{
        position: "absolute",
        left: 60,
        right: 60,
        bottom: 82,
        height: 310,
        padding: 22,
        borderRadius: 38,
        background: "rgba(8,8,8,0.88)",
        border: "2px solid rgba(255,255,255,0.13)",
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", height: 150, gap: 16 }}>
        <div
          style={{
            flex: 1,
            borderRadius: 25,
            background: cfg.colors.accent,
            color: "#080808",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ fontSize: 57, fontWeight: 950 }}>▲ {product.votes}</div>
          <div style={{ fontSize: 19, fontWeight: 900, letterSpacing: 1.3 }}>VOTES</div>
        </div>
        <div
          style={{
            flex: 1,
            borderRadius: 25,
            background: "#25201A",
            color: "#FFFFFF",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ color: "#67F08A", fontSize: 38, fontWeight: 950 }}>{product.status}</div>
          <div style={{ fontSize: 18, fontWeight: 850, letterSpacing: 1.2 }}>LIVE RANKING</div>
        </div>
      </div>
      <div
        style={{
          height: 102,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 22,
          fontWeight: 820,
          letterSpacing: 0.2,
        }}
      >
        Vote now · pixelpicked.com/launch-campaign
      </div>
    </div>
    <StoryDots active={active} />
  </AbsoluteFill>
);

export const Scene11_LaunchTop3Story: React.FC<Scene11LaunchProps> = ({
  products = cfg.products,
  campaign,
}) => {
  const mergedCampaign: Scene11LaunchCampaign = {
    date: campaign?.date ?? cfg.campaign.date,
    dayLabel: campaign?.dayLabel ?? "DAY 1",
    totalVotes: campaign?.totalVotes ?? cfg.campaign.totalVotes,
    cta: campaign?.cta ?? cfg.campaign.cta,
    link: campaign?.link ?? cfg.campaign.link,
  };

  return <CoverSlide products={products} campaign={mergedCampaign} />;
};
