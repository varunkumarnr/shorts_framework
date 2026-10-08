import React from "react";
import { AbsoluteFill, Img } from "remotion";
import { PixelPickedLogo } from "../components/shared";
import { THEME } from "../data/theme";

export interface DevlogSummaryProps extends Record<string, unknown> {
  game: string;
  title: string;
  summary: string;
  date: string;
  artwork: string;
  accent: string;
}

export const Scene58_DevlogSummary: React.FC<DevlogSummaryProps> = ({ game, title, summary, date, artwork, accent }) => (
  <AbsoluteFill style={{ background: "#080808", color: "#FFFFFF", fontFamily: THEME.fonts.display, overflow: "hidden" }}>
    <Img src={artwork} style={{ position: "absolute", inset: 0, width: "100%", height: "55%", objectFit: "cover" }} />
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.03) 20%, rgba(8,8,8,0.38) 46%, #080808 58%)" }} />
    <div style={{ position: "absolute", top: 42, left: 46, right: 46, display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: THEME.fonts.body, fontWeight: 900, zIndex: 2 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}><PixelPickedLogo size={29} showText={false} /><span style={{ fontSize: 19, letterSpacing: -0.8 }}>PixelPicked.</span></div>
      <span style={{ fontSize: 13, letterSpacing: 1.8 }}>DEVLOG SUMMARY</span>
    </div>
    <div style={{ position: "absolute", left: 56, right: 56, top: 570, bottom: 62, display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div style={{ color: accent, fontFamily: THEME.fonts.body, fontSize: 16, fontWeight: 900, letterSpacing: 2.15 }}>{game.toUpperCase()} · {date}</div>
      <div style={{ marginTop: 17, fontSize: 66, lineHeight: 0.94, fontWeight: 930, letterSpacing: -3.1, whiteSpace: "pre-line" }}>{title}</div>
      <div style={{ marginTop: 25, maxWidth: 860, fontFamily: THEME.fonts.body, fontSize: 26, lineHeight: 1.32, fontWeight: 620, letterSpacing: -0.55, color: "rgba(255,255,255,0.78)" }}>{summary}</div>
      <div style={{ marginTop: 34, display: "flex", alignItems: "center", gap: 13, fontFamily: THEME.fonts.body, fontSize: 19, fontWeight: 850 }}><span style={{ width: 10, height: 10, borderRadius: 99, background: accent }} /> Read the full devlog on PixelPicked</div>
    </div>
  </AbsoluteFill>
);
