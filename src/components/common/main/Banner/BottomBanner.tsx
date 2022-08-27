import React from 'react';
import './bottombanner.scss';

function BottomBanner() {
  return (
    <div className="banner_wrapper">
      <div className="banner_text_wraaper">
        <div className="banner_title">멘토가 되어보세요 어쩌구</div>
        <div className="banner_content">
          <div className="banner_text">
            멘토와 멘티를 연결해주는 토티에서 여러분의 재능을 뽐내보세요.
          </div>
          <div className="banner_text">
            토티는 각분야에서 최고가 될 여러분들의 꿈과 노력을 응원합니다!
          </div>
        </div>
      </div>
      <div className="button_wrapper">
        <div className="button">멘토 지원하기</div>
        <div className="button">멘토링 가이드보기</div>
      </div>
    </div>
  );
}

export default BottomBanner;
