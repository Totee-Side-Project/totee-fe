import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { Circle } from '../circle/Circle';
import classes from './checkbox.module.scss';

interface Props {
  top?: ReactNode;
  isChecked?: string;
  options: string[];
  onClick: (data: string) => void;
  className: string;
}

// single mode만 지원하는 상태
// 다수모드에서는?
// isCheckedId type이 array가 되면 될 것 같다.
export const Checkbox = ({
  top,
  isChecked,
  options,
  onClick,
  className,
}: Props) => {
  const [isCheckeds, setIsCheckeds] = useState(
    options.map((option, index) => ({ id: option, isChecked: false })),
  );
  const [isCheckedId, setIsCheckedId] = useState(!isChecked ? '' : isChecked);
  const handleClick = (key: string) => {
    if (isCheckedId === key) {
      setIsCheckedId('');
      onClick('');
      return;
    }
    // onClick(options[key]);
    onClick(key);
    setIsCheckedId(key);
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
              option={option}
              onClick={() => handleClick(option)}
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
  onClick,
}: {
  option: ReactNode;
  isSelected: boolean;
  onClick: () => void;
}) => {
  return (
    <span className={classes.label_wrap} onClick={onClick}>
      <Circle selected={isSelected} backgroundColor="#7BA364" />
      <label htmlFor={`check_${option}`}>{option}</label>
    </span>
  );
};
