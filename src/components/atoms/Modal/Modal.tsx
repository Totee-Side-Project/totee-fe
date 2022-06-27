import React, { useState } from 'react';
import classes from './modal.module.scss';
import classNames from 'classnames';
interface IModalPropsType {
  isOpen: boolean;
  children: React.ReactNode;
}

export function Modal({ isOpen, children }: IModalPropsType) {
  return (
    <>
      <section
        className={classNames(classes.modal, isOpen ? classes.open : '')}
      >
        <div className={classes.content}>{children}</div>
      </section>
    </>
  );
}
