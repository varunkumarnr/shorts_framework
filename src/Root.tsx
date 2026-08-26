import React from "react";
import { CalculateMetadataFunction, Composition } from "remotion";
import { getVideoMetadata } from "@remotion/media-utils";
import { THEME } from "./data/theme";
import {
  SCENE1_CONFIG,
  SCENE2_CONFIG,
  SCENE2B_CONFIG,
  SCENE3_CONFIG,
  SCENE4_CONFIG,
  SCENE5_CONFIG,
  SCENE6_CONFIG,
  SCENE7_CONFIG,
  SCENE8_GAME_TRAILER_CONFIG,
  SCENE9_BISON_CAROUSEL_CONFIG,
  SCENE9_ANGRY_BIRDS_CAROUSEL_CONFIG,
  SCENE10_BISON_VIDEO_CAROUSEL_CONFIG,
  SCENE11_LAUNCH_TOP3_STORY_CONFIG,
  SCENE12_LAST_WEEK_WINNERS_CONFIG,
  InstagramEditorialCarouselProps,
} from "./data/config";
import { Scene1_Reddit } from "./compositions/Scene1_Reddit";
import { Scene2_Gameplay } from "./compositions/Scene2_Gameplay";
import {
  calculateScene2BDuration,
  Scene2B_GameOfWeek,
  Scene2BProps,
} from "./compositions/Scene2B_GameOfWeek";
import { Scene3_Mockup } from "./compositions/Scene3_Mockup";
import { Scene4_Outro } from "./compositions/Scene4_Outro";
import { Scene5_List } from "./compositions/Scene5_List";
import { Scene6_BeforeAfter } from "./compositions/Scene6_BeforeAfter";
import { Scene7_InstagramText } from "./compositions/Scene7_Instagram";
import {
  resolveGameTrailerConfig,
  Scene8_GameTrailer,
  Scene8GameTrailerProps,
} from "./compositions/Scene8_GameTrailer";
import { Scene9_BisonCarousel } from "./compositions/Scene9_BisonCarousel";
import { Scene10_BisonVideoCarousel } from "./compositions/Scene10_BisonVideoCarousel";
import {
  Scene11_LaunchTop3Story,
  Scene11LaunchProps,
} from "./compositions/Scene11_LaunchTop3Story";
import { Scene12_LastWeekWinners } from "./compositions/Scene12_LastWeekWinners";

const calculateTrailerMetadata: CalculateMetadataFunction<
  Scene8GameTrailerProps
> = async ({ props }) => {
  const cfg = resolveGameTrailerConfig(props);
  const metadata = await getVideoMetadata(cfg.trailer.src);
  const trailerFrames = Math.ceil(
    metadata.durationInSeconds * cfg.canvas.fps,
  );

  return {
    durationInFrames:
      trailerFrames + (cfg.outro.enabled ? cfg.outro.duration : 0),
    fps: cfg.canvas.fps,
    width: cfg.canvas.width,
    height: cfg.canvas.height,
  };
};

const calculateTop3Metadata: CalculateMetadataFunction<Scene2BProps> = ({
  props,
}) => ({
  durationInFrames: calculateScene2BDuration(props),
  fps: THEME.canvas.fps,
  width: THEME.canvas.width,
  height: THEME.canvas.height,
});

const calculateEditorialCarouselMetadata: CalculateMetadataFunction<
  InstagramEditorialCarouselProps
> = ({ props }) => {
  const contentSlideCount =
    props.contentSlides?.length ??
    SCENE9_BISON_CAROUSEL_CONFIG.contentSlides.length;
  const slideDuration =
    props.slideDuration ?? SCENE9_BISON_CAROUSEL_CONFIG.slideDuration;

  return {
    durationInFrames: (contentSlideCount + 2) * slideDuration,
    fps: SCENE9_BISON_CAROUSEL_CONFIG.canvas.fps,
    width: SCENE9_BISON_CAROUSEL_CONFIG.canvas.width,
    height: SCENE9_BISON_CAROUSEL_CONFIG.canvas.height,
  };
};

