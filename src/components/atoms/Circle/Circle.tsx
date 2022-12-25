import type { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLDivElement> {
  selected: boolean;
  backgroundColor?: string;
}

import classes from './circle.module.scss';

// background color를 넘겨줄 경우 인라인으로 덮어씌워준다
export const Circle = ({ selected = false, backgroundColor }: Props) => {
  return (
    <div className={classes.outer_circle}>
      <div
        className={
          selected
            ? classes.inner_circle + ' ' + classes.select
            : classes.inner_circle
        }
        style={{ backgroundColor: selected ? backgroundColor : '' }}
      ></div>
    </div>
  );
};
