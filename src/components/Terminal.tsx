import React, { useState, useMemo, useRef } from 'react';

import { commandLineType } from '@/types';

interface GridComponentProps {
  commandLines?: Array<commandLineType>;
  fireCommand: (string) => void;
}

export default function Terminal(props: GridComponentProps) {
  const terminalLinesEl = useRef(null);
  const { commandLines, fireCommand } = props;
  const [currCommand, setCurrCommand] = useState<string>(``);

  const handleFireCommand = (e) => {
    e.preventDefault();
    fireCommand(currCommand);
    setCurrCommand(``);
  };

  const handleKeyPress = (e) => {
    setCurrCommand(e.target.value.toUpperCase());
  };

  useMemo(() => {
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
        {commandLines.map(({ id, message, type }) => (
          <p
            key={`cmd_${id}`}
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
