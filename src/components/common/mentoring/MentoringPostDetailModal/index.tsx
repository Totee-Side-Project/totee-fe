import classes from './index.module.scss';
import { ReactComponent as XIcon } from '@assets/svg/xicon.svg';
import { MouseEventHandler } from 'react';
import { IMentoring } from 'types/api.types';

interface MentoringPostDetailModalProps {
  isOpen: boolean;
  onCloseClick: MouseEventHandler;
  onApplyClick: MouseEventHandler;
  mentoring: IMentoring;
}

function MentoringPostDetailModal({
  isOpen,
  mentoring,
  onCloseClick,
  onApplyClick,
}: MentoringPostDetailModalProps) {
  if (!isOpen) {
    return null;
  }

  const { title, content, cost, career, profileImageUrl, nickname, field } =
    mentoring;

  const formattedCost = Intl.NumberFormat('ko-KR').format(cost);

  return (
    <div className={classes.overlay}>
      <div className={classes.modal}>
        <div className={classes.header}>
          <h2>멘토링 소개</h2>
          <XIcon className={classes.close_icon} onClick={onCloseClick} />
        </div>

        <div className={classes.body}>
          <h1>{title}</h1>
          <div className={classes.profile}>
            <img src={profileImageUrl} alt={nickname} />
            <span className={classes.profile_name}>{nickname}</span>
            <div className={classes.mentor_badge}>Totee</div>
          </div>
          <div className={classes.profile_details}>
            <div className={classes.profile_detail}>
              <span>직무</span>
              <span>{field}</span>
            </div>
            <div className={classes.profile_detail}>
              <span>경력</span>
              <span>{career}</span>
            </div>
          </div>
          <div className={classes.cost}>
            1회 멘토링 1시간 / {formattedCost}원
          </div>
          <div className={classes.divider} />
          <div className={classes.content}>{content}</div>
        </div>

        <div className={classes.bottom_fixed}>
          <button onClick={onApplyClick}>신청하기</button>
        </div>
      </div>
    </div>
  );
}

export default MentoringPostDetailModal;
