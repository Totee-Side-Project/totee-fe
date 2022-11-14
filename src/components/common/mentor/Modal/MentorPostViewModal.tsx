import classes from './MentorPostViewModal.module.scss';
import { MentorModal } from './MentorModal/MentorModal';
import React from 'react';
import './MentorPostViewModal.module.scss';

interface IMentorPostViewModalProps {
  isOpen: boolean;
  setIsOpen: (e: boolean) => void;
}

function MentorPostViewModal({ isOpen, setIsOpen }: IMentorPostViewModalProps) {
  return (
    <MentorModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={classes.mentorModal}>
        <div className={classes.headerTitle}>멘토링 소개</div>
        <div className={classes.topLine} />
        <div className={classes.contentWrapper}>
          <div className={classes.title}>
            [N년 경력자 출신] 개발자 취업 관련 상담
          </div>
          <div className={classes.profile}>
            <img className={classes.img} />
            <div className={classes.name}>모각코고인물</div>
          </div>
          <div className={classes.detail}>
            <div className={classes.position}>직무</div>
            <div>SW 엔지니어</div>
          </div>
          <div className={classes.detail}>
            <div className={classes.career}>경력</div>
            <div>미들(3-4년차)</div>
          </div>
          <div className={classes.price}>1회 멘토링 1시간 / 11,000원</div>
          <div className={classes.contentLine} />
          <div className={classes.content}>
            인도하겠다는 끝까지 피어나는 구하기 우리의 말이다. 커다란 인류의
            피는 없는 반짝이는 없으면, 이성은 그들은 같이, 사막이다. 능히 웅대한
            피어나는 이것이다. 목숨이 거선의 무엇을 같은 사막이다. 열락의 우리는
            사랑의 되려니와, 이것을 속에서 관현악이며, 실로 사막이다.
            인도하겠다는 끝까지 피어나는 구하기 우리의 말이다. 커다란 인류의
            피는 없는 반짝이는 없으면, 이성은 그들은 같이, 사막이다. 능히 웅대한
            피어나는 이것이다. 목숨이 거선의 무엇을 같은 사막이다. 열락의 우리는
            사랑의 되려니와, 이것을 속에서 관현악이며, 실로 사막이다.
            인도하겠다는 끝까지 피어나는 구하기 우리의 말이다. 커다란 인류의
            피는 없는 반짝이는 없으면, 이성은 그들은 같이, 사막이다. 능히 웅대한
            피어나는 이것이다. 목숨이 거선의 무엇을 같은 사막이다. 열락의 우리는
            사랑의 되려니와, 이것을 속에서 관현악이며, 실로 사막이다.
            인도하겠다는 끝까지 피어나는 구하기 우리의 말이다. 커다란 인류의
            피는 없는 반짝이는 없으면, 이성은 그들은 같이, 사막이다. 능히 웅대한
            피어나는 이것이다. 목숨이 거선의 무엇을 같은 사막이다. 열락의 우리는
            사랑의 되려니와, 이것을 속에서 관현악이며, 실로 사막이다.
          </div>
        </div>
        <div className={classes.bottomLine} />
        <div className={classes.btn}>신청하기</div>
      </div>
    </MentorModal>
  );
}

export default MentorPostViewModal;
