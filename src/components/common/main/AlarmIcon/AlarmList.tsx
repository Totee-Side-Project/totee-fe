import { useEffect } from 'react';
import classes from './alarmIcon.module.scss';
import CloseIcon from '@assets/xicon.svg';
import DownIcon from '@assets/dropdown_down.svg';
import { useGetAlarm } from '@hooks/useGetQuery';
import AlarmItem from './AlarmItem';

interface Props {
  onClickClose: () => void;
}

export default function AlarmList({ onClickClose }: Props) {
  const { data, isFetching } = useGetAlarm();

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
            {data?.data.body.data.filter((alarm: any) => alarm.isRead === 'N')
              .length === 0 ? (
              <p className={classes.emptyContent}>아직 새로운 소식이 없어요.</p>
            ) : (
              data?.data.body.data.map((alarm: any) => {
                if (alarm.isRead === 'Y') return;
                return (
                  <AlarmItem
                    key={`alarm-${alarm.notificationId}`}
                    alarm={alarm}
                    onClose={() => onClickClose()}
                  />
                );
              })
            )}
            {/*알림이 많을 경우*/}
            {data?.data.body.data.length > 4 && (
              <p className={classes.scrollBtn}>
                <img src={DownIcon} className={classes.DownIcon} />
              </p>
            )}
          </ul>
        </section>
      </div>
    </div>
  );
}
