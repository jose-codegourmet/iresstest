import { RobotComponentProps } from '@/types';

export function placeInterpretter(position = ``) {
  const [posX, posY, posF] = position.split(`,`);
  const intPosX = Number(posX);
  const intPosY = Number(posY);

  return {
    message: `Robot is positioned facing ${posF} at x = ${posX} and y = ${posY} `,
    position: {
      posX: intPosX,
      posY: intPosY,
      posF,
    },
  };
}

export function moveInterpretter(robotConfig: RobotComponentProps) {
  const { face: posF, positionX: posX, positionY: posY } = robotConfig;

  const newPosition = {
    position: {
      posX,
      posY,
      posF,
    },
  };

  if (posF === `NORTH`) newPosition.position.posY = posY - 1;
  if (posF === `SOUTH`) newPosition.position.posY = posY + 1;
  if (posF === `EAST`) newPosition.position.posX = posX + 1;
  if (posF === `WEST`) newPosition.position.posX = posX - 1;

  return {
    message: `Robot is positioned facing ${newPosition.position.posF} at x = ${newPosition.position.posX} and y = ${posY} `,
    ...newPosition,
  };
}
