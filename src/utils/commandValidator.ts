import {
  ALLOWED_FACE_DIRECTIONS,
  ALLOWED_COMMANDS_WITH_ROBOT,
  ALLOWED_COMMANDS,
} from '@/contstants';

import { CommandValidatorType, commandLineType } from '@/types';
import { commandEntityValidator } from './commandEntityValidator';

export function commandValidator({
  cmdArg,
  gridSize,
  robotConfig,
  movableTilesYArray,
  movableTilesXArray,
}: CommandValidatorType) {
  const errorsList: Array<commandLineType> = [];
  const [command, params] = cmdArg.split(` `);

  const pushErrors = (errorMsg: string, type = `error`) => {
    errorsList.push({
      id: `${Date.now().valueOf()}`,
      message: errorMsg,
      type,
    });
  };

  // validate if command is allowed
  if (!ALLOWED_COMMANDS.includes(command)) {
    pushErrors(`${command} is not a valid command`);
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
   * "SET_ORIGIN" COMMAND VALIDATION
   * ====================================
   */
  if (command === `SET_ORIGIN`) {
    const isOutOfBounds = (paramName, value) => {
      if (value < 0 || value > gridSize) {
        return `${paramName} ${value} should be greater than 0 and less than ${gridSize} `;
      }
      return false;
    };

    commandEntityValidator({
      command,
      params,
      paramsConfig: [
        {
          name: `positionX`,
          isRequired: true,
          type: `whole number`,
          validator: isOutOfBounds,
        },
        {
          name: `positionY`,
          isRequired: true,
          type: `whole number`,
          validator: isOutOfBounds,
        },
      ],
      pushErrors,
    });
  }
  /**
   * ====================================
   * "PLACE" COMMAND VALIDATION
   * ====================================
   */

  if (command === `PLACE`) {
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
      const intPosX = Number(posX);
      const intPosY = Number(posY);

      if (posX.includes(`.`)) {
        pushErrors(`Position X should be whole number `);
      }

      if (posY.includes(`.`)) {
        pushErrors(`Position Y should be whole number `);
      }

      if (!intPosX && intPosX !== 0) {
        pushErrors(`Position X ${posX} is not a valid number `);
      }

      if (!intPosY && intPosY !== 0) {
        pushErrors(`Position Y ${posY} is not a valid number `);
      }

      // do not push through as next steps will be needing it for findIndex
      if (errorsList.length > 0) return errorsList;

      const indexOfPlaceX = movableTilesXArray.findIndex((i) => i === intPosX);
      const indexOfPlaceY = movableTilesYArray.findIndex((i) => i === intPosY);

      // indexOfPlaceX and indexOfPlaceY
      // is the actual grid position
      // while posY and posX
      // is the readable position based
      // on the grid origin

      if (indexOfPlaceX < 0 || indexOfPlaceX > gridSize) {
        pushErrors(
          `Position X ${intPosX} should be between ${movableTilesXArray[0]} and ${movableTilesXArray[gridSize]} `,
        );
      }

      if (indexOfPlaceY < 0 || indexOfPlaceY > gridSize) {
        pushErrors(
          `Position Y ${intPosY} should be between ${movableTilesYArray[0]} and ${movableTilesYArray[gridSize]} `,
        );
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
        message: `Ignoring Command of Position Y = 5 is out of bounds!`,
        type: `warning`,
      });
    }

    if (face === `SOUTH` && positionY + 1 > gridSize) {
      errorsList.push({
        id: `${Date.now().valueOf()}`,
        message: `Ignoring Command of Position Y = -1 is out of bounds!`,
        type: `warning`,
      });
    }

    if (face === `EAST` && positionX + 1 > gridSize) {
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
