import type { ButtonHTMLAttributes } from 'react';
import classes from './button.module.scss';
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export const Button = ({ text, ...props }: Props) => {
  return (
    <button
      className={props.className ? props.className : classes.default}
      {...props}
    >
      {text}
    </button>
  );
};
