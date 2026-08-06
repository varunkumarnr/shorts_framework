import React from "react";
import { Composition, Series } from "remotion";
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
} from "./data/config";
import { Scene1_Reddit } from "./compositions/Scene1_Reddit";
import { Scene2_Gameplay } from "./compositions/Scene2_Gameplay";
import { Scene2B_GameOfWeek } from "./compositions/Scene2B_GameOfWeek";
import { Scene3_Mockup } from "./compositions/Scene3_Mockup";
import { Scene4_Outro } from "./compositions/Scene4_Outro";
import { Scene5_List } from "./compositions/Scene5_List";
import { Scene6_BeforeAfter } from "./compositions/Scene6_BeforeAfter";
import { Scene7_InstagramText } from "./compositions/Scene7_Instagram";

const PixelPickedTrailer: React.FC = () => (
  <Series>
    <Series.Sequence durationInFrames={SCENE1_CONFIG.duration}>
      <Scene1_Reddit />
    </Series.Sequence>
    <Series.Sequence durationInFrames={SCENE2_CONFIG.duration}>
      <Scene2_Gameplay />
    </Series.Sequence>
    <Series.Sequence durationInFrames={SCENE2B_CONFIG.duration}>
      <Scene2B_GameOfWeek />
    </Series.Sequence>
    <Series.Sequence durationInFrames={SCENE3_CONFIG.duration}>
      <Scene3_Mockup />
    </Series.Sequence>
    <Series.Sequence durationInFrames={SCENE6_CONFIG.duration}>
      <Scene6_BeforeAfter />
    </Series.Sequence>
    <Series.Sequence durationInFrames={SCENE5_CONFIG.duration}>
      <Scene5_List />
    </Series.Sequence>
    <Series.Sequence durationInFrames={SCENE4_CONFIG.duration}>
      <Scene4_Outro />
    </Series.Sequence>
    <Series.Sequence durationInFrames={SCENE7_CONFIG.duration}>
      <Scene7_InstagramText />
    </Series.Sequence>
  </Series>
);

const TOTAL =
  SCENE1_CONFIG.duration +
  SCENE2_CONFIG.duration +
  SCENE2B_CONFIG.duration +
  SCENE3_CONFIG.duration +
  SCENE4_CONFIG.duration +
  SCENE5_CONFIG.duration +
  SCENE6_CONFIG.duration +
  SCENE7_CONFIG.duration;

export const Root: React.FC = () => {
  const { width, height, fps } = THEME.canvas;
  return (
    <>
      <Composition
        id="PixelPickedTrailer"
        component={PixelPickedTrailer}
        durationInFrames={TOTAL}
        fps={fps}
        width={width}
        height={height}
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
