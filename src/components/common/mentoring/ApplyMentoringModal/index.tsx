import { ChangeEvent, MouseEventHandler, useState } from 'react';
import { ReactComponent as XIcon } from '@assets/svg/xicon.svg';
import { IMentoring } from 'types/api.types';
import classes from './index.module.scss';
import DropDown from '@components/common/dropdown';
import Checkbox from '@components/atoms/Checkbox';
import { useEffect } from 'react';
import { Button } from '@components/atoms';

interface ApplyMentoringModalProps {
  onCloseClick(): void;
  onApplyClick(): void;
  mentoring: IMentoring;
}

const STEPS = ['PREFERRED_TIME', 'SELF_INTRO'] as const;
const TIMETABLES = [...Array(48)].map((_, index) =>
  index % 2 === 0
    ? `${(index / 2).toString().padStart(2, '0')}:00`
    : `${Math.floor(index / 2)
        .toString()
        .padStart(2, '0')}:30`,
);
const DAYS = ['월', '화', '수', '목', '금', '토', '일'] as const;

interface ProfileProps {
  nickname: string;
  email: string;
  image: string;
}

function Profile({ nickname, email, image }: ProfileProps) {
  return (
    <div className={classes.profile}>
      <img src={image} />
      <span className={classes.nickname}>{nickname}</span>
      <span className={classes.email}>{email}</span>
    </div>
  );
}

function ApplyMentoringModal({
  onCloseClick,
  onApplyClick,
}: ApplyMentoringModalProps) {
  const [step, setStep] = useState<typeof STEPS[number]>('PREFERRED_TIME');
  const [preferredDays, setPreferredDays] = useState<Set<typeof DAYS[number]>>(
    new Set(),
  );

  const onOverlayClick: MouseEventHandler = (e) => {
    if (e.target === e.currentTarget) {
      e.stopPropagation();
      onCloseClick();
    }
  };

  const getPreferredDaysHandler =
    (day: typeof DAYS[number]) => (e: ChangeEvent<HTMLInputElement>) => {
      if (e.currentTarget.checked) {
        setPreferredDays((prev) => {
          return new Set([...prev, day]);
        });
      } else {
        setPreferredDays((prev) => {
          prev.delete(day);
          return new Set(prev);
        });
      }
    };

  return (
    <div className={classes.overlay} onClick={onOverlayClick}>
      <div className={classes.modal}>
        <XIcon className={classes.close_icon} onClick={onCloseClick} />
        <Profile
          image="https://cdn.pixabay.com/index/2023/01/16/17-14-16-8_1440x550.jpg"
          nickname="최진우"
          email="dev@gmail.com"
        />

        <div className={classes.divider} />

        {step === 'PREFERRED_TIME' ? (
          <div className={classes.preferred_time_container}>
            <p className={classes.section_title}>
              강의 희망 시간대를 선택해주세요
            </p>
            <div className={classes.dropdown_wrapper}>
              <DropDown
                items={TIMETABLES}
                placeholder="시작 시각을 설정해 주세요."
              />
              <DropDown
                items={TIMETABLES}
                placeholder="종료 시각을 설정해 주세요."
              />
            </div>
            <p className={classes.section_title}>
              강습 희망 요일을 선택해주세요.
            </p>
            <div className={classes.checkbox_wrapper}>
              {DAYS.map((day) => (
                <Checkbox
                  key={day}
                  label={day}
                  isChecked={preferredDays.has(day)}
                  onChange={getPreferredDaysHandler(day)}
                />
              ))}
            </div>
            <button>다음으로</button>
          </div>
        ) : step === 'SELF_INTRO' ? (
          <></>
        ) : null}
        <span className={classes.steps}>
          {STEPS.indexOf(step) + 1} / {STEPS.length}
        </span>
      </div>
    </div>
  );
}

export default ApplyMentoringModal;
