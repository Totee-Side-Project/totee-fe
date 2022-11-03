import { ImgHTMLAttributes } from 'react';
import classes from './icon.module.scss';

interface Props extends ImgHTMLAttributes<HTMLImageElement> {}

export const NewIcon = (props: Props) => {
  return <img className={classes.icon} {...props} />;
};
