import React, { ReactNode } from 'react';

interface GridComponentProps {
  robotEl?: ReactNode;
}

export default function Grid(props: GridComponentProps) {
  const { robotEl } = props;
  return (
    <div className="grid-container">
      <div className="grid">{robotEl}</div>
    </div>
  );
}

Grid.defaultProps = {
  robotEl: null,
};
