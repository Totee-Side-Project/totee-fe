import { ReactComponent as XIcon } from '@assets/xicon.svg';
import classNames from 'classnames';
import classes from './MentorPostViewModal.module.scss';
import React from 'react';
import './MentorPostViewModal.module.scss';
import { MentorModal } from './MentorModal/MentorModal';

interface IMentorPostViewModalProps {
  isOpen: boolean;
  setIsOpen: (e: boolean) => void;
  isCloseBtn?: boolean;
  // children: React.ReactNode;
}

export function MentorPostViewModal({
  isOpen,
  setIsOpen,
}: IMentorPostViewModalProps) {
  return (
    <MentorModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={classes.mentorModal}>
        <div className={classes.headerBox}>
          <div className={classes.headerTitle}>멘토링 소개</div>
          <div className={classes.closeBtn} onClick={() => setIsOpen(!isOpen)}>
            <XIcon />
          </div>
        </div>
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
            사랑의 되려니와, 이것을 속에서 관현악이며, 실로 사막이다. 용감하고
            소금이라 커다란 새가 말이다. 열락의 이 천고에 있는 바이며, 없는
            그들은 위하여, 청춘을 것이다. 대한 바이며, 고동을 방지하는 그러므로
            되는 앞이 말이다. 꽃이 더운지라 천자만홍이 관현악이며, 뜨거운지라,
            것이다. 못할 어디 내려온 주는 과실이 청춘은 위하여서. 때에, 수
            미묘한 것은 이 붙잡아 그들의 용감하고 못할 쓸쓸하랴?
          </div>
        </div>
        <div className={classes.bottomBox}>
          <div className={classes.btn}>신청하기</div>
        </div>
      </div>
    </MentorModal>
  );
}

export default MentorPostViewModal;
