import { ALLOWED_COMMANDS_WITH_ROBOT, ALLOWED_COMMANDS } from '@/contstants';

import { CommandValidatorType, CommandLineTypes } from '@/types';
import { commandEntityValidator } from './commandEntityValidator';

export function commandValidator({
  cmdArg,
  gridSize,
  robotConfig,
  movableTilesYArray,
  movableTilesXArray,
}: CommandValidatorType) {
  const errorsList: Array<CommandLineTypes> = [];
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
          name: `position X`,
          isRequired: true,
          type: `whole number`,
          validator: isOutOfBounds,
        },
        {
          name: `position Y`,
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
    // indexOfPlaceX and indexOfPlaceY
    // is the actual grid position
    // while value Position X and Y
    // is the readable position based
    // on the grid origin
    const isOutOfMovableBounds = (paramName, paramValue) => {
      const intParamValue = Number(paramValue);

      if (paramName === `position X`) {
        const indexOfPlaceX = movableTilesXArray.findIndex(
          (i) => i === intParamValue,
        );
        if (indexOfPlaceX < 0 || indexOfPlaceX > gridSize) {
          return `${paramName} ${paramValue} should be between ${movableTilesXArray[0]} and ${movableTilesXArray[gridSize]} `;
        }
      }

      if (paramName === `position Y`) {
        const indexOfPlaceY = movableTilesYArray.findIndex(
          (i) => i === intParamValue,
        );
        if (indexOfPlaceY < 0 || indexOfPlaceY > gridSize) {
          return `${paramName} ${paramValue} should be between ${movableTilesYArray[0]} and ${movableTilesYArray[gridSize]} `;
        }
      }

      return false;
    };

    commandEntityValidator({
      command,
      params,
      paramsConfig: [
        {
          name: `position X`,
          isRequired: true,
          type: `whole number`,
          validator: isOutOfMovableBounds,
        },
        {
          name: `position Y`,
          isRequired: true,
          type: `whole number`,
          validator: isOutOfMovableBounds,
        },
        {
          name: `position F`,
          isRequired: true,
          type: `faces`,
        },
      ],
      pushErrors,
    });
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
