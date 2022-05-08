import React, { useEffect } from 'react';
import Grid from '@/components/Grid';
import Robot from '@/components/Robot';
import Terminal from '@/components/Terminal';

import { SimulatorProps } from '@/types';
import { useDispatch, useSelector } from 'react-redux';

import { setGrid, ReducerGridState } from '@/reducers/grid';
import { ReducerRobotState } from '@/reducers/robot';

export default function Simulator(props: SimulatorProps) {
  const { gridSize } = props;

  const dispatch = useDispatch();

  const grid = useSelector((state: ReducerGridState) => state.grid);
  const robotConfig = useSelector(
    (state: ReducerRobotState) => state.robot.position,
  );

  useEffect(() => {
    dispatch(setGrid({ gridSize }));
  }, [gridSize]);

  return (
    <div className="simulator">
      {robotConfig ? (
        <Grid
          gridSize={gridSize}
          robotX={robotConfig.positionX}
          robotY={robotConfig.positionY}
          movableTilesYArray={grid.movableTilesYArray}
          movableTilesXArray={grid.movableTilesXArray}
          robotEl={
            <Robot
              face={robotConfig.face}
              positionX={robotConfig.positionX}
              positionY={robotConfig.positionY}
            />
          }
        />
      ) : (
        <Grid
          gridSize={gridSize}
          movableTilesYArray={grid.movableTilesYArray}
          movableTilesXArray={grid.movableTilesXArray}
        />
      )}

      <Terminal
        dispatch={dispatch}
        robotConfig={robotConfig}
        gridSize={gridSize}
        movableTilesYArray={grid.movableTilesYArray}
        movableTilesXArray={grid.movableTilesXArray}
      />
    </div>
  );
}

Simulator.defaultProps = {};
