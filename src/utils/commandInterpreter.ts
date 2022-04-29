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