const CURRENT_WEEK_LAUNCHES_API =
  "https://api.pixelpicked.com/api/launches/week/current";

interface CurrentWeekLaunchApiItem {
  endDate: string;
  gameBanner?: string;
  gameLogo?: string;
  gameGenre?: string[];
  gameId: string;
  gameName: string;
  gameSlug: string;
  launchCampaignType?: string;
  launchDate: string;
  tagline?: string;
  voteCount: number;
}

const formatCampaignRange = (startIso: string, endIso: string) => {
  const start = new Date(startIso);
  const exclusiveEnd = new Date(endIso);
  const end = new Date(exclusiveEnd.getTime() - 24 * 60 * 60 * 1000);
  const month = new Intl.DateTimeFormat("en-US", {
    month: "short",
    timeZone: "UTC",
  })
    .format(start)
    .toUpperCase();
  const sameMonth =
    start.getUTCMonth() === end.getUTCMonth() &&
    start.getUTCFullYear() === end.getUTCFullYear();

  if (sameMonth) {
    return `${month} ${start.getUTCDate()}–${end.getUTCDate()}, ${end.getUTCFullYear()}`;
  }

  const endMonth = new Intl.DateTimeFormat("en-US", {
    month: "short",
    timeZone: "UTC",
  })
    .format(end)
    .toUpperCase();
  return `${month} ${start.getUTCDate()}–${endMonth} ${end.getUTCDate()}, ${end.getUTCFullYear()}`;
};

const calculateCurrentLaunchMetadata: CalculateMetadataFunction<
  Scene11LaunchProps
> = async ({ props }) => {
  const fallback = {
    durationInFrames: SCENE11_LAUNCH_TOP3_STORY_CONFIG.duration,
    fps: SCENE11_LAUNCH_TOP3_STORY_CONFIG.canvas.fps,
    width: SCENE11_LAUNCH_TOP3_STORY_CONFIG.canvas.width,
    height: SCENE11_LAUNCH_TOP3_STORY_CONFIG.canvas.height,
  };

  if (props.products?.length) {
    return { ...fallback, props };
  }

  try {
    const response = await fetch(CURRENT_WEEK_LAUNCHES_API);
    if (!response.ok) {
      throw new Error(`Current launches API returned ${response.status}`);
    }

    const launches = (await response.json()) as CurrentWeekLaunchApiItem[];
    if (!Array.isArray(launches) || launches.length < 3) {
      throw new Error("Current launches API returned fewer than three games");
    }

    const ranked = launches
      .map((launch, apiIndex) => ({ launch, apiIndex }))
      .sort(
        (a, b) =>
          b.launch.voteCount - a.launch.voteCount || a.apiIndex - b.apiIndex,
      );
    const topThree = ranked.slice(0, 3).map(({ launch }, index) => ({
      rank: index + 1,
      name: launch.gameName,
      votes: launch.voteCount,
      artwork: launch.gameBanner || launch.gameLogo || "",
    }));
    const totalVotes = launches.reduce(
      (total, launch) => total + launch.voteCount,
      0,
    );
    const launchStart = new Date(ranked[0].launch.launchDate);
    const calculatedDay = Math.floor(
      (Date.now() - launchStart.getTime()) / (24 * 60 * 60 * 1000),
    ) + 1;
    const day = Math.max(1, Math.min(7, calculatedDay));

    return {
      ...fallback,
      props: {
        products: topThree,
        campaign: {
          date: formatCampaignRange(
            ranked[0].launch.launchDate,
            ranked[0].launch.endDate,
          ),
          dayLabel: `DAY ${day}`,
          totalVotes: `${totalVotes} votes`,
          cta: SCENE11_LAUNCH_TOP3_STORY_CONFIG.campaign.cta,
          link: SCENE11_LAUNCH_TOP3_STORY_CONFIG.campaign.link,
        },
      },
    };
  } catch (error) {
    console.warn("Using configured current-launch fallback:", error);
    return fallback;
  }
};

