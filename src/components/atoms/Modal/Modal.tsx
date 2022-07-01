/// <reference types="vite-plugin-svgr/client" />

import React, { useState } from 'react';
import classes from './modal.module.scss';
import classNames from 'classnames';
import {ReactComponent as XIcon} from '@assets/xicon.svg';


interface IModalPropsType {
  isOpen: boolean;
  setIsOpen : (e:boolean)=>void;
  children: React.ReactNode;
}

export function Modal({ isOpen, setIsOpen, children }: IModalPropsType) {
  
  return (
    <>
      <section
        className={classNames(classes.modal, isOpen ? classes.open : '')}
      >
        <div className={classes.content}>
          <div 
            className={classes.closeBtn}
            onClick={()=>setIsOpen(!isOpen)}
          >
            <XIcon></XIcon>
          </div>
          {isOpen&&
            <>
            {children}
            </>
          }
        </div>
      </section>
    </>
  );
}
