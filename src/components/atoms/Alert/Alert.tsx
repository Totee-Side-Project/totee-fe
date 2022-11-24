import React from 'react';
import classes from './alert.module.scss';

interface IAlertProps {
  text: string;
}

export function Alert({ text }: IAlertProps) {
  return (
    <div className={classes.alert_wrapper}>
      <div className={classes.body}>{text}</div>
    </div>
  );
}
