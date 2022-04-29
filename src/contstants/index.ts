export const ALLOWED_FACE_DIRECTIONS: Array<string> = [
  `NORTH`,
  `SOUTH`,
  `EAST`,
  `WEST`,
];

export const ALLOWED_COMMANDS: Array<string> = [
  `PLACE`,
  `MOVE`,
  `LEFT`,
  `RIGHT`,
  `REPORT`,
  `CLEAR`,
  `HELP`,
];

export const COMMANDS_WITH_PARAMS: Array<string> = [`PLACE`];

export const COMMAND_FORMATS: { [key: string]: string } = {
  PLACE: `PLACE positionX <number>, position Y <number>, position F < NORTH ,SOUTH , EAST or WEST > `,
};
