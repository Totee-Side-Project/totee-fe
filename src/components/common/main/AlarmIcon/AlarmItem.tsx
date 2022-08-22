import React from 'react';
import classes from './alarmIcon.module.scss';
import { useNavigate } from 'react-router-dom';
import { Alarm } from 'types/alarm.types';
import { handleTime } from '@utils/handleTime';
import { useUpdateAlarm } from '@hooks/useMutateQuery';

interface Props {
  alarm: Alarm;
  onClose: () => void;
}

export default function AlarmItem({ alarm, onClose }: Props) {
  const alarmMutation = useUpdateAlarm(`${alarm.notificationId}`);
  const navigate = useNavigate();
  const onClick = async () => {
    // const result = await alarmMutation.mutateAsync();

    navigate(`/detail/${alarm.postId}`);
    onClose();
  };
  return (
    <div className={classes.alarmItem} onClick={onClick}>
      <p>{alarm.content}</p>
      <p className={classes.alarmDate}>{handleTime(alarm.createdAt)}</p>
    </div>
  );
}
