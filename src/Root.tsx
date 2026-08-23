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
} from "./data/config";
import { Scene1_Reddit } from "./compositions/Scene1_Reddit";
import { Scene2_Gameplay } from "./compositions/Scene2_Gameplay";
import { Scene2B_GameOfWeek } from "./compositions/Scene2B_GameOfWeek";
import { Scene3_Mockup } from "./compositions/Scene3_Mockup";
import { Scene4_Outro } from "./compositions/Scene4_Outro";
import { Scene5_List } from "./compositions/Scene5_List";
import { Scene6_BeforeAfter } from "./compositions/Scene6_BeforeAfter";
import { Scene7_InstagramText } from "./compositions/Scene7_Instagram";
import { Scene8_GameTrailer } from "./compositions/Scene8_GameTrailer";

const calculateTrailerMetadata: CalculateMetadataFunction<
  Record<string, unknown>
> = async () => {
  const cfg = SCENE8_GAME_TRAILER_CONFIG;
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
        durationInFrames={SCENE2B_CONFIG.duration}
        fps={fps}
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
    </>
  );
};
