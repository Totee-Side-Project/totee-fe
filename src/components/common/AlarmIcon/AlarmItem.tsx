import React from 'react';
import classes from './alarmIcon.module.scss';
import { Alarm } from 'types/alarm.types';
import { handleTime } from '@utils/handleTime';

interface Props {
  alarm: Alarm;
}

export default function AlarmItem({ alarm }: Props) {
  return (
    <div className={classes.alarmItem}>
      <p>{alarm.content}</p>
      <p className={classes.alarmDate}>{handleTime(alarm.createdAt)}</p>
    </div>
  );
}
