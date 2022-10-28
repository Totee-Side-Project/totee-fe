import { ChangeEvent, HTMLInputTypeAttribute, ReactNode } from 'react';
interface Props {
  className: string;
  top: ReactNode;
  leftValue: ReactNode;
  type: HTMLInputTypeAttribute;
  value: string | number;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

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
