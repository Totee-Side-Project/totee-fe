import React from 'react';
import classes from './icon.module.scss';
import Background from '@assets/background-image.png';
import {IIconProps} from 'types/icon.types';

export function Icon({imageUrl, style, onClick}:IIconProps) {
  return (
    <div
        className={classes.icon}
        style={{...style, 
            backgroundRepeat:"no-repeat", 
            backgroundSize:"cover", 
            backgroundImage:`url(${ imageUrl })`}}
        onClick={onClick}
    >
    </div>
  )
}
