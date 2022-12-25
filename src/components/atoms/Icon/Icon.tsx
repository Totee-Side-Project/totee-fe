import type { ImgHTMLAttributes } from 'react';
import classes from './icon.module.scss';

interface Props extends ImgHTMLAttributes<HTMLImageElement> {}

export const Icon = (props: Props) => {
  return <img className={classes.icon} {...props} />;
};
