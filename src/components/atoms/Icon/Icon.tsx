import classNames from 'classnames';
import type { ImgHTMLAttributes } from 'react';
import classes from './icon.module.scss';

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
}

export const Icon = (props: Props) => {
  const newClassName = classNames([classes.icon, props.className]);
  return <img className={newClassName} {...props} />;
};
