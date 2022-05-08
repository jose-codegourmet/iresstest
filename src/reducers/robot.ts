import { createSlice } from '@reduxjs/toolkit';

export interface ReducerRobotState {
  robot: {
    position?: {
      face?: string;
      positionX?: number;
      positionY?: number;
    };
  };
}

export const robotSlice = createSlice({
  name: `robot`,
  initialState: {
    position: null,
  },
  reducers: {
    placeRobot: (state, action) => {
      const { posX, posY, posF } = action.payload;
      state.position = {
        face: posF,
        positionX: posX,
        positionY: posY,
      };
    },
    moveRobot: (state, action) => {
      const { posX, posY } = action.payload;
      state.position.positionX = posX;
      state.position.positionY = posY;
    },
    rotateRobot: (state, action) => {
      const { posF } = action.payload;
      state.position.face = posF;
    },
    removeRobot: (state) => {
      state.position = null;
    },
  },
});

export const { placeRobot, moveRobot, rotateRobot, removeRobot } =
  robotSlice.actions;
export default robotSlice.reducer;
