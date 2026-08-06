// src/data/theme.ts
// ─────────────────────────────────────────────────────────────────────────────
// GLOBAL DESIGN SYSTEM — All configurable values centralized here.
// Modify this file to change the look/feel of every scene globally.
// ─────────────────────────────────────────────────────────────────────────────

export const THEME = {
  // ── Colors ──────────────────────────────────────────────────────────────
  colors: {
    bg: "#FFFFFF",
    primary: "#000000",
    secondary: "#555555",
    tertiary: "#999999",
    accent: "#EAB308",
    accentLight: "#FFF9E6",
    accentDark: "#92700A",
    surface: "#F9F9F9",
    border: "#F0F0F0",
    borderLight: "#F5F5F5",
    white: "#FFFFFF",
    black: "#000000",
    success: "#22C55E",
    overlay: "rgba(0,0,0,0.04)",
  },

  // ── Typography ───────────────────────────────────────────────────────────
  fonts: {
    display: "'Inter', 'SF Pro Display', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    body: "'Inter', 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif",
  },

  // ── Animation speeds (in frames @ 60fps) ────────────────────────────────
  animation: {
    fastFade: 20,
    normalFade: 40,
    slowFade: 60,
    springDamping: 20,
    springStiffness: 80,
    springMass: 1,
    easeOutCubic: "cubic-bezier(0.33, 1, 0.68, 1)",
  },

  // ── Spacing ──────────────────────────────────────────────────────────────
  spacing: {
    xs: 8,
    sm: 16,
    md: 24,
    lg: 40,
    xl: 60,
    xxl: 80,
    pagePadding: 72,
  },

  // ── Canvas ───────────────────────────────────────────────────────────────
  canvas: {
    width: 1080,
    height: 1920,
    fps: 60,
  },
} as const;
