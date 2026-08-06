import { staticFile } from "remotion";

export const SCENE1_CONFIG = {
  backgroundVideo: staticFile("hook.mp4"),
  backgroundVideoStartFrom: 0,
  backgroundVideoPushScale: 1.08,
  reddit: {
    subreddit: "r/pixelpicked",
    username: "u/pixelpicked",
    avatar: "M",
    avatarColor: "#FF4500",
    timestamp: "14 hours ago",
    flair: "Rant / Venting",
    flairColor: "#FF585B",
    upvotes: "2.4k",
    comments: "312",
    title:
      "Flappy bird would get zero downloads if it launched today. prove me wrong.",
    body: "Quality didn't matter. My game was genuinely good. Better than half the top charts. But the App Store algorithm buried it on day one. No feature, no visibility, no players. Just silence. I didn't fail because my game was bad. I failed because nobody could find it.",
    highlightSentence:
      "I didn't fail because my game was bad. I failed because nobody could find it.",
    highlightColor: "#EAB308",
  },
  duration: 4000,
};

export const SCENE2_CONFIG = {
  backgroundVideo: staticFile("hook.mp4"),
  backgroundVideoStartFrom: 0,
  game: {
    name: "Song of Bloom",
    genre: "Puzzle · Narrative",
    platform: "iOS & Android",
    tagline: "an intense tale about everything.",
  },
  overlayText: {
    enabled: false,
    line1: "Underrated.",
    line2: "Unmissable.",
  },
  duration: 3700,
};

export const SCENE2B_TIMING = {
  clipTransition: 12, // frames of cross-fade between games
  screenshotHold: 150, // ≈5s @30fps — screenshot beat-drop hold
  screenshotTransition: 8, // white-flash frames cutting into gameplay
};

export const SCENE2B_CONFIG = {
  // ── Hook: shown first, before any game clips. A high-graphics showcase
  // clip with the title stacking in line-by-line (matches the reference
  // screenshot: "Top 3" / "Hidden Gem" / "Mobile Games", each a new color).
  // Keep this SHORT — it's a hook, not a scene.
  hook: {
    videoSrc: staticFile("hook.mp4"), // swap for your best-looking clip
    duration: 1000,
    lines: [
      { text: "Top 3", color: "#FF3DAA" },
      { text: "Shooting", color: "#FFFFFF" },
      { text: "Mobile Games", color: "#F5A623" },
    ],
  },

  // Fast beat-driven track. Uncomment once you have a file — the visual cuts
  // below are tuned to land on ~0.25–0.3s beats.
  // audioSrc: staticFile("fast_beat.mp3"),
  // audioVolume: 0.9,

  // ── Games: each one supports an optional `screenshot` — a Play Store or
  // PixelPicked capture that punches in BEFORE the gameplay clip starts.
  // Omit `screenshot` on a game to skip straight to gameplay.
  games: [
    {
      name: "Rainbow Six Mobile",
      genre: "Survival Horror · Stealth",
      platform: "Android · iOS",
      downloads: "50K+",
      tagline:
        "Sneak through the haunted Sker Hotel and survive enemies that hunt by sound.",
      videoSrc: staticFile("rainbow6.mp4"),
      duration: 500,
      screenshot: {
        src: staticFile("rainbow6.png"),
        label: "PixelPicked",
      },
    },
    {
      name: "Delta Force",
      genre: "Psychological Horror · Survival",
      platform: "Android · iOS",
      downloads: "100K+",
      tagline:
        "Solve dark mysteries, manage scarce resources, and face terrifying creatures.",
      videoSrc: staticFile("DeltaForce.mp4"),
      duration: 700,
      screenshot: {
        src: staticFile("deltaforce.png"),
        label: "PixelPicked",
      },
    },
    {
      name: "Arena Breakout",
      genre: "Horror · Exploration",
      platform: "Android · iOS",
      downloads: "50M+",
      tagline:
        "Search abandoned buildings for treasure while escaping a relentless ghost.",
      videoSrc: staticFile("ArenaBreakout.mp4"),
      duration: 500,
      screenshot: {
        src: staticFile("ArenaBreakout.png"),
        label: "PixelPicked",
      },
    },
  ],

  // Auto-calculated — do not edit manually. Derives entirely from
  // SCENE2B_TIMING now, so it can't drift out of sync with the component.
  get duration() {
    const preroll =
      SCENE2B_TIMING.screenshotHold + SCENE2B_TIMING.screenshotTransition;
    const gamesTotal = this.games.reduce(
      (sum: number, g: { duration: number; screenshot?: unknown }) =>
        sum + g.duration + (g.screenshot ? preroll : 0),
      0,
    );
    // + clipTransition once at the end, matching the tail of the final clip
    return this.hook.duration + gamesTotal + SCENE2B_TIMING.clipTransition;
  },
};

