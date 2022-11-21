import React, { useState } from 'react';
import classes from './mentorModal.module.scss';
import classNames from 'classnames';
import { ReactComponent as XIcon } from '@assets/xicon.svg';

interface IMentorModalPropsType {
  isOpen: boolean;
  setIsOpen: (e: boolean) => void;
  isCloseBtn?: boolean;
  children: React.ReactNode;
}

export function MentorModal({
  isOpen,
  setIsOpen,
  isCloseBtn = true,
  children,
}: IMentorModalPropsType) {
  return (
    <>
      {isOpen && (
        <section
          className={classNames(classes.modal, isOpen ? classes.open : '')}
        >
          <div className={classes.content}>
            {/*{isCloseBtn && (*/}
            {/*  <div*/}
            {/*    className={classes.closeBtn}*/}
            {/*    onClick={() => setIsOpen(!isOpen)}*/}
            {/*  >*/}
            {/*    <XIcon />*/}
            {/*  </div>*/}
            {/*)}*/}
            {children}
          </div>
        </section>
      )}
    </>
  );
}
