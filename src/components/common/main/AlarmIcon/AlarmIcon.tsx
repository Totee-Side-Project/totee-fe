import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AlarmIconProps } from 'types/icon.types';
import classes from './alarmIcon.module.scss';
import { useOutsideAlerter } from '@hooks/useOutsideAlerter';
import alarm from '@assets/svg/alarmicon.svg';
import { useGetAlarm } from '@hooks/query/useGetQuery';
import AlarmList from './AlarmList';

export function AlarmIcon({ isShowAlarm, setIsShowAlarm }: AlarmIconProps) {
  const { data, isFetching } = useGetAlarm();

  const [alarmCount, setAlarmCount] = useState(0);
  const AlarmRef = useRef(null as any);

  const NoReadAlarmCount = useMemo(
    () =>
      data?.data.body.data.filter((alarm: any) => alarm.isRead === 'N').length,
    [data],
  );

  useEffect(() => {
    if (data?.status === 200) {
      setAlarmCount(NoReadAlarmCount);
    }
  }, [data, NoReadAlarmCount]);

  useOutsideAlerter(AlarmRef, () => {
    setIsShowAlarm(false);
  });

  return (
    <>
      <span ref={AlarmRef}>
        <div
          className={classes.alarmFlex}
          onClick={() => setIsShowAlarm(!isShowAlarm)}
        >
          <img src={alarm} className={classes.alarmIcon} />
          <div className={classes.alarmCount}>{alarmCount}</div>
        </div>
        {isShowAlarm && (
          <AlarmList
            alarms={data?.data.body.data}
            onClickClose={() => setIsShowAlarm(!isShowAlarm)}
          />
        )}
      </span>
    </>
  );
}
