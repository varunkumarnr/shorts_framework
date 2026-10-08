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
  SCENE9_STARDEW_VALLEY_CAROUSEL_CONFIG,
  SCENE9_INDIE_SUCCESS_CAROUSEL_CONFIG,
  SCENE9_CROSSY_ROAD_CAROUSEL_CONFIG,
  SCENE9_FRUIT_NINJA_CAROUSEL_CONFIG,
  SCENE9_SUBWAY_SURFERS_CAROUSEL_CONFIG,
  SCENE9_BEST_GAMES_PART2_CAROUSEL_CONFIG,
  SCENE10_BISON_VIDEO_CAROUSEL_CONFIG,
  SCENE11_LAUNCH_TOP3_STORY_CONFIG,
  SCENE12_LAST_WEEK_WINNERS_CONFIG,
  SCENE13_CPI_RISE_CONFIG,
  SCENE14_CPI_COUNTER_CONFIG,
  SCENE15_TYPEWRITER_QUOTE_CONFIG,
  SCENE16_SPONSORED_STOREFRONT_CONFIG,
  SCENE17_CPI_STATEMENT_CONFIG,
  SCENE18_REENVISIONING_FLIP_CONFIG,
  SCENE19_ANALYTICS_DASHBOARD_CONFIG,
  SCENE20_WAITLIST_GROWTH_CONFIG,
  SCENE21_REENVISIONING_SOCIAL_CONFIG,
  SCENE22_TAPROACH_CHALLENGE_CONFIG,
  SCENE23_USED_BY_CONFIG,
  SCENE24_LAUNCH_GAME_CLICK_CONFIG,
  SCENE25_DISCOVERY_EXPLAINER_CONFIG,
  SCENE26_ANALYTICS_EXPLAINER_CONFIG,
  SCENE27_DEVLOGS_EXPLAINER_CONFIG,
  SCENE28_RISK_SAMENESS_CONFIG,
  SCENE29_BUT_CONFIG,
  SCENE30_MAKE_GAMES_CONFIG,
  SCENE31_BUILT_PIXELPICKED_CONFIG,
  SCENE32_DISCOVERY_CHAPTER_CONFIG,
  SCENE33_BEST_GAMES_BY_YEAR_CONFIG,
  SCENE34_HIGHEST_BUDGET_GAMES_CONFIG,
  SCENE35_INDIE_SUCCESS_STORIES_CONFIG,
  SCENE36_BEST_GAMES_BY_YEAR_PART2_CONFIG,
  SCENE37_COSTLIEST_COSMETICS_CONFIG,
  SCENE38_HIGHEST_GROSSING_GAMES_CONFIG,
  SCENE39_FUNNY_GAMING_RANKING_CONFIG,
  SCENE40_ICONIC_ESPORTS_RANKING_CONFIG,
  SCENE41_NOSTALGIC_CHILDHOOD_GAMES_CONFIG,
  SCENE42_NOSTALGIC_MOBILE_GAMES_CONFIG,
  SCENE43_FUNNIEST_OHNEPIXEL_CONFIG,
  SCENE44_SHROUD_BEST_MOMENTS_CONFIG,
  SCENE45_TENZ_BEST_MOMENTS_CONFIG,
  SCENE46_SPEED_FUNNIEST_MOMENTS_CONFIG,
  SCENE47_OHNE_BEST_CASE_OPENINGS_CONFIG,
  SCENE48_TARIK_BEST_MOMENTS_CONFIG,
  SCENE49_CRAZIEST_CASE_REACTIONS_CONFIG,
  SCENE50_VALORANT_CRAZIEST_PLAYS_CONFIG,
  SCENE51_COUNTER_STRIKE_CRAZIEST_PLAYS_CONFIG,
  SCENE52_FUNNIEST_OHNEPIXEL_PART2_CONFIG,
  SCENE54_BEST_ROBLOX_GAMES_CONFIG,
  SCENE53_INDIVIDUAL_LAUNCH_GAME_CONFIG,
  SCENE55_GUESS_THE_GAME_CONFIG,
  SCENE56_GUESS_THE_GAME_DAY2_CONFIG,
  SCENE57_GUESS_THE_GAME_DAY3_CONFIG,
  SCENE59_GUESS_THE_GAME_DAY4_CONFIG,
  SCENE60_GUESS_THE_GAME_DAY5_CONFIG,
  SCENE62_GUESS_THE_GAME_DAY6_CONFIG,
  SCENE64_GUESS_THE_GAME_DAY7_CONFIG,
  SCENE65_GUESS_THE_GAME_DAY8_CONFIG,
  SCENE67_GUESS_THE_GAME_DAY9_CONFIG,
  SCENE68_GUESS_THE_GAME_DAY10_CONFIG,
  SCENE71_GUESS_THE_GAME_DAY11_CONFIG,
  SCENE73_GUESS_THE_GAME_DAY12_CONFIG,
  SCENE75_GUESS_THE_GAME_DAY13_CONFIG,
  SCENE77_GUESS_THE_GAME_DAY14_CONFIG,
  SCENE78_GUESS_THE_GAME_DAY15_CONFIG,
  SCENE58_TILTRICS_DEVLOG_CONFIG,
  SCENE58_PASTEL_LINK_DEVLOG_CONFIG,
  SCENE58_FANDOM_FRENZY_DEVLOG_CONFIG,
  SCENE58_GRIDWITS_DEVLOG_CONFIG,
  SCENE58_MAF_BLOX_DEVLOG_CONFIG,
  SCENE61_IDLE_BLACK_HOLE_DEVLOG_CONFIG,
  SCENE61_MYNE_ZAPPER_DEVLOG_CONFIG,
  SCENE61_HUNGRY_SHARK_DEVLOG_CONFIG,
  SCENE61_LINEGUARD_DEVLOG_CONFIG,
  SCENE61_LUMEN_VAULT_DEVLOG_CONFIG,
  SCENE63_TILTRICS_DEVLOG_CONFIG,
  SCENE63_ZERO_G_DEVLOG_CONFIG,
  SCENE63_NOCTIVORE_DEVLOG_CONFIG,
  SCENE66_GROKY_DEVLOG_CONFIG,
  SCENE66_TACKLE_POINT_DEVLOG_CONFIG,
  SCENE66_SYLORIA_DEVLOG_CONFIG,
  SCENE66_SCRATCH_MANCER_DEVLOG_CONFIG,
  SCENE66_ACED_DEVLOG_CONFIG,
  SCENE69_FIND_MY_CAR_DEVLOG_CONFIG,
  SCENE69_PIGEON_PALS_DEVLOG_CONFIG,
  SCENE69_LUMEN_VAULT_DEVLOG_CONFIG,
  SCENE69_BOUNCELINGS_DEVLOG_CONFIG,
  SCENE70_LINEGUARD_DEVLOG_CONFIG,
  SCENE70_BOUNCELINGS_DEVLOG_CONFIG,
  SCENE70_DERIVA_COMBAT_DEVLOG_CONFIG,
  SCENE72_TILTRICS_DEVLOG_CONFIG,
  SCENE72_NOCTIVORE_DEVLOG_CONFIG,
  SCENE72_MAF_BLOX_DEVLOG_CONFIG,
  SCENE72_ACED_DEVLOG_CONFIG,
  SCENE72_DERIVA_COMBAT_DEVLOG_CONFIG,
  SCENE74_BOUNCELINGS_DEVLOG_CONFIG,
  SCENE74_VOLT_MAN_DEVLOG_CONFIG,
  SCENE74_GRAZE_DEVLOG_CONFIG,
  SCENE74_XPPERTIMER_DEVLOG_CONFIG,
  SCENE74_FIND_MY_CAR_DEVLOG_CONFIG,
  SCENE74_SHEEP_BLOCK_DEVLOG_CONFIG,
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
import { Scene58_DevlogSummary, DevlogSummaryProps } from "./compositions/Scene58_DevlogSummary";
import { Scene10_BisonVideoCarousel } from "./compositions/Scene10_BisonVideoCarousel";
import {
  Scene11_LaunchTop3Story,
  Scene11LaunchProps,
} from "./compositions/Scene11_LaunchTop3Story";
import { Scene12_LastWeekWinners } from "./compositions/Scene12_LastWeekWinners";
import { Scene13_CpiRise } from "./compositions/Scene13_CpiRise";
import { Scene14_CpiCounter } from "./compositions/Scene14_CpiCounter";
import { Scene15_TypewriterQuote } from "./compositions/Scene15_TypewriterQuote";
import { Scene16_SponsoredStorefront } from "./compositions/Scene16_SponsoredStorefront";
import { Scene17_CpiStatement } from "./compositions/Scene17_CpiStatement";
import { Scene18_ReenvisioningFlip } from "./compositions/Scene18_ReenvisioningFlip";
import { Scene19_AnalyticsDashboard } from "./compositions/Scene19_AnalyticsDashboard";
import { Scene20_WaitlistGrowth } from "./compositions/Scene20_WaitlistGrowth";
import { Scene21_ReenvisioningSocial } from "./compositions/Scene21_ReenvisioningSocial";
import { Scene22_TaproachChallenge } from "./compositions/Scene22_TaproachChallenge";
import { Scene23_UsedBy } from "./compositions/Scene23_UsedBy";
import { Scene24_LaunchGameClick } from "./compositions/Scene24_LaunchGameClick";
import { Scene25_DiscoveryExplainer } from "./compositions/Scene25_DiscoveryExplainer";
import { Scene26_AnalyticsExplainer } from "./compositions/Scene26_AnalyticsExplainer";
import { Scene27_DevlogsExplainer } from "./compositions/Scene27_DevlogsExplainer";
import { Scene28_RiskSameness } from "./compositions/Scene28_RiskSameness";
import { Scene29_But } from "./compositions/Scene29_But";
import { Scene30_MakeGames } from "./compositions/Scene30_MakeGames";
import { Scene31_BuiltPixelPicked } from "./compositions/Scene31_BuiltPixelPicked";
import { Scene32_DiscoveryChapter } from "./compositions/Scene32_DiscoveryChapter";
import { Scene33_BestGamesByYear } from "./compositions/Scene33_BestGamesByYear";
import { Scene34_HighestBudgetGames } from "./compositions/Scene34_HighestBudgetGames";
import { Scene35_IndieSuccessStories } from "./compositions/Scene35_IndieSuccessStories";
import { Scene37_CostliestCosmetics } from "./compositions/Scene37_CostliestCosmetics";
import { Scene38_HighestGrossingGames } from "./compositions/Scene38_HighestGrossingGames";
import { Scene39_RankingReel } from "./compositions/Scene39_RankingReel";
import { Scene53_IndividualLaunchGame } from "./compositions/Scene53_IndividualLaunchGame";
import {Scene55_GuessTheGame} from "./compositions/Scene55_GuessTheGame";
import {Scene76_GuessTheOst} from "./compositions/Scene76_GuessTheOst";
import {Scene77_GuessTheSound} from "./compositions/Scene77_GuessTheSound";

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

