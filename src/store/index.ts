import { configureStore } from '@reduxjs/toolkit';
import gridReducer from '@/reducers/grid';
import robotReducer from '@/reducers/robot';
import commandLineReducer from '@/reducers/commandlines';

export default configureStore({
  reducer: {
    grid: gridReducer,
    robot: robotReducer,
    commandLines: commandLineReducer,
  },
});
