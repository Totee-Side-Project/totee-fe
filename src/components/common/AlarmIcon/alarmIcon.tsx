import ScrollTopBtn from '@assets/scrolltopBtn.svg';
import React, { useRef } from 'react';
import { AlarmIconProps } from 'types/icon.types';
import classes from './alarmIcon.module.scss';
import { useOutsideAlerter } from '@hooks/useOutsideAlerter';
import alarm from '../../../assets/alarmicon.svg';
import DownIcon from '../../../assets/dropdown_down.svg';
import close from '../../../assets/xicon.svg';

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
            className="alarmIcon"
            onClick={() => setIsShowAlarm(!isShowAlarm)}
          />
        </div>
        {isShowAlarm && (
          <div className={classes.alarmWrapper}>
            <div className={classes.alarmContainer}>
              <div>
                <div
                  onClick={() => setIsShowAlarm(!isShowAlarm)}
                  className={classes.closeIcon}
                >
                  <img src={close} width={25} height={25} />
                </div>
                <div className={classes.alarmTitle}>알림</div>
              </div>
              <section className={classes.alarmContent}>
                <ul>
                  {/*알림이 없을 경우*/}
                  {/*<p className={classes.emptyContent}>*/}
                  {/*  아직 새로운 소식이 없어요.*/}
                  {/*</p>*/}
                  <div>
                    <p>누구님이 게시글에 좋아요를 남겼습니다.</p>
                    <p>누구님이 게시글에 좋아요를 남겼습니다.</p>
                    <p className={classes.alarmDate}>1일전</p>
                  </div>
                  <div>
                    <p>누구님이 게시글에 좋아요를 남겼습니다.</p>
                    <p>누구님이 게시글에 좋아요를 남겼습니다.</p>
                    <p className={classes.alarmDate}>1일전</p>
                  </div>
                  <div>
                    <p>누구님이 게시글에 좋아요를 남겼습니다.</p>
                    <p>누구님이 게시글에 좋아요를 남겼습니다.</p>
                    <p className={classes.alarmDate}>1일전</p>
                  </div>
                  <div>
                    <p>누구님이 게시글에 좋아요를 남겼습니다.</p>
                    <p>누구님이 게시글에 좋아요를 남겼습니다.</p>
                    <p className={classes.alarmDate}>1일전</p>
                  </div>
                  <div>
                    <p>누구님이 게시글에 좋아요를 남겼습니다.</p>
                    <p>누구님이 게시글에 좋아요를 남겼습니다.</p>
                    <p className={classes.alarmDate}>1일전</p>
                  </div>
                </ul>
                {/*알림이 많을 경우*/}
                <p className={classes.scrollBtn}>
                  <img src={DownIcon} className={classes.DownIcon} />
                </p>
              </section>
            </div>
          </div>
        )}
      </span>
    </>
  );
}
