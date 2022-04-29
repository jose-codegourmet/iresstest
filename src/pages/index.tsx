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
          id: `${Date.now()}`,
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
          id: `${Date.now()}`,
          message: cmd,
          type: `info`,
        },
        {
          id: `${Date.now()}`,
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
          id: `${Date.now()}`,
          message: cmd,
          type: `info`,
        },
        {
          id: `${Date.now()}`,
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
  };

  return (
    <main>
      <Title>Iress Robot Exam</Title>
      <div className="container">
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
