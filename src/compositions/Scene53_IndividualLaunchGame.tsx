import React from "react";
import {AbsoluteFill, Img, staticFile} from "remotion";
import {PixelPickedLogo} from "../components/shared";
import {
  IndividualLaunchGameConfig,
  SCENE53_INDIVIDUAL_LAUNCH_GAME_CONFIG,
} from "../data/config";
import {THEME} from "../data/theme";

export type Scene53IndividualLaunchGameProps = {
  config?: IndividualLaunchGameConfig;
};

const FramedImage: React.FC<{
  src: string;
  style?: React.CSSProperties;
  position?: string;
}> = ({src, style, position = "center"}) => (
  <div
    style={{
      overflow: "hidden",
      border: "3px solid rgba(255,255,255,.22)",
      background: "#111",
      ...style,
    }}
  >
    <Img
      src={staticFile(src)}
      style={{width: "100%", height: "100%", objectFit: "cover", objectPosition: position}}
    />
  </div>
);

export const Scene53_IndividualLaunchGame: React.FC<Scene53IndividualLaunchGameProps> = ({
  config = SCENE53_INDIVIDUAL_LAUNCH_GAME_CONFIG,
}) => {
  const {game, campaign, accentColor} = config;
  const titleSize = game.name.length > 20 ? 76 : game.name.length > 14 ? 88 : 98;
  const hookSize = game.hook.length > 45 ? 36 : 43;

  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        background: "#070707",
        color: "#fff",
        fontFamily: THEME.fonts.display,
      }}
    >
      <div style={{position: "absolute", inset: 0, opacity: .06, backgroundImage: "linear-gradient(rgba(255,255,255,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.06) 1px,transparent 1px)", backgroundSize: "72px 72px"}} />

      <header style={{position: "absolute", top: 43, left: 52, right: 52, display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 5}}>
        <div style={{display: "flex", alignItems: "center", gap: 13}}>
          <PixelPickedLogo size={42} showText={false} />
          <div style={{fontSize: 27, fontWeight: 900, letterSpacing: -1}}>PixelPicked<span style={{color: accentColor}}>.</span></div>
        </div>
        <div style={{display: "flex", alignItems: "center", gap: 11, fontSize: 17, fontWeight: 900, letterSpacing: 1.5}}>
          <span style={{width: 8, height: 8, borderRadius: 20, background: "#D8D8D5"}} />
          LAUNCH WEEK · {campaign.dayLabel}
        </div>
      </header>

      <section style={{position: "absolute", top: 116, left: 52, right: 52, zIndex: 4}}>
        <div style={{display: "flex", alignItems: "center", gap: 13, marginBottom: 6}}>
          <span style={{padding: "7px 13px", borderRadius: 10, color: "#080808", background: accentColor, fontSize: 18, fontWeight: 950}}>#{game.rank} THIS WEEK</span>
          <span style={{fontSize: 18, color: "#AAA", fontWeight: 850, letterSpacing: 1.2}}>{game.genres}</span>
        </div>
        <div style={{fontSize: titleSize, lineHeight: .9, fontWeight: 950, letterSpacing: -4.2, textTransform: "uppercase"}}>{game.name}</div>
        <div style={{marginTop: 10, fontSize: hookSize, lineHeight: .96, fontWeight: 950, color: "#D3D3D0", letterSpacing: -1.1}}>{game.hook}</div>
      </section>

      <FramedImage
        src={game.hero}
        style={{position: "absolute", left: 52, right: 52, top: 330, height: 326, borderRadius: 28, boxShadow: "0 24px 70px rgba(0,0,0,.58)"}}
      />
      <div style={{position: "absolute", left: 72, top: 590, zIndex: 5, padding: "8px 13px", borderRadius: 8, background: "rgba(0,0,0,.78)", fontSize: 18, fontWeight: 900, letterSpacing: 1}}>BY {game.studio.toUpperCase()}</div>

      <section style={{position: "absolute", left: 52, right: 52, top: 680, height: 360, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 15}}>
        {game.screenshots.map((screenshot, index) => (
          <FramedImage
            key={screenshot}
            src={screenshot}
            position={index === 0 ? "center 42%" : index === 1 ? "center 48%" : "center 40%"}
            style={{height: "100%", borderRadius: 22, transform: `rotate(${index === 0 ? -1.2 : index === 2 ? 1.2 : 0}deg)`, boxShadow: "0 18px 42px rgba(0,0,0,.52)"}}
          />
        ))}
      </section>

      <section style={{position: "absolute", left: 52, right: 52, bottom: 48, height: 220, borderRadius: 28, background: "#F4F4F2", color: "#090909", padding: "27px 34px", display: "flex", alignItems: "center", justifyContent: "space-between", boxSizing: "border-box"}}>
        <div>
          <div style={{fontSize: 18, color: "#666", fontWeight: 900, letterSpacing: 1.3}}>{campaign.date} · LIVE</div>
          <div style={{marginTop: 8, display: "flex", alignItems: "baseline", gap: 10}}>
            <span style={{fontSize: 72, fontWeight: 950, lineHeight: .9, letterSpacing: -3}}>{game.votes}</span>
            <span style={{fontSize: 25, fontWeight: 950}}>VOTES</span>
          </div>
          <div style={{marginTop: 15, fontSize: 17, color: "#666", fontWeight: 850}}>{campaign.link}</div>
        </div>
        <div style={{width: 385, height: 112, borderRadius: 20, background: "#0A0A0A", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 25px", boxSizing: "border-box"}}>
          <div style={{maxWidth: 280, fontSize: 30, lineHeight: .91, fontWeight: 950}}>{campaign.cta}</div>
          <div style={{fontSize: 54, fontWeight: 500}}>→</div>
        </div>
      </section>
    </AbsoluteFill>
  );
};
