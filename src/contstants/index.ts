// must not change the arrangment as this is done to mimic a clockwise rotation
export const ALLOWED_FACE_DIRECTIONS: Array<string> = [
  `NORTH`,
  `EAST`,
  `SOUTH`,
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
  `SET_ORIGIN`,
];

export const ALLOWED_COMMANDS_WITH_ROBOT: Array<string> = [
  `MOVE`,
  `LEFT`,
  `RIGHT`,
  `REPORT`,
];

export const GRID_SIZE = 5;

export const COMMANDS_WITH_PARAMS: Array<string> = [`PLACE`, `SET_ORIGIN`];

export const COMMAND_FORMATS: { [key: string]: string } = {
  PLACE: `PLACE positionX <number>, position Y <number>, position F < NORTH ,SOUTH , EAST or WEST > `,
  SET_ORIGIN: `SET_ORIGIN positionX <number>, position Y <number>`,
};
