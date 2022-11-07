import React from 'react';
import classes from './button.module.scss';
import classNames from 'classnames';
interface ButtonProps {
  text: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  style?: any;
  icon?: JSX.Element;
  onClick?: (e: any) => void;
  disable?: boolean;
}

export function Button({
  text,
  type = 'button',
  style = { backgroundColor: '#fff', border: 'none', borderRadius: '10px' },
  icon,
  onClick,
  disable = false,
}: ButtonProps) {
  // console.log(disable);
  return (
    <button
      onClick={!disable && onClick ? onClick : () => {}}
      type={type}
      style={{
        ...style,
      }}
      className={classNames(
        classes.button,
        disable ? classes.disable : classes.hover,
      )}
    >
      {icon && <span className={classes.icon}>{icon}</span>}
      <span>{text}</span>
    </button>
  );
}
