import React, { CSSProperties } from 'react';
import { RobotComponentProps } from '@/types';

export default function Robot(props: RobotComponentProps) {
  const { face, positionX, positionY } = props;
  return (
    <div
      className={`robot robot--${face}`}
      style={
        {
          '--positionX': `${positionX}em`,
          '--positionY': `${positionY}em`,
        } as CSSProperties
      }
    >
      🤖
    </div>
  );
}
