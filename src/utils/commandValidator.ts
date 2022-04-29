import {
  ALLOWED_FACE_DIRECTIONS,
  ALLOWED_COMMANDS,
  COMMAND_FORMATS,
  COMMANDS_WITH_PARAMS,
} from '@/contstants';

import { commandLineType } from '@/types';

export function commandValidator(cmdArg: string) {
  const errorsList: Array<commandLineType> = [];
  const [command, params] = cmdArg.split(` `);

  const pushErrors = (errMsg) => {
    errorsList.push({
      id: `${Date.now()}`,
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

      if (intPosX > 5) {
        pushErrors(`Position X ${intPosX} should be less than 4 `);
      }

      if (intPosY > 5) {
        pushErrors(`Position Y ${intPosY} should be less than 4 `);
      }
    }
  }

  return errorsList;
}
