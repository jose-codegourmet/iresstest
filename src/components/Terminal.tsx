import React, { useState, useRef, useEffect } from 'react';
import { commandValidator } from '@/utils/commandValidator';
import { useSelector } from 'react-redux';
import {
  clearLines,
  pushLines,
  ReducerCommandLineState,
} from '@/reducers/commandlines';
import {
  moveRobot,
  placeRobot,
  removeRobot,
  rotateRobot,
} from '@/reducers/robot';
import {
  moveInterpretter,
  placeInterpretter,
  rotateInterpretter,
} from '@/utils/commandInterpreter';
import { setGrid } from '@/reducers/grid';
import { cmdLineCreateReport } from '@/utils/cmdLineCreateReport';
import { cmdLineCreateHelp } from '@/utils/cmdLineCreateHelp';

export default function Terminal(props) {
  const {
    dispatch,
    gridSize,
    robotConfig,
    movableTilesYArray,
    movableTilesXArray,
  } = props;
  const terminalLinesEl = useRef(null);

  const commandLines = useSelector(
    (state: ReducerCommandLineState) => state.commandLines.lines,
  );
  const [currCommand, setCurrCommand] = useState<string>(``);

  const handleFireCommand = (e) => {
    e.preventDefault();
    const cmd = currCommand;
    if (cmd === ``) return;
    const cmdFunction: string = cmd.split(` `)[0];
    const validatorGridSize: number = gridSize - 1; // since grid starts with 0 tile

    const updateCommandLines = (lines) => {
      dispatch(
        pushLines([
          {
            id: `${Date.now().valueOf()}`,
            message: cmd,
            type: `info`,
          },
          ...lines,
        ]),
      );
    };

    const errors = commandValidator({
      cmdArg: cmd,
      gridSize: validatorGridSize,
      robotConfig,
      movableTilesYArray,
      movableTilesXArray,
    });

    setCurrCommand(``);

    if (errors.length > 0) {
      updateCommandLines([
        {
          id: `${Date.now().valueOf()}`,
          message: cmd,
          type: `info`,
        },
        ...errors,
      ]);

      return;
    }

    if (cmdFunction === `CLEAR`) {
      dispatch(clearLines());
      dispatch(removeRobot());
    }

    if (cmdFunction === `SET_ORIGIN`) {
      const position: string = cmd.split(` `)[1];
      const [argOriginX, argOriginY]: Array<string> = position.split(`,`);
      const originX = Number(argOriginX);
      const originY = Number(argOriginY);

      dispatch(
        setGrid({
          originX,
          originY,
        }),
      );

      updateCommandLines([
        {
          id: `${Date.now().valueOf()}`,
          message: `New origin is at x = ${argOriginX} y = ${argOriginY}`,
          type: `success`,
        },
      ]);
    }

    if (cmdFunction === `PLACE`) {
      const position: string = cmd.split(` `)[1];
      const {
        message,
        position: { posX, posY, posF },
      } = placeInterpretter({
        position,
        movableTilesYArray,
        movableTilesXArray,
      });

      dispatch(placeRobot({ posX, posY, posF }));
      updateCommandLines([
        {
          id: `${Date.now().valueOf()}`,
          message,
          type: `success`,
        },
      ]);
    }

    if (cmdFunction === `MOVE`) {
      const {
        message,
        position: { posX, posY },
      } = moveInterpretter({
        robotConfig,
        movableTilesYArray,
        movableTilesXArray,
      });

      dispatch(moveRobot({ posX, posY }));
      updateCommandLines([
        {
          id: `${Date.now().valueOf()}`,
          message,
          type: `success`,
        },
      ]);
    }

    if (cmdFunction === `LEFT` || cmdFunction === `RIGHT`) {
      const {
        message,
        position: { posF },
      } = rotateInterpretter(cmdFunction, { ...robotConfig });

      updateCommandLines([
        {
          id: `${Date.now().valueOf()}`,
          message,
          type: `success`,
        },
      ]);

      dispatch(rotateRobot({ posF }));
    }

    if (cmdFunction === `REPORT`) {
      updateCommandLines([
        {
          id: `${Date.now().valueOf()}`,
          message: cmdLineCreateReport({
            robotConfig,
            movableTilesXArray,
            movableTilesYArray,
          }),
          type: `info`,
        },
      ]);
    }

    if (cmdFunction === `HELP`) {
      updateCommandLines([
        {
          id: `${Date.now().valueOf()}`,
          message: cmdLineCreateHelp({ gridSize }),
          type: `info`,
        },
      ]);
    }
  };

  const handleKeyPress = (e) => {
    setCurrCommand(e.target.value.toUpperCase());
  };

  useEffect(() => {
    const el = terminalLinesEl.current;
    if (el) {
      setTimeout(() => {
        el.scrollTop = el.scrollHeight;
      }, 100);
    }
  }, [commandLines, terminalLinesEl]);

  return (
    <div className="terminal">
      <div className="terminal__commands" ref={terminalLinesEl}>
        {commandLines.map(({ id, message, type }, indx) => (
          <p
            key={`cmd_${id}-${type}-${indx}`}
            className={`terminal__line terminal__line--${type}`}
          >
            <span className="terminal__line-prefix"> Iress Exam {`>>`} </span>
            <span className="terminal__line-cmd">{message}</span>
          </p>
        ))}
      </div>
      <form onSubmit={handleFireCommand} className="terminal__field">
        <span className="terminal__line-prefix"> Iress Exam {`>>`} </span>
        <input
          type="text"
          value={currCommand}
          placeholder="Enter a command ..."
          onChange={handleKeyPress}
        />
      </form>
    </div>
  );
}

Terminal.defaultProps = {
  commandLines: [],
};
