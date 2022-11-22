import React, { useState } from 'react';
import './recommendMentorCard.scss';

export default function RecommendMentorCard({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <div onClick={onClick}>
      <div>
        <div className="mento_card_container">
          <div className="mento_card_header">
            <h1 className="mento_card_title">C++ 및 게임 프로그래밍 멘토</h1>
            <div className="mento_card_description_wrapper">
              <div className="mento_card_description">
                <span>분야</span>
                <span>개발/프로그래밍</span>
              </div>
              <div className="mento_card_description">
                <span>경력</span>
                <span>3~5년차 현직자</span>
              </div>
            </div>
          </div>
          <div className="mento_card_line"></div>
          <div className="mento_card_body">
            미국 뉴욕의 테크 회사에서 프로덕트 디자이너로 활동 중인 에릭입니다.
            UX, UI디자인, 유저 리서치...
          </div>
          <div className="mento_card_footer">
            <div className="mento_card_profile_image"></div>
            <div className="mento_card_nickname">닉네임</div>
            <div className="mento_v_line"></div>
            <div className="mento_card_time">일주일 1회</div>
          </div>
        </div>
      </div>
    </div>
  );
}
