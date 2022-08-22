import { useEffect } from 'react';
import classes from './alarmIcon.module.scss';
import CloseIcon from '../../../assets/xicon.svg';
import DownIcon from '../../../assets/dropdown_down.svg';
import { useGetAlarm } from '@hooks/useGetQuery';
import AlarmItem from './AlarmItem';

interface Props {
  onClickClose: () => void;
}

export default function AlarmList({ onClickClose }: Props) {
  const { data, isFetching } = useGetAlarm();

  const showNoAlarmList = () => {
    return <p className={classes.emptyContent}>아직 새로운 소식이 없어요.</p>;
  };

  return (
    <div className={classes.alarmWrapper}>
      <div className={classes.alarmContainer}>
        <div>
          <div onClick={onClickClose} className={classes.closeIcon}>
            <img src={CloseIcon} width={25} height={25} />
          </div>
          <div className={classes.alarmTitle}>알림</div>
        </div>
        <section className={classes.alarmContent}>
          <ul>
            {data?.data.body.data.length === 0
              ? showNoAlarmList()
              : data?.data.body.data.map((alarm: any) => (
                  <AlarmItem
                    key={`alarm-${alarm.notificationId}`}
                    alarm={alarm}
                  />
                ))}
            {/*알림이 많을 경우*/}
            <p className={classes.scrollBtn}>
              <img src={DownIcon} className={classes.DownIcon} />
            </p>
          </ul>
        </section>
      </div>
    </div>
  );
}
