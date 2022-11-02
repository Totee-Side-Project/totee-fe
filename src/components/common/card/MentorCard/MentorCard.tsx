import React from 'react';
import './mentorCard.scss';
import mentorheart from '../../../../assets/mentorheart.svg';
import star from '../../../../assets/star.svg';

function MentorCard() {
  return (
    <div>
      <div className="mentorCardWrapper">
        <div className="mentorCardImg">
          <div
            style={{
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
          />
        </div>
        <div className="mentorCardInfoWrapper">
          <div className="mentorCardName">닉네임</div>
          <div className="mentorCardPosition">C++ 및 게임 프로그래밍</div>
          <div className="mentorCardEmail">rnjstmdals6@gmail.com</div>
        </div>
        <div className="mentorCardLine" />
        <div className="mentorCardLineUnder">
          <div className="mentorCardLikeWrap">
            <img className="mentorCardHeart" src={mentorheart} />
            <div className="mentorCardHeartNum">12</div>
          </div>
          <div className="mentorCardLine2" />
          <div className="mentorCardScoreWrap">
            <img className="mentorCardScore" src={star} />
            <div className="mentorCardScoreNum">4.5</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MentorCard;
