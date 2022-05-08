export function cmdLineCreateHelp({ gridSize }) {
  return `
    \n\n\n
    ============================================= \n
          Robot Manual: \n
    ============================================= \n
    PLACE  = place the robot to coordinates ( x , y , f ) \n
    > x is the x axis up to number ${gridSize} tile \n
    > y is the y axis up to number ${gridSize} tile \n
    > f is the Robot's direction with allowed parameters: "NORTH","EAST","SOUTH" and "WEST" \n
    \n
    MOVE = The robot will move 1 tile depending on the direction it is facing \n
    LEFT = will rotate the robot counter clockwise \n
    RIGHT = will rotate the robot clockwise \n
    REPORT = show robot's current coordinates \n
    CLEAR = Reset's the grid and terminal \n

    \n
    \n
    BONUS: \n
    SET_ORIGIN = CHANGE THE ORIGIN OF THE PLACE COORDINATE ( x , y) \n

    \n\n\n
  `;
}
