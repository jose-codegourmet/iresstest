import React, { useState } from 'react';

import Title from '@/components/Title';
import Grid from '@/components/Grid';
import Robot from '@/components/Robot';
import Terminal from '@/components/Terminal';

import '@/styles/main.scss';

import { RobotComponentProps, commandLineType, OriginType } from '@/types';
import {
  placeInterpretter,
  moveInterpretter,
  rotateInterpretter,
} from '@/utils/commandInterpreter';
import { commandValidator } from '@/utils/commandValidator';
import { GRID_SIZE } from '@/contstants';

export default function Home() {
  const [originConfig, setOriginConfig] = useState<OriginType>({
    originX: 0,
    originY: GRID_SIZE - 1,
  });

  const [robotConfig, setRobotConfig] = useState<RobotComponentProps>();
  const [commandLines, setCommandLines] = useState<Array<commandLineType>>([]);

  const movableTilesXArray = [];
  const movableTilesYArray = [];

  for (let index = 0; index < GRID_SIZE; index++) {
    const yStartAt = originConfig.originY;
    const xStartAt = 0 - originConfig.originX;
    movableTilesYArray.push(yStartAt - index);
    movableTilesXArray.push(xStartAt + index);
  }

  const handleFireCommand = (cmd) => {
    if (cmd === ``) return;

    const cmdFunction: string = cmd.split(` `)[0];
    const validatorGridSize: number = GRID_SIZE - 1; // since grid starts with 0 tile
    const errors = commandValidator({
      cmdArg: cmd,
      gridSize: validatorGridSize,
      robotConfig,
      movableTilesYArray,
      movableTilesXArray,
    });

    if (errors.length > 0) {
      setCommandLines([
        ...commandLines,
        {
          id: `${Date.now().valueOf()}`,
          message: cmd,
          type: `info`,
        },
        ...errors,
      ]);
      return;
    }

    if (cmdFunction === `CLEAR`) {
      setCommandLines([]);
      setRobotConfig(null);
      return;
    }

    if (cmdFunction === `PLACE`) {
      const position: string = cmd.split(` `)[1];
      const {
        message,
        position: { posX, posY, posF },
      } = placeInterpretter({
        position,
        movableTilesYArray,
        movableTilesXArray,
      });

      setCommandLines([
        ...commandLines,
        {
          id: `${Date.now().valueOf()}`,
          message: cmd,
          type: `info`,
        },
        {
          id: `${Date.now().valueOf()}`,
          message,
          type: `success`,
        },
      ]);

      setRobotConfig({
        face: posF,
        positionX: posX,
        positionY: posY,
      });
    }

    if (cmdFunction === `SET_ORIGIN`) {
      const position: string = cmd.split(` `)[1];
      const [argOriginX, argOriginY]: Array<string> = position.split(`,`);
      setOriginConfig({
        originX: Number(argOriginX),
        originY: Number(argOriginY),
      });
    }

    if (cmdFunction === `MOVE`) {
      const {
        message,
        position: { posX, posY, posF },
      } = moveInterpretter({
        robotConfig,
        movableTilesYArray,
        movableTilesXArray,
      });

      setCommandLines([
        ...commandLines,
        {
          id: `${Date.now().valueOf()}`,
          message: cmd,
          type: `info`,
        },
        {
          id: `${Date.now().valueOf()}`,
          message,
          type: `success`,
        },
      ]);

      setRobotConfig({
        face: posF,
        positionX: posX,
        positionY: posY,
      });
    }

    if (cmdFunction === `LEFT` || cmdFunction === `RIGHT`) {
      const {
        message,
        position: { posF },
      } = rotateInterpretter(cmdFunction, { ...robotConfig });

      setCommandLines([
        ...commandLines,
        {
          id: `${Date.now().valueOf()}`,
          message: cmd,
          type: `info`,
        },
        {
          id: `${Date.now().valueOf()}`,
          message,
          type: `success`,
        },
      ]);

      setRobotConfig({
        ...robotConfig,
        face: posF,
      });
    }

    if (cmdFunction === `REPORT`) {
      setCommandLines([
        ...commandLines,
        {
          id: `${Date.now().valueOf()}`,
          message: cmd,
          type: `info`,
        },
        {
          id: `${Date.now().valueOf()}`,
          message: `
            \n\n\n
            ============================================= \n
                  Robot Report: \n
            ============================================= \n
            Position X  = ${movableTilesXArray[robotConfig.positionX]} \n
            Position Y = ${movableTilesYArray[robotConfig.positionY]} \n
            Facing = ${robotConfig.face}
            \n\n\n
          `,
          type: `info`,
        },
      ]);
    }

    if (cmdFunction === `HELP`) {
      setCommandLines([
        ...commandLines,
        {
          id: `${Date.now().valueOf()}`,
          message: cmd,
          type: `info`,
        },
        {
          id: `${Date.now().valueOf()}`,
          message: `
            \n\n\n
            ============================================= \n
                  Robot Manual: \n
            ============================================= \n
            PLACE  = place the robot to coordinates ( x , y , f ) \n
            > x is the x axis up to number ${GRID_SIZE} tile \n
            > y is the y axis up to number ${GRID_SIZE} tile \n
            > f is the Robot's direction with allowed parameters: "NORTH","EAST","SOUTH" and "WEST" \n
            \n
            MOVE = The robot will move 1 tile depending on the direction it is facing \n
            LEFT = will rotate the robot counter clockwise \n
            RIGHT = will rotate the robot clockwise \n
            REPORT = show robot's current coordinates \n
            CLEAR = Reset's the grid and terminal \n

            \n
            \n
            BONUS: \n
            SET_ORIGIN = CHANGE THE ORIGIN OF THE PLACE COORDINATE ( x , y) \n

            \n\n\n
          `,
          type: `info`,
        },
      ]);
    }
  };

  return (
    <main>
      <Title>Iress Robot Exam</Title>
      <div className="simulator">
        {robotConfig ? (
          <Grid
            gridSize={GRID_SIZE}
            robotX={robotConfig.positionX}
            robotY={robotConfig.positionY}
            movableTilesYArray={movableTilesYArray}
            movableTilesXArray={movableTilesXArray}
            robotEl={
              <Robot
                face={robotConfig.face}
                positionX={robotConfig.positionX}
                positionY={robotConfig.positionY}
              />
            }
          />
        ) : (
          <Grid
            gridSize={GRID_SIZE}
            movableTilesYArray={movableTilesYArray}
            movableTilesXArray={movableTilesXArray}
          />
        )}

        <Terminal commandLines={commandLines} fireCommand={handleFireCommand} />
      </div>
    </main>
  );
}
