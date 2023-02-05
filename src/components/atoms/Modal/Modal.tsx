/// <reference types="vite-plugin-svgr/client" />

import React from 'react';
import classes from './modal.module.scss';
import classNames from 'classnames';
import { ReactComponent as XIcon } from '@assets/svg/xicon.svg';

interface IModalPropsType {
  isOpen: boolean;
  setIsOpen: (e: boolean) => void;
  isCloseBtn?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Modal({
  isOpen,
  setIsOpen,
  isCloseBtn = true,
  children,
  className,
}: IModalPropsType) {
  const contentClassName = classNames(classes.content, className);

  return isOpen ? (
    <section className={classNames(classes.modal, isOpen ? classes.open : '')}>
      <div className={contentClassName}>
        {isCloseBtn && (
          <div className={classes.closeBtn} onClick={() => setIsOpen(!isOpen)}>
            <XIcon></XIcon>
          </div>
        )}
        {children}
      </div>
    </section>
  ) : null;
}
