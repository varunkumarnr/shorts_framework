# PixelPicked Remotion Content Engine

Modular, JSON-driven Remotion template system for vertical short-form content (1080×1920 @ 60fps) and landscape YouTube game trailers (1920×1080 @ 60fps).
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
- The landscape trailer source, fit, watermark, and outro
- Background video paths
- Reddit post content (subreddit, username, post text, highlight sentence)
- Game metadata
- Phone mockup media (video / image / carousel)
- Feature showcase labels and laptop UI
- List items with icons, highlights, subtitles
- Before/After card content

`PixelPickedTrailer` renders the single landscape trailer configured in
`SCENE8_GAME_TRAILER_CONFIG`. Its duration is read from the actual video file,
then the configured outro duration is appended automatically. Older scenes
remain available as individual compositions but are not part of the final.

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
| `public/bison.mp4` | Final landscape game trailer |
| `public/scene1_bg.mp4` | Scene 1 — Reddit background |
| `public/scene2_gameplay.mp4` | Scene 2 — Gameplay video |
| `public/mockup1.png` `mockup2.png` `mockup3.png` | Scene 3 — Phone carousel |
| `public/scene5_bg.mp4` | Scene 5 — List background |
| `public/scene6_bg.mp4` | Scene 6 — Before/After background |

---

## Rendering

### No-code Creator Studio

The local Creator Studio lets non-technical teammates create the four primary
PixelPicked formats without editing TypeScript:

- Game trailer
- Top 3 games video
- Editorial carousel image set
- Launch campaign artwork

Start it with:

```bash
npm run ui
```

Then open [http://localhost:4173](http://localhost:4173). Choose a format,
upload the requested media, edit the copy, and click **Render**. Uploaded files
are stored in `public/uploads/`; finished files are stored in
`out/ui-renders/` and appear as download links in the UI. Rendering stays local
to the computer.

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
npx remotion render src/index.ts BisonAttack-InstagramCarousel out/bison-carousel.mp4
npx remotion render src/index.ts BisonAttack-VideoCarousel out/bison-video-carousel.mp4
npx remotion render src/index.ts PixelPicked-CPI-Rise out/cpi-rise.mov --codec=prores --prores-profile=4444 --pixel-format=yuva444p10le
npx remotion render src/index.ts PixelPicked-CPI-Counter out/cpi-counter.mov --codec=prores --prores-profile=4444 --pixel-format=yuva444p10le
npx remotion render src/index.ts PixelPicked-Typewriter-Quote out/typewriter-quote.mov --codec=prores --prores-profile=4444 --pixel-format=yuva444p10le
npx remotion render src/index.ts PixelPicked-Sponsored-Storefront out/sponsored-storefront.mp4
npx remotion render src/index.ts PixelPicked-CPI-Statement out/cpi-statement.mov --codec=prores --prores-profile=4444 --pixel-format=yuva444p10le
npx remotion render src/index.ts PixelPicked-CPI-Counter out/cpi-counter.mov --codec=prores --prores-profile=4444 --pixel-format=yuva444p10le
npx remotion still src/index.ts PixelPicked-Top3-Story out/current-launches.png
npx remotion still src/index.ts PixelPicked-LastWeek-Winners out/last-week-winners.png
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

### Scene 8 — Landscape Game Trailer
YouTube-ready 16:9 gameplay trailer with a persistent PixelPicked logo in the
top-right and a closing “Check out the game at PixelPicked” card with a link.
Configure the source video, canvas, fit, proportional hook/title timing,
watermark visibility, colors, and outro in `SCENE8_GAME_TRAILER_CONFIG`. Put the trailer in `public/` and set
`trailer.src` with `staticFile("your-trailer.mp4")`. The final duration adjusts
to the real source length automatically.

### Scene 9 — Configurable Game Success-Story Carousel

Reusable 1080×1080 editorial format for stories about how well-known games
were built, overcame early struggles, and became successful. It is generated
as one `hookSlide`, any number of `contentSlides`, and one final PixelPicked
`ctaSlide`. Every slide accepts an image or video plus configurable eyebrow,
headline, body, detail, crop, font sizes, and colors. Use `gameName` for the
story subject, such as `"Angry Birds"` or `"Flappy Bird"`. Edit
`SCENE9_BISON_CAROUSEL_CONFIG` for the current example, or
pass `hookSlide`, `contentSlides`, `ctaSlide`, `gameName`, and `slideDuration`
as Remotion input props. Adding or removing context slides automatically
changes the composition duration and slide indicators.

To use a still image, set `media.type` to `"image"` and `media.src` to
`staticFile("your-image.png")` in the config. Render a still from the middle of
each slide (the default slide length is 180 frames) for a native Instagram
carousel.

### Scene 10 — Bison Attack Video Carousel

The earlier 1080×1350 full-bleed motion-carousel style, preserved as a separate
composition. It uses animated gameplay media, editorial text overlays, slide
indicators, the shared PixelPicked watermark, and a branded final CTA. Configure
it independently in `SCENE10_BISON_VIDEO_CAROUSEL_CONFIG`.

### Scene 11 — Live Current-Week Launches

Dynamic 1080×1350 Instagram post. Every render fetches
`https://api.pixelpicked.com/api/launches/week/current`, sorts by `voteCount`,
uses the top three `gameBanner` images, totals all votes, and derives the date
range and campaign day. `SCENE11_LAUNCH_TOP3_STORY_CONFIG` is retained as an
offline fallback if the endpoint is unavailable.

### Scene 12 — Last Week Winners

Reusable 1080×1350 Instagram post for the completed launch-week podium. Its
data comes from `https://api.pixelpicked.com/api/home` → `lastWeekResults` and
is stored independently in `SCENE12_LAST_WEEK_WINNERS_CONFIG`, so refreshing
last week's results never changes the current launch-campaign post.

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
# Guess the Game template

`Guess-The-Game-Day-1-Witcher-3` is a clean 16:9 gameplay post inspired by the
reference Threads format. The question stays in the social caption, so the
render contains no title card, answer, logo, streamer, or creator overlay.

For the next day, replace the clip in `public/guess-the-game/` and update
`SCENE55_GUESS_THE_GAME_CONFIG` at the end of `src/data/config.ts`.
