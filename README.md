# PixelPicked Remotion Content Engine

Modular, JSON-driven Remotion template system for vertical short-form content (1080×1920 @ 60fps).  
White / premium minimal aesthetic. Apple keynote × SaaS trailer × editorial motion.

---

## Setup

```bash
npm install
npm start   # Opens Remotion Studio
```

---

## Project Structure

```
src/
├── data/
│   ├── theme.ts       ← ALL global design tokens (colors, fonts, animation speeds, spacing)
│   └── config.ts      ← ALL scene data / JSON config (edit this for content)
├── components/
│   └── shared.tsx     ← Reusable primitives: Display, Body, LaptopMockup, PhoneMockup, BgVideo, etc.
├── compositions/
│   ├── Scene1_Reddit.tsx        ← Reddit frustration post
│   ├── Scene2_Gameplay.tsx      ← Gameplay showcase + lower third
│   ├── Scene3_Mockup.tsx        ← Mobile mockup (video/image/carousel)
│   ├── Scene4_Outro.tsx         ← Logo reveal + feature showcase
│   ├── Scene5_List.tsx          ← Top 3 / numbered list
│   └── Scene6_BeforeAfter.tsx   ← Before / After comparison
├── Root.tsx           ← Registers all compositions
└── index.ts           ← Remotion entry point
```

---

## Configuring Scenes

**Everything** is driven by `src/data/config.ts`. Edit that file to change:
- Background video paths
- Reddit post content (subreddit, username, post text, highlight sentence)
- Game metadata
- Phone mockup media (video / image / carousel)
- Feature showcase labels and laptop UI
- List items with icons, highlights, subtitles
- Before/After card content

**Global design tokens** live in `src/data/theme.ts`:
- Colors (bg, primary, accent, etc.)
- Typography (font stack)
- Animation speeds
- Canvas dimensions

---

## Media Files

Place your media in the `public/` folder:

| File | Used by |
|------|---------|
| `public/scene1_bg.mp4` | Scene 1 — Reddit background |
| `public/scene2_gameplay.mp4` | Scene 2 — Gameplay video |
| `public/mockup1.png` `mockup2.png` `mockup3.png` | Scene 3 — Phone carousel |
| `public/scene5_bg.mp4` | Scene 5 — List background |
| `public/scene6_bg.mp4` | Scene 6 — Before/After background |

---

## Rendering

```bash
# Full trailer
npx remotion render src/index.ts PixelPickedTrailer out/trailer.mp4

# Single scene
npx remotion render src/index.ts Scene1_Reddit out/scene1.mp4
npx remotion render src/index.ts Scene2_Gameplay out/scene2.mp4
npx remotion render src/index.ts Scene3_Mockup out/scene3.mp4
npx remotion render src/index.ts Scene4_Outro out/scene4.mp4
npx remotion render src/index.ts Scene5_List out/scene5.mp4
npx remotion render src/index.ts Scene6_BeforeAfter out/scene6.mp4
```

---

## Scenes Overview

### Scene 1 — Reddit Frustration
Dark background video (slow cinematic push) + Reddit post card overlay.  
Config: subreddit, username, post title/body, highlight sentence, upvotes/comments.

### Scene 2 — Gameplay Showcase
Full-bleed gameplay video + optional centered text overlay + lower-third game metadata.  
Config: game name, genre, platform, tagline, overlay lines.

### Scene 3 — Mobile Mockup
White background, large bold headline, animated iPhone mockup.  
Supports: `video` | `image` | `carousel` (smooth crossfade).

### Scene 4 — Outro + Feature Showcase
Logo alone → shrinks → PixelPicked brand name + tagline → feature carousel with laptop mockups.  
Paced for short-form reels. Features: Build Community, Find Testers, Launch Campaigns, Curated Discovery.

### Scene 5 — Top 3 List
Dark video background, large title, numbered cards appearing sequentially with stagger.  
Config: title, 3 items with icons, highlight words, subtitles.

### Scene 6 — Before / After
White background, stacked or split comparison cards.  
Config: before/after items with icons, optional background video at low opacity.

---

## Design System

| Token | Value |
|-------|-------|
| Background | `#FFFFFF` |
| Primary text | `#000000` |
| Secondary text | `#555555` |
| Accent | `#EAB308` |
| Canvas | 1080 × 1920 @ 60fps |
| Font | Inter / SF Pro / Helvetica Neue |
