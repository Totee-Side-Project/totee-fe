import React, { useState } from 'react';
import classes from './editmodal.module.scss';
import classNames from 'classnames';

interface IEditModalPropsType {
  isOpen: boolean;
  setIsOpen: (e: boolean) => void;
  isCloseBtn?: boolean;
  children: React.ReactNode;
}

export function EditModal({
  isOpen,
  setIsOpen,
  isCloseBtn = true,
  children,
}: IEditModalPropsType) {
  return (
    <>
      <section
        className={classNames(classes.modal, isOpen ? classes.open : '')}
      >
        <div className={classes.content}>
          {isCloseBtn && (
            <div
              className={classes.closeBtn}
              onClick={() => setIsOpen(!isOpen)}
            ></div>
          )}
          {isOpen && <>{children}</>}
        </div>
      </section>
    </>
  );
}
