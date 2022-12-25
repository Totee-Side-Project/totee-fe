import type { ButtonHTMLAttributes, ReactNode } from 'react';
import classes from './button.module.scss';
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  left?: ReactNode;
  center: ReactNode;
  right?: ReactNode;
}

export const Button = ({ left, center, right, ...props }: Props) => {
  return (
    <button
      className={props.className ? props.className : classes.default}
      {...props}
    >
      {left}
      {center}
      {right}
    </button>
  );
};
