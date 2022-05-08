import { ReactNode } from 'react';

export type FaceType = 'NORTH' | 'SOUTH' | 'EAST' | 'WEST';

export interface RobotConfigType {
  face: string;
  positionX: number;
  positionY: number;
}

export interface CommandLineTypes {
  id?: string;
  message?: string;
  type?: string;
}

export interface MovableTypes {
  movableTilesXArray: Array<number>;
  movableTilesYArray: Array<number>;
}
export interface BaseComponentProps {
  children?: ReactNode;
}

export type RobotComponentProps = RobotConfigType;
export interface GridComponentProps extends MovableTypes {
  robotX?: number;
  robotY?: number;
  robotEl?: ReactNode;
  gridSize: number;
}

export interface SimulatorProps {
  gridSize: number;
}

export interface OriginType {
  originX: number;
  originY: number;
}

export interface CommandValidatorType extends MovableTypes {
  cmdArg: string;
  gridSize: number;
  robotConfig: RobotComponentProps;
}

export interface PlaceInterpretterType extends MovableTypes {
  position: string;
}

export interface MoveInterpretterType extends MovableTypes {
  robotConfig: RobotComponentProps;
}

type ParamsConfigType = {
  name: string;
  isRequire: boolean;
  type: 'whole  number' | 'string' | 'faces';
  validator?: () => string;
};
export interface commandEntityValidatorType {
  command: string;
  params: string;
  paramsConfig: Array<ParamsConfigType>;
}
