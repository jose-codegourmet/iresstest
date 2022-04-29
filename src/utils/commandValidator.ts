import {
  ALLOWED_FACE_DIRECTIONS,
  ALLOWED_COMMANDS_WITH_ROBOT,
  ALLOWED_COMMANDS,
  COMMAND_FORMATS,
  COMMANDS_WITH_PARAMS,
} from '@/contstants';

import { commandLineType, RobotComponentProps } from '@/types';

export function commandValidator(
  cmdArg: string,
  robotConfig: RobotComponentProps,
) {
  const errorsList: Array<commandLineType> = [];
  const [command, params] = cmdArg.split(` `);

  const pushErrors = (errMsg) => {
    errorsList.push({
      id: `${Date.now().valueOf()}`,
      message: errMsg,
      type: `error`,
    });
  };

  // validate if command is allowed
  if (!ALLOWED_COMMANDS.includes(command)) {
    pushErrors(`${command} is not a valid command`);
    return errorsList;
  }

  // validate if command is missing a parameter
  // then show the format of the command
  if (COMMANDS_WITH_PARAMS.includes(command) && !params) {
    pushErrors(`
      ${command} is missing a parameter \n
      please follow the format: \n
      \n
      ${COMMAND_FORMATS[command]}
    `);

    return errorsList;
  }

  // validate if commands fired requires a robot on
  // the grid
  if (ALLOWED_COMMANDS_WITH_ROBOT.includes(command) && !robotConfig) {
    errorsList.push({
      id: `${Date.now().valueOf()}`,
      message: `Robot should be placed!`,
      type: `error`,
    });
    return errorsList;
  }

  // check for errors based on command allowed params

  /**
   * ====================================
   * "PLACE" COMMAND VALIDATION
   * ====================================
   */

  if (command === `PLACE`) {
    let intPosX = 0;
    let intPosY = 0;

    const [posX, posY, posF] = params.split(`,`);

    if (!posX) {
      pushErrors(`Position X should be defined!`);
    }

    if (!posY) {
      pushErrors(`Position Y should be defined!`);
    }

    if (!posF) {
      pushErrors(`Position F should be defined!`);
    }

    if (!ALLOWED_FACE_DIRECTIONS.includes(posF)) {
      pushErrors(
        `Position F ${posF} is not allowed. Please use 'NORTH','SOUTH','EAST' or 'WEST' `,
      );
    }

    if (posX && posY) {
      intPosX = Number(posX);
      intPosY = Number(posY);

      if (intPosX > 4) {
        pushErrors(`Position X ${intPosX} should be less than 4 `);
      }

      if (intPosY > 4) {
        pushErrors(`Position Y ${intPosY} should be less than 4 `);
      }
    }
  }

  /**
   * ====================================
   * "MOVE" COMMAND VALIDATION
   * ====================================
   */
  if (command === `MOVE`) {
    const { face, positionX, positionY } = robotConfig;

    if (face === `NORTH` && positionY - 1 < 0) {
      errorsList.push({
        id: `${Date.now().valueOf()}`,
        message: `Ignoring Command of Position Y = ${
          positionY - 1
        } is out of bounds!`,
        type: `warning`,
      });
    }

    if (face === `SOUTH` && positionY + 1 > 4) {
      errorsList.push({
        id: `${Date.now().valueOf()}`,
        message: `Ignoring Command of Position Y = ${
          positionY + 1
        } is out of bounds!`,
        type: `warning`,
      });
    }

    if (face === `EAST` && positionX + 1 > 4) {
      errorsList.push({
        id: `${Date.now().valueOf()}`,
        message: `Ignoring Command of Position X = ${
          positionX + 1
        } is out of bounds!`,
        type: `warning`,
      });
    }

    if (face === `WEST` && positionX - 1 < 0) {
      errorsList.push({
        id: `${Date.now().valueOf()}`,
        message: `Ignoring Command of Position X = ${
          positionX - 1
        } is out of bounds!`,
        type: `warning`,
      });
    }
  }

  return errorsList;
}
