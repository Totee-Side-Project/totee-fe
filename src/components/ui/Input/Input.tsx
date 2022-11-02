import { ChangeEvent, HTMLInputTypeAttribute, ReactNode } from 'react';
import './input.css';
// why inline style ?? 해당 파일 코드 하나만 복사하면 어느 프로젝트에서든 재사용할 수 있도록 하기 위해서

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

interface Props {
  type: HTMLInputTypeAttribute;
  className?: string;
  placeholder: string;
  top?: ReactNode;
  leftValue?: ReactNode;
  value: string | number;
  max?: number;
  min?: number;
  onChange: (e: ChangeEvent<HTMLInputElement>, key?: string) => void;
}

export const Input = ({ className, top, leftValue, ...props }: Props) => {
  return (
    <div className="input_container">
      {top}
      <div className={className} style={styleFlex}>
        {leftValue}
        <input
          style={{
            ...styleFullSize,
            ...styleNoneBorder,
            ...styleNoneSpinButton,
          }}
          {...props}
        />
      </div>
    </div>
  );
};
