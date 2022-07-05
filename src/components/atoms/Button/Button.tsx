import React from 'react';
import classes from './button.module.scss';
import classNames from 'classnames';
interface ButtonProps {
  text: string;
  style?: {
    width?: string;
    backgroundColor?: string;
    border?: string;
    borderRadius?: string;
    color?: string;
  };
  icon?: JSX.Element;
  onClick?: (e: any) => void;
  disable?:boolean;
}

export function Button({
  text,
  style = { backgroundColor: '#fff', border: 'none', borderRadius: '10px' },
  icon,
  onClick,
  disable=false
}: ButtonProps) {
  const { width, backgroundColor, border, borderRadius, color } = style;
  return (
    <button
      onClick={!disable && onClick ? onClick:()=>{}}
      style={{
        width: width,
        backgroundColor: !disable? backgroundColor : "#EBEBEB",
        border: border,
        borderRadius: borderRadius,
        color: color,
      }}
      className={classNames(classes.button,!disable?classes.hover:"")}
    >
      {icon && <span className={classes.icon}>{icon}</span>}
      <span>{text}</span>
    </button>
  );
}