const calculateTodayDevlogSummaryMetadata: CalculateMetadataFunction<
  DevlogSummaryProps
> = ({ props }) => ({
  durationInFrames: 1,
  fps: 60,
  width: 1080,
  height: 1080,
});

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
        id="StardewValley-InstagramCarousel"
        component={Scene9_BisonCarousel}
        calculateMetadata={calculateEditorialCarouselMetadata}
        defaultProps={SCENE9_STARDEW_VALLEY_CAROUSEL_CONFIG}
        width={SCENE9_BISON_CAROUSEL_CONFIG.canvas.width}
        height={SCENE9_BISON_CAROUSEL_CONFIG.canvas.height}
      />
      <Composition
        id="IndieSuccessStories-InstagramCarousel"
        component={Scene9_BisonCarousel}
        calculateMetadata={calculateEditorialCarouselMetadata}
        defaultProps={SCENE9_INDIE_SUCCESS_CAROUSEL_CONFIG}
        width={SCENE9_BISON_CAROUSEL_CONFIG.canvas.width}
        height={SCENE9_BISON_CAROUSEL_CONFIG.canvas.height}
      />
      <Composition
        id="CrossyRoad-InstagramCarousel"
        component={Scene9_BisonCarousel}
        calculateMetadata={calculateEditorialCarouselMetadata}
        defaultProps={SCENE9_CROSSY_ROAD_CAROUSEL_CONFIG}
        width={SCENE9_BISON_CAROUSEL_CONFIG.canvas.width}
        height={SCENE9_BISON_CAROUSEL_CONFIG.canvas.height}
      />
      <Composition
        id="FruitNinja-InstagramCarousel"
        component={Scene9_BisonCarousel}
        calculateMetadata={calculateEditorialCarouselMetadata}
        defaultProps={SCENE9_FRUIT_NINJA_CAROUSEL_CONFIG}
        width={SCENE9_BISON_CAROUSEL_CONFIG.canvas.width}
        height={SCENE9_BISON_CAROUSEL_CONFIG.canvas.height}
      />
      <Composition
        id="SubwaySurfers-InstagramCarousel"
        component={Scene9_BisonCarousel}
        calculateMetadata={calculateEditorialCarouselMetadata}
        defaultProps={SCENE9_SUBWAY_SURFERS_CAROUSEL_CONFIG}
        width={SCENE9_BISON_CAROUSEL_CONFIG.canvas.width}
        height={SCENE9_BISON_CAROUSEL_CONFIG.canvas.height}
      />
      <Composition
        id="BestGamesPart2-InstagramCarousel"
        component={Scene9_BisonCarousel}
        calculateMetadata={calculateEditorialCarouselMetadata}
        defaultProps={SCENE9_BEST_GAMES_PART2_CAROUSEL_CONFIG}
        width={SCENE9_BISON_CAROUSEL_CONFIG.canvas.width}
        height={SCENE9_BISON_CAROUSEL_CONFIG.canvas.height}
      />
      <Composition id="Devlog-Tiltrics-Sep26" component={Scene58_DevlogSummary} calculateMetadata={calculateTodayDevlogSummaryMetadata} defaultProps={SCENE58_TILTRICS_DEVLOG_CONFIG} width={1080} height={1080} />
      <Composition id="Devlog-PastelLink-Sep26" component={Scene58_DevlogSummary} calculateMetadata={calculateTodayDevlogSummaryMetadata} defaultProps={SCENE58_PASTEL_LINK_DEVLOG_CONFIG} width={1080} height={1080} />
      <Composition id="Devlog-FandomFrenzy-Sep26" component={Scene58_DevlogSummary} calculateMetadata={calculateTodayDevlogSummaryMetadata} defaultProps={SCENE58_FANDOM_FRENZY_DEVLOG_CONFIG} width={1080} height={1080} />
      <Composition id="Devlog-Gridwits-Sep26" component={Scene58_DevlogSummary} calculateMetadata={calculateTodayDevlogSummaryMetadata} defaultProps={SCENE58_GRIDWITS_DEVLOG_CONFIG} width={1080} height={1080} />
      <Composition id="Devlog-MAFBlox-Sep26" component={Scene58_DevlogSummary} calculateMetadata={calculateTodayDevlogSummaryMetadata} defaultProps={SCENE58_MAF_BLOX_DEVLOG_CONFIG} width={1080} height={1080} />
      <Composition id="Devlog-IdleBlackHole-Sep27" component={Scene58_DevlogSummary} calculateMetadata={calculateTodayDevlogSummaryMetadata} defaultProps={SCENE61_IDLE_BLACK_HOLE_DEVLOG_CONFIG} width={1080} height={1080} />
      <Composition id="Devlog-MyneZapper-Sep27" component={Scene58_DevlogSummary} calculateMetadata={calculateTodayDevlogSummaryMetadata} defaultProps={SCENE61_MYNE_ZAPPER_DEVLOG_CONFIG} width={1080} height={1080} />
      <Composition id="Devlog-HungryShark-Sep27" component={Scene58_DevlogSummary} calculateMetadata={calculateTodayDevlogSummaryMetadata} defaultProps={SCENE61_HUNGRY_SHARK_DEVLOG_CONFIG} width={1080} height={1080} />
      <Composition id="Devlog-Lineguard-Sep27" component={Scene58_DevlogSummary} calculateMetadata={calculateTodayDevlogSummaryMetadata} defaultProps={SCENE61_LINEGUARD_DEVLOG_CONFIG} width={1080} height={1080} />
      <Composition id="Devlog-LumenVault-Sep27" component={Scene58_DevlogSummary} calculateMetadata={calculateTodayDevlogSummaryMetadata} defaultProps={SCENE61_LUMEN_VAULT_DEVLOG_CONFIG} width={1080} height={1080} />
      <Composition id="Devlog-Tiltrics-Sep28" component={Scene58_DevlogSummary} calculateMetadata={calculateTodayDevlogSummaryMetadata} defaultProps={SCENE63_TILTRICS_DEVLOG_CONFIG} width={1080} height={1080} />
      <Composition id="Devlog-ZeroG-Sep28" component={Scene58_DevlogSummary} calculateMetadata={calculateTodayDevlogSummaryMetadata} defaultProps={SCENE63_ZERO_G_DEVLOG_CONFIG} width={1080} height={1080} />
      <Composition id="Devlog-Noctivore-Sep28" component={Scene58_DevlogSummary} calculateMetadata={calculateTodayDevlogSummaryMetadata} defaultProps={SCENE63_NOCTIVORE_DEVLOG_CONFIG} width={1080} height={1080} />
      <Composition id="Devlog-Groky-Sep30" component={Scene58_DevlogSummary} calculateMetadata={calculateTodayDevlogSummaryMetadata} defaultProps={SCENE66_GROKY_DEVLOG_CONFIG} width={1080} height={1080} />
      <Composition id="Devlog-TacklePoint-Sep30" component={Scene58_DevlogSummary} calculateMetadata={calculateTodayDevlogSummaryMetadata} defaultProps={SCENE66_TACKLE_POINT_DEVLOG_CONFIG} width={1080} height={1080} />
      <Composition id="Devlog-Syloria-Sep30" component={Scene58_DevlogSummary} calculateMetadata={calculateTodayDevlogSummaryMetadata} defaultProps={SCENE66_SYLORIA_DEVLOG_CONFIG} width={1080} height={1080} />
      <Composition id="Devlog-ScratchMancer-Sep30" component={Scene58_DevlogSummary} calculateMetadata={calculateTodayDevlogSummaryMetadata} defaultProps={SCENE66_SCRATCH_MANCER_DEVLOG_CONFIG} width={1080} height={1080} />
      <Composition id="Devlog-Aced-Sep30" component={Scene58_DevlogSummary} calculateMetadata={calculateTodayDevlogSummaryMetadata} defaultProps={SCENE66_ACED_DEVLOG_CONFIG} width={1080} height={1080} />
      <Composition id="Devlog-FindMyCar-Oct1" component={Scene58_DevlogSummary} calculateMetadata={calculateTodayDevlogSummaryMetadata} defaultProps={SCENE69_FIND_MY_CAR_DEVLOG_CONFIG} width={1080} height={1080} />
      <Composition id="Devlog-PigeonPals-Oct1" component={Scene58_DevlogSummary} calculateMetadata={calculateTodayDevlogSummaryMetadata} defaultProps={SCENE69_PIGEON_PALS_DEVLOG_CONFIG} width={1080} height={1080} />
      <Composition id="Devlog-LumenVault-Oct1" component={Scene58_DevlogSummary} calculateMetadata={calculateTodayDevlogSummaryMetadata} defaultProps={SCENE69_LUMEN_VAULT_DEVLOG_CONFIG} width={1080} height={1080} />
      <Composition id="Devlog-Bouncelings-Oct1" component={Scene58_DevlogSummary} calculateMetadata={calculateTodayDevlogSummaryMetadata} defaultProps={SCENE69_BOUNCELINGS_DEVLOG_CONFIG} width={1080} height={1080} />
      <Composition id="Devlog-Lineguard-Oct2" component={Scene58_DevlogSummary} calculateMetadata={calculateTodayDevlogSummaryMetadata} defaultProps={SCENE70_LINEGUARD_DEVLOG_CONFIG} width={1080} height={1080} />
      <Composition id="Devlog-Bouncelings-Oct2" component={Scene58_DevlogSummary} calculateMetadata={calculateTodayDevlogSummaryMetadata} defaultProps={SCENE70_BOUNCELINGS_DEVLOG_CONFIG} width={1080} height={1080} />
      <Composition id="Devlog-DerivaCombat-Oct2" component={Scene58_DevlogSummary} calculateMetadata={calculateTodayDevlogSummaryMetadata} defaultProps={SCENE70_DERIVA_COMBAT_DEVLOG_CONFIG} width={1080} height={1080} />
      <Composition id="Devlog-Tiltrics-Oct3" component={Scene58_DevlogSummary} calculateMetadata={calculateTodayDevlogSummaryMetadata} defaultProps={SCENE72_TILTRICS_DEVLOG_CONFIG} width={1080} height={1080} />
      <Composition id="Devlog-Noctivore-Oct3" component={Scene58_DevlogSummary} calculateMetadata={calculateTodayDevlogSummaryMetadata} defaultProps={SCENE72_NOCTIVORE_DEVLOG_CONFIG} width={1080} height={1080} />
      <Composition id="Devlog-MAFBlox-Oct3" component={Scene58_DevlogSummary} calculateMetadata={calculateTodayDevlogSummaryMetadata} defaultProps={SCENE72_MAF_BLOX_DEVLOG_CONFIG} width={1080} height={1080} />
      <Composition id="Devlog-Aced-Oct3" component={Scene58_DevlogSummary} calculateMetadata={calculateTodayDevlogSummaryMetadata} defaultProps={SCENE72_ACED_DEVLOG_CONFIG} width={1080} height={1080} />
      <Composition id="Devlog-DerivaCombat-Oct3" component={Scene58_DevlogSummary} calculateMetadata={calculateTodayDevlogSummaryMetadata} defaultProps={SCENE72_DERIVA_COMBAT_DEVLOG_CONFIG} width={1080} height={1080} />
      <Composition id="Devlog-Bouncelings-Oct4" component={Scene58_DevlogSummary} calculateMetadata={calculateTodayDevlogSummaryMetadata} defaultProps={SCENE74_BOUNCELINGS_DEVLOG_CONFIG} width={1080} height={1080} />
      <Composition id="Devlog-VoltMan-Oct4" component={Scene58_DevlogSummary} calculateMetadata={calculateTodayDevlogSummaryMetadata} defaultProps={SCENE74_VOLT_MAN_DEVLOG_CONFIG} width={1080} height={1080} />
      <Composition id="Devlog-Graze-Oct4" component={Scene58_DevlogSummary} calculateMetadata={calculateTodayDevlogSummaryMetadata} defaultProps={SCENE74_GRAZE_DEVLOG_CONFIG} width={1080} height={1080} />
      <Composition id="Devlog-XPperTimer-Oct4" component={Scene58_DevlogSummary} calculateMetadata={calculateTodayDevlogSummaryMetadata} defaultProps={SCENE74_XPPERTIMER_DEVLOG_CONFIG} width={1080} height={1080} />
      <Composition id="Devlog-FindMyCar-Oct4" component={Scene58_DevlogSummary} calculateMetadata={calculateTodayDevlogSummaryMetadata} defaultProps={SCENE74_FIND_MY_CAR_DEVLOG_CONFIG} width={1080} height={1080} />
      <Composition id="Devlog-SheepBlock-Oct4" component={Scene58_DevlogSummary} calculateMetadata={calculateTodayDevlogSummaryMetadata} defaultProps={SCENE74_SHEEP_BLOCK_DEVLOG_CONFIG} width={1080} height={1080} />
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
      <Composition
        id="PixelPicked-CPI-Rise"
        component={Scene13_CpiRise}
        durationInFrames={SCENE13_CPI_RISE_CONFIG.duration}
        fps={SCENE13_CPI_RISE_CONFIG.canvas.fps}
        width={SCENE13_CPI_RISE_CONFIG.canvas.width}
        height={SCENE13_CPI_RISE_CONFIG.canvas.height}
      />
      <Composition
        id="PixelPicked-CPI-Counter"
        component={Scene14_CpiCounter}
        durationInFrames={SCENE14_CPI_COUNTER_CONFIG.duration}
        fps={SCENE14_CPI_COUNTER_CONFIG.canvas.fps}
        width={SCENE14_CPI_COUNTER_CONFIG.canvas.width}
        height={SCENE14_CPI_COUNTER_CONFIG.canvas.height}
      />
      <Composition
        id="PixelPicked-Typewriter-Quote"
        component={Scene15_TypewriterQuote}
        durationInFrames={SCENE15_TYPEWRITER_QUOTE_CONFIG.duration}
        fps={SCENE15_TYPEWRITER_QUOTE_CONFIG.canvas.fps}
        width={SCENE15_TYPEWRITER_QUOTE_CONFIG.canvas.width}
        height={SCENE15_TYPEWRITER_QUOTE_CONFIG.canvas.height}
      />
      <Composition
        id="PixelPicked-Sponsored-Storefront"
        component={Scene16_SponsoredStorefront}
        durationInFrames={SCENE16_SPONSORED_STOREFRONT_CONFIG.duration}
        fps={SCENE16_SPONSORED_STOREFRONT_CONFIG.canvas.fps}
        width={SCENE16_SPONSORED_STOREFRONT_CONFIG.canvas.width}
        height={SCENE16_SPONSORED_STOREFRONT_CONFIG.canvas.height}
      />
      <Composition
        id="PixelPicked-CPI-Statement"
        component={Scene17_CpiStatement}
        durationInFrames={SCENE17_CPI_STATEMENT_CONFIG.duration}
        fps={SCENE17_CPI_STATEMENT_CONFIG.canvas.fps}
        width={SCENE17_CPI_STATEMENT_CONFIG.canvas.width}
        height={SCENE17_CPI_STATEMENT_CONFIG.canvas.height}
      />
      <Composition
        id="PixelPicked-Reenvisioning-Flip"
        component={Scene18_ReenvisioningFlip}
        durationInFrames={SCENE18_REENVISIONING_FLIP_CONFIG.duration}
        fps={SCENE18_REENVISIONING_FLIP_CONFIG.canvas.fps}
        width={SCENE18_REENVISIONING_FLIP_CONFIG.canvas.width}
        height={SCENE18_REENVISIONING_FLIP_CONFIG.canvas.height}
      />
      <Composition
        id="PixelPicked-Analytics-Portrait"
        component={Scene19_AnalyticsDashboard}
        durationInFrames={SCENE19_ANALYTICS_DASHBOARD_CONFIG.duration}
        fps={SCENE19_ANALYTICS_DASHBOARD_CONFIG.canvas.fps}
        width={SCENE19_ANALYTICS_DASHBOARD_CONFIG.canvas.width}
        height={SCENE19_ANALYTICS_DASHBOARD_CONFIG.canvas.height}
      />
      <Composition
        id="PixelPicked-Waitlist-Growth"
        component={Scene20_WaitlistGrowth}
        durationInFrames={SCENE20_WAITLIST_GROWTH_CONFIG.duration}
        fps={SCENE20_WAITLIST_GROWTH_CONFIG.canvas.fps}
        width={SCENE20_WAITLIST_GROWTH_CONFIG.canvas.width}
        height={SCENE20_WAITLIST_GROWTH_CONFIG.canvas.height}
      />
      <Composition
        id="PixelPicked-Reenvisioning-Social-Layer"
        component={Scene21_ReenvisioningSocial}
        durationInFrames={SCENE21_REENVISIONING_SOCIAL_CONFIG.duration}
        fps={SCENE21_REENVISIONING_SOCIAL_CONFIG.canvas.fps}
        width={SCENE21_REENVISIONING_SOCIAL_CONFIG.canvas.width}
        height={SCENE21_REENVISIONING_SOCIAL_CONFIG.canvas.height}
      />
      <Composition
        id="PixelPicked-Taproach-Challenge"
        component={Scene22_TaproachChallenge}
        durationInFrames={SCENE22_TAPROACH_CHALLENGE_CONFIG.duration}
        fps={SCENE22_TAPROACH_CHALLENGE_CONFIG.canvas.fps}
        width={SCENE22_TAPROACH_CHALLENGE_CONFIG.canvas.width}
        height={SCENE22_TAPROACH_CHALLENGE_CONFIG.canvas.height}
      />
      <Composition
        id="PixelPicked-Used-By"
        component={Scene23_UsedBy}
        durationInFrames={SCENE23_USED_BY_CONFIG.duration}
        fps={SCENE23_USED_BY_CONFIG.canvas.fps}
        width={SCENE23_USED_BY_CONFIG.canvas.width}
        height={SCENE23_USED_BY_CONFIG.canvas.height}
      />
      <Composition
        id="PixelPicked-Launch-Game-Click"
        component={Scene24_LaunchGameClick}
        durationInFrames={SCENE24_LAUNCH_GAME_CLICK_CONFIG.duration}
        fps={SCENE24_LAUNCH_GAME_CLICK_CONFIG.canvas.fps}
        width={SCENE24_LAUNCH_GAME_CLICK_CONFIG.canvas.width}
        height={SCENE24_LAUNCH_GAME_CLICK_CONFIG.canvas.height}
      />
      <Composition
        id="PixelPicked-Discovery-Explainer"
        component={Scene25_DiscoveryExplainer}
        durationInFrames={SCENE25_DISCOVERY_EXPLAINER_CONFIG.duration}
        fps={SCENE25_DISCOVERY_EXPLAINER_CONFIG.canvas.fps}
        width={SCENE25_DISCOVERY_EXPLAINER_CONFIG.canvas.width}
        height={SCENE25_DISCOVERY_EXPLAINER_CONFIG.canvas.height}
      />
      <Composition
        id="PixelPicked-Analytics-Explainer"
        component={Scene26_AnalyticsExplainer}
        durationInFrames={SCENE26_ANALYTICS_EXPLAINER_CONFIG.duration}
        fps={SCENE26_ANALYTICS_EXPLAINER_CONFIG.canvas.fps}
        width={SCENE26_ANALYTICS_EXPLAINER_CONFIG.canvas.width}
        height={SCENE26_ANALYTICS_EXPLAINER_CONFIG.canvas.height}
      />
      <Composition
        id="PixelPicked-Devlogs-Explainer"
        component={Scene27_DevlogsExplainer}
        durationInFrames={SCENE27_DEVLOGS_EXPLAINER_CONFIG.duration}
        fps={SCENE27_DEVLOGS_EXPLAINER_CONFIG.canvas.fps}
        width={SCENE27_DEVLOGS_EXPLAINER_CONFIG.canvas.width}
        height={SCENE27_DEVLOGS_EXPLAINER_CONFIG.canvas.height}
      />
      <Composition
        id="PixelPicked-Risk-Sameness"
        component={Scene28_RiskSameness}
        durationInFrames={SCENE28_RISK_SAMENESS_CONFIG.duration}
        fps={SCENE28_RISK_SAMENESS_CONFIG.canvas.fps}
        width={SCENE28_RISK_SAMENESS_CONFIG.canvas.width}
        height={SCENE28_RISK_SAMENESS_CONFIG.canvas.height}
      />
      <Composition
        id="PixelPicked-But"
        component={Scene29_But}
        durationInFrames={SCENE29_BUT_CONFIG.duration}
        fps={SCENE29_BUT_CONFIG.canvas.fps}
        width={SCENE29_BUT_CONFIG.canvas.width}
        height={SCENE29_BUT_CONFIG.canvas.height}
      />
      <Composition
        id="PixelPicked-Make-Games"
        component={Scene30_MakeGames}
        durationInFrames={SCENE30_MAKE_GAMES_CONFIG.duration}
        fps={SCENE30_MAKE_GAMES_CONFIG.canvas.fps}
        width={SCENE30_MAKE_GAMES_CONFIG.canvas.width}
        height={SCENE30_MAKE_GAMES_CONFIG.canvas.height}
      />
      <Composition
        id="PixelPicked-Built-Bridge"
        component={Scene31_BuiltPixelPicked}
        durationInFrames={SCENE31_BUILT_PIXELPICKED_CONFIG.duration}
        fps={SCENE31_BUILT_PIXELPICKED_CONFIG.canvas.fps}
        width={SCENE31_BUILT_PIXELPICKED_CONFIG.canvas.width}
        height={SCENE31_BUILT_PIXELPICKED_CONFIG.canvas.height}
      />
      <Composition
        id="PixelPicked-Discovery-Chapter-V2"
        component={Scene32_DiscoveryChapter}
        durationInFrames={SCENE32_DISCOVERY_CHAPTER_CONFIG.duration}
        fps={SCENE32_DISCOVERY_CHAPTER_CONFIG.canvas.fps}
        width={SCENE32_DISCOVERY_CHAPTER_CONFIG.canvas.width}
        height={SCENE32_DISCOVERY_CHAPTER_CONFIG.canvas.height}
      />
      <Composition
        id="Best-Games-By-Year-2000-2002"
        component={Scene33_BestGamesByYear}
        durationInFrames={SCENE33_BEST_GAMES_BY_YEAR_CONFIG.duration}
        fps={SCENE33_BEST_GAMES_BY_YEAR_CONFIG.canvas.fps}
        width={SCENE33_BEST_GAMES_BY_YEAR_CONFIG.canvas.width}
        height={SCENE33_BEST_GAMES_BY_YEAR_CONFIG.canvas.height}
      />
      <Composition
        id="Best-Games-By-Year-2003-2005"
        component={Scene33_BestGamesByYear}
        defaultProps={{ config: SCENE36_BEST_GAMES_BY_YEAR_PART2_CONFIG }}
        durationInFrames={SCENE36_BEST_GAMES_BY_YEAR_PART2_CONFIG.duration}
        fps={SCENE36_BEST_GAMES_BY_YEAR_PART2_CONFIG.canvas.fps}
        width={SCENE36_BEST_GAMES_BY_YEAR_PART2_CONFIG.canvas.width}
        height={SCENE36_BEST_GAMES_BY_YEAR_PART2_CONFIG.canvas.height}
      />
      <Composition
        id="Highest-Budget-Games-Ever"
        component={Scene34_HighestBudgetGames}
        durationInFrames={SCENE34_HIGHEST_BUDGET_GAMES_CONFIG.duration}
        fps={SCENE34_HIGHEST_BUDGET_GAMES_CONFIG.canvas.fps}
        width={SCENE34_HIGHEST_BUDGET_GAMES_CONFIG.canvas.width}
        height={SCENE34_HIGHEST_BUDGET_GAMES_CONFIG.canvas.height}
      />
      <Composition
        id="Biggest-Indie-Game-Success-Stories"
        component={Scene35_IndieSuccessStories}
        durationInFrames={SCENE35_INDIE_SUCCESS_STORIES_CONFIG.duration}
        fps={SCENE35_INDIE_SUCCESS_STORIES_CONFIG.canvas.fps}
        width={SCENE35_INDIE_SUCCESS_STORIES_CONFIG.canvas.width}
        height={SCENE35_INDIE_SUCCESS_STORIES_CONFIG.canvas.height}
      />
      <Composition
        id="Costliest-Cosmetics-In-Gaming"
        component={Scene37_CostliestCosmetics}
        durationInFrames={SCENE37_COSTLIEST_COSMETICS_CONFIG.duration}
        fps={SCENE37_COSTLIEST_COSMETICS_CONFIG.canvas.fps}
        width={SCENE37_COSTLIEST_COSMETICS_CONFIG.canvas.width}
        height={SCENE37_COSTLIEST_COSMETICS_CONFIG.canvas.height}
      />
      <Composition
        id="Highest-Grossing-Games-Ever"
        component={Scene38_HighestGrossingGames}
        durationInFrames={SCENE38_HIGHEST_GROSSING_GAMES_CONFIG.duration}
        fps={SCENE38_HIGHEST_GROSSING_GAMES_CONFIG.canvas.fps}
        width={SCENE38_HIGHEST_GROSSING_GAMES_CONFIG.canvas.width}
        height={SCENE38_HIGHEST_GROSSING_GAMES_CONFIG.canvas.height}
      />
      <Composition
        id="Funniest-Gaming-Moments-Ranking"
        component={Scene39_RankingReel}
        durationInFrames={SCENE39_FUNNY_GAMING_RANKING_CONFIG.duration}
        fps={SCENE39_FUNNY_GAMING_RANKING_CONFIG.canvas.fps}
        width={SCENE39_FUNNY_GAMING_RANKING_CONFIG.canvas.width}
        height={SCENE39_FUNNY_GAMING_RANKING_CONFIG.canvas.height}
      />
      <Composition
        id="Most-Iconic-Esports-Moments"
        component={Scene39_RankingReel}
        defaultProps={{config: SCENE40_ICONIC_ESPORTS_RANKING_CONFIG}}
        durationInFrames={SCENE40_ICONIC_ESPORTS_RANKING_CONFIG.duration}
        fps={SCENE40_ICONIC_ESPORTS_RANKING_CONFIG.canvas.fps}
        width={SCENE40_ICONIC_ESPORTS_RANKING_CONFIG.canvas.width}
        height={SCENE40_ICONIC_ESPORTS_RANKING_CONFIG.canvas.height}
      />
      <Composition
        id="Most-Nostalgic-Childhood-Games"
        component={Scene39_RankingReel}
        defaultProps={{config: SCENE41_NOSTALGIC_CHILDHOOD_GAMES_CONFIG}}
        durationInFrames={SCENE41_NOSTALGIC_CHILDHOOD_GAMES_CONFIG.duration}
        fps={SCENE41_NOSTALGIC_CHILDHOOD_GAMES_CONFIG.canvas.fps}
        width={SCENE41_NOSTALGIC_CHILDHOOD_GAMES_CONFIG.canvas.width}
        height={SCENE41_NOSTALGIC_CHILDHOOD_GAMES_CONFIG.canvas.height}
      />
      <Composition
        id="Most-Nostalgic-Mobile-Games"
        component={Scene39_RankingReel}
        defaultProps={{config: SCENE42_NOSTALGIC_MOBILE_GAMES_CONFIG}}
        durationInFrames={SCENE42_NOSTALGIC_MOBILE_GAMES_CONFIG.duration}
        fps={SCENE42_NOSTALGIC_MOBILE_GAMES_CONFIG.canvas.fps}
        width={SCENE42_NOSTALGIC_MOBILE_GAMES_CONFIG.canvas.width}
        height={SCENE42_NOSTALGIC_MOBILE_GAMES_CONFIG.canvas.height}
      />
      <Composition
        id="Funniest-OhnePixel-Moments"
        component={Scene39_RankingReel}
        defaultProps={{config: SCENE43_FUNNIEST_OHNEPIXEL_CONFIG}}
        durationInFrames={SCENE43_FUNNIEST_OHNEPIXEL_CONFIG.duration}
        fps={SCENE43_FUNNIEST_OHNEPIXEL_CONFIG.canvas.fps}
        width={SCENE43_FUNNIEST_OHNEPIXEL_CONFIG.canvas.width}
        height={SCENE43_FUNNIEST_OHNEPIXEL_CONFIG.canvas.height}
      />
      <Composition
        id="Shroud-Best-Moments"
        component={Scene39_RankingReel}
        defaultProps={{config: SCENE44_SHROUD_BEST_MOMENTS_CONFIG}}
        durationInFrames={SCENE44_SHROUD_BEST_MOMENTS_CONFIG.duration}
        fps={SCENE44_SHROUD_BEST_MOMENTS_CONFIG.canvas.fps}
        width={SCENE44_SHROUD_BEST_MOMENTS_CONFIG.canvas.width}
        height={SCENE44_SHROUD_BEST_MOMENTS_CONFIG.canvas.height}
      />
      <Composition
        id="TenZ-Best-Moments"
        component={Scene39_RankingReel}
        defaultProps={{config: SCENE45_TENZ_BEST_MOMENTS_CONFIG}}
        durationInFrames={SCENE45_TENZ_BEST_MOMENTS_CONFIG.duration}
        fps={SCENE45_TENZ_BEST_MOMENTS_CONFIG.canvas.fps}
        width={SCENE45_TENZ_BEST_MOMENTS_CONFIG.canvas.width}
        height={SCENE45_TENZ_BEST_MOMENTS_CONFIG.canvas.height}
      />
      <Composition
        id="Speed-Funniest-Moments"
        component={Scene39_RankingReel}
        defaultProps={{config: SCENE46_SPEED_FUNNIEST_MOMENTS_CONFIG}}
        durationInFrames={SCENE46_SPEED_FUNNIEST_MOMENTS_CONFIG.duration}
        fps={SCENE46_SPEED_FUNNIEST_MOMENTS_CONFIG.canvas.fps}
        width={SCENE46_SPEED_FUNNIEST_MOMENTS_CONFIG.canvas.width}
        height={SCENE46_SPEED_FUNNIEST_MOMENTS_CONFIG.canvas.height}
      />
      <Composition
        id="OhnePixel-Best-Case-Openings"
        component={Scene39_RankingReel}
        defaultProps={{config: SCENE47_OHNE_BEST_CASE_OPENINGS_CONFIG}}
        durationInFrames={SCENE47_OHNE_BEST_CASE_OPENINGS_CONFIG.duration}
        fps={SCENE47_OHNE_BEST_CASE_OPENINGS_CONFIG.canvas.fps}
        width={SCENE47_OHNE_BEST_CASE_OPENINGS_CONFIG.canvas.width}
        height={SCENE47_OHNE_BEST_CASE_OPENINGS_CONFIG.canvas.height}
      />
      <Composition
        id="Tarik-Best-Moments"
        component={Scene39_RankingReel}
        defaultProps={{config: SCENE48_TARIK_BEST_MOMENTS_CONFIG}}
        durationInFrames={SCENE48_TARIK_BEST_MOMENTS_CONFIG.duration}
        fps={SCENE48_TARIK_BEST_MOMENTS_CONFIG.canvas.fps}
        width={SCENE48_TARIK_BEST_MOMENTS_CONFIG.canvas.width}
        height={SCENE48_TARIK_BEST_MOMENTS_CONFIG.canvas.height}
      />
      <Composition
        id="Craziest-Case-Opening-Reactions"
        component={Scene39_RankingReel}
        defaultProps={{config: SCENE49_CRAZIEST_CASE_REACTIONS_CONFIG}}
        durationInFrames={SCENE49_CRAZIEST_CASE_REACTIONS_CONFIG.duration}
        fps={SCENE49_CRAZIEST_CASE_REACTIONS_CONFIG.canvas.fps}
        width={SCENE49_CRAZIEST_CASE_REACTIONS_CONFIG.canvas.width}
        height={SCENE49_CRAZIEST_CASE_REACTIONS_CONFIG.canvas.height}
      />
      <Composition
        id="Valorant-Craziest-Clips"
        component={Scene39_RankingReel}
        defaultProps={{config: SCENE50_VALORANT_CRAZIEST_PLAYS_CONFIG}}
        durationInFrames={SCENE50_VALORANT_CRAZIEST_PLAYS_CONFIG.duration}
        fps={SCENE50_VALORANT_CRAZIEST_PLAYS_CONFIG.canvas.fps}
        width={SCENE50_VALORANT_CRAZIEST_PLAYS_CONFIG.canvas.width}
        height={SCENE50_VALORANT_CRAZIEST_PLAYS_CONFIG.canvas.height}
      />
      <Composition
        id="Counter-Strike-Craziest-Clips"
        component={Scene39_RankingReel}
        defaultProps={{config: SCENE51_COUNTER_STRIKE_CRAZIEST_PLAYS_CONFIG}}
        durationInFrames={SCENE51_COUNTER_STRIKE_CRAZIEST_PLAYS_CONFIG.duration}
        fps={SCENE51_COUNTER_STRIKE_CRAZIEST_PLAYS_CONFIG.canvas.fps}
        width={SCENE51_COUNTER_STRIKE_CRAZIEST_PLAYS_CONFIG.canvas.width}
        height={SCENE51_COUNTER_STRIKE_CRAZIEST_PLAYS_CONFIG.canvas.height}
      />
      <Composition
        id="OhnePixel-Funniest-Moments-Part-2"
        component={Scene39_RankingReel}
        defaultProps={{config: SCENE52_FUNNIEST_OHNEPIXEL_PART2_CONFIG}}
        durationInFrames={SCENE52_FUNNIEST_OHNEPIXEL_PART2_CONFIG.duration}
        fps={SCENE52_FUNNIEST_OHNEPIXEL_PART2_CONFIG.canvas.fps}
        width={SCENE52_FUNNIEST_OHNEPIXEL_PART2_CONFIG.canvas.width}
        height={SCENE52_FUNNIEST_OHNEPIXEL_PART2_CONFIG.canvas.height}
      />
      <Composition
        id="Ranking-Roblox-Most-Popular-Games"
        component={Scene39_RankingReel}
        defaultProps={{config: SCENE54_BEST_ROBLOX_GAMES_CONFIG}}
        durationInFrames={SCENE54_BEST_ROBLOX_GAMES_CONFIG.duration}
        fps={SCENE54_BEST_ROBLOX_GAMES_CONFIG.canvas.fps}
        width={SCENE54_BEST_ROBLOX_GAMES_CONFIG.canvas.width}
        height={SCENE54_BEST_ROBLOX_GAMES_CONFIG.canvas.height}
      />
      <Composition
        id="PixelPicked-Individual-Launch-Game"
        component={Scene53_IndividualLaunchGame}
        defaultProps={{config: SCENE53_INDIVIDUAL_LAUNCH_GAME_CONFIG}}
        durationInFrames={1}
        fps={SCENE53_INDIVIDUAL_LAUNCH_GAME_CONFIG.canvas.fps}
        width={SCENE53_INDIVIDUAL_LAUNCH_GAME_CONFIG.canvas.width}
        height={SCENE53_INDIVIDUAL_LAUNCH_GAME_CONFIG.canvas.height}
      />
      <Composition
        id="Guess-The-Game-Day-1-Witcher-3"
        component={Scene55_GuessTheGame}
        defaultProps={{config: SCENE55_GUESS_THE_GAME_CONFIG}}
        durationInFrames={SCENE55_GUESS_THE_GAME_CONFIG.duration}
        fps={SCENE55_GUESS_THE_GAME_CONFIG.canvas.fps}
        width={SCENE55_GUESS_THE_GAME_CONFIG.canvas.width}
        height={SCENE55_GUESS_THE_GAME_CONFIG.canvas.height}
      />
      <Composition
        id="Guess-The-Game-Day-2-Red-Dead-Redemption-2"
        component={Scene55_GuessTheGame}
        defaultProps={{config: SCENE56_GUESS_THE_GAME_DAY2_CONFIG}}
        durationInFrames={SCENE56_GUESS_THE_GAME_DAY2_CONFIG.duration}
        fps={SCENE56_GUESS_THE_GAME_DAY2_CONFIG.canvas.fps}
        width={SCENE56_GUESS_THE_GAME_DAY2_CONFIG.canvas.width}
        height={SCENE56_GUESS_THE_GAME_DAY2_CONFIG.canvas.height}
      />
      <Composition
        id="Guess-The-Game-Day-3-Elden-Ring"
        component={Scene55_GuessTheGame}
        defaultProps={{config: SCENE57_GUESS_THE_GAME_DAY3_CONFIG}}
        durationInFrames={SCENE57_GUESS_THE_GAME_DAY3_CONFIG.duration}
        fps={SCENE57_GUESS_THE_GAME_DAY3_CONFIG.canvas.fps}
        width={SCENE57_GUESS_THE_GAME_DAY3_CONFIG.canvas.width}
        height={SCENE57_GUESS_THE_GAME_DAY3_CONFIG.canvas.height}
      />
      <Composition
        id="Guess-The-Game-Day-4-Before-Your-Eyes"
        component={Scene55_GuessTheGame}
        defaultProps={{config: SCENE59_GUESS_THE_GAME_DAY4_CONFIG}}
        durationInFrames={SCENE59_GUESS_THE_GAME_DAY4_CONFIG.duration}
        fps={SCENE59_GUESS_THE_GAME_DAY4_CONFIG.canvas.fps}
        width={SCENE59_GUESS_THE_GAME_DAY4_CONFIG.canvas.width}
        height={SCENE59_GUESS_THE_GAME_DAY4_CONFIG.canvas.height}
      />
      <Composition
        id="Guess-The-Game-Day-5-Overwatch"
        component={Scene55_GuessTheGame}
        defaultProps={{config: SCENE60_GUESS_THE_GAME_DAY5_CONFIG}}
        durationInFrames={SCENE60_GUESS_THE_GAME_DAY5_CONFIG.duration}
        fps={SCENE60_GUESS_THE_GAME_DAY5_CONFIG.canvas.fps}
        width={SCENE60_GUESS_THE_GAME_DAY5_CONFIG.canvas.width}
        height={SCENE60_GUESS_THE_GAME_DAY5_CONFIG.canvas.height}
      />
      <Composition
        id="Guess-The-Game-Day-6-Sable"
        component={Scene55_GuessTheGame}
        defaultProps={{config: SCENE62_GUESS_THE_GAME_DAY6_CONFIG}}
        durationInFrames={SCENE62_GUESS_THE_GAME_DAY6_CONFIG.duration}
        fps={SCENE62_GUESS_THE_GAME_DAY6_CONFIG.canvas.fps}
        width={SCENE62_GUESS_THE_GAME_DAY6_CONFIG.canvas.width}
        height={SCENE62_GUESS_THE_GAME_DAY6_CONFIG.canvas.height}
      />
      <Composition
        id="Guess-The-Game-Day-7-Solar-Ash"
        component={Scene55_GuessTheGame}
        defaultProps={{config: SCENE64_GUESS_THE_GAME_DAY7_CONFIG}}
        durationInFrames={SCENE64_GUESS_THE_GAME_DAY7_CONFIG.duration}
        fps={SCENE64_GUESS_THE_GAME_DAY7_CONFIG.canvas.fps}
        width={SCENE64_GUESS_THE_GAME_DAY7_CONFIG.canvas.width}
        height={SCENE64_GUESS_THE_GAME_DAY7_CONFIG.canvas.height}
      />
      <Composition
        id="Guess-The-Game-Day-8-Apex"
        component={Scene55_GuessTheGame}
        defaultProps={{config: SCENE65_GUESS_THE_GAME_DAY8_CONFIG}}
        durationInFrames={SCENE65_GUESS_THE_GAME_DAY8_CONFIG.duration}
        fps={SCENE65_GUESS_THE_GAME_DAY8_CONFIG.canvas.fps}
        width={SCENE65_GUESS_THE_GAME_DAY8_CONFIG.canvas.width}
        height={SCENE65_GUESS_THE_GAME_DAY8_CONFIG.canvas.height}
      />
      <Composition
        id="Guess-The-Game-Day-9-Assassins-Creed"
        component={Scene55_GuessTheGame}
        defaultProps={{config: SCENE67_GUESS_THE_GAME_DAY9_CONFIG}}
        durationInFrames={SCENE67_GUESS_THE_GAME_DAY9_CONFIG.duration}
        fps={SCENE67_GUESS_THE_GAME_DAY9_CONFIG.canvas.fps}
        width={SCENE67_GUESS_THE_GAME_DAY9_CONFIG.canvas.width}
        height={SCENE67_GUESS_THE_GAME_DAY9_CONFIG.canvas.height}
      />
      <Composition
        id="Guess-The-Game-Day-10-God-of-War"
        component={Scene55_GuessTheGame}
        defaultProps={{config: SCENE68_GUESS_THE_GAME_DAY10_CONFIG}}
        durationInFrames={SCENE68_GUESS_THE_GAME_DAY10_CONFIG.duration}
        fps={SCENE68_GUESS_THE_GAME_DAY10_CONFIG.canvas.fps}
        width={SCENE68_GUESS_THE_GAME_DAY10_CONFIG.canvas.width}
        height={SCENE68_GUESS_THE_GAME_DAY10_CONFIG.canvas.height}
      />
      <Composition
        id="Guess-The-Game-Day-11-Death-Stranding"
        component={Scene55_GuessTheGame}
        defaultProps={{config: SCENE71_GUESS_THE_GAME_DAY11_CONFIG}}
        durationInFrames={SCENE71_GUESS_THE_GAME_DAY11_CONFIG.duration}
        fps={SCENE71_GUESS_THE_GAME_DAY11_CONFIG.canvas.fps}
        width={SCENE71_GUESS_THE_GAME_DAY11_CONFIG.canvas.width}
        height={SCENE71_GUESS_THE_GAME_DAY11_CONFIG.canvas.height}
      />
      <Composition
        id="Guess-The-Game-Day-12-Detroit-Become-Human"
        component={Scene55_GuessTheGame}
        defaultProps={{config: SCENE73_GUESS_THE_GAME_DAY12_CONFIG}}
        durationInFrames={SCENE73_GUESS_THE_GAME_DAY12_CONFIG.duration}
        fps={SCENE73_GUESS_THE_GAME_DAY12_CONFIG.canvas.fps}
        width={SCENE73_GUESS_THE_GAME_DAY12_CONFIG.canvas.width}
        height={SCENE73_GUESS_THE_GAME_DAY12_CONFIG.canvas.height}
      />
      <Composition
        id="Guess-The-Game-Day-13-Wukong"
        component={Scene55_GuessTheGame}
        defaultProps={{config: SCENE75_GUESS_THE_GAME_DAY13_CONFIG}}
        durationInFrames={SCENE75_GUESS_THE_GAME_DAY13_CONFIG.duration}
        fps={SCENE75_GUESS_THE_GAME_DAY13_CONFIG.canvas.fps}
        width={SCENE75_GUESS_THE_GAME_DAY13_CONFIG.canvas.width}
        height={SCENE75_GUESS_THE_GAME_DAY13_CONFIG.canvas.height}
      />
      <Composition
        id="Guess-The-Game-Day-14"
        component={Scene55_GuessTheGame}
        defaultProps={{config: SCENE77_GUESS_THE_GAME_DAY14_CONFIG}}
        durationInFrames={SCENE77_GUESS_THE_GAME_DAY14_CONFIG.duration}
        fps={SCENE77_GUESS_THE_GAME_DAY14_CONFIG.canvas.fps}
        width={SCENE77_GUESS_THE_GAME_DAY14_CONFIG.canvas.width}
        height={SCENE77_GUESS_THE_GAME_DAY14_CONFIG.canvas.height}
      />
      <Composition
        id="Guess-The-Game-Day-15"
        component={Scene55_GuessTheGame}
        defaultProps={{config: SCENE78_GUESS_THE_GAME_DAY15_CONFIG}}
        durationInFrames={SCENE78_GUESS_THE_GAME_DAY15_CONFIG.duration}
        fps={SCENE78_GUESS_THE_GAME_DAY15_CONFIG.canvas.fps}
        width={SCENE78_GUESS_THE_GAME_DAY15_CONFIG.canvas.width}
        height={SCENE78_GUESS_THE_GAME_DAY15_CONFIG.canvas.height}
      />
      <Composition
        id="Guess-The-Game-From-OST-01"
        component={Scene76_GuessTheOst}
        durationInFrames={360}
        fps={30}
        width={1080}
        height={1080}
      />
      <Composition
        id="Guess-The-Sound-02"
        component={Scene77_GuessTheSound}
        durationInFrames={360}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
