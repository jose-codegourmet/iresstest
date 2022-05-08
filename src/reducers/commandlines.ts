import { CommandLineTypes } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

export interface ReducerCommandLineState {
  commandLines: {
    lines: Array<CommandLineTypes>;
  };
}

export const commandlineSlice = createSlice({
  name: `commandline`,
  initialState: {
    lines: [],
  },
  reducers: {
    pushLines: (state, action) => {
      const { lines } = state;
      state.lines = [...lines, ...action.payload];
    },
    clearLines: (state) => {
      state.lines = [];
    },
  },
});

export const { pushLines, clearLines } = commandlineSlice.actions;
export default commandlineSlice.reducer;