export const Root: React.FC = () => {
  const { width, height, fps } = THEME.canvas;
  return (
    <>
      <Composition
        id="PixelPickedTrailer"
        component={Scene8_GameTrailer}
        calculateMetadata={calculateTrailerMetadata}
        width={SCENE8_GAME_TRAILER_CONFIG.canvas.width}
        height={SCENE8_GAME_TRAILER_CONFIG.canvas.height}
      />
      <Composition
        id="Scene1-Reddit"
        component={Scene1_Reddit}
        durationInFrames={SCENE1_CONFIG.duration}
        fps={fps}
        width={width}
        height={height}
      />
      <Composition
        id="Scene2-Gameplay"
        component={Scene2_Gameplay}
        durationInFrames={SCENE2_CONFIG.duration}
        fps={fps}
        width={width}
        height={height}
      />
      <Composition
        id="Scene2B-GameOfWeek"
        component={Scene2B_GameOfWeek}
        calculateMetadata={calculateTop3Metadata}
        width={width}
        height={height}
      />
      <Composition
        id="Scene3-Mockup"
        component={Scene3_Mockup}
        durationInFrames={SCENE3_CONFIG.duration}
        fps={fps}
        width={width}
        height={height}
      />
      <Composition
        id="Scene4-Outro"
        component={Scene4_Outro}
        durationInFrames={SCENE4_CONFIG.duration}
        fps={fps}
        width={width}
        height={height}
      />
      <Composition
        id="Scene5-List"
        component={Scene5_List}
        durationInFrames={SCENE5_CONFIG.duration}
        fps={fps}
        width={width}
        height={height}
      />
      <Composition
        id="Scene6-BeforeAfter"
        component={Scene6_BeforeAfter}
        durationInFrames={SCENE6_CONFIG.duration}
        fps={fps}
        width={width}
        height={height}
      />
      <Composition
        id="Scene7-InstagramText"
        component={Scene7_InstagramText}
        durationInFrames={SCENE7_CONFIG.duration}
        fps={fps}
        width={width}
        height={height}
      />
      <Composition
        id="BisonAttack-InstagramCarousel"
        component={Scene9_BisonCarousel}
        calculateMetadata={calculateEditorialCarouselMetadata}
        width={SCENE9_BISON_CAROUSEL_CONFIG.canvas.width}
        height={SCENE9_BISON_CAROUSEL_CONFIG.canvas.height}
      />
      <Composition
        id="AngryBirds-InstagramCarousel"
        component={Scene9_BisonCarousel}
        calculateMetadata={calculateEditorialCarouselMetadata}
        defaultProps={SCENE9_ANGRY_BIRDS_CAROUSEL_CONFIG}
        width={SCENE9_BISON_CAROUSEL_CONFIG.canvas.width}
        height={SCENE9_BISON_CAROUSEL_CONFIG.canvas.height}
      />
      <Composition
        id="BisonAttack-VideoCarousel"
        component={Scene10_BisonVideoCarousel}
        durationInFrames={SCENE10_BISON_VIDEO_CAROUSEL_CONFIG.duration}
        fps={SCENE10_BISON_VIDEO_CAROUSEL_CONFIG.canvas.fps}
        width={SCENE10_BISON_VIDEO_CAROUSEL_CONFIG.canvas.width}
        height={SCENE10_BISON_VIDEO_CAROUSEL_CONFIG.canvas.height}
      />
      <Composition
        id="PixelPicked-Top3-Story"
        component={Scene11_LaunchTop3Story}
        calculateMetadata={calculateCurrentLaunchMetadata}
        width={SCENE11_LAUNCH_TOP3_STORY_CONFIG.canvas.width}
        height={SCENE11_LAUNCH_TOP3_STORY_CONFIG.canvas.height}
      />
      <Composition
        id="PixelPicked-LastWeek-Winners"
        component={Scene12_LastWeekWinners}
        durationInFrames={SCENE12_LAST_WEEK_WINNERS_CONFIG.duration}
        fps={SCENE12_LAST_WEEK_WINNERS_CONFIG.canvas.fps}
        width={SCENE12_LAST_WEEK_WINNERS_CONFIG.canvas.width}
        height={SCENE12_LAST_WEEK_WINNERS_CONFIG.canvas.height}
      />
    </>
  );
};
