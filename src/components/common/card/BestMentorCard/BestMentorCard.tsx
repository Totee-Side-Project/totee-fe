import React from 'react';
import './bestMentorCard.scss';
import { ReactComponent as HeartIcon } from '@assets/svg/heart.svg';
import { ReactComponent as MessageIcon } from '@assets/svg/message-square.svg';
import { ReactComponent as EyeIcon } from '@assets/svg/eye.svg';
export default function BestMentorCard() {
  return (
    <div>
      <div className="bestMentoCard_container">
        <div className="head">
          <div className="image"></div>
          <div className="title">C++ 및 게임 프로그래밍 멘토</div>
          <div className="center-wrapper">
            <div className="flex-wrapper">
              <div className="nickname">닉네임</div>
              <div className="v-line"></div>
              <div className="times">일주일 1회</div>
            </div>
          </div>
        </div>
        <div className="h-line"></div>
        <div className="body">
          미국 뉴욕의 테크 회사에서 프로덕트 디자이너로 활동 중인 에릭입니다.
          UX, UI디자인, 유저 리서치...
        </div>
        <div className="h-line"></div>
        <div className="foot">
          <div className="icon-item">
            <div className="icon">
              <HeartIcon />
            </div>
            <div className="number">2</div>
          </div>
          <div className="icon-item">
            <div className="icon">
              <MessageIcon />
            </div>
            <div className="number">2</div>
          </div>
          <div className="icon-item">
            <div className="icon">
              <EyeIcon />
            </div>
            <div className="number">2</div>
          </div>
        </div>
      </div>
    </div>
  );
}
