import React, { useState } from 'react';

import Title from '@/components/Title';
import Grid from '@/components/Grid';
import Robot from '@/components/Robot';
import Terminal from '@/components/Terminal';

import '@/styles/main.scss';

import { RobotComponentProps, commandLineType } from '@/types';
import {
  placeInterpretter,
  moveInterpretter,
  rotateInterpretter,
} from '@/utils/commandInterpreter';
import { commandValidator } from '@/utils/commandValidator';

export default function Home() {
  const [robotConfig, setRobotConfig] = useState<RobotComponentProps>();
  const [commandLines, setCommandLines] = useState<Array<commandLineType>>([]);

  const handleFireCommand = (cmd) => {
    if (cmd === ``) return;

    const cmdFunction: string = cmd.split(` `)[0];
    const errors = commandValidator(cmd, robotConfig);

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
      } = placeInterpretter(position);

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

    if (cmdFunction === `MOVE`) {
      const {
        message,
        position: { posX, posY, posF },
      } = moveInterpretter({ ...robotConfig });

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
            Position X  = ${robotConfig.positionX} \n
            Position Y = ${robotConfig.positionY} \n
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
            > x is the x axis up to 4th tile \n
            > y is the y axis up to 4th tile \n
            > f is the Robot's direction with allowed parameters: "NORTH","EAST","SOUTH" and "WEST" \n
            \n
            MOVE = The robot will move 1 tile depending on the direction it is facing \n
            LEFT = will rotate the robot counter clockwise \n
            RIGHT = will rotate the robot clockwise \n
            REPORT = show robot's current coordinates \n
            CLEAR = Reset's the grid and terminal \n
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
            robotEl={
              <Robot
                face={robotConfig.face}
                positionX={robotConfig.positionX}
                positionY={robotConfig.positionY}
              />
            }
          />
        ) : (
          <Grid />
        )}

        <Terminal commandLines={commandLines} fireCommand={handleFireCommand} />
      </div>
    </main>
  );
}
