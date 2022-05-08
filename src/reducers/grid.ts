import { createSlice } from '@reduxjs/toolkit';
import { GRID_SIZE } from '@/contstants';

export interface ReducerGridState {
  grid: {
    gridSize: number;
    originX: number;
    originY: number;
    movableTilesYArray: Array<number>;
    movableTilesXArray: Array<number>;
  };
}

export const gridSlice = createSlice({
  name: `grid`,
  initialState: {
    gridSize: GRID_SIZE,
    originX: 0,
    originY: GRID_SIZE - 1,
    movableTilesYArray: [],
    movableTilesXArray: [],
  },
  reducers: {
    setGrid: (state, action) => {
      const { originX, originY, gridSize } = action.payload;

      const tempGridSize = gridSize || state.gridSize;

      const movableTilesXArray = [];
      const movableTilesYArray = [];

      for (let index = 0; index < tempGridSize; index++) {
        const yStartAt = originY || state.originY;
        const xStartAt = 0 - originX || state.originX;
        movableTilesYArray.push(yStartAt - index);
        movableTilesXArray.push(xStartAt + index);
      }

      if (gridSize) state.gridSize = gridSize;
      if (originX) state.originX = originX;
      if (originY) state.originY = originY;

      state.movableTilesYArray = movableTilesYArray;
      state.movableTilesXArray = movableTilesXArray;
    },
  },
});

export const { setGrid } = gridSlice.actions;
export default gridSlice.reducer;
