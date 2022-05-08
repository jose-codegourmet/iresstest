import { RobotConfigType } from '@/types';

type CmdLineCreateReportType = {
  robotConfig: RobotConfigType;
  movableTilesXArray: Array<number>;
  movableTilesYArray: Array<number>;
};

export function cmdLineCreateReport({
  robotConfig,
  movableTilesXArray,
  movableTilesYArray,
}: CmdLineCreateReportType) {
  return `
    \n\n\n
    ============================================= \n
          Robot Report: \n
    ============================================= \n
    Position X  = ${movableTilesXArray[robotConfig.positionX]} \n
    Position Y = ${movableTilesYArray[robotConfig.positionY]} \n
    Facing = ${robotConfig.face}
    \n\n\n
  `;
}
