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
  audioCrossfade: 45, // 1.5s overlap: outgoing audio fades as the next track enters
};

export const SCENE2B_CONFIG = {
  // ── Hook: shown first, before any game clips. A high-graphics showcase
  // clip with the title stacking in line-by-line (matches the reference
  // screenshot: "Top 3" / "Hidden Gem" / "Mobile Games", each a new color).
  // Keep this SHORT — it's a hook, not a scene.
  hook: {
    videoSrc: staticFile("top3-action-hook.mp4"),
    duration: 180,
    lines: [
      { text: "Top 3", color: "#FF3DAA" },
      { text: "Action-Adventure", color: "#FFFFFF" },
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
      name: "ScourgeBringer",
      genre: "Action · Roguelite",
      platform: "Android · iOS",
      tagline:
        "Dash, slash, and shoot through a relentless world of ancient machines.",
      videoSrc: staticFile("top3-action-scourgebringer.mp4"),
      duration: 360,
      screenshot: {
        src: staticFile("top3-action-scourgebringer-store.png"),
        label: "PixelPicked",
      },
    },
    {
      name: "Huntdown",
      genre: "Run-and-Gun · Action",
      platform: "Android · iOS",
      tagline:
        "An explosive '80s action movie packed into a cyberpunk pixel world.",
      videoSrc: staticFile("top3-action-huntdown.mp4"),
      duration: 120,
      screenshot: {
        src: staticFile("top3-action-huntdown-store.png"),
        label: "PixelPicked",
      },
    },
    {
      name: "Grimvalor",
      genre: "Hack-and-Slash · RPG",
      platform: "Android · iOS",
      tagline:
        "Master brutal bosses and console-quality combat designed for touch.",
      videoSrc: staticFile("top3-action-grimvalor.mp4"),
      duration: 270,
      screenshot: {
        src: staticFile("top3-action-grimvalor-store.png"),
        label: "PixelPicked",
      },
    },
  ],

  outro: {
    duration: 180,
    headline: "Mobile gaming isn't the problem. Discovery is.",
    tagline: "The missing layer of mobile gaming",
    cta: "PixelPicked.com",
  },

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
    return (
      this.hook.duration +
      gamesTotal +
      SCENE2B_TIMING.clipTransition +
      this.outro.duration
    );
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

/**
 * Landscape YouTube game-trailer template.
 *
 * The composition reads the source video's real duration and appends the outro
 * automatically. Only the outro duration is configured manually.
 */
export type GameTrailerTextPosition = "top-left" | "center" | "bottom-left";

export interface GameTrailerTextOverlay {
  enabled: boolean;
  /** Start and end as a percentage of the source trailer length (0 to 1). */
  startAt: number;
  endAt: number;
  heading: string;
  subheading?: string;
  position: GameTrailerTextPosition;
  accentColor: string;
}

export const SCENE8_GAME_TRAILER_CONFIG = {
  canvas: {
    width: 1920,
    height: 1080,
    fps: 60,
  },
  backgroundColor: "#050505",
  trailer: {
    src: staticFile("dino.mp4"), // change trailer here
    fit: "contain" as "cover" | "contain",
    scale: 1,
  },
  watermark: {
    enabled: true,
    light: true,
  },
  textOverlays: {
    /** Set to false to hide both the hook and title. */
    enabled: true,
    hook: {
      enabled: true, // false if your dont want
      startAt: 0.02,
      endAt: 0.34,
      heading: "A TIME-TRAVEL GLITCH CHANGED EVERYTHING.", // here
      subheading: "Jax wanted to fix his past. Instead, he became a T-Rex.", // here the hool
      position: "bottom-left",
      accentColor: "#EAB308",
    } as GameTrailerTextOverlay,
    title: {
      enabled: true, // false if your dont want
      startAt: 0.55,
      endAt: 0.86,
      heading: "DINO WITH A GUN", // content second
      subheading:
        "Blast zombies, robots, and monsters in this roguelike survivor RPG.", // content second
      position: "top-left",
      accentColor: "#EAB308",
    } as GameTrailerTextOverlay,
  },
  outro: {
    enabled: true,
    duration: 240,
    headline: "Check out Dino with a Gun at PixelPicked", // outro content
    link: "pixelpicked.com/game/3ZxBrufxvqH/dino-with-a-gun",
    backgroundColor: "#F7F7F4",
    textColor: "#111111",
    accentColor: "#EAB308",
    logoSize: 112,
  },
};

export type InstagramCarouselLayout = "cover" | "left" | "split" | "cta";

export interface InstagramCarouselHeadlineSegment {
  text: string;
  color?: string;
  fontWeight?: number;
}

export type InstagramCarouselMedia =
  | {
      type: "image" | "video";
      /** Use staticFile("your-file.png") or staticFile("your-file.mp4"). */
      src: string;
      /** Only used for video media. */
      startFrom?: number;
      fit?: "cover" | "contain";
      /** CSS object-position, for example "center", "50% 30%", or "left top". */
      position?: string;
      /** Preserve crisp edges when scaling low-resolution pixel artwork. */
      pixelated?: boolean;
    }
  | {
      /** PixelPicked-branded artwork used for the final CTA slide. */
      type: "brand";
      backgroundColor?: string;
      foregroundColor?: string;
      accentColors?: [string, string, string];
    };

export interface InstagramCarouselSlide {
  layout: InstagramCarouselLayout;
  /** Image or video displayed in the top half of this slide. */
  media: InstagramCarouselMedia;
  eyebrow?: string;
  headline: string;
  /** Optional individually colored headline sections. Supports newlines. */
  headlineSegments?: InstagramCarouselHeadlineSegment[];
  body?: string;
  detail?: string;
  accentColor?: string;
  secondaryAccentColor?: string;
  /** Set false when a slide should omit the playful shapes and arrows. */
  decorations?: boolean;
  headlineSize?: number;
  /** Optional font and weight overrides exposed by Creator Studio. */
  fontFamily?: string;
  fontWeight?: number;
  bodySize?: number;
  panelBackground?: string;
  textColor?: string;
  /** Optional copy alignment inside the lower editorial panel. */
  textAlign?: "left" | "center";
  /** Optional lower-panel padding, for example "30px 44px 52px". */
  panelPadding?: string;
}

/** Input accepted by the reusable game success-story carousel. */
export interface InstagramEditorialCarouselProps extends Record<
  string,
  unknown
> {
  /** Always rendered first. */
  hookSlide?: InstagramCarouselSlide;
  /** Add, remove, or reorder as many context slides as needed. */
  contentSlides?: InstagramCarouselSlide[];
  /** Always rendered last. */
  ctaSlide?: InstagramCarouselSlide;
  /** Story subject shown in the bottom-right, e.g. "Flappy Bird". */
  gameName?: string;
  /** Frames per slide. Defaults to the configured value below. */
  slideDuration?: number;
}

export const SCENE9_BISON_CAROUSEL_CONFIG = {
  canvas: {
    width: 1080,
    height: 1080,
    fps: 60,
  },
  slideDuration: 180,
  transitionDuration: 20,
  layout: {
    topMediaHeight: 648,
    panelBackground: "#050505",
    dividerColor: "rgba(255,255,255,0.88)",
  },
  branding: {
    enabled: true,
    light: true,
  },
  game: {
    name: "Flappy Bird",
    creator: "Dong Nguyen",
    platform: "Mobile game success story",
    pixelPickedUrl: "pixelpicked.com",
  },
  /**
   * Every carousel is generated in this order:
   * hookSlide -> contentSlides (any amount) -> ctaSlide.
   *
   * Each media block can use a still image instead:
   * media: {
   *   type: "image",
   *   src: staticFile("your-slide-image.png"),
   *   fit: "cover",
   *   position: "50% 35%",
   * }
   */
  hookSlide: {
    layout: "cover",
    media: {
      type: "image",
      src: staticFile("dong-nguyen-smiling.png"),
      fit: "cover",
      position: "50% 35%",
    },
    headline: "ONE DEVELOPER BUILT A GLOBAL PHENOMENON — THEN DELETED IT.",
    headlineSegments: [
      { text: "ONE DEVELOPER BUILT\n", color: "#FFFFFF" },
      { text: "A GLOBAL PHENOMENON\n", color: "#FF8A1F" },
      { text: "— THEN DELETED IT.", color: "#FFFFFF" },
    ],
    accentColor: "#FF8A1F",
    decorations: false,
    headlineSize: 70,
    panelBackground: "linear-gradient(135deg, #17100A 0%, #050505 72%)",
  } as InstagramCarouselSlide,
  contentSlides: [
    {
      layout: "left",
      media: {
        type: "image",
        src: staticFile("flappy-bird-gameplay.png"),
        fit: "cover",
        position: "center",
        pixelated: true,
      },
      headline:
        "Tap to fly. Don't hit the pipes. 8-bit graphics. Punishing difficulty. Built in just 2–3 days.",
      headlineSegments: [
        { text: "Tap to fly.\n", color: "#FFFFFF" },
        { text: "Don't hit the pipes.\n", color: "#FF8A1F" },
        { text: "8-bit graphics. Punishing difficulty.\n", color: "#FFFFFF" },
        { text: "Built in just 2–3 days.", color: "#FF8A1F" },
      ],
      accentColor: "#FF8A1F",
      decorations: false,
      headlineSize: 48,
      panelBackground: "linear-gradient(135deg, #17100A 0%, #050505 72%)",
    },
    {
      layout: "split",
      media: {
        type: "image",
        src: staticFile("flappy-bird-icon.png"),
        fit: "cover",
        position: "center",
        pixelated: true,
      },
      headline:
        "50+ million downloads. The most downloaded game in the world. Reportedly $50,000 a day.",
      headlineSegments: [
        { text: "50+ million downloads.\n", color: "#FF8A1F" },
        { text: "The most downloaded game in the world.\n", color: "#FFFFFF" },
        { text: "Reportedly $50,000 a day.", color: "#FF8A1F" },
      ],
      accentColor: "#FF8A1F",
      decorations: false,
      headlineSize: 48,
      panelBackground: "linear-gradient(135deg, #17100A 0%, #050505 72%)",
    },
    {
      layout: "left",
      media: {
        type: "image",
        src: staticFile("dong-nguyen-interview.png"),
        fit: "cover",
        position: "50% 34%",
      },
      headline:
        "He deleted it at its peak. He said it had become an addictive problem. Thousands a day, gone.",
      headlineSegments: [
        { text: "He deleted it at its peak.\n", color: "#FF8A1F" },
        {
          text: "He said it had become an addictive problem.\n",
          color: "#FFFFFF",
        },
        { text: "Thousands a day, gone.", color: "#FF8A1F" },
      ],
      accentColor: "#FF8A1F",
      decorations: false,
      headlineSize: 48,
      panelBackground: "linear-gradient(135deg, #17100A 0%, #050505 72%)",
    },
  ] as InstagramCarouselSlide[],
  ctaSlide: {
    layout: "cta",
    media: {
      type: "brand",
      backgroundColor: "#F4F4F0",
      foregroundColor: "#050505",
      accentColors: ["#FF4D8D", "#C7F000", "#8B5CF6"],
    },
    headline:
      "Build what's next. Find it early. Discover, play, follow and shape it at PixelPicked.com.",
    headlineSegments: [
      { text: "Build what's next.\n", color: "#FF8A1F" },
      {
        text: "Find it early. Discover, play, follow and shape it.\n",
        color: "#FFFFFF",
      },
      { text: "PixelPicked.com", color: "#FF8A1F" },
    ],
    accentColor: "#FF8A1F",
    decorations: false,
    headlineSize: 48,
    panelBackground: "linear-gradient(135deg, #17100A 0%, #050505 72%)",
  } as InstagramCarouselSlide,
  get slides(): InstagramCarouselSlide[] {
    return [this.hookSlide, ...this.contentSlides, this.ctaSlide];
  },
  get duration() {
    return this.slides.length * this.slideDuration;
  },
};

/** Angry Birds success story using the reusable Scene 9 carousel template. */
export const SCENE9_ANGRY_BIRDS_CAROUSEL_CONFIG = {
  gameName: "Angry Birds",
  slideDuration: 180,
  hookSlide: {
    layout: "cover",
    media: {
      type: "image",
      src: staticFile("angry-birds-01-hook.png"),
      fit: "cover",
      position: "50% 38%",
    },
    headline:
      "ONE GAME DESIGNER SKETCHED A BIRD. IT BECAME A 3-BILLION-DOWNLOAD EMPIRE. 🤯",
    headlineSegments: [
      { text: "ONE GAME DESIGNER\n", color: "#FFFFFF" },
      { text: "SKETCHED A BIRD.\n", color: "#FF8A1F" },
      { text: "IT BECAME A 3-BILLION-\n", color: "#FFFFFF" },
      { text: "DOWNLOAD EMPIRE. 🤯", color: "#FF8A1F" },
    ],
    accentColor: "#FF8A1F",
    decorations: false,
    headlineSize: 64,
    panelBackground: "linear-gradient(135deg, #17100A 0%, #050505 72%)",
  } as InstagramCarouselSlide,
  contentSlides: [
    {
      layout: "left",
      media: {
        type: "image",
        src: staticFile("angry-birds-02-origin.png"),
        fit: "cover",
        position: "center",
      },
      headline:
        "It started with a simple drawing by Jaakko Iisalo. He drew angry birds facing off against green pigs.",
      headlineSegments: [
        { text: "It started with a simple drawing\n", color: "#FFFFFF" },
        { text: "by Jaakko Iisalo.\n", color: "#FF8A1F" },
        { text: "He drew angry birds facing off\n", color: "#FFFFFF" },
        { text: "against green pigs.", color: "#FF8A1F" },
      ],
      accentColor: "#FF8A1F",
      decorations: false,
      headlineSize: 47,
      panelBackground: "linear-gradient(135deg, #17100A 0%, #050505 72%)",
    },
    {
      layout: "split",
      media: {
        type: "image",
        src: staticFile("angry-birds-03-billion.png"),
        fit: "cover",
        position: "50% 36%",
      },
      headline:
        "Then everything changed. The original game reached 1 billion downloads by 2012.",
      headlineSegments: [
        { text: "Then everything changed.\n", color: "#FF8A1F" },
        { text: "The original game reached\n", color: "#FFFFFF" },
        { text: "1 billion downloads\n", color: "#FF8A1F" },
        { text: "by 2012.", color: "#FFFFFF" },
      ],
      accentColor: "#FF8A1F",
      decorations: false,
      headlineSize: 50,
      panelBackground: "linear-gradient(135deg, #17100A 0%, #050505 72%)",
    },
    {
      layout: "left",
      media: {
        type: "image",
        src: staticFile("angry-birds-04-rovio.png"),
        fit: "cover",
        position: "center",
      },
      headline:
        "Rovio had already released 51 games. Most failed, but the 52nd birds changed everything.",
      headlineSegments: [
        { text: "Rovio had already released\n", color: "#FFFFFF" },
        { text: "51 games.\n", color: "#FF8A1F" },
        { text: "Most failed, but the 52nd birds\n", color: "#FFFFFF" },
        { text: "changed everything.", color: "#FF8A1F" },
      ],
      accentColor: "#FF8A1F",
      decorations: false,
      headlineSize: 48,
      panelBackground: "linear-gradient(135deg, #17100A 0%, #050505 72%)",
    },
    {
      layout: "left",
      media: {
        type: "image",
        src: staticFile("angry-birds-05-franchise.png"),
        fit: "cover",
        position: "center",
      },
      headline:
        "One simple idea. One mobile game. A global franchise. How many games are you overlooking?",
      headlineSegments: [
        { text: "One simple idea. One mobile game.\n", color: "#FFFFFF" },
        { text: "A global franchise.\n", color: "#FF8A1F" },
        { text: "How many games are you overlooking?", color: "#FFFFFF" },
      ],
      accentColor: "#FF8A1F",
      decorations: false,
      headlineSize: 47,
      panelBackground: "linear-gradient(135deg, #17100A 0%, #050505 72%)",
    },
  ] as InstagramCarouselSlide[],
  ctaSlide: SCENE9_BISON_CAROUSEL_CONFIG.ctaSlide,
};

/** Stardew Valley creator story using the same editorial carousel treatment. */
export const SCENE9_STARDEW_VALLEY_CAROUSEL_CONFIG = {
  gameName: "Stardew Valley",
  slideDuration: 180,
  hookSlide: {
    layout: "cover",
    media: {
      type: "image",
      src: staticFile("stardew-valley-01-hook.jpg"),
      fit: "cover",
      position: "50% 48%",
    },
    headline:
      "ONE UNEMPLOYED GRADUATE BUILT A FARMING GAME ALONE. IT SOLD 41 MILLION COPIES. 🤯",
    headlineSegments: [
      { text: "ONE UNEMPLOYED GRADUATE\n", color: "#FFFFFF" },
      { text: "BUILT A FARMING GAME ALONE.\n", color: "#FF8A1F" },
      { text: "IT SOLD 41 MILLION\n", color: "#FFFFFF" },
      { text: "COPIES. 🤯", color: "#FF8A1F" },
    ],
    accentColor: "#FF8A1F",
    decorations: false,
    headlineSize: 60,
    panelBackground: "linear-gradient(135deg, #17100A 0%, #050505 72%)",
  } as InstagramCarouselSlide,
  contentSlides: [
    {
      layout: "left",
      media: {
        type: "image",
        src: staticFile("stardew-valley-02-origin.png"),
        fit: "cover",
        position: "center",
      },
      headline:
        "It began as a way to improve his job prospects. Eric Barone taught himself code, pixel art, music, and design.",
      headlineSegments: [
        { text: "It began as a way to improve\n", color: "#FFFFFF" },
        { text: "his job prospects.\n", color: "#FF8A1F" },
        { text: "Eric Barone taught himself code,\n", color: "#FFFFFF" },
        { text: "pixel art, music, and design.", color: "#FF8A1F" },
      ],
      accentColor: "#FF8A1F",
      decorations: false,
      headlineSize: 46,
      panelBackground: "linear-gradient(135deg, #17100A 0%, #050505 72%)",
    },
    {
      layout: "split",
      media: {
        type: "image",
        src: staticFile("stardew-valley-03-solo.jpg"),
        fit: "cover",
        position: "50% 34%",
      },
      headline:
        "For 4½ years, he worked alone—often 10 hours a day—rebuilding the game again and again.",
      headlineSegments: [
        { text: "For 4½ years,\n", color: "#FF8A1F" },
        { text: "he worked alone—often\n", color: "#FFFFFF" },
        { text: "10 hours a day—\n", color: "#FF8A1F" },
        { text: "rebuilding it again and again.", color: "#FFFFFF" },
      ],
      accentColor: "#FF8A1F",
      decorations: false,
      headlineSize: 49,
      panelBackground: "linear-gradient(135deg, #17100A 0%, #050505 72%)",
    },
    {
      layout: "left",
      media: {
        type: "image",
        src: staticFile("stardew-valley-04-launch.png"),
        fit: "cover",
        position: "center",
      },
      headline:
        "Then everything changed. Stardew Valley sold 1 million copies within two months of launch.",
      headlineSegments: [
        { text: "Then everything changed.\n", color: "#FF8A1F" },
        { text: "Stardew Valley sold\n", color: "#FFFFFF" },
        { text: "1 million copies\n", color: "#FF8A1F" },
        { text: "within two months of launch.", color: "#FFFFFF" },
      ],
      accentColor: "#FF8A1F",
      decorations: false,
      headlineSize: 48,
      panelBackground: "linear-gradient(135deg, #17100A 0%, #050505 72%)",
    },
    {
      layout: "left",
      media: {
        type: "image",
        src: staticFile("stardew-valley-05-sales.jpg"),
        fit: "cover",
        position: "center",
      },
      headline:
        "One creator. One quiet farming game. 41+ million copies sold. What great game are you overlooking?",
      headlineSegments: [
        { text: "One creator. One quiet farming game.\n", color: "#FFFFFF" },
        { text: "41+ million copies sold.\n", color: "#FF8A1F" },
        { text: "What great game are you overlooking?", color: "#FFFFFF" },
      ],
      accentColor: "#FF8A1F",
      decorations: false,
      headlineSize: 46,
      panelBackground: "linear-gradient(135deg, #17100A 0%, #050505 72%)",
    },
  ] as InstagramCarouselSlide[],
  ctaSlide: SCENE9_BISON_CAROUSEL_CONFIG.ctaSlide,
};

/** Multi-game indie breakout carousel using the editorial success-story format. */
export const SCENE9_INDIE_SUCCESS_CAROUSEL_CONFIG = {
  gameName: "Indie Success Stories",
  slideDuration: 180,
  hookSlide: {
    layout: "cover",
    media: {
      type: "image",
      src: staticFile("indie-carousel-hollow-knight.jpg"),
      fit: "cover",
      position: "50% 52%",
    },
    headline: "THE BEST INDIE GAMES EVER. COMMENT YOUR FAVORITE.",
    headlineSegments: [
      { text: "THE BEST\n", color: "#FFFFFF" },
      { text: "INDIE GAMES\n", color: "#FF8A1F" },
      { text: "EVER.", color: "#FFFFFF" },
    ],
    detail: "COMMENT YOUR FAVORITE ↓",
    accentColor: "#FF8A1F",
    decorations: false,
    panelBackground: "linear-gradient(135deg, #17100A 0%, #050505 72%)",
  } as InstagramCarouselSlide,
  contentSlides: [
    {
      layout: "left",
      media: {
        type: "image",
        src: staticFile("indie-carousel-undertale.jpg"),
        fit: "cover",
        position: "50% 58%",
        pixelated: true,
      },
      headline:
        "With only $51K from Kickstarter, Toby Fox spent 32 months writing, coding and composing almost everything himself. That strange little RPG became a game millions still carry with them.",
      headlineSegments: [
        { text: "UNDERTALE\n", color: "#FF8A1F", fontWeight: 900 },
        { text: "With only ", color: "#FFFFFF" },
        { text: "$51K from Kickstarter, ", color: "#FF8A1F", fontWeight: 800 },
        { text: "Toby Fox spent 32 months writing, coding and composing almost everything himself.\n", color: "#FFFFFF" },
        { text: "That strange little RPG became a game millions still carry with them.", color: "#FF8A1F", fontWeight: 800 },
      ],
      accentColor: "#FF8A1F",
      decorations: false,
      textAlign: "left",
      panelPadding: "32px 44px 54px",
      panelBackground: "linear-gradient(135deg, #17100A 0%, #050505 72%)",
    },
    {
      layout: "split",
      media: {
        type: "image",
        src: staticFile("indie-carousel-hollow-knight.jpg"),
        fit: "cover",
        position: "50% 50%",
      },
      headline:
        "Two developers missed a three-day game-jam deadline. But they refused to abandon the tiny knight they had created. With A$57K from Kickstarter, that unfinished experiment grew into a world that sold 15M+ copies.",
      headlineSegments: [
        { text: "HOLLOW KNIGHT\n", color: "#FF8A1F", fontWeight: 900 },
        { text: "Two developers missed a three-day game-jam deadline. But they refused to abandon the tiny knight they had created.\n", color: "#FFFFFF" },
        { text: "A$57K on Kickstarter → 15M+ copies.", color: "#FF8A1F", fontWeight: 800 },
      ],
      accentColor: "#FF8A1F",
      decorations: false,
      textAlign: "left",
      panelPadding: "32px 44px 54px",
      panelBackground: "linear-gradient(135deg, #17100A 0%, #050505 72%)",
    },
    {
      layout: "left",
      media: {
        type: "image",
        src: staticFile("indie-carousel-stardew.jpg"),
        fit: "cover",
        position: "50% 54%",
        pixelated: true,
      },
      headline:
        "Eric Barone could not find the job he wanted. So for four and a half years, he taught himself code, art, music and design—rebuilding his quiet farming game again and again. One developer eventually reached 41M+ players.",
      headlineSegments: [
        { text: "STARDEW VALLEY\n", color: "#FF8A1F", fontWeight: 900 },
        { text: "Eric Barone could not find the job he wanted. So for ", color: "#FFFFFF" },
        { text: "4½ years, ", color: "#FF8A1F", fontWeight: 800 },
        { text: "he taught himself code, art, music and design—rebuilding his quiet farming game again and again.\n", color: "#FFFFFF" },
        { text: "One developer → 41M+ copies.", color: "#FF8A1F", fontWeight: 800 },
      ],
      accentColor: "#FF8A1F",
      decorations: false,
      textAlign: "left",
      panelPadding: "32px 44px 54px",
      panelBackground: "linear-gradient(135deg, #17100A 0%, #050505 72%)",
    },
    {
      layout: "left",
      media: {
        type: "image",
        src: staticFile("indie-carousel-vampire-survivors.jpg"),
        fit: "cover",
        position: "50% 50%",
        pixelated: true,
      },
      headline:
        "Luca Galante had flipped burgers and coded slot machines before returning to the dream of making games. He built 95% of Vampire Survivors on his own. The tiny experiment eventually reached 27M+ players.",
      headlineSegments: [
        { text: "VAMPIRE SURVIVORS\n", color: "#FF8A1F", fontWeight: 900 },
        { text: "Luca Galante had flipped burgers and coded slot machines before returning to his dream of making games.\n", color: "#FFFFFF" },
        { text: "He built 95% alone. The tiny experiment reached 27M+ players.", color: "#FF8A1F", fontWeight: 800 },
      ],
      accentColor: "#FF8A1F",
      decorations: false,
      textAlign: "left",
      panelPadding: "32px 44px 54px",
      panelBackground: "linear-gradient(135deg, #17100A 0%, #050505 72%)",
    },
    {
      layout: "left",
      media: {
        type: "image",
        src: staticFile("indie-carousel-among-us.jpg"),
        fit: "cover",
        position: "50% 52%",
      },
      headline:
        "Three people released Among Us as a local-only mobile game in 2018. Almost nobody noticed. They kept it alive through two quiet years—until streamers found it and turned their forgotten game into a global language.",
      headlineSegments: [
        { text: "AMONG US\n", color: "#FF8A1F", fontWeight: 900 },
        { text: "Three people released it as a local-only mobile game in 2018. ", color: "#FFFFFF" },
        { text: "Almost nobody noticed.\n", color: "#FF8A1F", fontWeight: 800 },
        { text: "They kept it alive through two quiet years—until streamers turned their forgotten game into a global language.", color: "#FFFFFF" },
      ],
      accentColor: "#FF8A1F",
      decorations: false,
      textAlign: "left",
      panelPadding: "32px 44px 54px",
      panelBackground: "linear-gradient(135deg, #17100A 0%, #050505 72%)",
    },
  ] as InstagramCarouselSlide[],
  ctaSlide: {
    ...SCENE9_BISON_CAROUSEL_CONFIG.ctaSlide,
    headline: "The next breakout game is already being built. Find it before everyone else at PixelPicked.com.",
    headlineSegments: [
      { text: "THE NEXT BREAKOUT GAME\n", color: "#FF8A1F", fontWeight: 900 },
      { text: "IS ALREADY BEING BUILT.\n", color: "#FFFFFF", fontWeight: 900 },
      { text: "FIND IT FIRST.\n", color: "#FFFFFF", fontWeight: 900 },
      { text: "PIXELPICKED.COM", color: "#FF8A1F", fontWeight: 900 },
    ],
  } as InstagramCarouselSlide,
};

/** Crossy Road's mobile-first breakout story in the editorial carousel format. */
export const SCENE9_CROSSY_ROAD_CAROUSEL_CONFIG = {
  gameName: "Crossy Road",
  slideDuration: 180,
  hookSlide: {
    layout: "cover",
    media: {
      type: "image",
      src: staticFile("crossy-road-01-developers.jpg"),
      fit: "cover",
      position: "50% 34%",
    },
    headline:
      "A TINY TEAM BUILT A MOBILE GAME IN 12 WEEKS. IT MADE $10 MILLION IN 90 DAYS. 🤯",
    headlineSegments: [
      { text: "A TINY TEAM BUILT\n", color: "#FFFFFF" },
      { text: "A MOBILE GAME IN 12 WEEKS.\n", color: "#FF8A1F" },
      { text: "IT MADE $10 MILLION\n", color: "#FFFFFF" },
      { text: "IN 90 DAYS. 🤯", color: "#FF8A1F" },
    ],
    accentColor: "#FF8A1F",
    decorations: false,
    headlineSize: 61,
    panelBackground: "linear-gradient(135deg, #17100A 0%, #050505 72%)",
  } as InstagramCarouselSlide,
  contentSlides: [
    {
      layout: "left",
      media: {
        type: "image",
        src: staticFile("crossy-road-02-characters.png"),
        fit: "cover",
        position: "50% 50%",
        pixelated: true,
      },
      headline:
        "After Flappy Bird, Matt Hall and Andy Sum wanted to create the next viral mobile hit.",
      headlineSegments: [
        { text: "After Flappy Bird,\n", color: "#FFFFFF" },
        { text: "Matt Hall and Andy Sum\n", color: "#FF8A1F" },
        { text: "wanted to create the next\n", color: "#FFFFFF" },
        { text: "viral mobile hit.", color: "#FF8A1F" },
      ],
      accentColor: "#FF8A1F",
      decorations: false,
      headlineSize: 48,
      panelBackground: "linear-gradient(135deg, #17100A 0%, #050505 72%)",
    },
    {
      layout: "split",
      media: {
        type: "image",
        src: staticFile("crossy-road-03-gameplay.png"),
        fit: "cover",
        position: "50% 43%",
        pixelated: true,
      },
      headline:
        "They built Crossy Road in just 12 weeks. One tap. Endless roads. Instantly understandable.",
      headlineSegments: [
        { text: "They built Crossy Road\n", color: "#FFFFFF" },
        { text: "in just 12 weeks.\n", color: "#FF8A1F" },
        { text: "One tap. Endless roads.\n", color: "#FFFFFF" },
        { text: "Instantly understandable.", color: "#FF8A1F" },
      ],
      accentColor: "#FF8A1F",
      decorations: false,
      headlineSize: 48,
      panelBackground: "linear-gradient(135deg, #17100A 0%, #050505 72%)",
    },
    {
      layout: "left",
      media: {
        type: "image",
        src: staticFile("crossy-road-04-growth.png"),
        fit: "cover",
        position: "50% 48%",
        pixelated: true,
      },
      headline:
        "10 million downloads in one month. 50 million downloads and $10 million within 90 days.",
      headlineSegments: [
        { text: "10 million downloads\n", color: "#FF8A1F" },
        { text: "in one month.\n", color: "#FFFFFF" },
        { text: "50 million downloads + $10 million\n", color: "#FF8A1F" },
        { text: "within 90 days.", color: "#FFFFFF" },
      ],
      accentColor: "#FF8A1F",
      decorations: false,
      headlineSize: 46,
      panelBackground: "linear-gradient(135deg, #17100A 0%, #050505 72%)",
    },
    {
      layout: "left",
      media: {
        type: "image",
        src: staticFile("crossy-road-05-legacy.png"),
        fit: "contain",
        position: "center",
        pixelated: true,
      },
      headline:
        "One simple idea became a 350-million-player mobile phenomenon. What great game are you overlooking?",
      headlineSegments: [
        { text: "One simple idea became a\n", color: "#FFFFFF" },
        { text: "350-million-player phenomenon.\n", color: "#FF8A1F" },
        {
          text: "What great game are you overlooking?",
          color: "#FFFFFF",
        },
      ],
      accentColor: "#FF8A1F",
      decorations: false,
      headlineSize: 46,
      panelBackground: "linear-gradient(135deg, #17100A 0%, #050505 72%)",
    },
  ] as InstagramCarouselSlide[],
  ctaSlide: SCENE9_BISON_CAROUSEL_CONFIG.ctaSlide,
};

/** Fruit Ninja's one-swipe origin story in the editorial carousel format. */
export const SCENE9_FRUIT_NINJA_CAROUSEL_CONFIG = {
  gameName: "Fruit Ninja",
  slideDuration: 180,
  hookSlide: {
    layout: "cover",
    media: {
      type: "image",
      src: staticFile("fruit-ninja-02-origin.jpg"),
      fit: "cover",
      position: "50% 45%",
    },
    headline: "ONE SIMPLE SWIPE CREATED A BILLION-DOWNLOAD EMPIRE. 🤯",
    headlineSegments: [
      { text: "ONE SIMPLE SWIPE\n", color: "#FFFFFF" },
      { text: "CREATED A BILLION-DOWNLOAD\n", color: "#FF8A1F" },
      { text: "EMPIRE. 🤯", color: "#FFFFFF" },
    ],
    accentColor: "#FF8A1F",
    decorations: false,
    headlineSize: 65,
    panelBackground: "linear-gradient(135deg, #17100A 0%, #050505 72%)",
  } as InstagramCarouselSlide,
  contentSlides: [
    {
      layout: "left",
      media: {
        type: "image",
        src: staticFile("fruit-ninja-02-team.jpeg"),
        fit: "cover",
        position: "50% 50%",
      },
      headline:
        "Halfbrick was fighting to survive. Almost nobody believed in the fruit-slicing idea.",
      headlineSegments: [
        { text: "Halfbrick was fighting to survive.\n", color: "#FFFFFF" },
        { text: "Almost nobody believed in\n", color: "#FFFFFF" },
        { text: "the fruit-slicing idea.", color: "#FF8A1F" },
      ],
      accentColor: "#FF8A1F",
      decorations: false,
      headlineSize: 49,
      panelBackground: "linear-gradient(135deg, #17100A 0%, #050505 72%)",
    },
    {
      layout: "split",
      media: {
        type: "image",
        src: staticFile("fruit-ninja-03-mechanic.jpg"),
        fit: "cover",
        position: "50% 50%",
      },
      headline:
        "Slice fruit. Avoid bombs. One gesture made perfect sense on a touchscreen.",
      headlineSegments: [
        { text: "Slice fruit.\n", color: "#FF8A1F" },
        { text: "Avoid bombs.\n", color: "#FFFFFF" },
        { text: "One gesture made perfect sense\n", color: "#FFFFFF" },
        { text: "on a touchscreen.", color: "#FF8A1F" },
      ],
      accentColor: "#FF8A1F",
      decorations: false,
      headlineSize: 50,
      panelBackground: "linear-gradient(135deg, #17100A 0%, #050505 72%)",
    },
    {
      layout: "left",
      media: {
        type: "image",
        src: staticFile("fruit-ninja-04-growth.jpg"),
        fit: "cover",
        position: "50% 50%",
      },
      headline:
        "1 million downloads within three months. More than 6 million paid iPhone downloads in 10 months.",
      headlineSegments: [
        { text: "1 million downloads\n", color: "#FF8A1F" },
        { text: "within three months.\n", color: "#FFFFFF" },
        { text: "6+ million paid iPhone downloads\n", color: "#FF8A1F" },
        { text: "in 10 months.", color: "#FFFFFF" },
      ],
      accentColor: "#FF8A1F",
      decorations: false,
      headlineSize: 46,
      panelBackground: "linear-gradient(135deg, #17100A 0%, #050505 72%)",
    },
    {
      layout: "left",
      media: {
        type: "image",
        src: staticFile("fruit-ninja-05-legacy.jpg"),
        fit: "cover",
        position: "50% 50%",
      },
      headline:
        "Five years later: 1 billion downloads. One simple swipe changed mobile gaming forever.",
      headlineSegments: [
        { text: "Five years later:\n", color: "#FFFFFF" },
        { text: "1 billion downloads.\n", color: "#FF8A1F" },
        { text: "One simple swipe changed\n", color: "#FFFFFF" },
        { text: "mobile gaming forever.", color: "#FF8A1F" },
      ],
      accentColor: "#FF8A1F",
      decorations: false,
      headlineSize: 49,
      panelBackground: "linear-gradient(135deg, #17100A 0%, #050505 72%)",
    },
  ] as InstagramCarouselSlide[],
  ctaSlide: SCENE9_BISON_CAROUSEL_CONFIG.ctaSlide,
};

/** Subway Surfers' animated-short-to-global-hit origin story. */
export const SCENE9_SUBWAY_SURFERS_CAROUSEL_CONFIG = {
  gameName: "Subway Surfers",
  slideDuration: 180,
  hookSlide: {
    layout: "cover",
    media: {
      type: "image",
      src: staticFile("subway-surfers-01-hook.jpg"),
      fit: "cover",
      position: "50% 43%",
    },
    headline:
      "AN ANIMATED SHORT BECAME THE FIRST GAME TO HIT 1 BILLION DOWNLOADS. 🤯",
    headlineSegments: [
      { text: "AN ANIMATED SHORT\n", color: "#FFFFFF" },
      { text: "BECAME THE FIRST GAME TO HIT\n", color: "#FFFFFF" },
      { text: "1 BILLION DOWNLOADS. 🤯", color: "#FF8A1F" },
    ],
    accentColor: "#FF8A1F",
    decorations: false,
    headlineSize: 61,
    panelBackground: "linear-gradient(135deg, #17100A 0%, #050505 72%)",
  } as InstagramCarouselSlide,
  contentSlides: [
    {
      layout: "left",
      media: {
        type: "image",
        src: staticFile("subway-surfers-02-origin.jpg"),
        fit: "cover",
        position: "50% 43%",
      },
      headline:
        "In 2009, two animators created a short film about a rebellious kid escaping a guard and his dog.",
      headlineSegments: [
        { text: "In 2009, two animators\n", color: "#FF8A1F" },
        { text: "created a short film about a rebellious kid\n", color: "#FFFFFF" },
        { text: "escaping a guard and his dog.", color: "#FF8A1F" },
      ],
      accentColor: "#FF8A1F",
      decorations: false,
      headlineSize: 47,
      panelBackground: "linear-gradient(135deg, #17100A 0%, #050505 72%)",
    },
    {
      layout: "split",
      media: {
        type: "image",
        src: staticFile("subway-surfers-03-mechanic.jpg"),
        fit: "cover",
        position: "50% 42%",
      },
      headline:
        "Three years later, SYBO and Kiloo turned it into a game. Swipe. Dodge trains. Keep running.",
      headlineSegments: [
        { text: "Three years later,\n", color: "#FFFFFF" },
        { text: "SYBO and Kiloo turned it into a game.\n", color: "#FF8A1F" },
        { text: "Swipe. Dodge trains. Keep running.", color: "#FFFFFF" },
      ],
      accentColor: "#FF8A1F",
      decorations: false,
      headlineSize: 47,
      panelBackground: "linear-gradient(135deg, #17100A 0%, #050505 72%)",
    },
    {
      layout: "left",
      media: {
        type: "image",
        src: staticFile("subway-surfers-04-growth.jpg"),
        fit: "cover",
        position: "50% 43%",
      },
      headline:
        "In 2017 alone, it earned over 400 million downloads and became the world's most-downloaded game.",
      headlineSegments: [
        { text: "In 2017 alone:\n", color: "#FFFFFF" },
        { text: "400+ million downloads.\n", color: "#FF8A1F" },
        { text: "The world's most-downloaded game.", color: "#FFFFFF" },
      ],
      accentColor: "#FF8A1F",
      decorations: false,
      headlineSize: 51,
      panelBackground: "linear-gradient(135deg, #17100A 0%, #050505 72%)",
    },
    {
      layout: "left",
      media: {
        type: "image",
        src: staticFile("subway-surfers-05-legacy.jpg"),
        fit: "cover",
        position: "50% 42%",
      },
      headline:
        "In 2018, it became the first Google Play game to reach 1 billion downloads. Then it crossed 3 billion worldwide.",
      headlineSegments: [
        { text: "The first Google Play game to reach\n", color: "#FFFFFF" },
        { text: "1 billion downloads.\n", color: "#FF8A1F" },
        { text: "Then 3 billion worldwide.", color: "#FFFFFF" },
      ],
      accentColor: "#FF8A1F",
      decorations: false,
      headlineSize: 49,
      panelBackground: "linear-gradient(135deg, #17100A 0%, #050505 72%)",
    },
  ] as InstagramCarouselSlide[],
  ctaSlide: SCENE9_BISON_CAROUSEL_CONFIG.ctaSlide,
};

/** Companion square post for Best Game of Every Year, Part 2. */
export const SCENE9_BEST_GAMES_PART2_CAROUSEL_CONFIG = {
  gameName: "Best Games · Part 2",
  slideDuration: 180,
  hookSlide: {
    layout: "cover",
    media: {
      type: "image",
      src: staticFile("best-year-part2-2004-half-life2.jpg"),
      fit: "cover",
      position: "50% 48%",
    },
    headline: "THE BEST GAME FROM EVERY YEAR — 2003 TO 2005",
    headlineSegments: [
      { text: "THE BEST GAME\n", color: "#FFFFFF" },
      { text: "FROM EVERY YEAR\n", color: "#FFFFFF" },
      { text: "2003 — 2005", color: "#FF8A1F" },
    ],
    accentColor: "#FF8A1F",
    decorations: false,
    headlineSize: 68,
    panelBackground: "linear-gradient(135deg, #17100A 0%, #050505 72%)",
  } as InstagramCarouselSlide,
  contentSlides: [
    {
      layout: "left",
      media: {
        type: "image",
        src: staticFile("best-year-part2-2003-cod.jpg"),
        fit: "cover",
        position: "50% 48%",
      },
      headline:
        "2003 — Call of Duty. A cinematic WWII shooter that launched one of gaming's biggest franchises.",
      headlineSegments: [
        { text: "2003\n", color: "#FF8A1F" },
        { text: "CALL OF DUTY\n", color: "#FFFFFF" },
        { text: "The cinematic WWII shooter that launched one of gaming's biggest franchises.", color: "#CFCFCF" },
      ],
      accentColor: "#FF8A1F",
      decorations: false,
      headlineSize: 48,
      panelBackground: "linear-gradient(135deg, #17100A 0%, #050505 72%)",
    },
    {
      layout: "split",
      media: {
        type: "image",
        src: staticFile("best-year-part2-2004-half-life2.jpg"),
        fit: "cover",
        position: "50% 48%",
      },
      headline:
        "2004 — Half-Life 2. Physics became gameplay, City 17 became unforgettable, and 39 Game of the Year awards followed.",
      headlineSegments: [
        { text: "2004\n", color: "#FF8A1F" },
        { text: "HALF-LIFE 2\n", color: "#FFFFFF" },
        { text: "PHYSICS BECAME GAMEPLAY.\n", color: "#CFCFCF" },
        { text: "39 GOTY AWARDS", color: "#FF8A1F" },
      ],
      accentColor: "#FF8A1F",
      decorations: false,
      headlineSize: 48,
      panelBackground: "linear-gradient(135deg, #17100A 0%, #050505 72%)",
    },
    {
      layout: "left",
      media: {
        type: "image",
        src: staticFile("best-year-part2-2005-god-of-war.jpg"),
        fit: "cover",
        position: "50% 45%",
      },
      headline:
        "2005 — God of War. Kratos arrived with chained blades, Greek tragedy, and a new standard for action games.",
      headlineSegments: [
        { text: "2005\n", color: "#FF8A1F" },
        { text: "GOD OF WAR\n", color: "#FFFFFF" },
        { text: "GREEK TRAGEDY. PURE FURY.\n", color: "#CFCFCF" },
        { text: "8 GOTY AWARDS", color: "#FF8A1F" },
      ],
      accentColor: "#FF8A1F",
      decorations: false,
      headlineSize: 48,
      panelBackground: "linear-gradient(135deg, #17100A 0%, #050505 72%)",
    },
  ] as InstagramCarouselSlide[],
  ctaSlide: {
    layout: "cover",
    media: {
      type: "image",
      src: staticFile("best-year-part2-2005-god-of-war.jpg"),
      fit: "cover",
      position: "50% 45%",
    },
    headline: "AGREE WITH THE PICKS? WHAT SHOULD WIN 2006–2008?",
    headlineSegments: [
      { text: "AGREE WITH THE PICKS?\n", color: "#FFFFFF" },
      { text: "COMMENT YOUR WINNERS\n", color: "#FF8A1F" },
      { text: "FOR 2006 — 2008", color: "#FFFFFF" },
    ],
    accentColor: "#FF8A1F",
    decorations: false,
    headlineSize: 61,
    panelBackground: "linear-gradient(135deg, #17100A 0%, #050505 72%)",
  } as InstagramCarouselSlide,
};

/**
 * Portrait motion-carousel version. This is intentionally independent from
 * Scene 9 so its gameplay clips and copy can be changed without affecting the
 * square image carousel.
 */
export const SCENE10_BISON_VIDEO_CAROUSEL_CONFIG = {
  canvas: {
    width: 1080,
    height: 1350,
    fps: 60,
  },
  slideDuration: 180,
  transitionDuration: 20,
  backgroundColor: "#050505",
  branding: {
    enabled: true,
    light: true,
  },
  slides: [
    {
      layout: "cover",
      media: {
        type: "video",
        src: staticFile("bison.mp4"),
        startFrom: 60,
        fit: "cover",
        position: "center",
      },
      eyebrow: "BISON ATTACK!",
      headline: "ONE OF YOU\nIS THE BISON.",
      body: "Everyone else just wants a photo.",
      accentColor: "#EAB308",
    },
    {
      layout: "left",
      media: {
        type: "video",
        src: staticFile("bison.mp4"),
        startFrom: 360,
        fit: "cover",
        position: "center",
      },
      eyebrow: "GET THE SHOT",
      headline: "THE CLOSER\nTHE PHOTO,\nTHE BIGGER\nTHE SCORE.",
      body: "Sneak through a pixel-art Yellowstone and risk everything for the perfect selfie.",
      accentColor: "#EAB308",
    },
    {
      layout: "split",
      media: {
        type: "video",
        src: staticFile("bison.mp4"),
        startFrom: 660,
        fit: "cover",
        position: "center",
      },
      eyebrow: "THEN RUN",
      headline: "THE BISON'S\nJOB IS SIMPLE:\nFLATTEN\nEVERYBODY.",
      body: "Every round, one player becomes the wild bison.",
      accentColor: "#EAB308",
    },
    {
      layout: "left",
      media: {
        type: "video",
        src: staticFile("bison.mp4"),
        startFrom: 960,
        fit: "cover",
        position: "center",
      },
      eyebrow: "FAST · CHAOTIC · SOCIAL",
      headline: "2–8 PLAYERS.\nONE WILD PARK.",
      body: "Cross-play · Random parks · Robot teammates · No account needed",
      detail: "Free to play",
      accentColor: "#EAB308",
    },
    {
      layout: "cta",
      media: {
        type: "video",
        src: staticFile("bison.mp4"),
        startFrom: 1260,
        fit: "cover",
        position: "center",
      },
      eyebrow: "DISCOVERED ON PIXELPICKED",
      headline: "READY TO RISK\nTHE SELFIE?",
      body: "Play Bison Attack! and discover more underrated games on PixelPicked.",
      detail: "PIXELPICKED.COM/GAME/100WXNX9TTE/BISON-ATTACK",
      accentColor: "#EAB308",
    },
  ] as InstagramCarouselSlide[],
  get duration() {
    return this.slides.length * this.slideDuration;
  },
};

/**
 * Live launch-week leaderboard Story. Update only this object when the
 * rankings change; the composition reads all visible copy and crop values
 * from here.
 */
export const SCENE11_LAUNCH_TOP3_STORY_CONFIG = {
  canvas: {
    width: 1080,
    height: 1350,
    fps: 60,
  },
  duration: 1,
  campaign: {
    date: "AUG 23–29, 2026",
    status: "LIVE RANKING",
    headline: "THIS WEEK'S\nTOP 3 GAMES",
    subheadline: "Picked by the PixelPicked community — so far.",
    totalGames: "19 games",
    totalVotes: "77 votes",
    cta: "VOTE NOW",
    link: "pixelpicked.com/launch-campaign",
  },
  colors: {
    background: "#050505",
    surface: "#121212",
    text: "#FFFFFF",
    muted: "#A3A3A3",
    accent: "#F5F5F5",
    second: "#CFCFCF",
    third: "#909090",
  },
  products: [
    {
      rank: 1,
      name: "Virtual DOMination",
      description:
        "Code duels in JS, Python, C, C++ and Rust. Pick a faction, take the map.",
      category: "RELEASE · EDUCATIONAL · TRIVIA",
      votes: 7,
      accent: "#67E8F9",
      artwork: staticFile("virtual-domination-art.png"),
      status: "LEADING",
    },
    {
      rank: 2,
      name: "Ball Sort Master",
      description:
        "Sort colourful balls, solve tricky puzzles and relax with endless fun.",
      category: "RELEASE · PUZZLE",
      votes: 6,
      accent: "#FB923C",
      artwork: staticFile("ball-sort-master-art.png"),
      status: "TIED",
    },
    {
      rank: 3,
      name: "Deckweave: Deckbuilding Game",
      description:
        "A roguelike campaign with hard levels, bosses, Weavestones and new symbols.",
      category: "UPDATE · CARD",
      votes: 5,
      accent: "#A78BFA",
      artwork: staticFile("deckweave-art.png"),
      status: "TIED",
    },
  ],
};

/**
 * Last-week podium returned by:
 * https://api.pixelpicked.com/api/home -> lastWeekResults
 *
 * Keep this independent from Scene 11 so current-week launch artwork and
 * previous-week winner artwork can be rendered and updated separately.
 */
export const SCENE12_LAST_WEEK_WINNERS_CONFIG = {
  canvas: {
    width: 1080,
    height: 1350,
    fps: 60,
  },
  duration: 1,
  apiSource: "https://api.pixelpicked.com/api/home",
  launchWeekId: "2026-W40",
  copy: {
    topRight: "FINAL RESULTS",
    date: "SEP 27–OCT 3, 2026",
    eyebrow: "LAST WEEK ON PIXELPICKED",
    headlineTop: "LAST WEEK'S",
    headlineBottom: "WINNERS",
    subheadline: "The games you voted to the top.",
    totalVotes: "140 podium votes",
    cta: "PLAY THE WINNER",
    link: "pixelpicked.com/game/57a3oKxjgLx/100numbers-pattern-game",
  },
  colors: {
    background: "#050505",
    surface: "#121212",
    text: "#FFFFFF",
    muted: "#A3A3A3",
    border: "rgba(255,255,255,0.30)",
    winnerBorder: "rgba(255,255,255,0.88)",
  },
  results: [
    {
      launchShortId: "5lS57FwfiKn",
      gameId: "57a3oKxjgLx",
      gameSlug: "100numbers-pattern-game",
      gameName: "100numbers: pattern game",
      gameGenre: ["Arcade", "Puzzle", "Strategy"],
      tagline: "One wrong jump and you're stuck halfway.",
      voteCount: 60,
      finalRank: 1,
      artwork: "https://res.cloudinary.com/donjla0xz/image/upload/v1789982750/studio/eampor3kyjblls5gjuf5.png",
    },
    {
      launchShortId: "7UOvK9GbXfh",
      gameId: "65aOQdvsuov",
      gameSlug: "escape-from-benjamins-room",
      gameName: "Escape From Benjamin's Room",
      gameGenre: ["Puzzle", "Indie", "Strategy", "Trivia"],
      tagline: "Escape an old scientist's room.",
      voteCount: 41,
      finalRank: 2,
      artwork: "https://res.cloudinary.com/donjla0xz/image/upload/v1787643673/studio/kethawdoc785hz2zmnfj.jpg",
    },
    {
      launchShortId: "7hjWmpjE6HT",
      gameId: "5n49ZVlhaCy",
      gameSlug: "anna-gram",
      gameName: "Anna Gram",
      gameGenre: ["Word", "Board", "Educational", "Puzzle", "Strategy", "Trivia"],
      tagline: "Unscramble words with fun!",
      voteCount: 39,
      finalRank: 3,
      artwork: "https://res.cloudinary.com/donjla0xz/image/upload/v1789445797/studio/glbaxcofv0wlmflqyeyd.webp",
    },
  ],
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

/**
 * Transparent overlay showing CPI accelerating over time. The numbers are
 * creative defaults for the launch edit; replace them with sourced campaign
 * data when the final marketing claim is locked.
 */
export const SCENE13_CPI_RISE_CONFIG = {
  canvas: {
    width: 1920,
    height: 1080,
    fps: 60,
  },
  duration: 120,
  lineStartFrame: 10,
  lineEndFrame: 126,
  pointFrames: [12, 35, 60, 86, 114],
  colors: {
    line: "#FF3B30",
    glow: "rgba(255,59,48,0.58)",
  },
  points: [
    { year: "2016", value: "$0.42", normalizedValue: 0.1 },
    { year: "2019", value: "$0.88", normalizedValue: 0.18 },
    { year: "2022", value: "$1.94", normalizedValue: 0.36 },
    { year: "2024", value: "$3.72", normalizedValue: 0.61 },
    { year: "NOW", value: "$7.18", normalizedValue: 0.94 },
  ],
};

/** Standalone transparent text/count-up beat, separate from the CPI chart. */
export const SCENE14_CPI_COUNTER_CONFIG = {
  canvas: {
    width: 1920,
    height: 1080,
    fps: 60,
  },
  duration: 120,
  label: "COST PER INSTALL",
  startValue: 0.42,
  endValue: 7.18,
  countStartFrame: 12,
  countEndFrame: 93,
  accentColor: "#FF3B30",
};

/** Standalone transparent quote beat following the two CPI visuals. */
export const SCENE15_TYPEWRITER_QUOTE_CONFIG = {
  canvas: {
    width: 1920,
    height: 1080,
    fps: 60,
  },
  duration: 200,
  typeStartFrame: 12,
  framesPerCharacter: 2,
  line1: "WHEN VALIDATION GETS EXPENSIVE,",
  line2: "SAFE IDEAS WIN.",
  line3: "ORIGINALITY LOSES.",
  accentColor: "#FF3B30",
};

/** Full-screen fictional storefront showing paid placements crowding out organic discovery. */
export const SCENE16_SPONSORED_STOREFRONT_CONFIG = {
  canvas: {
    width: 1920,
    height: 1080,
    fps: 60,
  },
  duration: 180,
  sponsoredColor: "#FF3B30",
  hero: {
    name: "EMPIRE ASCENDANT",
    tagline: "Build. Conquer. Rule.",
    category: "Strategy · Multiplayer",
  },
  sponsoredGames: [
    { name: "Royal Merge", category: "Puzzle · Events", palette: ["#7C3AED", "#EC4899"] },
    { name: "Warfront", category: "Strategy · PvP", palette: ["#111827", "#EF4444"] },
    { name: "Hero Legends", category: "RPG · Collect", palette: ["#0369A1", "#F59E0B"] },
    { name: "Island Fortune", category: "Adventure · Social", palette: ["#0891B2", "#22C55E"] },
  ],
  organicGame: {
    name: "Paper Moon",
    category: "Indie · Adventure",
    tagline: "A hand-drawn journey through forgotten dreams.",
    palette: ["#172554", "#FDE68A"],
  },
};

/** Combined transparent CPI counter + typewriter statement for the launch edit. */
export const SCENE17_CPI_STATEMENT_CONFIG = {
  canvas: {
    width: 1920,
    height: 1080,
    fps: 60,
  },
  duration: 200,
  counterStartFrame: 8,
  counterEndFrame: 92,
  typeStartFrame: 18,
  framesPerCharacter: 2,
  startValue: 0.42,
  endValue: 7.18,
  line1: "WHEN VALIDATION GETS EXPENSIVE,",
  line2: "SAFE IDEAS WIN.",
  line3: "ORIGINALITY LOSES.",
  accentColor: "#FF3B30",
};

/**
 * Twenty-second split-screen manifesto beat.
 *
 * Add a public/ filename to any `recording` field when the corresponding
 * PixelPicked screen capture is ready. An empty value deliberately leaves a
 * clean recording bay in the preview.
 */
export const SCENE18_REENVISIONING_FLIP_CONFIG = {
  canvas: {
    width: 1920,
    height: 1080,
    fps: 60,
  },
  segmentDuration: 180,
  finalDuration: 300,
  eyebrow: "RE-ENVISIONING",
  pillars: [
    { label: "DISCOVERY", recording: "" },
    { label: "DATA", recording: "" },
    { label: "DEVELOPMENT", recording: "" },
    { label: "COMMUNITY", recording: "" },
    { label: "LAUNCH", recording: "" },
  ],
  final: {
    label: "PIXELPICKED",
    tagline: "THE MISSING LAYER OF MOBILE GAMING",
    cta: "PIXELPICKED.COM",
  },
  colors: {
    background: "#0B0C0E",
    leftBackground: "#121416",
    panel: "#E8E3D9",
    panelBack: "#D2CCC0",
    pageText: "#151515",
    line: "rgba(255,255,255,0.12)",
    text: "#F1EEE8",
    muted: "#8E918F",
    green: "#53D6A2",
  },
  get duration() {
    return this.pillars.length * this.segmentDuration + this.finalDuration;
  },
};

/** Portrait analytics showcase. Values are illustrative until real data is supplied. */
export const SCENE19_ANALYTICS_DASHBOARD_CONFIG = {
  canvas: {
    width: 1080,
    height: 1920,
    fps: 60,
  },
  duration: 600,
  game: "Paper Moon",
  build: "Build 0.8.4",
  period: "Last 7 days",
  metrics: [
    { label: "Players", value: 4821, display: "4,821", delta: "+14%" },
    { label: "Sessions", value: 12482, display: "12,482", delta: "+21%" },
    { label: "Avg. playtime", value: 492, display: "8m 12s", delta: "+2m 4s" },
    { label: "D7 retention", value: 31, display: "31%", delta: "+6.2%" },
  ],
  retention: [100, 62, 51, 44, 39, 35, 33, 31],
  funnel: [
    { label: "Discovered", value: 10000, percent: 100 },
    { label: "Demo started", value: 7420, percent: 74.2 },
    { label: "Challenge completed", value: 4260, percent: 42.6 },
    { label: "Feedback submitted", value: 1640, percent: 16.4 },
  ],
  behavior: [
    { label: "Challenge completion", value: "68%" },
    { label: "Average score", value: "7,420" },
    { label: "Replays per player", value: "2.4" },
    { label: "Largest drop-off", value: "Checkpoint 3" },
  ],
  stability: [
    { label: "Crash-free sessions", value: "99.4%" },
    { label: "Errors", value: "41" },
    { label: "Freezes", value: "23" },
    { label: "Rage taps", value: "126" },
  ],
};

/** Portrait waitlist-growth feature shot. Values are illustrative. */
export const SCENE20_WAITLIST_GROWTH_CONFIG = {
  canvas: {
    width: 1080,
    height: 1920,
    fps: 60,
  },
  duration: 420,
  game: "Paper Moon",
  startCount: 328,
  endCount: 12684,
  todayJoins: 842,
  referralShare: 38,
  conversion: 24.6,
  chart: [328, 512, 690, 1040, 1480, 2020, 2910, 3890, 5140, 6820, 8460, 10120, 11480, 12684],
  milestones: [1000, 5000, 10000],
};

/** Standalone text beat for the social layer reveal. */
export const SCENE21_REENVISIONING_SOCIAL_CONFIG = {
  canvas: {
    width: 1920,
    height: 1080,
    fps: 60,
  },
  duration: 120,
  label: "SOCIAL LAYER",
};

/** Playful friend-challenge feature shot for Taproach. */
export const SCENE22_TAPROACH_CHALLENGE_CONFIG = {
  canvas: {
    width: 1920,
    height: 1080,
    fps: 60,
  },
  duration: 300,
  game: "TAPROACH",
  targetScore: 5000,
  challenger: "VARUN",
  friend: "SAKSHAM",
};

/** Standalone social-proof typewriting beat. */
export const SCENE23_USED_BY_CONFIG = {
  canvas: {
    width: 1920,
    height: 1080,
    fps: 60,
  },
  duration: 180,
  prefix: "Used by thousands of",
  audiences: ["Studios", "Developers", "Players"],
  firstWordFrame: 14,
  wordDuration: 48,
};

/** Focused product interaction: clicking the launch-game action. */
export const SCENE24_LAUNCH_GAME_CLICK_CONFIG = {
  canvas: {
    width: 1920,
    height: 1080,
    fps: 60,
  },
  duration: 180,
  game: "Taproach",
  buttonLabel: "LAUNCH GAME",
};

/** Discovery feed recording with three half-typewritten product claims. */
export const SCENE25_DISCOVERY_EXPLAINER_CONFIG = {
  canvas: {
    width: 1920,
    height: 1080,
    fps: 60,
  },
  duration: 283,
  video: "discovery.mov",
  beatDuration: 142,
  typeStartFrame: 8,
  framesPerCharacter: 2,
  beats: [
    {
      fixed: "Your personalised game feed.",
      typed: "Play early. Shape what launches.",
    },
    { fixed: "No installs.", typed: "Swipe. Play. Keep exploring." },
  ],
};

/** Analytics recording with compact, half-typewritten product claims. */
export const SCENE26_ANALYTICS_EXPLAINER_CONFIG = {
  canvas: {
    width: 1920,
    height: 1080,
    fps: 60,
  },
  duration: 216,
  video: "analytics.mov",
  beatDuration: 108,
  typeStartFrame: 5,
  framesPerCharacter: 1,
  beats: [
    { fixed: "No SDK required.", typed: "Analytics are built in." },
    { fixed: "Heatmaps. Session replays.", typed: "Retention. Funnels. Errors." },
  ],
};

/** Devlog recording with simple, half-typewritten development claims. */
export const SCENE27_DEVLOGS_EXPLAINER_CONFIG = {
  canvas: {
    width: 1920,
    height: 1080,
    fps: 60,
  },
  duration: 103,
  video: "devlogs.mov",
  beatDuration: 103,
  typeStartFrame: 5,
  framesPerCharacter: 2,
  beats: [
    { fixed: "Publish devlogs.", typed: "Get feedback before launch." },
  ],
};

/** Standalone problem statement connecting expensive risk to sameness. */
export const SCENE28_RISK_SAMENESS_CONFIG = {
  canvas: {
    width: 1920,
    height: 1080,
    fps: 60,
  },
  duration: 180,
  fixed: "When risk gets expensive,",
  typed: "every game starts to look the same.",
  typeStartFrame: 14,
  framesPerCharacter: 2,
  accentColor: "#F1EEE8",
};

/** One-second chapter title introducing the problem section. */
export const SCENE29_BUT_CONFIG = {
  canvas: {
    width: 1920,
    height: 1080,
    fps: 60,
  },
  duration: 60,
  text: "State of mobile gaming",
  typeStartFrame: 5,
  framesPerCharacter: 1,
};

/** Source-footage title card matching the supplied red-text reference. */
export const SCENE30_MAKE_GAMES_CONFIG = {
  canvas: {
    width: 1920,
    height: 1080,
    fps: 60,
  },
  duration: 146,
  video: "makegames.mov",
  text: "Make Games",
  textColor: "#FF2020",
};

/** One-second pivot from the problem into the PixelPicked solution. */
export const SCENE31_BUILT_PIXELPICKED_CONFIG = {
  canvas: {
    width: 1920,
    height: 1080,
    fps: 60,
  },
  duration: 60,
  fixed: "That’s why we built ",
  typed: "PixelPicked.",
  typeStartFrame: 7,
  framesPerCharacter: 2,
};

/** Continuous title-to-product redesign for the discovery chapter. */
export const SCENE32_DISCOVERY_CHAPTER_CONFIG = {
  canvas: {
    width: 1920,
    height: 1080,
    fps: 60,
  },
  duration: 343,
  taproachVideo: "discovery-taproach-raw.mov",
  islandFishingVideo: "discovery-island-fishing-raw.mov",
};

/** Vertical "Best game of every year" short. Each game uses two hand-picked trailer beats. */
export const SCENE33_BEST_GAMES_BY_YEAR_CONFIG = {
  canvas: {
    width: 1080,
    height: 1920,
    fps: 60,
  },
  accentColor: "#FFD21C",
  hook: {
    video: "best-year-hook.mp4",
    startSeconds: 8,
    duration: 150,
    eyebrow: "PART 1  •  2000–2002",
    lines: ["THE BEST GAME", "OF EVERY YEAR"],
  },
  games: [
    {
      year: "2000",
      name: "DIABLO II",
      video: "best-year-2000-diablo2.mp4",
      duration: 300,
      cuts: [15.8, 19.0],
    },
    {
      year: "2001",
      name: "HALO: COMBAT EVOLVED",
      video: "best-year-2001-halo.mp4",
      duration: 300,
      cuts: [5.5, 14.0],
    },
    {
      year: "2002",
      name: "BATTLEFIELD 1942",
      video: "best-year-2002-battlefield1942.mp4",
      duration: 300,
      cuts: [24.0, 64.0],
    },
  ],
  music: "best-year-music.m4a",
  musicStartSeconds: 0,
  musicVolume: 0.9,
  get duration() {
    return this.hook.duration + this.games.reduce((sum, game) => sum + game.duration, 0);
  },
};

/** Part 2 of the vertical Best Game of Every Year series. */
export const SCENE36_BEST_GAMES_BY_YEAR_PART2_CONFIG = {
  canvas: {
    width: 1080,
    height: 1920,
    fps: 60,
  },
  accentColor: "#FFD21C",
  hook: {
    video: "best-year-part2-hook.mp4",
    startSeconds: 2,
    duration: 150,
    eyebrow: "PART 2  •  2003–2005",
    lines: ["THE BEST GAME", "OF EVERY YEAR"],
  },
  games: [
    {
      year: "2003",
      name: "CALL OF DUTY",
      video: "best-year-2003-cod.mp4",
      duration: 300,
      cuts: [28, 60],
    },
    {
      year: "2004",
      name: "HALF-LIFE 2",
      award: "39 GOTY AWARDS",
      video: "best-year-2004-half-life2.mp4",
      duration: 300,
      cuts: [45, 61],
    },
    {
      year: "2005",
      name: "GOD OF WAR",
      award: "8 GOTY AWARDS",
      video: "best-year-2005-god-of-war.mp4",
      duration: 300,
      cuts: [70, 94],
    },
  ],
  music: "best-year-music.m4a",
  musicStartSeconds: 0,
  musicVolume: 0.9,
  get duration() {
    return this.hook.duration + this.games.reduce((sum, game) => sum + game.duration, 0);
  },
};

/** Vertical ranking of the highest-budget game productions and campaigns. */
export const SCENE34_HIGHEST_BUDGET_GAMES_CONFIG = {
  canvas: { width: 1080, height: 1920, fps: 60 },
  accentColor: "#FFD21C",
  moneyColor: "#FF4D3D",
  hook: {
    video: "highest-budget-hook.mp4",
    startSeconds: 3.5,
    duration: 150,
    kicker: "THE NUMBERS ARE INSANE",
    lines: ["HIGHEST BUDGET", "GAMES EVER MADE"],
  },
  games: [
    {
      rank: "#1",
      name: "GRAND THEFT AUTO VI",
      budget: "$1–2 BILLION (EST.)",
      video: "highest-budget-gta6.mp4",
      duration: 270,
      cuts: [22, 47],
    },
    {
      rank: "#2",
      name: "STAR CITIZEN + SQUADRON 42",
      budget: "$1+ BILLION RAISED",
      video: "highest-budget-star-citizen.mp4",
      duration: 270,
      cuts: [12, 38],
    },
    {
      rank: "#3",
      name: "MONOPOLY GO!",
      budget: "$1B+ MARKETING / UA",
      video: "highest-budget-monopoly-go.mp4",
      duration: 270,
      cuts: [4, 20],
    },
    {
      rank: "#4",
      name: "GENSHIN IMPACT",
      budget: "$1B+ LIFETIME DEV (EST.)",
      video: "highest-budget-genshin.mp4",
      duration: 270,
      cuts: [12, 62],
    },
    {
      rank: "#5",
      name: "BLACK OPS COLD WAR",
      budget: "$700M+ DEVELOPMENT",
      video: "highest-budget-cod-cold-war.mp4",
      duration: 270,
      cuts: [8, 34],
    },
  ],
  music: "highest-budget-music.m4a",
  musicStartSeconds: 0,
  musicVolume: 0.9,
  get duration() {
    return this.hook.duration + this.games.reduce((sum, game) => sum + game.duration, 0);
  },
};

/** Vertical before-and-after reel about breakout indie game successes. */
export const SCENE35_INDIE_SUCCESS_STORIES_CONFIG = {
  canvas: { width: 1080, height: 1920, fps: 60 },
  accentColor: "#FFD21C",
  resultColor: "#5CFF8D",
  hook: {
    video: "indie-success-hook.mp4",
    startSeconds: 2.5,
    duration: 150,
    kicker: "THESE STARTED SMALL",
    lines: ["BIGGEST INDIE GAME", "SUCCESS STORIES"],
  },
  games: [
    {
      name: "UNDERTALE",
      start: "$51K KICKSTARTER",
      result: "$26.7M+ EST. REVENUE",
      video: "indie-success-undertale.mp4",
      duration: 270,
      cuts: [11, 39],
    },
    {
      name: "HOLLOW KNIGHT",
      start: "A$57K KICKSTARTER",
      result: "15M+ COPIES",
      video: "indie-success-hollow-knight.mp4",
      duration: 270,
      cuts: [22, 63],
    },
    {
      name: "STARDEW VALLEY",
      start: "SOLO-MADE",
      result: "41M+ COPIES",
      video: "indie-success-stardew.mp4",
      duration: 270,
      cuts: [19, 82],
    },
    {
      name: "VAMPIRE SURVIVORS",
      start: "~£1.1K START",
      result: "27M+ PLAYERS",
      video: "indie-success-vampire-survivors.mp4",
      duration: 270,
      cuts: [8, 27],
    },
    {
      name: "AMONG US",
      start: "~$50K BUDGET",
      result: "$105M+ EST. REVENUE",
      video: "indie-success-among-us.mp4",
      duration: 270,
      cuts: [3, 18],
    },
  ],
  music: "indie-success-music.m4a",
  musicStartSeconds: 0,
  musicVolume: 0.9,
  get duration() {
    return this.hook.duration + this.games.reduce((sum, game) => sum + game.duration, 0);
  },
};

/** Vertical countdown of exceptionally valuable in-game cosmetics and collector items. */
export const SCENE37_COSTLIEST_COSMETICS_CONFIG = {
  canvas: { width: 1080, height: 1920, fps: 60 },
  accentColor: "#FFD21C",
  moneyColor: "#FF493D",
  hook: {
    duration: 120,
    kicker: "THE PRICES ARE REAL",
    lines: ["MOST EXPENSIVE", "SKINS", "IN GAMING"],
  },
  items: [
    {
      rank: "#5",
      name: "AWP DRAGON LORE",
      game: "COUNTER-STRIKE 2",
      value: "~$265,000",
      status: "REPORTED SALE",
      video: "cosmetics-dragon-lore.mp4",
      startSeconds: 1,
      duration: 240,
    },
    {
      rank: "#4",
      name: "PLATINUM BABY ROSHAN",
      game: "DOTA 2",
      value: "$300,000",
      status: "SOLD",
      video: "cosmetics-roshan.mp4",
      startSeconds: 18,
      duration: 240,
    },
    {
      rank: "#3",
      name: "THE ‘DOG’ ACCOUNT",
      game: "MINECRAFT",
      value: "$400,000",
      status: "REJECTED OFFER",
      detail: "OG USERNAME + 4 MINECON CAPES",
      video: "cosmetics-minecraft-dog.mp4",
      startSeconds: 2.5,
      duration: 240,
    },
    {
      rank: "#2",
      name: "AK-47 BLUE GEM #661",
      game: "COUNTER-STRIKE 2",
      value: "$1,000,000+",
      status: "REPORTED SALE",
      video: "cosmetics-ak661.mp4",
      startSeconds: 1,
      duration: 240,
    },
    {
      rank: "#1",
      name: "KARAMBIT BLUE GEM #387",
      game: "COUNTER-STRIKE 2",
      value: "$1,500,000",
      status: "REJECTED OFFER",
      video: "cosmetics-karambit.f399.mp4",
      startSeconds: 2.4,
      duration: 240,
    },
  ],
  music: "best-year-music-recovered.m4a",
  musicStartSeconds: 0,
  musicVolume: 0.9,
  get duration() {
    return this.hook.duration + this.items.reduce((sum, item) => sum + item.duration, 0);
  },
};

export const SCENE38_HIGHEST_GROSSING_GAMES_CONFIG = {
  canvas: { width: 1080, height: 1920, fps: 60 },
  accentColor: "#FFD21C",
  moneyColor: "#40FF8A",
  hook: {
    duration: 150,
    video: "profit-hook.mp4",
    startSeconds: 0,
    kicker: "RANKED BY LIFETIME REVENUE",
    lines: ["THE 5 GAMES", "THAT MADE THE", "MOST MONEY"],
  },
  items: [
    {
      rank: "#5",
      name: "LEAGUE OF LEGENDS",
      value: "$15.3 BILLION",
      label: "EST. LIFETIME REVENUE",
      video: "profit-league.mp4",
      startSeconds: 50,
      duration: 240,
    },
    {
      rank: "#4",
      name: "PUBG: BATTLEGROUNDS",
      value: "$17.8 BILLION",
      label: "EST. LIFETIME REVENUE",
      video: "profit-pubg.mp4",
      startSeconds: 45,
      duration: 240,
    },
    {
      rank: "#3",
      name: "HONOR OF KINGS",
      value: "$18.7 BILLION",
      label: "EST. LIFETIME REVENUE",
      video: "profit-honor-of-kings.mp4",
      startSeconds: 22,
      duration: 240,
    },
    {
      rank: "#2",
      name: "FORTNITE",
      value: "$20 BILLION+",
      label: "EST. LIFETIME REVENUE",
      video: "profit-fortnite.mp4",
      startSeconds: 22,
      duration: 240,
    },
    {
      rank: "#1",
      name: "DUNGEON FIGHTER ONLINE",
      value: "$22 BILLION",
      label: "EST. LIFETIME REVENUE",
      video: "profit-dfo.mp4",
      startSeconds: 25,
      duration: 240,
    },
  ],
  music: "profit-music.m4a",
  musicStartSeconds: 0,
  musicVolume: 0.88,
  get duration() {
    return this.hook.duration + this.items.reduce((sum, item) => sum + item.duration, 0);
  },
};

export type RankingReelCaption = {
  from: number;
  to: number;
  text: string;
  color?: string;
};

export type RankingReelItem = {
  rank: number;
  title: string;
  game: string;
  video: string;
  poster: string;
  sourceUrl?: string;
  startSeconds: number;
  duration: number;
  captions: RankingReelCaption[];
  objectPosition?: string;
  focusShift?: {times: number[]; x: number[]};
};

export type RankingReelConfig = {
  canvas: {width: number; height: number; fps: number};
  titleLines: string[];
  accentColor: string;
  captionColor: string;
  items: RankingReelItem[];
  music?: {src: string; startSeconds: number; volume: number};
  muteClipAudio?: boolean;
  fullScreenClips?: boolean;
  cta: {enabled: boolean; duration: number; line1: string; line2: string};
  duration: number;
};

const FUNNY_GAMING_ITEMS: RankingReelItem[] = [
  {
    rank: 5,
    title: "WE'RE JUST PASSING BY",
    game: "SEA OF THIEVES",
    video: "funny-passing-by-trimmed.mp4",
    poster: "funny-passing-by-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=X7g2xj9MDfE",
    startSeconds: 0,
    duration: 300,
    captions: [
      {from: 0.2, to: 3.7, text: "WE'RE JUST PASSING BY"},
      {from: 3.7, to: 9.8, text: "BROTHER, WE'RE JUST PASSING BY!", color: "#FF453A"},
    ],
  },
  {
    rank: 4,
    title: "GREEN, WHAT'S YOUR PROBLEM?",
    game: "COUNTER-STRIKE: GLOBAL OFFENSIVE",
    video: "funny-blue-ramp-trimmed.mp4",
    poster: "funny-blue-ramp-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=OaFk8XkgZik",
    startSeconds: 0,
    duration: 360,
    captions: [
      {from: 0.3, to: 4.4, text: "GREEN! GREEN!"},
      {from: 4.4, to: 11.8, text: "WHAT'S YOUR PROBLEM?!", color: "#FF453A"},
    ],
  },
  {
    rank: 3,
    title: "DOOR STUCK!",
    game: "COUNTER-STRIKE 1.6",
    video: "funny-door-stuck-trimmed.mp4",
    poster: "funny-door-stuck-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=VqB1uoDTdKM",
    startSeconds: 0,
    duration: 390,
    captions: [
      {from: 0.2, to: 3.3, text: "CAN'T MAKE IT..."},
      {from: 3.3, to: 12.8, text: "DOOR STUCK! DOOR STUCK!", color: "#FF453A"},
    ],
  },
  {
    rank: 2,
    title: "LEEROY JENKINS!",
    game: "WORLD OF WARCRAFT",
    video: "funny-leeroy-trimmed.mp4",
    poster: "funny-leeroy-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=mLyOj_QD4a4",
    startSeconds: 0,
    duration: 360,
    captions: [
      {from: 0.3, to: 4.0, text: "ALL RIGHT, LET'S DO THIS..."},
      {from: 4.0, to: 11.8, text: "LEEROOOY JENKINS!", color: "#FF453A"},
    ],
  },
  {
    rank: 1,
    title: "I SAID GG 5 TIMES",
    game: "THE 72-HOUR BAN",
    video: "funny-gg-five-trimmed.mp4",
    poster: "funny-gg-five-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=NzKU6W1ntv0",
    startSeconds: 0,
    duration: 300,
    captions: [
      {from: 0.2, to: 4.8, text: "I SAID GG FIVE TIMES..."},
      {from: 4.8, to: 9.8, text: "NOW I'M BANNED FOR 72 HOURS!", color: "#FF453A"},
    ],
  },
];

export const SCENE39_FUNNY_GAMING_RANKING_CONFIG: RankingReelConfig = {
  canvas: {width: 1080, height: 1920, fps: 30},
  titleLines: ["RANKING THE", "FUNNIEST GAMING MOMENTS"],
  accentColor: "#FFD21C",
  captionColor: "#FFFFFF",
  items: FUNNY_GAMING_ITEMS,
  cta: {
    enabled: true,
    duration: 45,
    line1: "WHAT DID WE MISS?",
    line2: "COMMENT IT FOR PART 2",
  },
  duration: FUNNY_GAMING_ITEMS.reduce((sum, item) => sum + item.duration, 0) + 45,
};

const ICONIC_ESPORTS_ITEMS: RankingReelItem[] = [
  {
    rank: 5,
    title: "THE XPeke BACKDOOR",
    game: "LEAGUE OF LEGENDS · IEM KATOWICE 2013",
    video: "esports-xpeke.mp4",
    poster: "esports-xpeke-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=Y4bdDWt9Jfw",
    startSeconds: 11,
    duration: 330,
    captions: [
      {from: 0.2, to: 4.7, text: "ONE HIT FROM DEATH..."},
      {from: 4.7, to: 10.8, text: "THE BACKDOOR THAT MADE HISTORY", color: "#FFD21C"},
    ],
  },
  {
    rank: 4,
    title: "COLDZERA'S JUMPING AWP",
    game: "COUNTER-STRIKE · MLG COLUMBUS 2016",
    video: "esports-coldzera.mp4",
    poster: "esports-coldzera-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=XJyqQW1sdk0",
    startSeconds: 26,
    duration: 360,
    captions: [
      {from: 0.2, to: 5.0, text: "LIQUID WERE ONE ROUND AWAY..."},
      {from: 5.0, to: 11.8, text: "THEN COLDZERA DID THIS", color: "#FFD21C"},
    ],
  },
  {
    rank: 3,
    title: "FAKER VS RYU",
    game: "LEAGUE OF LEGENDS · OGN SUMMER 2013",
    video: "esports-faker.mp4",
    poster: "esports-faker-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=fwyG9Z-mwFA",
    startSeconds: 0,
    duration: 285,
    captions: [
      {from: 0.2, to: 4.1, text: "RYU HAD MORE HEALTH..."},
      {from: 4.1, to: 9.3, text: "FAKER, WHAT WAS THAT?!", color: "#FFD21C"},
    ],
  },
  {
    rank: 2,
    title: "S1MPLE'S FALLING NO-SCOPE",
    game: "COUNTER-STRIKE · ESL ONE COLOGNE 2016",
    video: "esports-simple.mp4",
    poster: "esports-simple-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=QQIX-ylS7YU",
    startSeconds: 3,
    duration: 390,
    captions: [
      {from: 0.2, to: 5.1, text: "A 1V2 WITH NO WAY OUT..."},
      {from: 5.1, to: 12.8, text: "S1MPLE JUST BROKE THE GAME", color: "#FFD21C"},
    ],
  },
  {
    rank: 1,
    title: "EVO MOMENT 37",
    game: "STREET FIGHTER III · EVO 2004",
    video: "esports-daigo.mp4",
    poster: "esports-daigo-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=JzS96auqau0",
    startSeconds: 33,
    duration: 390,
    captions: [
      {from: 0.2, to: 4.3, text: "ONE PIXEL OF HEALTH..."},
      {from: 4.3, to: 12.8, text: "THE PARRY HEARD AROUND THE WORLD", color: "#FFD21C"},
    ],
  },
];

export const SCENE40_ICONIC_ESPORTS_RANKING_CONFIG: RankingReelConfig = {
  canvas: {width: 1080, height: 1920, fps: 30},
  titleLines: ["RANKING THE", "MOST ICONIC ESPORTS MOMENTS"],
  accentColor: "#FFD21C",
  captionColor: "#FFFFFF",
  items: ICONIC_ESPORTS_ITEMS,
  cta: {
    enabled: true,
    duration: 45,
    line1: "WHAT DID WE MISS?",
    line2: "COMMENT IT FOR PART 2",
  },
  duration: ICONIC_ESPORTS_ITEMS.reduce((sum, item) => sum + item.duration, 0) + 45,
};

const NOSTALGIC_CHILDHOOD_GAMES_ITEMS: RankingReelItem[] = [
  {
    rank: 7,
    title: "ROAD RASH",
    game: "ROAD RASH · 1995",
    video: "nostalgia-road-rash.mp4",
    poster: "nostalgia-road-rash-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=0FHLH5OB0GQ",
    startSeconds: 2,
    duration: 240,
    captions: [
      {from: 0.2, to: 3.2, text: "BEFORE OPEN WORLDS..."},
      {from: 3.2, to: 7.8, text: "WE KICKED COPS OFF BIKES", color: "#FFD21C"},
    ],
  },
  {
    rank: 6,
    title: "NFS UNDERGROUND 2",
    game: "NEED FOR SPEED: UNDERGROUND 2 · 2004",
    video: "nostalgia-wZjz2g2RQ-E.mp4",
    poster: "nostalgia-underground2-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=wZjz2g2RQ-E",
    startSeconds: 9,
    duration: 240,
    captions: [
      {from: 0.2, to: 3.2, text: "NEON LIGHTS. MIDNIGHT RACES."},
      {from: 3.2, to: 7.8, text: "EVERY CAR NEEDED NEON", color: "#FFD21C"},
    ],
  },
  {
    rank: 5,
    title: "PROJECT I.G.I.",
    game: "PROJECT I.G.I. · 2000",
    video: "nostalgia-igi.mp4",
    poster: "nostalgia-igi-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=4tGXWOGHuHg",
    startSeconds: 12,
    duration: 240,
    captions: [
      {from: 0.2, to: 3.2, text: "NO CHECKPOINTS. ONE LIFE."},
      {from: 3.2, to: 7.8, text: "WE STILL FINISHED THE MISSION", color: "#FFD21C"},
    ],
  },
  {
    rank: 4,
    title: "COD 4: MODERN WARFARE",
    game: "CALL OF DUTY 4: MODERN WARFARE · 2007",
    video: "nostalgia-9jwxqwuxZDc.mp4",
    poster: "nostalgia-cod4-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=9jwxqwuxZDc",
    startSeconds: 5,
    duration: 240,
    captions: [
      {from: 0.2, to: 3.4, text: "THIS MISSION CHANGED FPS GAMES"},
      {from: 3.4, to: 7.8, text: "ALL GHILLIED UP", color: "#FFD21C"},
    ],
  },
  {
    rank: 3,
    title: "COUNTER-STRIKE 1.6",
    game: "COUNTER-STRIKE 1.6 · 2003",
    video: "nostalgia-nQktCcyVwtI.mp4",
    poster: "nostalgia-cs16-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=nQktCcyVwtI",
    startSeconds: 24,
    duration: 240,
    captions: [
      {from: 0.2, to: 3.2, text: "ONE MAP. THOUSANDS OF HOURS."},
      {from: 3.2, to: 7.8, text: "RUSH B. DON'T STOP.", color: "#FFD21C"},
    ],
  },
  {
    rank: 2,
    title: "NFS MOST WANTED",
    game: "NEED FOR SPEED: MOST WANTED · 2005",
    video: "nostalgia-5p3o15ReIMY.mp4",
    poster: "nostalgia-most-wanted-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=5p3o15ReIMY",
    startSeconds: 2,
    duration: 240,
    captions: [
      {from: 0.2, to: 3.2, text: "EVERYONE WANTED ONE THING..."},
      {from: 3.2, to: 7.8, text: "BEAT RAZOR. GET THE BMW BACK.", color: "#FFD21C"},
    ],
  },
  {
    rank: 1,
    title: "GTA: SAN ANDREAS",
    game: "GRAND THEFT AUTO: SAN ANDREAS · 2004",
    video: "nostalgia-2PoD_b377a0.mp4",
    poster: "nostalgia-gta-sa-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=2PoD_b377a0",
    startSeconds: 3,
    duration: 240,
    captions: [
      {from: 0.2, to: 3.2, text: "WE ALL REMEMBER THIS STREET."},
      {from: 3.2, to: 7.8, text: "WELCOME HOME, CJ.", color: "#FFD21C"},
    ],
  },
];

export const SCENE41_NOSTALGIC_CHILDHOOD_GAMES_CONFIG: RankingReelConfig = {
  canvas: {width: 1080, height: 1920, fps: 30},
  titleLines: ["RANKING THE", "MOST NOSTALGIC CHILDHOOD GAMES"],
  accentColor: "#FFD21C",
  captionColor: "#FFFFFF",
  items: NOSTALGIC_CHILDHOOD_GAMES_ITEMS,
  music: {
    src: "we-are-young.m4a",
    startSeconds: 62,
    volume: 0.65,
  },
  muteClipAudio: true,
  cta: {
    enabled: true,
    duration: 45,
    line1: "WHICH GAME RAISED YOU?",
    line2: "COMMENT YOUR #1",
  },
  duration: NOSTALGIC_CHILDHOOD_GAMES_ITEMS.reduce((sum, item) => sum + item.duration, 0) + 45,
};

const NOSTALGIC_MOBILE_GAMES_ITEMS: RankingReelItem[] = [
  {
    rank: 7,
    title: "CANDY CRUSH",
    game: "CANDY CRUSH SAGA · 2012",
    video: "mobile-nostalgia-candy-crush.mp4",
    poster: "mobile-nostalgia-candy-crush-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=WASA6ywkOBI",
    startSeconds: 0,
    duration: 240,
    captions: [
      {from: 0.2, to: 3.2, text: "YOU PLAYED THIS ON SOMEONE ELSE'S PHONE"},
      {from: 3.2, to: 7.8, text: "JUST ONE MORE LEVEL", color: "#FFD21C"},
    ],
  },
  {
    rank: 6,
    title: "JETPACK JOYRIDE",
    game: "JETPACK JOYRIDE · 2011",
    video: "mobile-nostalgia-jetpack-joyride.mp4",
    poster: "mobile-nostalgia-jetpack-joyride-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=Jzxi8nid9BQ",
    startSeconds: 0,
    duration: 240,
    captions: [
      {from: 0.2, to: 3.2, text: "BARRY. A STOLEN JETPACK."},
      {from: 3.2, to: 7.8, text: "WE NEVER STOPPED RUNNING", color: "#FFD21C"},
    ],
  },
  {
    rank: 5,
    title: "FRUIT NINJA",
    game: "FRUIT NINJA · 2010",
    video: "mobile-nostalgia-fruit-ninja.mp4",
    poster: "mobile-nostalgia-fruit-ninja-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=PK_PnHl8oDQ",
    startSeconds: 0,
    duration: 240,
    captions: [
      {from: 0.2, to: 3.2, text: "ONE SWIPE. PERFECT SLICE."},
      {from: 3.2, to: 7.8, text: "THE BOMB RUINED EVERYTHING", color: "#FFD21C"},
    ],
  },
  {
    rank: 4,
    title: "SUBWAY SURFERS",
    game: "SUBWAY SURFERS · 2012",
    video: "mobile-nostalgia-subway-surfers.mp4",
    poster: "mobile-nostalgia-subway-surfers-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=i0M4ARe9v0Y",
    startSeconds: 0,
    duration: 240,
    captions: [
      {from: 0.2, to: 3.2, text: "THE INSPECTOR WAS ALWAYS BEHIND"},
      {from: 3.2, to: 7.8, text: "ONE MORE RUN", color: "#FFD21C"},
    ],
  },
  {
    rank: 3,
    title: "TEMPLE RUN",
    game: "TEMPLE RUN · 2011",
    video: "mobile-nostalgia-temple-run.mp4",
    poster: "mobile-nostalgia-temple-run-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=TuGv1WIyUK4",
    startSeconds: 0,
    duration: 240,
    captions: [
      {from: 0.2, to: 3.2, text: "TILT. SWIPE. PANIC."},
      {from: 3.2, to: 7.8, text: "THE MONKEYS NEVER STOPPED", color: "#FFD21C"},
    ],
  },
  {
    rank: 2,
    title: "ANGRY BIRDS",
    game: "ANGRY BIRDS · 2009",
    video: "mobile-nostalgia-angry-birds.mp4",
    poster: "mobile-nostalgia-angry-birds-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=SnaTPnHTfps",
    startSeconds: 0,
    duration: 240,
    captions: [
      {from: 0.2, to: 3.2, text: "WE ALL KNEW THIS SLINGSHOT"},
      {from: 3.2, to: 7.8, text: "ONE BIRD LEFT", color: "#FFD21C"},
    ],
  },
  {
    rank: 1,
    title: "FLAPPY BIRD",
    game: "FLAPPY BIRD · 2013",
    video: "mobile-nostalgia-flappy-bird.mp4",
    poster: "mobile-nostalgia-flappy-bird-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=HzvpOtyJYGs",
    startSeconds: 0,
    duration: 240,
    captions: [
      {from: 0.2, to: 3.2, text: "ONE TAP LOOKED SO EASY..."},
      {from: 3.2, to: 7.8, text: "THEN THE PIPE HIT", color: "#FFD21C"},
    ],
  },
];

export const SCENE42_NOSTALGIC_MOBILE_GAMES_CONFIG: RankingReelConfig = {
  canvas: {width: 1080, height: 1920, fps: 30},
  titleLines: ["RANKING THE", "MOST NOSTALGIC MOBILE GAMES"],
  accentColor: "#FFD21C",
  captionColor: "#FFFFFF",
  items: NOSTALGIC_MOBILE_GAMES_ITEMS,
  music: {
    src: "we-are-young.m4a",
    startSeconds: 62,
    volume: 0.65,
  },
  muteClipAudio: true,
  cta: {
    enabled: true,
    duration: 45,
    line1: "WHICH MOBILE GAME RAISED YOU?",
    line2: "COMMENT YOUR #1",
  },
  duration: NOSTALGIC_MOBILE_GAMES_ITEMS.reduce((sum, item) => sum + item.duration, 0) + 45,
};

const FUNNIEST_OHNEPIXEL_ITEMS: RankingReelItem[] = [
  {
    rank: 5,
    title: "IRL MICRO-PEEK",
    game: "OHNEPIXEL · COUNTER-STRIKE",
    video: "ohne2-irlpeek.mp4",
    poster: "ohne2-irlpeek-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=HhOEd_D9Ktg",
    startSeconds: 0,
    duration: 300,
    captions: [
      {from: 0.2, to: 4.2, text: "BRO IS PLAYING CS IN REAL LIFE"},
      {from: 4.2, to: 9.8, text: "THE IRL MICRO-PEEK", color: "#FFD21C"},
    ],
  },
  {
    rank: 4,
    title: "VALORANT SKINS",
    game: "OHNEPIXEL · VALORANT VS CS",
    video: "ohne2-comparison.mp4",
    poster: "ohne2-comparison-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=kH8JJan4MqU",
    startSeconds: 0,
    duration: 300,
    captions: [
      {from: 0.2, to: 4.2, text: "$1,000 IN CS? PAY YOUR RENT."},
      {from: 4.2, to: 9.8, text: "$1,000 IN VALORANT? GO HOMELESS.", color: "#FFD21C"},
    ],
  },
  {
    rank: 3,
    title: "THE ROLLER-COASTER TRAP",
    game: "OHNEPIXEL · MINECRAFT",
    video: "ohne2-drdonut.mp4",
    poster: "ohne2-drdonut-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=D7rUkI_cDlM",
    startSeconds: 0,
    duration: 300,
    captions: [
      {from: 0.2, to: 4.2, text: "I BUILT A ROLLER COASTER FOR YOU"},
      {from: 4.2, to: 9.8, text: "IT WAS A TRAP", color: "#FFD21C"},
    ],
  },
  {
    rank: 2,
    title: "HIDE AND SEEK IN CS2",
    game: "OHNEPIXEL · COUNTER-STRIKE 2",
    video: "ohne2-hide.mp4",
    poster: "ohne2-hide-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=weJQe8tIvRc",
    startSeconds: 0,
    duration: 300,
    captions: [
      {from: 0.2, to: 4.2, text: "HE THREATENED THE WRONG CHAIR"},
      {from: 4.2, to: 9.8, text: "YOU'RE SO BLIND, BRO", color: "#FFD21C"},
    ],
  },
  {
    rank: 1,
    title: "THE NEGEV INCIDENT",
    game: "OHNEPIXEL · COUNTER-STRIKE 2",
    video: "ohne2-incident.mp4",
    poster: "ohne2-incident-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=KOGNYDAO1d8",
    startSeconds: 0,
    duration: 420,
    captions: [
      {from: 0.4, to: 1.7, text: "DID HE SAY..."},
      {from: 1.7, to: 8.8, text: "THERE'S A NEGEV ON SITE B", color: "#FFD21C"},
      {from: 12.8, to: 13.9, text: "GUYS...", color: "#FFD21C"},
    ],
  },
];

export const SCENE43_FUNNIEST_OHNEPIXEL_CONFIG: RankingReelConfig = {
  canvas: {width: 1080, height: 1920, fps: 30},
  titleLines: ["RANKING THE", "FUNNIEST OHNEPIXEL MOMENTS"],
  accentColor: "#FFD21C",
  captionColor: "#FFFFFF",
  items: FUNNIEST_OHNEPIXEL_ITEMS,
  muteClipAudio: false,
  fullScreenClips: true,
  cta: {
    enabled: true,
    duration: 45,
    line1: "WHAT'S THE FUNNIEST OHNE MOMENT?",
    line2: "COMMENT YOUR #1",
  },
  duration: FUNNIEST_OHNEPIXEL_ITEMS.reduce((sum, item) => sum + item.duration, 0) + 45,
};

const SHROUD_BEST_MOMENTS_ITEMS: RankingReelItem[] = [
  {
    rank: 5,
    title: "OUTAIMING A WALLHACKER",
    game: "SHROUD · OVERWATCH",
    video: "shroud-hacker.mp4",
    poster: "shroud-hacker-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=65kF457bhXw",
    startSeconds: 0,
    duration: 330,
    captions: [
      {from: 0.2, to: 4.2, text: "HE CAME BACK FROM AFK"},
      {from: 4.2, to: 10.8, text: "AND OUTAIMED A WALLHACKER", color: "#38D9FF"},
    ],
  },
  {
    rank: 4,
    title: "C9 SHROUD IS BACK",
    game: "SHROUD · VALORANT",
    video: "shroud-c9-return.mp4",
    poster: "shroud-c9-return-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=ZxcQ1Wcgg1w",
    startSeconds: 0,
    duration: 510,
    captions: [
      {from: 0.2, to: 10.7, text: "DID I DOUBLE THEM?"},
      {from: 10.7, to: 16.8, text: "THAT'S NEVER HAPPENED TO ME", color: "#38D9FF"},
    ],
  },
  {
    rank: 3,
    title: "THE IMPOSSIBLE SHOT",
    game: "SHROUD · APEX LEGENDS",
    video: "shroud-impossible-shot.mp4",
    poster: "shroud-impossible-shot-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=eAutqs1_Lg8",
    startSeconds: 0,
    duration: 447,
    captions: [
      {from: 0.2, to: 7.2, text: "THAT SHOT SHOULDN'T BE POSSIBLE"},
      {from: 7.2, to: 14.7, text: "DUDE, THAT WAS INSANE", color: "#38D9FF"},
    ],
  },
  {
    rank: 2,
    title: "PEAK 2018 SHROUD",
    game: "SHROUD · COUNTER-STRIKE",
    video: "shroud-2018.mp4",
    poster: "shroud-2018-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=ZaH87yEUmWA",
    startSeconds: 0,
    duration: 390,
    captions: [
      {from: 0.2, to: 7.8, text: "2018 SHROUD WAS DIFFERENT"},
      {from: 7.8, to: 12.8, text: "THAT WENT RIGHT THROUGH HIM", color: "#38D9FF"},
    ],
  },
  {
    rank: 1,
    title: "THE CLASSIC 1V5",
    game: "SHROUD · COUNTER-STRIKE",
    video: "shroud-1v5.mp4",
    poster: "shroud-1v5-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=caZ5h3frt9g",
    startSeconds: 0,
    duration: 495,
    captions: [
      {from: 0.2, to: 7.8, text: "1 SHROUD. 5 ENEMIES."},
      {from: 7.8, to: 16.3, text: "THE NUTTIEST PLAYER ALIVE", color: "#38D9FF"},
    ],
  },
];

export const SCENE44_SHROUD_BEST_MOMENTS_CONFIG: RankingReelConfig = {
  canvas: {width: 1080, height: 1920, fps: 30},
  titleLines: ["RANKING SHROUD'S", "BEST MOMENTS"],
  accentColor: "#38D9FF",
  captionColor: "#FFFFFF",
  items: SHROUD_BEST_MOMENTS_ITEMS,
  muteClipAudio: false,
  fullScreenClips: true,
  cta: {
    enabled: true,
    duration: 45,
    line1: "WHAT'S SHROUD'S BEST MOMENT?",
    line2: "COMMENT YOUR #1",
  },
  duration: SHROUD_BEST_MOMENTS_ITEMS.reduce((sum, item) => sum + item.duration, 0) + 45,
};

const TENZ_BEST_MOMENTS_ITEMS: RankingReelItem[] = [
  {
    rank: 5,
    title: "30/30 HARD BOTS",
    game: "TENZ · VALORANT AIM RANGE",
    video: "tenz-30-hard-bots.mp4",
    poster: "tenz-30-hard-bots-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=FaMrgmxwhyw",
    startSeconds: 0,
    duration: 378,
    captions: [
      {from: 0.2, to: 6.2, text: "30 TARGETS. MARSHAL ONLY."},
      {from: 6.2, to: 12.4, text: "HE DIDN'T MISS", color: "#5BE7FF"},
    ],
  },
  {
    rank: 4,
    title: "THE ONE-TAP TRICKSHOT",
    game: "TENZ · VALORANT",
    video: "tenz-trickshot.mp4",
    poster: "tenz-trickshot-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=0LTCoPJnVCU",
    startSeconds: 0,
    duration: 373,
    captions: [
      {from: 0.2, to: 5.6, text: "HE HAD ONE CHANCE"},
      {from: 5.6, to: 12.2, text: "OF COURSE HE HIT IT", color: "#5BE7FF"},
    ],
  },
  {
    rank: 3,
    title: "THE ASUNA DUEL",
    game: "TENZ VS ASUNA · VALORANT",
    video: "tenz-asuna-duel.mp4",
    poster: "tenz-asuna-duel-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=NEaH4KdToJ4",
    startSeconds: 0,
    duration: 510,
    captions: [
      {from: 0.2, to: 8.0, text: "ASUNA MADE HIM SWEAT"},
      {from: 8.0, to: 16.8, text: "TENZ STILL CLOSED IT OUT", color: "#5BE7FF"},
    ],
  },
  {
    rank: 2,
    title: "MASTERS FORM",
    game: "TENZ · VALORANT",
    video: "tenz-masters-ready.mp4",
    poster: "tenz-masters-ready-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=cJNyb1sqIfM",
    startSeconds: 0,
    duration: 540,
    captions: [
      {from: 0.2, to: 8.4, text: "READY FOR MASTERS PLAYOFFS"},
      {from: 8.4, to: 17.8, text: "EVERY FIGHT LOOKED EASY", color: "#5BE7FF"},
    ],
  },
  {
    rank: 1,
    title: "DO IT ALL YOURSELF",
    game: "TENZ · VALORANT",
    video: "tenz-solo-clutch.mp4",
    poster: "tenz-solo-clutch-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=BiCvVGcuPKE",
    startSeconds: 0,
    duration: 644,
    captions: [
      {from: 0.2, to: 9.8, text: "WHEN THE WHOLE TEAM IS GONE..."},
      {from: 9.8, to: 21.2, text: "TENZ DOES IT HIMSELF", color: "#5BE7FF"},
    ],
  },
];

export const SCENE45_TENZ_BEST_MOMENTS_CONFIG: RankingReelConfig = {
  canvas: {width: 1080, height: 1920, fps: 30},
  titleLines: ["RANKING TENZ'S", "BEST MOMENTS"],
  accentColor: "#5BE7FF",
  captionColor: "#FFFFFF",
  items: TENZ_BEST_MOMENTS_ITEMS,
  muteClipAudio: false,
  fullScreenClips: true,
  cta: {
    enabled: true,
    duration: 45,
    line1: "WHAT'S TENZ'S BEST MOMENT?",
    line2: "COMMENT YOUR #1",
  },
  duration: TENZ_BEST_MOMENTS_ITEMS.reduce((sum, item) => sum + item.duration, 0) + 45,
};

const SPEED_FUNNIEST_MOMENTS_ITEMS: RankingReelItem[] = [
  {
    rank: 5,
    title: "LIGHTNING HITS HIS HOUSE",
    game: "ISHOWSPEED · LIVESTREAM",
    video: "speed-stream-lightning.mp4",
    poster: "speed-stream-lightning-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=qN1pWtDDAIc",
    startSeconds: 0,
    duration: 270,
    captions: [{from: 0.2, to: 8.8, text: "THE TIMING WAS PERFECT"}],
  },
  {
    rank: 4,
    title: "THE BARK-OFF",
    game: "ISHOWSPEED · IRL STREAM",
    video: "speed-stream-bark-off.mp4",
    poster: "speed-stream-bark-off-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=1wmcGgfHqaY",
    startSeconds: 0,
    duration: 360,
    captions: [{from: 0.2, to: 11.8, text: "HE FINALLY MET HIS MATCH"}],
  },
  {
    rank: 3,
    title: "THE JUMPSCARE",
    game: "ISHOWSPEED · LIVESTREAM",
    video: "speed-stream-jumpscare.mp4",
    poster: "speed-stream-jumpscare-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=_DhJBnQl0hI",
    startSeconds: 0,
    duration: 360,
    captions: [{from: 0.2, to: 11.8, text: "HE WAS NOT READY"}],
  },
  {
    rank: 2,
    title: "TALKING BEN SAID NO",
    game: "ISHOWSPEED · TALKING BEN STREAM",
    video: "speed-stream-talking-ben.mp4",
    poster: "speed-stream-talking-ben-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=CtNvOmUteqM",
    startSeconds: 0,
    duration: 420,
    captions: [{from: 0.2, to: 13.8, text: "BEN DIDN'T EVEN HESITATE"}],
  },
  {
    rank: 1,
    title: "FIREWORKS IN HIS BEDROOM",
    game: "ISHOWSPEED · 4TH OF JULY STREAM",
    video: "speed-stream-fireworks.mp4",
    poster: "speed-stream-fireworks-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=5Nwvc1r7QOs",
    startSeconds: 0,
    duration: 660,
    captions: [
      {from: 0.2, to: 10.8, text: "HE THOUGHT IT WAS HARMLESS"},
      {from: 10.8, to: 21.8, text: "THE WHOLE ROOM ERUPTED", color: "#FF3131"},
    ],
  },
];

export const SCENE46_SPEED_FUNNIEST_MOMENTS_CONFIG: RankingReelConfig = {
  canvas: {width: 1080, height: 1920, fps: 30},
  titleLines: ["RANKING SPEED'S", "FUNNIEST MOMENTS"],
  accentColor: "#FF3131",
  captionColor: "#FFFFFF",
  items: SPEED_FUNNIEST_MOMENTS_ITEMS,
  muteClipAudio: false,
  fullScreenClips: false,
  cta: {
    enabled: true,
    duration: 45,
    line1: "WHAT'S SPEED'S FUNNIEST MOMENT?",
    line2: "COMMENT YOUR #1",
  },
  duration: SPEED_FUNNIEST_MOMENTS_ITEMS.reduce((sum, item) => sum + item.duration, 0) + 45,
};

const OHNE_BEST_CASE_OPENINGS_ITEMS: RankingReelItem[] = [
  {
    rank: 5,
    title: "$374 LIQUID FOIL",
    game: "OHNEPIXEL · CAPSULE OPENING",
    video: "ohne-short-liquid-foil.mp4",
    poster: "ohne-short-liquid-foil-poster.jpg",
    sourceUrl: "https://www.youtube.com/shorts/IW3kKf9Ewbk",
    startSeconds: 0,
    duration: 300,
    captions: [{from: 6.1, to: 9.8, text: "$374 STICKER", color: "#FFB000"}],
  },
  {
    rank: 4,
    title: "GUT KNIFE RUST COAT",
    game: "OHNEPIXEL · CASE OPENING",
    video: "ohne-short-gut-rust-coat.mp4",
    poster: "ohne-short-gut-rust-coat-poster.jpg",
    sourceUrl: "https://www.youtube.com/shorts/1EYHR1ZhmkU",
    startSeconds: 0,
    duration: 240,
    captions: [{from: 5.1, to: 7.8, text: "GUT KNIFE RUST COAT", color: "#FFB000"}],
  },
  {
    rank: 3,
    title: "BOWIE BLACK LAMINATE",
    game: "OHNEPIXEL · CASE OPENING",
    video: "ohne-short-bowie-black-laminate.mp4",
    poster: "ohne-short-bowie-black-laminate-poster.jpg",
    sourceUrl: "https://www.youtube.com/shorts/qNyK-3aR_fw",
    startSeconds: 0,
    duration: 540,
    captions: [{from: 13.2, to: 17.8, text: "BOWIE BLACK LAMINATE", color: "#FFB000"}],
  },
  {
    rank: 2,
    title: "STATTRAK BOWIE AUTOTRONIC",
    game: "OHNEPIXEL · CASE OPENING",
    video: "ohne-short-bowie-autotronic.mp4",
    poster: "ohne-short-bowie-autotronic-poster.jpg",
    sourceUrl: "https://www.youtube.com/shorts/_aGN-VqebEo",
    startSeconds: 0,
    duration: 420,
    captions: [{from: 10.1, to: 13.8, text: "1 CASE. 1 KNIFE.", color: "#FFB000"}],
  },
  {
    rank: 1,
    title: "TALON MARBLE FADE",
    game: "OHNEPIXEL · REACTION",
    video: "ohne-short-talon-marble-fade.mp4",
    poster: "ohne-short-talon-marble-fade-poster.jpg",
    sourceUrl: "https://www.youtube.com/shorts/0JezN742FMQ",
    startSeconds: 0,
    duration: 540,
    captions: [{from: 13.2, to: 17.8, text: "TALON MARBLE FADE", color: "#FFB000"}],
  },
];

export const SCENE47_OHNE_BEST_CASE_OPENINGS_CONFIG: RankingReelConfig = {
  canvas: {width: 1080, height: 1920, fps: 30},
  titleLines: ["RANKING OHNEPIXEL'S", "BEST CASE OPENINGS"],
  accentColor: "#FFB000",
  captionColor: "#FFFFFF",
  items: OHNE_BEST_CASE_OPENINGS_ITEMS,
  muteClipAudio: false,
  fullScreenClips: true,
  cta: {
    enabled: true,
    duration: 45,
    line1: "WHICH OPENING WAS THE BEST?",
    line2: "COMMENT YOUR #1",
  },
  duration: OHNE_BEST_CASE_OPENINGS_ITEMS.reduce((sum, item) => sum + item.duration, 0) + 45,
};

const TARIK_BEST_MOMENTS_ITEMS: RankingReelItem[] = [
  {
    rank: 5,
    title: "HE THOUGHT HE COULD COOK TARIK",
    game: "TARIK · VALORANT",
    video: "tarik-ranked-cook.mp4",
    poster: "tarik-ranked-cook-poster.jpg",
    sourceUrl: "https://www.youtube.com/shorts/OV9SnjKp_f0",
    startSeconds: 0,
    duration: 360,
    captions: [],
  },
  {
    rank: 4,
    title: "PRETENDING TO BE WASHED",
    game: "TARIK · VALORANT",
    video: "tarik-washed-ace.mp4",
    poster: "tarik-washed-ace-poster.jpg",
    sourceUrl: "https://www.youtube.com/shorts/psK2wH86B0M",
    startSeconds: 0,
    duration: 720,
    captions: [],
  },
  {
    rank: 3,
    title: "$500 GIFTED CLUTCH",
    game: "TARIK · COUNTER-STRIKE",
    video: "tarik-500-gifted.mp4",
    poster: "tarik-500-gifted-poster.jpg",
    sourceUrl: "https://www.youtube.com/shorts/XlzGJjtLiYE",
    startSeconds: 0,
    duration: 480,
    captions: [],
  },
  {
    rank: 2,
    title: "HE STILL HAS IT",
    game: "TARIK · COUNTER-STRIKE",
    video: "tarik-cs-masterclass.mp4",
    poster: "tarik-cs-masterclass-poster.jpg",
    sourceUrl: "https://www.youtube.com/shorts/mFLa018tyWY",
    startSeconds: 0,
    duration: 750,
    captions: [],
  },
  {
    rank: 1,
    title: "MAJOR CHAMPION",
    game: "TARIK · BOSTON MAJOR",
    video: "tarik-major-champion.mp4",
    poster: "tarik-major-champion-poster.jpg",
    sourceUrl: "https://www.youtube.com/shorts/Jir6-ao-b6E",
    startSeconds: 0,
    duration: 420,
    captions: [],
  },
];

export const SCENE48_TARIK_BEST_MOMENTS_CONFIG: RankingReelConfig = {
  canvas: {width: 1080, height: 1920, fps: 30},
  titleLines: ["RANKING TARIK'S", "BEST MOMENTS"],
  accentColor: "#FF3B30",
  captionColor: "#FFFFFF",
  items: TARIK_BEST_MOMENTS_ITEMS,
  muteClipAudio: false,
  fullScreenClips: true,
  cta: {
    enabled: true,
    duration: 45,
    line1: "WHAT'S TARIK'S BEST MOMENT?",
    line2: "COMMENT YOUR #1",
  },
  duration: TARIK_BEST_MOMENTS_ITEMS.reduce((sum, item) => sum + item.duration, 0) + 45,
};

const CRAZIEST_CASE_REACTIONS_ITEMS: RankingReelItem[] = [
  {
    rank: 5,
    title: "TRIPLE CASE DISASTER",
    game: "ANOMALY · SWAGGERSOULS · FITZ",
    video: "case-reaction-anomaly.mp4",
    poster: "case-reaction-anomaly-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=mB5GzJ7cV60",
    startSeconds: 4,
    duration: 300,
    captions: [{from: 5.8, to: 9.5, text: "THE SEA OF BLUE", color: "#FFB000"}],
    objectPosition: "50% center",
  },
  {
    rank: 4,
    title: "SUMMIT FINALLY HITS GOLD",
    game: "SUMMIT1G · CAUTION HAND WRAPS",
    video: "case-reaction-summit.mp4",
    poster: "case-reaction-summit-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=PSgEGSLvJFc",
    startSeconds: 8,
    duration: 390,
    captions: [{from: 3.8, to: 8.8, text: "WE GOT ONE!", color: "#FFB000"}],
    objectPosition: "38% center",
    focusShift: {times: [0, 4.6, 5.5, 13], x: [50, 50, 12, 12]},
  },
  {
    rank: 3,
    title: "THE BAR ERUPTS",
    game: "TARIK · GOLD GOLD GOLD",
    video: "case-reaction-tarik.mp4",
    poster: "case-reaction-tarik-poster.jpg",
    sourceUrl: "https://www.youtube.com/shorts/oQQL2pwc8_k",
    startSeconds: 11,
    duration: 390,
    captions: [{from: 5.2, to: 9.8, text: "THAT IS A DOG KNIFE!", color: "#FFB000"}],
  },
  {
    rank: 2,
    title: "TALON MARBLE FADE",
    game: "TRAINWRECKS · OHNEPIXEL REACTS",
    video: "case-reaction-trainwrecks.mp4",
    poster: "case-reaction-trainwrecks-poster.jpg",
    sourceUrl: "https://www.youtube.com/shorts/0JezN742FMQ",
    startSeconds: 21,
    duration: 420,
    captions: [{from: 7.2, to: 13.5, text: "INSANE PATTERN", color: "#FFB000"}],
  },
  {
    rank: 1,
    title: "$470,000 KNIFE",
    game: "XQC · STATTRAK GAMMA DOPPLER",
    video: "case-reaction-xqc.mp4",
    poster: "case-reaction-xqc-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=DCodJb9urKE",
    startSeconds: 9,
    duration: 300,
    captions: [{from: 3.3, to: 9.4, text: "OH MY GOD!", color: "#FFB000"}],
    objectPosition: "35% center",
    focusShift: {times: [0, 4.2, 5.1, 10], x: [50, 50, 12, 12]},
  },
];

export const SCENE49_CRAZIEST_CASE_REACTIONS_CONFIG: RankingReelConfig = {
  canvas: {width: 1080, height: 1920, fps: 30},
  titleLines: ["CRAZIEST CASE OPENING", "REACTIONS EVER"],
  accentColor: "#FFB000",
  captionColor: "#FFFFFF",
  items: CRAZIEST_CASE_REACTIONS_ITEMS,
  muteClipAudio: false,
  fullScreenClips: true,
  cta: {
    enabled: true,
    duration: 45,
    line1: "WHICH REACTION WAS THE CRAZIEST?",
    line2: "COMMENT YOUR #1",
  },
  duration: CRAZIEST_CASE_REACTIONS_ITEMS.reduce((sum, item) => sum + item.duration, 0) + 45,
};

const VALORANT_CRAZIEST_PLAYS_ITEMS: RankingReelItem[] = [
  {
    rank: 5,
    title: "DEMON1'S WRIST-BREAKING FLICK",
    game: "DEMON1 · VCT CHAMPIONS 2023",
    video: "valorant-demon1-flick.mp4",
    poster: "valorant-demon1-flick-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=vPJklwBCgCU",
    startSeconds: 0,
    duration: 300,
    captions: [{from: 2.2, to: 7.8, text: "THAT FLICK...", color: "#FF4655"}],
  },
  {
    rank: 4,
    title: "ASPAS MARSHAL ACE",
    game: "ASPAS · LOUD VS 100 THIEVES",
    video: "valorant-aspas-marshal.mp4",
    poster: "valorant-aspas-marshal-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=6xlUhDArhmI",
    startSeconds: 8.5,
    duration: 315,
    captions: [{from: 3.7, to: 9.9, text: "MARSHAL ACE", color: "#FF4655"}],
  },
  {
    rank: 3,
    title: "CHRONICLE'S SMOKE ACE",
    game: "CHRONICLE · GAMBIT VS KRU",
    video: "valorant-chronicle-ace.mp4",
    poster: "valorant-chronicle-ace-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=rSrS4e19Mek",
    startSeconds: 9,
    duration: 390,
    captions: [{from: 5.1, to: 12.4, text: "FIVE. THROUGH. SMOKE.", color: "#FF4655"}],
  },
  {
    rank: 2,
    title: "S0M'S IMPOSSIBLE CLUTCH",
    game: "S0M · NRG",
    video: "valorant-som-clutch.mp4",
    poster: "valorant-som-clutch-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=z3-ebq0j2X0",
    startSeconds: 12,
    duration: 480,
    captions: [{from: 8.5, to: 15.5, text: "ONE ENEMY REMAINING", color: "#FF4655"}],
  },
  {
    rank: 1,
    title: "TENZ OPERATOR 1V5",
    game: "TENZ · SOLO OPERATOR CLUTCH",
    video: "valorant-tenz-operator.mp4",
    poster: "valorant-tenz-operator-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=Ka7CJgYyFUU",
    startSeconds: 58,
    duration: 420,
    captions: [{from: 8.2, to: 13.6, text: "LAST-SECOND ACE", color: "#FF4655"}],
  },
];

export const SCENE50_VALORANT_CRAZIEST_PLAYS_CONFIG: RankingReelConfig = {
  canvas: {width: 1080, height: 1920, fps: 30},
  titleLines: ["RANKING VALORANT'S", "CRAZIEST CLIPS"],
  accentColor: "#FF4655",
  captionColor: "#FFFFFF",
  items: VALORANT_CRAZIEST_PLAYS_ITEMS,
  muteClipAudio: false,
  fullScreenClips: true,
  cta: {
    enabled: true,
    duration: 45,
    line1: "WHAT'S THE BEST VALORANT CLIP?",
    line2: "COMMENT YOUR #1",
  },
  duration: VALORANT_CRAZIEST_PLAYS_ITEMS.reduce((sum, item) => sum + item.duration, 0) + 45,
};

const COUNTER_STRIKE_CRAZIEST_PLAYS_ITEMS: RankingReelItem[] = [
  {
    rank: 5,
    title: "HAPPY'S DEAGLE ACE",
    game: "HAPPY · DREAMHACK LONDON 2015",
    video: "cs-craziest-happy.mp4",
    poster: "cs-craziest-happy-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=3V8vSnCnwiA",
    startSeconds: 4,
    duration: 300,
    captions: [{from: 3.0, to: 9.5, text: "FIVE SHOTS. FIVE KILLS.", color: "#F5A623"}],
    objectPosition: "50% center",
  },
  {
    rank: 4,
    title: "COLDZERA'S JUMPING AWP",
    game: "COLDZERA · MLG COLUMBUS 2016",
    video: "cs-craziest-coldzera.mp4",
    poster: "cs-craziest-coldzera-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=XJyqQW1sdk0",
    startSeconds: 26,
    duration: 330,
    captions: [{from: 4.1, to: 10.5, text: "THE SHOT THAT GOT A GRAFFITI", color: "#F5A623"}],
    objectPosition: "50% center",
  },
  {
    rank: 3,
    title: "REFREZH'S 1V5",
    game: "REFREZH · HEROIC VS LIQUID",
    video: "cs-craziest-refrezh.mp4",
    poster: "cs-craziest-refrezh-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=8yP8GXb3Nck",
    startSeconds: 0,
    duration: 420,
    captions: [{from: 6.0, to: 13.5, text: "ONE MAN SAVED HEROIC", color: "#F5A623"}],
    objectPosition: "50% center",
  },
  {
    rank: 2,
    title: "CADIAN'S KNIFE CLUTCH",
    game: "CADIAN · ESL PRO LEAGUE 13 FINAL",
    video: "cs-craziest-cadian.mp4",
    poster: "cs-craziest-cadian-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=zeEkAXNMz98",
    startSeconds: 2,
    duration: 540,
    captions: [{from: 3.0, to: 10.0, text: "A KNIFE... THEN THE IMPOSSIBLE", color: "#F5A623"}],
    objectPosition: "50% center",
  },
  {
    rank: 1,
    title: "S1MPLE'S FALLING AWP",
    game: "S1MPLE · ESL ONE COLOGNE 2016",
    video: "cs-craziest-simple.mp4",
    poster: "cs-craziest-simple-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=QQIX-ylS7YU",
    startSeconds: 3,
    duration: 360,
    captions: [{from: 4.0, to: 11.7, text: "THIS SHOULD NOT BE POSSIBLE", color: "#F5A623"}],
    objectPosition: "50% center",
  },
];

export const SCENE51_COUNTER_STRIKE_CRAZIEST_PLAYS_CONFIG: RankingReelConfig = {
  canvas: {width: 1080, height: 1920, fps: 30},
  titleLines: ["RANKING COUNTER-STRIKE'S", "CRAZIEST CLIPS"],
  accentColor: "#F5A623",
  captionColor: "#FFFFFF",
  items: COUNTER_STRIKE_CRAZIEST_PLAYS_ITEMS,
  muteClipAudio: false,
  fullScreenClips: true,
  cta: {
    enabled: true,
    duration: 45,
    line1: "WHAT'S THE BEST CS CLIP?",
    line2: "COMMENT YOUR #1",
  },
  duration: COUNTER_STRIKE_CRAZIEST_PLAYS_ITEMS.reduce((sum, item) => sum + item.duration, 0) + 45,
};

const FUNNIEST_OHNEPIXEL_PART2_ITEMS: RankingReelItem[] = [
  {
    rank: 5,
    title: "HOW MANY WOODS IS A PAPER?",
    game: "OHNEPIXEL · MINECRAFT",
    video: "ohne-part2-minecraft.mp4",
    poster: "ohne-part2-minecraft-poster.jpg",
    sourceUrl: "https://www.youtube.com/shorts/zRKZ2n27b6U",
    startSeconds: 4.8,
    duration: 465,
    captions: [
      {from: 7.5, to: 15.2, text: "THREE GREEN = ONE PAPER?", color: "#FFD21C"},
    ],
  },
  {
    rank: 4,
    title: "THEY HEARD HIM",
    game: "OHNEPIXEL · COUNTER-STRIKE 2",
    video: "ohne-part2-they-heard-him.mp4",
    poster: "ohne-part2-they-heard-him-poster.jpg",
    sourceUrl: "https://www.youtube.com/shorts/b2_0GrlTpxI",
    startSeconds: 0,
    duration: 445,
    captions: [
      {from: 8.0, to: 14.5, text: "BEEP BEEP...", color: "#FFD21C"},
    ],
  },
  {
    rank: 3,
    title: "GEOGRAPHY GENIUS",
    game: "OHNEPIXEL · SIZE IT UP",
    video: "ohne-part2-geography.mp4",
    poster: "ohne-part2-geography-poster.jpg",
    sourceUrl: "https://www.youtube.com/shorts/OXbXJ_TMIxU",
    startSeconds: 0,
    duration: 525,
    captions: [
      {from: 10.0, to: 17.2, text: "23 POINTS.", color: "#FFD21C"},
    ],
  },
  {
    rank: 2,
    title: "BRO FOUND HIS GAME",
    game: "OHNEPIXEL · COUNTER-STRIKE 2",
    video: "ohne-part2-found-his-game.mp4",
    poster: "ohne-part2-found-his-game-poster.jpg",
    sourceUrl: "https://www.youtube.com/shorts/JWhRF0vsJx0",
    startSeconds: 10.5,
    duration: 445,
    captions: [
      {from: 7.2, to: 14.5, text: "STOP CRYING, EVERYBODY.", color: "#FFD21C"},
    ],
  },
  {
    rank: 1,
    title: "GEOGUESSR LEAKED HIS HOUSE",
    game: "OHNEPIXEL · GEOGUESSR",
    video: "ohne-part2-geoguessr.mp4",
    poster: "ohne-part2-geoguessr-poster.jpg",
    sourceUrl: "https://www.youtube.com/shorts/dn8mbC11BII",
    startSeconds: 10.7,
    duration: 660,
    captions: [
      {from: 10.0, to: 21.7, text: "OLAF, WHY WOULD YOU SAY THAT?!", color: "#FFD21C"},
    ],
  },
];

export const SCENE52_FUNNIEST_OHNEPIXEL_PART2_CONFIG: RankingReelConfig = {
  canvas: {width: 1080, height: 1920, fps: 30},
  titleLines: ["RANKING OHNEPIXEL'S", "FUNNIEST MOMENTS · PART 2"],
  accentColor: "#FFD21C",
  captionColor: "#FFFFFF",
  items: FUNNIEST_OHNEPIXEL_PART2_ITEMS,
  muteClipAudio: false,
  fullScreenClips: true,
  cta: {
    enabled: true,
    duration: 45,
    line1: "WHAT'S OHNE'S FUNNIEST MOMENT?",
    line2: "COMMENT YOUR #1",
  },
  duration: FUNNIEST_OHNEPIXEL_PART2_ITEMS.reduce((sum, item) => sum + item.duration, 0) + 45,
};

const MOST_POPULAR_ROBLOX_ITEMS: RankingReelItem[] = [
  {
    rank: 5,
    title: "ADOPT ME!",
    game: "ROBLOX · PETS & ROLEPLAY",
    video: "roblox-popular-adopt-me.mp4",
    poster: "roblox-popular-adopt-me-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=JYnPu99MQJI",
    startSeconds: 3,
    duration: 285,
    captions: [{from: 3.2, to: 8.8, text: "40B+ VISITS", color: "#48C9FF"}],
  },
  {
    rank: 4,
    title: "BLOX FRUITS",
    game: "ROBLOX · ACTION RPG",
    video: "roblox-popular-blox-fruits.mp4",
    poster: "roblox-popular-blox-fruits-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=ExBteidOlPE",
    startSeconds: 3,
    duration: 285,
    captions: [{from: 3.2, to: 8.8, text: "64B+ VISITS", color: "#48C9FF"}],
  },
  {
    rank: 3,
    title: "99 NIGHTS IN THE FOREST",
    game: "ROBLOX · SURVIVAL",
    video: "roblox-popular-99-nights.mp4",
    poster: "roblox-popular-99-nights-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=oqslEiRDguE",
    startSeconds: 3,
    duration: 285,
    captions: [{from: 3.2, to: 8.8, text: "14.2M PEAK PLAYERS", color: "#48C9FF"}],
  },
  {
    rank: 2,
    title: "GROW A GARDEN",
    game: "ROBLOX · SIMULATION",
    video: "roblox-popular-grow-garden.mp4",
    poster: "roblox-popular-grow-garden-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=G5sWyTOi8UM",
    startSeconds: 3,
    duration: 285,
    captions: [{from: 3.2, to: 8.8, text: "22.3M PEAK PLAYERS", color: "#48C9FF"}],
  },
  {
    rank: 1,
    title: "STEAL A BRAINROT",
    game: "ROBLOX · TYCOON",
    video: "roblox-popular-steal-brainrot.mp4",
    poster: "roblox-popular-steal-brainrot-poster.jpg",
    sourceUrl: "https://www.youtube.com/watch?v=wTMo-52SGG0",
    startSeconds: 3,
    duration: 300,
    captions: [{from: 3.2, to: 9.2, text: "25.4M PEAK PLAYERS", color: "#48C9FF"}],
  },
];

export const SCENE54_BEST_ROBLOX_GAMES_CONFIG: RankingReelConfig = {
  canvas: {width: 1080, height: 1920, fps: 30},
  titleLines: ["RANKING ROBLOX'S", "MOST POPULAR GAMES"],
  accentColor: "#48C9FF",
  captionColor: "#FFFFFF",
  items: MOST_POPULAR_ROBLOX_ITEMS,
  muteClipAudio: false,
  fullScreenClips: true,
  cta: {
    enabled: true,
    duration: 60,
    line1: "WHICH ONE DO YOU PLAY?",
    line2: "COMMENT YOUR #1",
  },
  duration: MOST_POPULAR_ROBLOX_ITEMS.reduce((sum, item) => sum + item.duration, 0) + 60,
};

export type IndividualLaunchGameConfig = {
  canvas: {width: number; height: number; fps: number};
  game: {
    rank: number;
    name: string;
    studio: string;
    hook: string;
    votes: number;
    genres: string;
    hero: string;
    screenshots: [string, string, string];
  };
  campaign: {
    date: string;
    dayLabel: string;
    cta: string;
    link: string;
  };
  accentColor: string;
};

export const SCENE53_INDIVIDUAL_LAUNCH_GAME_CONFIG: IndividualLaunchGameConfig = {
  canvas: {width: 1080, height: 1350, fps: 30},
  game: {
    rank: 1,
    name: "Tiny Machinery",
    studio: "XSGames",
    hook: "CRACK CRAZY PUZZLES TO SAVE YOUR LIFE.",
    votes: 47,
    genres: "PUZZLE · STRATEGY · INDIE",
    hero: "tiny-machinery-launch-hero.jpg",
    screenshots: [
      "tiny-machinery-launch-shot-1.jpg",
      "tiny-machinery-launch-shot-2.jpg",
      "tiny-machinery-launch-shot-3.jpg",
    ],
  },
  campaign: {
    date: "SEP 20–26, 2026",
    dayLabel: "DAY 5 OF 7",
    cta: "VOTE FOR TINY MACHINERY",
    link: "pixelpicked.com/launch-campaign",
  },
  accentColor: "#F4F4F2",
};

export type GuessTheGameConfig = {
  canvas: {width: number; height: number; fps: number};
  duration: number;
  clip: {
    src: string;
    startFrom: number;
    scale: number;
    objectPosition: string;
    volume: number;
  };
  post: {
    day: number;
    answer: string;
    caption: string;
    sourceUrl: string;
  };
};

// To make the next episode, change only this object and replace the clip.
// `post` is production metadata; none of it is drawn over the gameplay.
export const SCENE55_GUESS_THE_GAME_CONFIG: GuessTheGameConfig = {
  // Match the reference post's clean 16:9 gameplay presentation.
  canvas: {width: 1920, height: 1080, fps: 30},
  duration: 643,
  clip: {
    src: "guess-the-game/witcher-3-day-1.mp4",
    startFrom: 0,
    // The centered crop removes the archival HUD and WIP strip at the edges.
    scale: 1.55,
    objectPosition: "50% 50%",
    volume: 1,
  },
  post: {
    day: 1,
    answer: "The Witcher 3: Wild Hunt",
    caption: "Day 1 — Guess the game. 🎮",
    sourceUrl:
      "https://press.cdprojektred.com/en/160/829",
  },
};

export const SCENE56_GUESS_THE_GAME_DAY2_CONFIG: GuessTheGameConfig = {
  canvas: {width: 1920, height: 1080, fps: 30},
  duration: 390,
  clip: {
    src: "guess-the-game/red-dead-redemption-2-day-2.mp4",
    startFrom: 0,
    // The clue comes only from the world: no Arthur, HUD, logo, or title card.
    scale: 1,
    objectPosition: "50% 50%",
    volume: 1,
  },
  post: {
    day: 2,
    answer: "Red Dead Redemption 2",
    caption: "Day 2 — Guess the game. 🎮",
    sourceUrl: "https://www.rockstargames.com/videos/1ook234t",
  },
};

export const SCENE57_GUESS_THE_GAME_DAY3_CONFIG: GuessTheGameConfig = {
  canvas: {width: 1920, height: 1080, fps: 30},
  duration: 360,
  clip: {
    src: "guess-the-game/elden-ring-day-3.mp4",
    startFrom: 0,
    // Only the Lands Between are the clue: no Tarnished, HUD, logo, or title card.
    scale: 1,
    objectPosition: "50% 50%",
    volume: 0,
  },
  post: {
    day: 3,
    answer: "Elden Ring",
    caption: "Day 3 — Guess the game. 🎮",
    sourceUrl: "https://store.steampowered.com/app/1245620/ELDEN_RING/",
  },
};

export const SCENE59_GUESS_THE_GAME_DAY4_CONFIG: GuessTheGameConfig = {
  canvas: {width: 1920, height: 1080, fps: 30},
  // Eight seconds: long enough to read the scene, before the live-action / credit cut.
  duration: 240,
  clip: {
    src: "guess-the-game/before-your-eyes-day-4.mp4",
    // Later visual memory passage, after the title card and before the live-action cut.
    startFrom: 270,
    // Removes the trailer's baked lower-third subtitles while preserving the scene.
    scale: 1.4,
    objectPosition: "50% 50%",
    volume: 0,
  },
  post: {
    day: 4,
    answer: "Before Your Eyes",
    caption: "Day 4 — Guess the game. 🎮",
    sourceUrl: "https://store.steampowered.com/app/1082430/Before_Your_Eyes/",
  },
};

export const SCENE60_GUESS_THE_GAME_DAY5_CONFIG: GuessTheGameConfig = {
  canvas: {width: 1920, height: 1080, fps: 30},
  // A clean twelve-second in-match sequence: long enough to take in the map,
  // abilities, and team fight, with no title card or streamer overlay.
  duration: 360,
  clip: {
    src: "guess-the-game/overwatch-day-5.mp4",
    startFrom: 0,
    scale: 1,
    objectPosition: "50% 50%",
    volume: 0,
  },
  post: {
    day: 5,
    answer: "Overwatch",
    caption: "Day 5 — Guess the game. 🎮",
    sourceUrl: "https://store.steampowered.com/app/2357570/Overwatch_2/",
  },
};

export const SCENE62_GUESS_THE_GAME_DAY6_CONFIG: GuessTheGameConfig = {
  canvas: {width: 1920, height: 1080, fps: 30},
  // The hoverbike ride is an unmistakable visual clue without a logo or title card.
  duration: 360,
  clip: {
    src: "guess-the-game/sable-day-6.mp4",
    startFrom: 0,
    scale: 1,
    objectPosition: "50% 50%",
    // Keep the original Sable trailer sound, per the post direction.
    volume: 1,
  },
  post: {
    day: 6,
    answer: "Sable",
    caption: "Day 6 — Guess the game. 🎮",
    sourceUrl: "https://store.steampowered.com/app/757310/Sable/",
  },
};

export const SCENE64_GUESS_THE_GAME_DAY7_CONFIG: GuessTheGameConfig = {
  canvas: {width: 1920, height: 1080, fps: 30},
  // Mid-trailer combat and void-surfing: no review card, logo, or title treatment.
  duration: 90,
  clip: {
    src: "guess-the-game/solar-ash-day-7.mp4",
    // Begins at 45s and ends before the title-card animation.
    startFrom: 1350,
    scale: 1,
    objectPosition: "50% 50%",
    volume: 1,
  },
  post: {
    day: 7,
    answer: "Solar Ash",
    caption: "Day 7 — Guess the game. 🎮",
    sourceUrl: "https://store.steampowered.com/app/1867530/Solar_Ash/",
  },
};

export const SCENE65_GUESS_THE_GAME_DAY8_CONFIG: GuessTheGameConfig = {
  canvas: {width: 1920, height: 1080, fps: 30},
  duration: 450,
  clip: {
    src: "guess-the-game/apex-legends-day-8.mp4",
    startFrom: 0,
    // Crops Steam's baked legal footer while keeping the gameplay readable.
    scale: 1.4,
    objectPosition: "50% 50%",
    volume: 1,
  },
  post: {
    day: 8,
    answer: "Apex Legends",
    caption: "Day 8 — Guess the game. 🎮",
    sourceUrl: "https://store.steampowered.com/app/1172470/Apex/",
  },
};

export const SCENE67_GUESS_THE_GAME_DAY9_CONFIG: GuessTheGameConfig = {
  canvas: {width: 1920, height: 1080, fps: 30},
  duration: 450,
  clip: {
    src: "guess-the-game/assassins-creed-day-9.mp4",
    // Direct third-person gameplay, not a cinematic trailer or title card.
    startFrom: 0,
    scale: 1,
    objectPosition: "50% 50%",
    volume: 1,
  },
  post: {
    day: 9,
    answer: "Assassin's Creed Valhalla",
    caption: "Day 9 — Guess the game. 🎮",
    sourceUrl: "https://store.steampowered.com/app/2208920/Assassins_Creed_Valhalla/",
  },
};

export const SCENE68_GUESS_THE_GAME_DAY10_CONFIG: GuessTheGameConfig = {
  canvas: {width: 1920, height: 1080, fps: 30},
  duration: 450,
  clip: {
    src: "guess-the-game/god-of-war-day-10.mp4",
    startFrom: 0,
    // Crops the TV frame, retaining only the action and native game HUD.
    scale: 1.24,
    objectPosition: "50% 53%",
    volume: 1,
  },
  post: {
    day: 10,
    answer: "God of War Ragnarök",
    caption: "Day 10 — Guess the game. 🎮",
    sourceUrl: "https://rumble.com/v24cywx-god-of-war-ragnarok-pov-4k-gameplay-playstation-5-lg-c1-65-oled-endgame-gam.html",
  },
};

export const SCENE71_GUESS_THE_GAME_DAY11_CONFIG: GuessTheGameConfig = {
  canvas: {width: 1920, height: 1080, fps: 30},
  duration: 450,
  clip: {
    src: "guess-the-game/death-stranding-day-11.mp4",
    startFrom: 0,
    scale: 1,
    objectPosition: "50% 50%",
    volume: 1,
  },
  post: {
    day: 11,
    answer: "Death Stranding 2: On the Beach",
    caption: "Day 11 — Guess the game. 🎮",
    sourceUrl: "https://rumble.com/v6zi7oi-death-stranding-2-gameplay-walkthrough-part-1-full-game-4k-60fps-ps5-pro-no.html",
  },
};

export const SCENE73_GUESS_THE_GAME_DAY12_CONFIG: GuessTheGameConfig = {
  canvas: {width: 1920, height: 1080, fps: 30},
  duration: 450,
  clip: {
    src: "guess-the-game/detroit-become-human-day-12.mp4",
    startFrom: 0,
    scale: 1,
    objectPosition: "50% 50%",
    volume: 1,
  },
  post: {
    day: 12,
    answer: "Detroit: Become Human",
    caption: "Day 12 — Guess the game. 🎮",
    sourceUrl: "https://rumble.com/v5i6jlg-the-hostage-1-detroit-become-human.html",
  },
};

export const SCENE75_GUESS_THE_GAME_DAY13_CONFIG: GuessTheGameConfig = {
  canvas: {width: 1920, height: 1080, fps: 60},
  duration: 900,
  clip: {
    src: "guess-the-game/wukong-day-13.mp4",
    startFrom: 0,
    scale: 1,
    objectPosition: "50% 50%",
    volume: 1,
  },
  post: {
    day: 13,
    answer: "Black Myth: Wukong",
    caption: "Day 13 — Guess the game. 🎮",
    sourceUrl: "https://rumble.com/v5dc9d1-black-myth-wukong-gameplay-walkthrough-part-1-no-commentary-full-game.html",
  },
};

export const SCENE77_GUESS_THE_GAME_DAY14_CONFIG: GuessTheGameConfig = {
  canvas: {width: 1920, height: 1080, fps: 30},
  duration: 450,
  clip: {
    src: "guess-the-game/day-14.mp4",
    startFrom: 0,
    scale: 1,
    objectPosition: "50% 50%",
    volume: 1,
  },
  post: {
    day: 14,
    answer: "Bodycam",
    caption: "Day 14 — Guess the game. 🎮",
    sourceUrl: "https://rumble.com/v52qys1-bodycam-gameplay.html",
  },
};

export const SCENE78_GUESS_THE_GAME_DAY15_CONFIG: GuessTheGameConfig = {
  canvas: {width: 1920, height: 1080, fps: 60},
  duration: 900,
  clip: {
    src: "guess-the-game/day-15.mp4",
    startFrom: 0,
    scale: 1,
    objectPosition: "50% 50%",
    volume: 1,
  },
  post: {
    day: 15,
    answer: "Ghost of Tsushima",
    caption: "Day 15 — Guess the game. 🎮",
    sourceUrl: "https://rumble.com/v561lc2-ghost-of-tsushima-directors-cut-pl-polski-dubbing-2k-60fps-pc-ultra-no-comm.html",
  },
};

// One summary card per devlog published today.
const TODAY_DEVLOG_SUMMARY_BASE = {
  canvas: {width: 1080, height: 1080, fps: 60},
  date: "SEP 26, 2026",
};

export const SCENE58_TILTRICS_DEVLOG_CONFIG = {
  ...TODAY_DEVLOG_SUMMARY_BASE,
  game: "Tiltrics",
  title: "THE ART OF THE LURE\nIN AMBUSH ALLEY.",
  artwork: "https://res.cloudinary.com/donjla0xz/image/upload/v1790427286/devlogs/mq3au1vahwwp3bldasnm.png",
  accent: "#8CE7FF",
  summary: "Level 3 is built around five narrow corridors, numbered tiles and chasers that cannot be outrun. The answer: lure them, one by one, into the pool to clear the path.",
};

export const SCENE58_PASTEL_LINK_DEVLOG_CONFIG = {
  ...TODAY_DEVLOG_SUMMARY_BASE,
  game: "Pastel Link Puzzle",
  title: "PASTEL LINK NOW HAS\nFIVE MODES ON ANDROID.",
  artwork: "https://res.cloudinary.com/donjla0xz/image/upload/v1790146127/studio/ogedhpzcgbk63e74d5fb.webp",
  accent: "#F5A7CB",
  summary: "Android now has Classic, Angular Shapes, Loops, Hexagons and 3D Shapes—21,520 puzzles total. Every board is checked for a single solution and meaningful variety.",
};

export const SCENE58_FANDOM_FRENZY_DEVLOG_CONFIG = {
  ...TODAY_DEVLOG_SUMMARY_BASE,
  game: "Fandom Frenzy",
  title: "MORE FANDOMS.\nMORE REWARDS.\nMORE TO COLLECT.",
  artwork: "https://res.cloudinary.com/donjla0xz/image/upload/v1790406169/devlogs/adwav8qycdnotwdgntqj.webp",
  accent: "#C68CFF",
  summary: "New themed borders, new word-grid categories and more music fandoms are live. Soon, every play will also help your fandom compete for the monthly top spot.",
};

export const SCENE58_GRIDWITS_DEVLOG_CONFIG = {
  ...TODAY_DEVLOG_SUMMARY_BASE,
  game: "Gridwits",
  title: "TWELVE DAILY PUZZLES.\nONE NEW ROUTINE.",
  artwork: "https://res.cloudinary.com/donjla0xz/image/upload/v1789845246/studio/pkmj94bj1qogx1pogfce.png",
  accent: "#8EE7B7",
  summary: "Twelve different puzzle types arrive daily, with a shared leaderboard and a difficulty curve that grows from Monday to the weekend. Today’s post shows three solved boards.",
};

export const SCENE58_MAF_BLOX_DEVLOG_CONFIG = {
  ...TODAY_DEVLOG_SUMMARY_BASE,
  game: "MAF Blox",
  title: "MAF BLOX 1.7.6\nSTRENGTHENS THE FOUNDATION.",
  artwork: "https://res.cloudinary.com/donjla0xz/image/upload/v1790377174/devlogs/gkbeyyedvwqqlybcy6sl.webp",
  accent: "#F6C86F",
  summary: "Version 1.7.6 improves saved progress, cloud sync, leaderboard accuracy and the in-game economy. It clears the way for the next major expansion: City Mode.",
};

export const SCENE61_IDLE_BLACK_HOLE_DEVLOG_CONFIG = {
  canvas: {width: 1080, height: 1080, fps: 60},
  date: "SEP 27, 2026",
  game: "Idle Black Hole",
  title: "A COMPLETE VISUAL\nREMAKE, BUILT FROM\nPLAYER FEEDBACK.",
  artwork: "https://res.cloudinary.com/donjla0xz/image/upload/v1790515340/devlogs/qmbod4iiyrcvl3ycw5xg.webp",
  accent: "#FF9B6A",
  summary: "Version 1.01 rebuilds the game’s visual feel from the ground up—using every piece of UI and feature feedback to make the experience clearer, sharper and more satisfying.",
};

export const SCENE61_MYNE_ZAPPER_DEVLOG_CONFIG = {
  canvas: {width: 1080, height: 1080, fps: 60},
  date: "SEP 27, 2026",
  game: "MYNE ZAPPER",
  title: "BOSSES HIT\nTHE MINE.",
  artwork: "https://res.cloudinary.com/donjla0xz/image/upload/v1789698061/studio/tqwe0azeivd9n84v0iqe.png",
  accent: "#81D7FF",
  summary: "Mobile drones now appear every third sector to disrupt your run, while stronger end-of-area mini-bosses raise the stakes as you push deeper into the mine.",
};

export const SCENE61_HUNGRY_SHARK_DEVLOG_CONFIG = {
  canvas: {width: 1080, height: 1080, fps: 60},
  date: "SEP 27, 2026",
  game: "Hungry Shark Marine Apex",
  title: "A NEW APEX\nUPDATE IS\nON THE WAY.",
  artwork: "https://res.cloudinary.com/donjla0xz/image/upload/v1788628264/studio/lj0durzdvwgsp6evru3k.webp",
  accent: "#65D8FF",
  summary: "A new Hungry Shark Marine Apex update lands on Google Play next week, bringing fresh gameplay mechanics and more content to the ocean.",
};

export const SCENE61_LINEGUARD_DEVLOG_CONFIG = {
  canvas: {width: 1080, height: 1080, fps: 60},
  date: "SEP 27, 2026",
  game: "Lineguard",
  title: "THE NINJA HAS\nA SECOND JOB:\nBRAWL.",
  artwork: "https://res.cloudinary.com/donjla0xz/image/upload/v1790456137/devlogs/i8hpt9fcarrsobrabruj.png",
  accent: "#FFCC6C",
  summary: "Lineguard’s new Brawl mode puts the pen down and sends the ninja into waves of enemies—giving the game a whole new way to play.",
};

export const SCENE61_LUMEN_VAULT_DEVLOG_CONFIG = {
  canvas: {width: 1080, height: 1080, fps: 60},
  date: "SEP 27, 2026",
  game: "Lumen Vault",
  title: "BUILT TO\nMASTER.",
  artwork: "https://res.cloudinary.com/donjla0xz/image/upload/v1788240254/studio/pees1v8j2hlmbjskbbot.webp",
  accent: "#B8A2FF",
  summary: "Version 0.4.1 adds a fuller enhancement pack, a larger Visual Lab and a new interactive controls tutorial—making Lumen Vault clearer to learn and richer to master.",
};

export const SCENE63_TILTRICS_DEVLOG_CONFIG = {
  canvas: {width: 1080, height: 1080, fps: 60},
  date: "SEP 28, 2026",
  game: "Tiltrics",
  title: "COLOR BOXES\nUNLEASH THE\nTHREAT.",
  artwork: "https://res.cloudinary.com/donjla0xz/image/upload/v1790606066/devlogs/zfq8gi6nmu8tmklns8tg.png",
  accent: "#8CE7FF",
  summary: "Paranoia Level 4 brings back the Color Collector mechanic—this time with a dangerous new twist. The familiar boxes are no longer safe to approach.",
};

export const SCENE63_ZERO_G_DEVLOG_CONFIG = {
  canvas: {width: 1080, height: 1080, fps: 60},
  date: "SEP 28, 2026",
  game: "Zero-G Space MMO",
  title: "HQ PRICES\nNOW MOVE WITH\nTHE MARKET.",
  artwork: "https://res.cloudinary.com/donjla0xz/image/upload/v1790602593/devlogs/wnnehzxq1ofgwq0zyfb6.webp",
  accent: "#76DCFF",
  summary: "Alpha 5.5.1 and 5.5.2 make HQ prices respond to stock levels. The more supply an HQ holds, the more its market behavior changes.",
};

export const SCENE63_NOCTIVORE_DEVLOG_CONFIG = {
  canvas: {width: 1080, height: 1080, fps: 60},
  date: "SEP 28, 2026",
  game: "Noctivore",
  title: "THREE PLAYERS\nWON THE FIGHT.\nTHEN LEFT.",
  artwork: "https://res.cloudinary.com/donjla0xz/image/upload/v1790588060/devlogs/ptrjte4z0a7wn13xtut7.webp",
  accent: "#F29BFF",
  summary: "Noctivore’s first devlog follows an early playtest: three strangers fought, won and moved on—revealing where the browser RPG needs to deepen its pull.",
};

export const SCENE66_GROKY_DEVLOG_CONFIG = {
  canvas: {width: 1080, height: 1080, fps: 60},
  date: "SEP 30, 2026",
  game: "groky",
  title: "LEVEL 74\nIS FIXED.",
  artwork: "https://res.cloudinary.com/donjla0xz/image/upload/v1787809273/studio/qwpqltmtfmd5scvh0dnx.jpg",
  accent: "#A8EA70",
  summary: "A missing ghost trigger stopped Level 74 from working as intended. The fix is now submitted to both the Play Store and App Store.",
};

export const SCENE66_TACKLE_POINT_DEVLOG_CONFIG = {
  canvas: {width: 1080, height: 1080, fps: 60},
  date: "SEP 30, 2026",
  game: "Tackle Point",
  title: "FROM SMALL\nBEGINNINGS.",
  artwork: "https://res.cloudinary.com/donjla0xz/image/upload/v1790720165/devlogs/nllpmivgxcdjpihasuot.png",
  accent: "#68D9FF",
  summary: "Tackle Point is now in App Store Review. Its developer looks back on the journey so far while the next chapter waits for approval.",
};

export const SCENE66_SYLORIA_DEVLOG_CONFIG = {
  canvas: {width: 1080, height: 1080, fps: 60},
  date: "SEP 30, 2026",
  game: "Syloria",
  title: "THE FIRST\nBETA IS LIVE.",
  artwork: "https://res.cloudinary.com/donjla0xz/image/upload/v1789677130/studio/s3mqjxsbxwbdjz0ag5uh.png",
  accent: "#B798FF",
  summary: "After months of building, Syloria is inviting its first fantasy and RPG players in—asking them to test, give feedback and help shape what comes next.",
};

export const SCENE66_SCRATCH_MANCER_DEVLOG_CONFIG = {
  canvas: {width: 1080, height: 1080, fps: 60},
  date: "SEP 30, 2026",
  game: "Scratch Mancer",
  title: "BUILT FROM\nPLAYER FEEDBACK.",
  artwork: "https://res.cloudinary.com/donjla0xz/image/upload/v1790067966/studio/tspldkfk8wjj55f7tdlw.png",
  accent: "#F1B44C",
  summary: "Version 1.4.2 focuses on accessibility—from VoiceOver fixes to per-symbol sounds—directly responding to the feedback players shared.",
};

export const SCENE66_ACED_DEVLOG_CONFIG = {
  canvas: {width: 1080, height: 1080, fps: 60},
  date: "SEP 30, 2026",
  game: "Aced",
  title: "TUTORIAL MODE\nIS TAKING TIME.",
  artwork: "https://res.cloudinary.com/donjla0xz/image/upload/v1790707248/devlogs/hyanxirv4uga96umgyox.webp",
  accent: "#FF7566",
  summary: "Aced’s tutorial mode needs a few more days. The work continues, with the game’s poker cinematics still on the way.",
};

export const SCENE69_FIND_MY_CAR_DEVLOG_CONFIG = {
  canvas: {width: 1080, height: 1080, fps: 60},
  date: "OCT 1, 2026",
  game: "Find My Car",
  title: "THE LOT\nCOMES ALIVE\nAT NIGHT.",
  artwork: "https://res.cloudinary.com/donjla0xz/image/upload/v1790697760/studio/yww4kcal6kgos1hjht8y.webp",
  accent: "#F1C86A",
  summary: "Version 1.6.0 gives the lot a darker, more believable night-time look, alongside winter details, new asphalt surfaces and bug fixes.",
};

export const SCENE69_PIGEON_PALS_DEVLOG_CONFIG = {
  canvas: {width: 1080, height: 1080, fps: 60},
  date: "OCT 1, 2026",
  game: "Pigeon Pals",
  title: "NOW ON\nANDROID.",
  artwork: "https://res.cloudinary.com/donjla0xz/image/upload/v1790816060/devlogs/iem1ve9xvmkngxmqm65h.webp",
  accent: "#90D7FF",
  summary: "Pigeon Pals has reached Google Play as a closed Android test, bringing its loft, breeding, mail routes, races and market to players’ phones.",
};

export const SCENE69_LUMEN_VAULT_DEVLOG_CONFIG = {
  canvas: {width: 1080, height: 1080, fps: 60},
  date: "OCT 1, 2026",
  game: "Lumen Vault",
  title: "CLEARER OPTICS.\nSMOOTHER\nCONTROLS.",
  artwork: "https://res.cloudinary.com/donjla0xz/image/upload/v1788240254/studio/pees1v8j2hlmbjskbbot.webp",
  accent: "#B8A2FF",
  summary: "Lumen Vault adds clearer optical arrays, component glows, an RGB prism and freer board controls—making its puzzles easier to inspect and more satisfying to solve.",
};

export const SCENE69_BOUNCELINGS_DEVLOG_CONFIG = {
  canvas: {width: 1080, height: 1080, fps: 60},
  date: "OCT 1, 2026",
  game: "Bouncelings",
  title: "BUILT TO KEEP\nTHE JELLIES\nBOUNCING.",
  artwork: "https://res.cloudinary.com/donjla0xz/image/upload/v1790803664/devlogs/srwzg0fxkpkhb1hwx6mg.webp",
  accent: "#FF93D4",
  summary: "Bouncelings grew from a lost Flash-game idea: a chaotic grid of jellies where every jump matters and the last one bouncing wins.",
};

export const SCENE70_LINEGUARD_DEVLOG_CONFIG = {
  canvas: {width: 1080, height: 1080, fps: 60},
  date: "OCT 2, 2026",
  game: "Lineguard",
  title: "DUEL IS\nNOW LIVE.",
  artwork: "https://res.cloudinary.com/donjla0xz/image/upload/v1790947456/devlogs/jetgrzhyxpo3q5rigael.png",
  accent: "#5DE2FF",
  summary: "Lineguard’s new Duel mode puts one ninja against another in a live 1v1—joining Run and Fight as a new way to play on PixelPicked.",
};

export const SCENE70_BOUNCELINGS_DEVLOG_CONFIG = {
  canvas: {width: 1080, height: 1080, fps: 60},
  date: "OCT 2, 2026",
  game: "Bouncelings",
  title: "AIM ONE\nTILE LOWER.",
  artwork: "https://res.cloudinary.com/donjla0xz/image/upload/v1790889967/devlogs/z8adsvhrioh3dzhoqocs.webp",
  accent: "#FF93D4",
  summary: "Bouncelings’ key rule is easy to miss: aim one tile lower than you think. It turns every jump into a deliberate choice, not a bug.",
};

export const SCENE70_DERIVA_COMBAT_DEVLOG_CONFIG = {
  canvas: {width: 1080, height: 1080, fps: 60},
  date: "OCT 2, 2026",
  game: "Deriva Combat",
  title: "TEACHING AI\nTHE CODEBASE.",
  artwork: "https://res.cloudinary.com/donjla0xz/image/upload/v1790881190/devlogs/k8vfu5f2eefwz7opouyu.webp",
  accent: "#D6A5FF",
  summary: "Deriva explores how context, DDD and SOLID principles can give AI-assisted development the architectural guardrails it needs to work in an existing codebase.",
};

export const SCENE72_TILTRICS_DEVLOG_CONFIG = {
  canvas: {width: 1080, height: 1080, fps: 60},
  date: "OCT 3, 2026",
  game: "Tiltrics",
  title: "PLAY WARDEN\nIN CELL SWAP.",
  artwork: "https://res.cloudinary.com/donjla0xz/image/upload/v1791019228/devlogs/npwmhvchg5ad1liaw7tm.png",
  accent: "#8CE7FF",
  summary: "Paranoia’s sixth level puts every cell, switch and floor tile in your hands. Open the right doors, activate all six tiles and keep the prison under control.",
};

export const SCENE72_NOCTIVORE_DEVLOG_CONFIG = {
  canvas: {width: 1080, height: 1080, fps: 60},
  date: "OCT 3, 2026",
  game: "Noctivore",
  title: "THE GAME WAS\nUNDER YOUR THUMB.",
  artwork: "https://res.cloudinary.com/donjla0xz/image/upload/v1791015612/devlogs/ypczmdxz4atixs1rv2fy.webp",
  accent: "#FFB45E",
  summary: "Noctivore reworks its mobile layout so the action stays visible. Hunt at night, gear up, take on rivals, then unwind with a shelf of ten tiny arcade games.",
};

export const SCENE72_MAF_BLOX_DEVLOG_CONFIG = {
  canvas: {width: 1080, height: 1080, fps: 60},
  date: "OCT 3, 2026",
  game: "MAF Blox",
  title: "VERSION 1.8\nIS OUT.",
  artwork: "https://res.cloudinary.com/donjla0xz/image/upload/v1791008017/devlogs/nafjhe9xfvi3w03jjgrg.webp",
  accent: "#FF9969",
  summary: "MAF Blox 1.8 brings localization, audio, achievements and deeper polish to the core game—while laying the groundwork for City Mode in version 1.9.",
};

export const SCENE72_ACED_DEVLOG_CONFIG = {
  canvas: {width: 1080, height: 1080, fps: 60},
  date: "OCT 3, 2026",
  game: "Aced",
  title: "TUTORIAL MODE\nIS LIVE.",
  artwork: "https://res.cloudinary.com/donjla0xz/image/upload/v1791004735/devlogs/s9h6p3wgyiilhy5uqbr5.webp",
  accent: "#82DEB4",
  summary: "Aced is live with a quick tutorial mode. The next focus is strengthening Lify Bot’s vocabulary and building out its API-filtered library.",
};

export const SCENE72_DERIVA_COMBAT_DEVLOG_CONFIG = {
  canvas: {width: 1080, height: 1080, fps: 60},
  date: "OCT 3, 2026",
  game: "Deriva Combat",
  title: "JOIN THE\nDERIVA DISCORD.",
  artwork: "https://res.cloudinary.com/donjla0xz/image/upload/v1790534060/studio/cnqgd6ybendmhpnrij2d.webp",
  accent: "#D6A5FF",
  summary: "Deriva opens its new Discord for player feedback, development discussion and games in progress—giving the community a direct place to help shape the project.",
};

export const SCENE74_BOUNCELINGS_DEVLOG_CONFIG = {
  canvas: {width: 1080, height: 1080, fps: 60}, date: "OCT 4, 2026", game: "Bouncelings",
  title: "HOW TO ACTUALLY\nWIN.", artwork: "https://res.cloudinary.com/donjla0xz/image/upload/v1791125838/devlogs/ytlbapulgvl56ige5ihv.webp", accent: "#FF93D4",
  summary: "Eight decisions matter more than luck in Bouncelings. Start by reading the row above—not your own—and turn every bounce into a plan.",
};

export const SCENE74_VOLT_MAN_DEVLOG_CONFIG = {
  canvas: {width: 1080, height: 1080, fps: 60}, date: "OCT 4, 2026", game: "Volt-Man: Kinetic Warren",
  title: "SMALL DOG.\nEXTREME VOLTAGE.", artwork: "https://res.cloudinary.com/donjla0xz/image/upload/v1791119588/studio/oytoilemvyegka5cmgxf.webp", accent: "#A5F357",
  summary: "Volt-Man: Kinetic Warren is live on PixelPicked with a playable beta. Take the black miniature schnauzer into its neon warren—and help the team test it.",
};

export const SCENE74_GRAZE_DEVLOG_CONFIG = {
  canvas: {width: 1080, height: 1080, fps: 60}, date: "OCT 4, 2026", game: "GRAZE: Edge Rush",
  title: "THE ALIENS\nHAVE ARRIVED.", artwork: "https://res.cloudinary.com/donjla0xz/image/upload/v1785549950/studio/qyg9copao5ivsp9fgpmq.jpg", accent: "#AC8CFF",
  summary: "A new Alien Collection brings hundreds of creatures to earn and keep. Finish in the daily top three to collect a new alien, with rarities from bronze to prismatic.",
};

export const SCENE74_XPPERTIMER_DEVLOG_CONFIG = {
  canvas: {width: 1080, height: 1080, fps: 60}, date: "OCT 4, 2026", game: "XPperTIMER",
  title: "NOW AVAILABLE\nON ANDROID.", artwork: "https://res.cloudinary.com/donjla0xz/image/upload/v1791109674/studio/gw2qutiogzwdlwqk0ysz.webp", accent: "#6DE4FF",
  summary: "XPperTIMER is now available for Android as an APK. Players can grab the latest build through the team’s official Game Jolt page or Discord.",
};

export const SCENE74_FIND_MY_CAR_DEVLOG_CONFIG = {
  canvas: {width: 1080, height: 1080, fps: 60}, date: "OCT 4, 2026", game: "Find My Car",
  title: "DUSK FALLS\nON THE LOT.", artwork: "https://res.cloudinary.com/donjla0xz/image/upload/v1791106980/devlogs/zydw8trzqkixb2meawce.webp", accent: "#FFB66A",
  summary: "Find My Car 1.8 adds a full day-and-night cycle. Every lot now moves from afternoon sun through golden hour and blue dusk into night.",
};

export const SCENE74_SHEEP_BLOCK_DEVLOG_CONFIG = {
  canvas: {width: 1080, height: 1080, fps: 60}, date: "OCT 4, 2026", game: "Sheep Block Puzzle: Rescue",
  title: "A SPOOKY\n25-STAGE EVENT.", artwork: "https://res.cloudinary.com/donjla0xz/image/upload/v1791105310/devlogs/pheinlvxckbauvszxdkb.webp", accent: "#FF9B65",
  summary: "Battle through 25 haunted puzzle stages, each packed with monsters and bosses. Clear the event to unlock the Halloween Knight Skin for future challenges.",
};
