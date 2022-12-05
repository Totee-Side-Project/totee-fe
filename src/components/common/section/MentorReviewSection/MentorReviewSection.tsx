import CreateMentorModal from '@components/common/mentor/Modal/CreateMentorModal/CreateMentorModal';
import React, { useState } from 'react';
import './MentorReviewSection.scss';
import ReviewCard from '@components/common/card/ReviewCard/ReviewCard';

export function MentorReviewSection() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mentorReviewSection_container">
      <div className="inner_container">
        <div className="description_wrapper">
          <div className="title">
            <span className="highlight">토티이용자</span>들의 멘토수강 후기!
          </div>
          <div className="description">
            실제로 토티에서 멘토를 수강한 멘티들의 후기들이에요, 멘티들의 후기를
            보고 자신에게 필요한 분야의 멘토를 찾아보세요!
          </div>
          <button className="button" onClick={() => setIsOpen((pre) => !pre)}>
            다른 수강평 더보기
          </button>
        </div>
        <div className="cards_wrapper">
          <ReviewCard type="primary" />
          <ReviewCard type="secondary" />
        </div>
      </div>
      {isOpen && <CreateMentorModal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
}
