import React, { CSSProperties } from 'react';

import { GridComponentProps } from '@/types';
import cn from 'classnames';

export default function Grid(props: GridComponentProps) {
  const {
    robotEl,
    robotX,
    robotY,
    gridSize,
    movableTilesXArray,
    movableTilesYArray,
  } = props;

  const generateLabels = () => (
    <div className="grid-labels">
      {movableTilesYArray.map((y, indxY) => (
        <div key={`ykey_${y}`} className="grid-labels__row">
          {movableTilesXArray.map((x, indxX) => (
            <div
              key={`xkey_${x}`}
              className={cn(`grid-labels__cell`, {
                'grid-labels__cell--active':
                  indxX === robotX && indxY === robotY,
              })}
            >
              <span className="label">
                {x},{y}
              </span>
              <span className="real-origin">
                {indxX}, {indxY}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
  return (
    <div
      className="grid-container"
      style={
        {
          '--grid-size': `${gridSize}`,
        } as CSSProperties
      }
    >
      <div className="grid">
        {generateLabels()}
        {robotEl}
      </div>
      <div className="grid-guide">
        <p>Hover on the cells to know the actual grid cell coordinates</p>
      </div>
    </div>
  );
}

Grid.defaultProps = {
  robotEl: null,
};
