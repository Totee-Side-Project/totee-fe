import type { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLDivElement> {
  selected?: boolean;
  backgroundColor?: string;
  options?: {
    outCircle: boolean;
  };
}

import classes from './circle.module.scss';

// background color를 넘겨줄 경우 인라인으로 덮어씌워준다
export const Circle = ({
  selected = false,
  backgroundColor,
  options = { outCircle: true },
  ...props
}: Props) => {
  if (!options.outCircle) {
    return (
      <div className={classes.non_outer_circle} {...props}>
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
  }
  return (
    <div className={classes.outer_circle} {...props}>
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
