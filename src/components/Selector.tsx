import { SyntheticEvent, Fragment, useState } from 'react';

interface Props {
  option: number;
  options: string[];
  id: string;
  setOption(opt: number): void;
}

function Selector({ options, id, option, setOption }: Props) {
  const [hasFocus, setHasFocus] = useState(false);

  const onClick = (e: SyntheticEvent) => {
    const { target } = e;
    setOption(parseInt(target.htmlFor, 10));
  };

  return (
    <div className="select-box">
      <div
        className="select-box__current"
        tabIndex={0}
        role="menuitem"
        onBlur={() => {
          setHasFocus(false);
        }}
        onClick={() => {
          if (hasFocus) {
            const a = document.activeElement as HTMLElement;
            a.blur();
          } else {
            setHasFocus(true);
          }
        }}
        aria-hidden
      >
        <div className="select-box__value">
          {options.map((opt, i) => (
            <Fragment key={opt}>
              <input
                className="select-box__input"
                type="radio"
                id={`${id}_${i}`}
                value={opt}
                name={`${id}_${i}`}
                checked={i === option}
                readOnly
              />
              <p className="select-box__input-text">{opt}</p>
            </Fragment>
          ))}
        </div>
        <i className="fas fa-chevron-up select-box__icon" />
      </div>
      <ul className="select-box__list">
        {options.map((opt, i) => (
          <li key={`${opt}_li`} onClick={onClick} aria-hidden>
            <label className="select-box__option" htmlFor={`${i}`} aria-hidden>
              {opt}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Selector;