export const SCENE3_CONFIG = {
  headline: "This is what players\nsee instead of you.",
  headlineSize: 58,
  phone: {
    style: "iphone14" as const,
    notch: true,
    statusBarTime: "9:41",
  },
  media: {
    type: "carousel" as "video" | "image" | "carousel",
    sources: [
      staticFile("playstore3.png"),
      staticFile("playstore3.png"),
      staticFile("playstore3.png"),
    ],
    carouselDuration: 120,
    transitionDuration: 30,
  },
  caption: "App Store discovery is broken.",
  animationSpeed: 1.0,
  duration: 480,
};

export const SCENE4_CONFIG = {
  brand: {
    name: "PixelPicked",
    tagline: "The Missing Layer of Mobile Gaming ",
    accentColor: "#EAB308",
  },
  logoAloneDuration: 100,
  logoShrinkDuration: 60,
  taglineFadeIn: 40,
  featureSwitchInterval: 400,
  duration: 1200,
};

export const SCENE5_CONFIG = {
  backgroundVideo: staticFile("hook.mp4"),
  backgroundVideoPushScale: 1.06,
  title: "3 Reasons Indie Mobile\nGames Fail Discovery",
  titleSize: 90,
  items: [
    {
      number: "01",
      heading: "No Launch\nAudience",
      subtext:
        "Launching without a warm audience means the algorithm has nothing to work with.",
      highlight: "No Launch\nAudience",
      icon: "📢",
      accentColor: "#EAB308",
      image: staticFile("playstore3.png"),
    },
    {
      number: "02",
      heading: "Zero Pre-\nLaunch Buzz",
      subtext:
        "App stores reward momentum. Without early downloads, you get buried before day 1.",
      highlight: "Zero Pre-\nLaunch Buzz",
      icon: "📉",
      accentColor: "#EAB308",
      image: staticFile("playstore3.png"),
    },
    {
      number: "03",
      heading: "No Distribution\nChannel",
      subtext:
        "Paid UA is expensive. Organic discovery is near impossible. You need a third path.",
      highlight: "No Distribution\nChannel",
      icon: "🛤️",
      accentColor: "#EAB308",
      image: staticFile("playstore3.png"),
    },
  ],
  cardStagger: 120,
  cardEntranceDuration: 40,
  duration: 630,
};

export const SCENE6_CONFIG = {
  backgroundVideo: staticFile("hook.mp4"),
  backgroundVideoOpacity: 0.08,
  before: {
    label: "BEFORE",
    labelColor: "#999999",
    items: [
      { text: "No players.", icon: "😶", image: staticFile("playstore3.png") },
      { text: "No testers.", icon: "🔇", image: staticFile("playstore3.png") },
      {
        text: "No visibility.",
        icon: "👻",
        image: staticFile("playstore3.png"),
      },
    ],
  },
  after: {
    label: "AFTER",
    labelColor: "#EAB308",
    items: [
      {
        text: "Community growth.",
        icon: "🚀",
        image: staticFile("playstore3.png"),
      },
      {
        text: "Early feedback.",
        icon: "💬",
        image: staticFile("playstore3.png"),
      },
      { text: "Launch hype.", icon: "🔥", image: staticFile("playstore3.png") },
    ],
  },
  contextLabel: "PixelPicked changes the math.",
  layout: "stacked" as "split" | "stacked",
  duration: 900,
};

export type Scene7TextStyle =
  | "white"
  | "black"
  | "accent"
  | "transparent_white";

export interface Scene7TextOverlay {
  text: string;
  /** Frame at which this pill fades IN */
  startFrame: number;
  /** Frame at which this pill fades OUT (fully gone) */
  endFrame: number;
  /** Font size in px. Default: 64 */
  fontSize?: number;
  /** Visual style of the pill. Default: "white" */
  style?: Scene7TextStyle;
}

export const SCENE7_CONFIG = {
  backgroundVideo: staticFile("mobilegame.mov"), // same as Scene 1
  backgroundVideoStartFrom: 0,
  backgroundVideoPushScale: 1.05,

  /** px from the top of the frame where the text column begins */
  textAreaTopOffset: 180,
  textOverlays: [
    {
      text: "POV: you found the most satisfying mobile game.",
      startFrame: 0,
      endFrame: 400,
      fontSize: 64,
      style: "black",
    },
    // {
    //   text: "We played Clash\nof clans with friends\nClassmates.",
    //   startFrame: 410,
    //   endFrame: 800,
    //   fontSize: 64,
    //   style: "black",
    // },
    // {
    //   text: "that magic\ndoesn't exist\nanymore.",
    //   startFrame: 810,
    //   endFrame: 1200,
    //   fontSize: 68,
    //   style: "black",
    // },
    {
      text: "Check out Ring Rave on pixelpicked.",
      startFrame: 1110,
      endFrame: 1200,
      fontSize: 68,
      style: "black",
    },
  ] as Scene7TextOverlay[],
  duration: 1200,
};

export const ANALYTICS_METRICS = [
  { label: "DAU", value: "4,821", change: "↑ +14% WoW" },
  { label: "Session Len", value: "8.2m", change: "↑ +2.1m" },
  { label: "D7 Retention", value: "31%", change: "↑ above avg" },
  { label: "Reviews", value: "4.8★", change: "↑ 312 total" },
];

export const WAITLIST_NUMBERS = {
  target: 12441,
  thisWeek: 1203,
};
