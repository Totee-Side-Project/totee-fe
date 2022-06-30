import React from 'react';
import classes from './button.module.scss';

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
}

export function Button({
  text,
  style = { backgroundColor: '#fff', border: 'none', borderRadius: '10px' },
  icon,
  onClick,
}: ButtonProps) {
  const { width, backgroundColor, border, borderRadius, color } = style;
  return (
    <button
      onClick={onClick && onClick}
      style={{
        width: width,
        backgroundColor: backgroundColor,
        border: border,
        borderRadius: borderRadius,
        color: color,
      }}
      className={classes.button}
    >
      {icon && <span className={classes.icon}>{icon}</span>}
      <span>{text}</span>
    </button>
  );
}
