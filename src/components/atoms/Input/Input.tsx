import {
  ChangeEvent,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  ReactNode,
  useEffect,
} from 'react';
import classes from './input.module.scss';

const styleFlex = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const styleFullSize = {
  width: '100%',
  height: '100%',
};
const styleNoneBorder = {
  width: '100%',
  height: '100%',
  border: 0,
  outline: 'none',
};

const styleNoneSpinButton = {
  // WebkitAppearance:,
};

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  type: HTMLInputTypeAttribute;
  className?: string;
  placeholder: string;
  label?: string;
  top?: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
  bottom?: ReactNode;
  disabled?: boolean;
  value: string | number;
  max?: number;
  min?: number;
  onChange?: (e: ChangeEvent<HTMLInputElement>, key?: string) => void;
  onResetInputValue?: () => void;
}

// 추가해야할 기능
// left right 가 있을 경우에 focus시 border color가 변경되지 않는다.
export const Input = ({
  className,
  top,
  left,
  bottom,
  right,
  disabled,
  onResetInputValue,
  ...props
}: Props) => {
  useEffect(() => {
    if (disabled && onResetInputValue) onResetInputValue();
  }, [disabled]);
  return (
    <div className="input_container">
      {top}
      {left || right ? (
        <div
          className={className ? className : classes.default_input_wrap}
          style={styleFlex}
        >
          {left}
          <input
            style={{
              ...styleFullSize,
              ...styleNoneBorder,
              ...styleNoneSpinButton,
            }}
            disabled={disabled}
            {...props}
          />
          {right}
        </div>
      ) : (
        <input
          className={classes.default_input}
          style={{
            ...styleFullSize,
          }}
          {...props}
        />
      )}
      {bottom}
    </div>
  );
};
