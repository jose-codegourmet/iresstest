import { ALLOWED_FACE_DIRECTIONS } from '@/contstants';
import {
  RobotComponentProps,
  PlaceInterpretterType,
  MoveInterpretterType,
} from '@/types';

export function placeInterpretter({
  position = ``,
  movableTilesYArray,
  movableTilesXArray,
}: PlaceInterpretterType) {
  const [posX, posY, posF] = position.split(`,`);
  const intPosX = movableTilesXArray.findIndex((i) => i === Number(posX));
  const intPosY = movableTilesYArray.findIndex((i) => i === Number(posY));

  return {
    message: `Robot is positioned facing ${posF} at x = ${posX} and y = ${posY} `,
    position: {
      posX: intPosX,
      posY: intPosY,
      posF,
    },
  };
}

export function moveInterpretter({
  robotConfig,
  movableTilesYArray,
  movableTilesXArray,
}: MoveInterpretterType) {
  const { face: posF, positionX: posX, positionY: posY } = robotConfig;

  const newPosition = {
    position: {
      posX,
      posY,
      posF,
    },
  };

  // originally css interprets going up as negative values
  // and going down as positive values. but for this project
  // the y axis is inverted
  if (posF === `NORTH`) newPosition.position.posY = posY - 1;
  if (posF === `SOUTH`) newPosition.position.posY = posY + 1;
  if (posF === `EAST`) newPosition.position.posX = posX + 1;
  if (posF === `WEST`) newPosition.position.posX = posX - 1;

  const newPositionX = movableTilesXArray[newPosition.position.posX];
  const newPositionY = movableTilesYArray[newPosition.position.posY];

  return {
    message: `Robot is positioned facing ${newPosition.position.posF} at x = ${newPositionX} and y = ${newPositionY} `,
    ...newPosition,
  };
}

type directionType = 'LEFT' | 'RIGHT';
export function rotateInterpretter(
  direction: directionType,
  robotConfig: RobotComponentProps,
) {
  const { face: currFace } = robotConfig;
  const newPosition = {
    position: {
      posF: currFace,
    },
  };

  const numberOfDirections = ALLOWED_FACE_DIRECTIONS.length;
  const faceIndx = ALLOWED_FACE_DIRECTIONS.findIndex((f) => f === currFace);
  const rotatedIndx = direction === `LEFT` ? faceIndx - 1 : faceIndx + 1;

  if (rotatedIndx < 0) {
    newPosition.position.posF =
      ALLOWED_FACE_DIRECTIONS[rotatedIndx + numberOfDirections];
  } else {
    newPosition.position.posF =
      ALLOWED_FACE_DIRECTIONS[rotatedIndx % numberOfDirections];
  }

  return {
    message: `Robot is positioned faced at ${newPosition.position.posF}`,
    ...newPosition,
  };
}
