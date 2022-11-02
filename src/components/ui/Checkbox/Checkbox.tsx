import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { Circle } from '../circle/Circle';
import classes from './checkbox.module.scss';

interface Props {
  top?: ReactNode;
  options: string[];
  onClick: (data: string) => void;
  className: string;
}

// single mode만 지원하는 상태
// 다수모드에서는?
// isCheckedId type이 array가 되면 될 것 같다.
export const Checkbox = ({ top, options, onClick, className }: Props) => {
  const [isCheckeds, setIsCheckeds] = useState(
    options.map((option, index) => ({ id: index, isChecked: false })),
  );
  const [isCheckedId, setIsCheckedId] = useState(-1);
  const handleClick = (idx: number) => {
    if (isCheckedId === idx) {
      setIsCheckedId(-1);
      onClick('');
      return;
    }
    onClick(options[idx]);
    setIsCheckedId(idx);
  };

  useEffect(() => {
    setIsCheckeds((oldState) =>
      oldState.map(({ id }) => ({
        id,
        isChecked: isCheckedId === id ? true : false,
      })),
    );
  }, [isCheckedId]);

  return (
    <>
      {top}
      {options.map((option, idx) => (
        <span className={className} key={option + idx}>
          <span className={classes.checkbox_wrap}>
            <input
              className={classes.checkbox}
              type="checkbox"
              id={`check_${option}`}
            ></input>
            <Trigger
              isSelected={isCheckeds[idx].isChecked}
              idx={idx}
              option={option}
              onClick={handleClick}
            />
          </span>
        </span>
      ))}
    </>
  );
};

const Trigger = ({
  option,
  isSelected,
  idx,
  onClick,
}: {
  option: ReactNode;
  isSelected: boolean;
  idx: number;
  onClick: (data: any) => void;
}) => {
  return (
    <span className={classes.label_wrap} onClick={() => onClick(idx)}>
      <Circle selected={isSelected} backgroundColor="#7BA364" />
      <label htmlFor={`check_${option}`}>{option}</label>
    </span>
  );
};
