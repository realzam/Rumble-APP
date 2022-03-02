import classNames from 'classnames';
import { nanoid } from 'nanoid';

interface Props {
  select: number;
  options: string[];
  setMode(opc: number): void;
}

function Selector({ select, options, setMode }: Props) {
  return (
    <div className="selectorConainer">
      {options.map((opc, i) => (
        <div
          className={classNames({ selectorItemOn: i === select })}
          onClick={() => {
            setMode(i);
          }}
          aria-hidden
          key={nanoid(5)}
        >
          {opc}
        </div>
      ))}
    </div>
  );
}

export default Selector;
