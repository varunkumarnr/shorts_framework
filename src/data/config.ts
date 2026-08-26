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
    videoSrc: staticFile("gris.mp4"), // change this to your own hook clip
    duration: 180,
    lines: [
      { text: "Top 3", color: "#FF3DAA" },
      { text: "Beautiful Puzzle", color: "#FFFFFF" },
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
      name: "Monument Valley 3",
      genre: "Puzzle · Adventure",
      platform: "Android · iOS",
      downloads: "500K+",
      tagline:
        "Navigate impossible architecture and guide Noor across a rising sea toward a new home.",
      videoSrc: staticFile("MomentumValley.mp4"),
      duration: 360,
      screenshot: {
        src: staticFile("momentumvalley.png"),
        label: "PixelPicked",
      },
    },
    {
      name: "The Gardens Between",
      genre: "Puzzle · Adventure",
      platform: "Android · iOS",
      downloads: "50K+",
      tagline:
        "Manipulate time across dreamlike islands in a bittersweet story of memory and friendship.",
      videoSrc: staticFile("gardensbetween.mp4"),
      duration: 360,
      screenshot: {
        src: staticFile("gardensbetween.png"),
        label: "PixelPicked",
      },
    },
    {
      name: "GRIS",
      genre: "Platformer · Puzzle",
      platform: "Android · iOS",
      downloads: "100K+",
      tagline:
        "Guide Gris through a serene watercolor world of grief, light puzzles, and graceful platforming.",
      videoSrc: staticFile("gris.mp4"),
      duration: 360,
      screenshot: {
        src: staticFile("gris.png"),
        label: "PixelPicked",
      },
    },
  ],

  outro: {
    duration: 180,
    headline: "Find your next hidden gem.",
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
  bodySize?: number;
  panelBackground?: string;
  textColor?: string;
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
  launchWeekId: "2026-W34",
  copy: {
    topRight: "FINAL RESULTS",
    date: "AUG 16–22, 2026",
    eyebrow: "LAST WEEK ON PIXELPICKED",
    headlineTop: "LAST WEEK'S",
    headlineBottom: "WINNERS",
    subheadline: "The games you voted to the top.",
    totalVotes: "94 podium votes",
    cta: "PLAY THE WINNER",
    link: "pixelpicked.com/game/vKNbqVILTm9/tiltrics",
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
      launchShortId: "5ryCgT6vNp5",
      gameId: "vKNbqVILTm9",
      gameSlug: "tiltrics",
      gameName: "Tiltrics",
      gameGenre: ["Arcade", "Casual", "Indie", "Puzzle", "Strategy"],
      tagline:
        'TILT. DODGE. FIRE. Tiltrics 1.2 now has a new "Bullets" chapter.',
      voteCount: 34,
      finalRank: 1,
      artwork: staticFile("tiltrics-winner.jpg"),
    },
    {
      launchShortId: "3kVzeFaicms",
      gameId: "100Wxnx9TtE",
      gameSlug: "bison-attack",
      gameName: "Bison Attack!",
      gameGenre: ["Casual", "Arcade", "Party"],
      tagline:
        "A fast online party game where tourists photograph a wild bison.",
      voteCount: 31,
      finalRank: 2,
      artwork: staticFile("bison-attack-runner-up.jpg"),
    },
    {
      launchShortId: "23HAGOtRRVR",
      gameId: "4VV4eDCRbJ2",
      gameSlug: "wickgrid-daily-logic-puzzle",
      gameName: "Wickgrid: Daily Logic Puzzle",
      gameGenre: ["Puzzle"],
      tagline:
        "Light the grid. One connected chain. No guessing. Pure deduction.",
      voteCount: 29,
      finalRank: 3,
      artwork: staticFile("wickgrid-third-place.jpg"),
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
