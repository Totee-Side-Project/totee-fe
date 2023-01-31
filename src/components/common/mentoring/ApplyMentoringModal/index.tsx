import { ChangeEvent, MouseEventHandler, useState } from 'react';
import { ReactComponent as XIcon } from '@assets/svg/xicon.svg';
import classes from './index.module.scss';
import DropDown from '@components/common/dropdown';
import Checkbox from '@components/atoms/Checkbox';

export interface ApplyMentoringPayloads {
  comment: string;
  contact: string;
  endTime: string;
  startTime: string;
  week: string;
}

interface ApplyMentoringModalProps {
  onCloseClick(): void;
  onApplyClick(payload: ApplyMentoringPayloads): void;
  profile: {
    nickname: string;
    email: string;
    profileImage: string;
  };
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
  profile,
}: ApplyMentoringModalProps) {
  const [step, setStep] = useState<typeof STEPS[number]>('PREFERRED_TIME');
  const [preferredStartAt, setPreferredStartAt] = useState<string | null>(null);
  const [preferredEndAt, setPreferredEndAt] = useState<string | null>(null);
  const [contact, setContact] = useState('');
  const [intro, setIntro] = useState('');
  const [preferredDays, setPreferredDays] = useState<Set<typeof DAYS[number]>>(
    new Set(),
  );

  const onOverlayClick: MouseEventHandler = (e) => {
    if (e.target === e.currentTarget) {
      e.stopPropagation();
      onCloseClick();
    }
  };

  const handleNextStepClick = () => {
    setStep('SELF_INTRO');
  };

  const handlePreviousStepClick = () => {
    setStep('PREFERRED_TIME');
  };

  const handleSubmit = () => {
    onApplyClick({
      comment: intro,
      contact,
      startTime: preferredStartAt ?? '',
      endTime: preferredEndAt ?? '',
      week: [...preferredDays.values()].join(', '),
    });
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
          image={profile.profileImage}
          nickname={profile.nickname}
          email={profile.email}
        />

        <div className={classes.divider} />

        {step === 'PREFERRED_TIME' ? (
          <div className={classes.preferred_time_container}>
            <p className={classes.section_title}>
              강의 희망 시간대를 선택해주세요
            </p>
            <div className={classes.dropdown_wrapper}>
              <DropDown
                onChange={setPreferredStartAt}
                items={TIMETABLES}
                defValue={preferredStartAt ?? undefined}
                placeholder="시작 시각을 설정해 주세요."
              />
              <DropDown
                onChange={setPreferredEndAt}
                items={TIMETABLES}
                defValue={preferredEndAt ?? undefined}
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
            <button onClick={handleNextStepClick}>다음으로</button>
          </div>
        ) : step === 'SELF_INTRO' ? (
          <div className={classes.self_intro_container}>
            <p className={classes.section_title}>멘토링 받을 연락처</p>
            <input
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="(오픈카톡, 아이디, 전화번호)"
            />
            <p className={classes.section_title}>
              기타 자기 소개 코멘트를 달아 주세요.
            </p>
            <textarea
              value={intro}
              onChange={(e) => setIntro(e.target.value)}
              placeholder="경력 또는 자신이 할수 있는 기술 스택 등 멘토가 알면 좋을 것 같은 사항들을 짧게 기재해주세요. (선택사항)"
            />
            <span className={classes.intro_content_limit}>
              {intro.length}자 / 100자
            </span>
            <div className={classes.button_wrapper}>
              <button
                className={classes.bounding_button}
                onClick={handlePreviousStepClick}
              >
                이전으로
              </button>
              <button onClick={handleSubmit}>제출하기</button>
            </div>
          </div>
        ) : null}
        <span className={classes.steps}>
          {STEPS.indexOf(step) + 1} / {STEPS.length}
        </span>
      </div>
    </div>
  );
}

export default ApplyMentoringModal;
