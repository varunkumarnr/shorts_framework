import React from "react";
import { AbsoluteFill, Img } from "remotion";
import { PixelPickedLogo } from "../components/shared";
import { SCENE12_LAST_WEEK_WINNERS_CONFIG } from "../data/config";
import { THEME } from "../data/theme";

const cfg = SCENE12_LAST_WEEK_WINNERS_CONFIG;

export const Scene12_LastWeekWinners: React.FC = () => (
  <AbsoluteFill
    style={{
      overflow: "hidden",
      fontFamily: THEME.fonts.display,
      background:
        "radial-gradient(circle at 82% 24%,rgba(255,255,255,0.055),transparent 34%), linear-gradient(155deg,#050505 0%,#090909 54%,#111111 100%)",
      color: cfg.colors.text,
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
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
        <PixelPickedLogo size={48} showText={false} />
        <div style={{ fontSize: 28, fontWeight: 850, letterSpacing: -1 }}>
          PixelPicked<span style={{ color: "#FFFFFF" }}>.</span>
        </div>
      </div>
      <div style={{ fontSize: 17, fontWeight: 850, letterSpacing: 1.4 }}>
        {cfg.copy.topRight}
      </div>
    </div>

    <div style={{ position: "absolute", left: 40, right: 40, top: 112, height: 455 }}>
      {cfg.results.map((result, index) => {
        const positions = [
          { left: 270, top: 0, width: 460, height: 325, rotate: 2 },
          { left: 0, top: 235, width: 420, height: 275, rotate: -2 },
          { left: 605, top: 250, width: 370, height: 265, rotate: 2 },
        ];
        const pos = positions[index];
        const longName = result.gameName.length > 22;

        return (
          <div
            key={result.gameId}
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
                result.finalRank === 1
                  ? `6px solid ${cfg.colors.winnerBorder}`
                  : `5px solid ${cfg.colors.border}`,
              background: "#0A0A0A",
              boxShadow: "0 28px 65px rgba(0,0,0,0.58)",
            }}
          >
            <Img
              src={result.artwork}
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
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  result.finalRank === 1 ? "#FFFFFF" : "rgba(18,18,18,0.94)",
                color: result.finalRank === 1 ? "#050505" : "#FFFFFF",
                border:
                  result.finalRank === 1
                    ? "none"
                    : "1px solid rgba(255,255,255,0.30)",
                fontSize: 26,
                fontWeight: 950,
              }}
            >
              #{result.finalRank}
            </div>
            {result.finalRank === 1 && (
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
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: 3,
                  fontSize: 18,
                  fontWeight: 880,
                }}
              >
                <span>{result.gameName}</span>
                <span style={{ color: "#D4D4D4", fontSize: 13, fontWeight: 900 }}>
                  ▲ {result.voteCount} VOTES
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
                display: "flex",
                alignItems: "center",
                justifyContent:
                  result.finalRank === 1 ? "flex-end" : "space-between",
                gap: 12,
                boxSizing: "border-box",
                background: "#090909",
              }}
            >
              {result.finalRank !== 1 && (
                <div
                  style={{
                    minWidth: 0,
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    fontSize: longName ? 13 : 18,
                    fontWeight: 880,
                    letterSpacing: -0.4,
                  }}
                >
                  {result.gameName}
                </div>
              )}
              <div
                style={{
                  flexShrink: 0,
                  color: result.finalRank === 1 ? "#FFFFFF" : "#B8B8B8",
                  fontSize: 14,
                  fontWeight: 900,
                }}
              >
                ▲ {result.voteCount} VOTES
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
          border: "1px solid rgba(255,255,255,0.30)",
          fontSize: 16,
          fontWeight: 850,
          letterSpacing: 1.3,
        }}
      >
        {cfg.copy.date}
      </div>
      <div
        style={{
          marginTop: 18,
          fontSize: 82,
          lineHeight: 0.84,
          fontWeight: 950,
          letterSpacing: -4.8,
        }}
      >
        <span style={{ color: "#FFFFFF" }}>{cfg.copy.headlineTop}</span>
        <br />
        <span style={{ color: "#D6D6D6" }}>{cfg.copy.headlineBottom}</span>
      </div>
      <div
        style={{
          marginTop: 14,
          color: cfg.colors.muted,
          fontSize: 37,
          fontWeight: 900,
          letterSpacing: -1.8,
        }}
      >
        {cfg.copy.subheadline}
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
          {cfg.copy.totalVotes.toUpperCase()} · WEEK {cfg.launchWeekId.replace("2026-W", "")}
        </div>
        <div style={{ marginTop: 7, fontSize: 40, fontWeight: 920, letterSpacing: -1.3 }}>
          {cfg.copy.cta}
        </div>
        <div style={{ marginTop: 5, color: "#666666", fontSize: 17, fontWeight: 700 }}>
          {cfg.copy.link}
        </div>
      </div>
      <div style={{ color: "#111111", fontSize: 62, fontWeight: 900 }}>→</div>
    </div>
  </AbsoluteFill>
);
