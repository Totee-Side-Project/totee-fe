import React, { useRef } from 'react';
import { AlarmIconProps } from 'types/icon.types';
import classes from './alarmIcon.module.scss';
import { useOutsideAlerter } from '@hooks/useOutsideAlerter';
import alarm from '@assets/alarmicon.svg';

import AlarmList from './AlarmList';

export function AlarmIcon({ isShowAlarm, setIsShowAlarm }: AlarmIconProps) {
  const AlarmRef = useRef(null as any);

  useOutsideAlerter(AlarmRef, () => {
    setIsShowAlarm(false);
  });

  return (
    <>
      <span ref={AlarmRef}>
        <div className={classes.flex}>
          <img
            src={alarm}
            className={classes.alarmIcon}
            onClick={() => setIsShowAlarm(!isShowAlarm)}
          />
        </div>
        {isShowAlarm && (
          <AlarmList onClickClose={() => setIsShowAlarm(!isShowAlarm)} />
        )}
      </span>
    </>
  );
}
