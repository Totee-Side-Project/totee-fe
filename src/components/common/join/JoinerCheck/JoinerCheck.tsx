import { JoinModal } from '@components/common/join/Modal/JoinModal';
import OwnerJoinerCheck from '@components/common/join/OwnerJoinerCheck/OwnerJoinerCheck';
import React, { useState } from 'react';
import './JoinerCheck.scss';

function JoinerCheck() {
  const [isOpenJoinModal, setIsOpenJoinModal] = useState(false);
  return (
    <div className="JoinWrapper">
      <div className="Status_Wrapper">
        <div className="Status_Profile">
          <div
            style={{
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              // backgroundImage: `url("${detailData.imageUrl}")`,
            }}
          />
        </div>
        <div className="Status_Box">
          <div className="Status_Title">지원 현황</div>
          <div className="Status_Title_Line" />
          <div className="Status_AllApplicant">전체 지원자수</div>
          <div className="Status_Count">N명</div>
          {/*<div className="Status_Line" />*/}
          <button
            className="Status_Btn"
            onClick={() => setIsOpenJoinModal(true)}
          >
            지원 하기
          </button>
          <JoinModal
            isOpen={isOpenJoinModal}
            setIsOpen={setIsOpenJoinModal}
          ></JoinModal>
        </div>
      </div>
      <OwnerJoinerCheck />
    </div>
  );
}

export default JoinerCheck;
