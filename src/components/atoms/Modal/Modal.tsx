import React from 'react';
import classes from './modal.module.scss';

interface IModalPropsType {
  children: React.ReactNode;
}

export function Modal({ children }: IModalPropsType) {
  return (
    <div className={classes.background}>
      <div className={classes.container}>{children}</div>
    </div>
  );
}
