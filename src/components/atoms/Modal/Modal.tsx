/// <reference types="vite-plugin-svgr/client" />

import React from 'react';
import classes from './modal.module.scss';
import classNames from 'classnames';
import { ReactComponent as XIcon } from '@assets/svg/xicon.svg';

interface IModalPropsType {
  isOpen: boolean;
  closeModal?: () => void;
  isCloseBtn?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Modal({
  isOpen,
  closeModal,
  isCloseBtn = true,
  children,
  className,
}: IModalPropsType) {
  const contentClassName = classNames(classes.content, className);

  return isOpen ? (
    <section className={classNames(classes.modal, isOpen ? classes.open : '')}>
      <div className={contentClassName}>
        {isCloseBtn && (
          <div className={classes.closeBtn} onClick={closeModal}>
            <XIcon></XIcon>
          </div>
        )}
        {children}
      </div>
    </section>
  ) : null;
}
