import { ReactNode } from 'react';

export type FaceType = 'NORTH' | 'SOUTH' | 'EAST' | 'WEST';
export interface BaseComponentProps {
  children?: ReactNode;
}
export interface RobotComponentProps {
  face: string;
  positionX: number;
  positionY: number;
}

export interface commandLineType {
  id?: string;
  message?: string;
  type?: 'info' | 'success' | 'error' | 'warning';
}
