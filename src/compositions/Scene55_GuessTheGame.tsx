import React from "react";
import {AbsoluteFill, Video, staticFile} from "remotion";
import {
  GuessTheGameConfig,
  SCENE55_GUESS_THE_GAME_CONFIG,
} from "../data/config";

export type Scene55GuessTheGameProps = {
  config?: GuessTheGameConfig;
};

/**
 * A deliberately invisible template: the social post caption asks the
 * question, while the video stays as uninterrupted, unbranded gameplay.
 */
export const Scene55_GuessTheGame: React.FC<Scene55GuessTheGameProps> = ({
  config = SCENE55_GUESS_THE_GAME_CONFIG,
}) => {
  return (
    <AbsoluteFill style={{backgroundColor: "#000", overflow: "hidden"}}>
      <Video
        src={staticFile(config.clip.src)}
        startFrom={config.clip.startFrom}
        volume={config.clip.volume}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: config.clip.objectPosition,
          transform: `scale(${config.clip.scale})`,
          transformOrigin: "center center",
        }}
      />
    </AbsoluteFill>
  );
};
