import React, { useState } from 'react';
import { ViewModal } from '../Modal/ViewModal';
import './OwnerJoinerCheck.scss';

function OwnerJoinerCheck() {
  const [isOpenApplyStatusModal, setIsOpenApplyStatusModal] = useState(false);

  return (
    <div className="StatusM_Wrapper">
      <div className="StatusM_Box">
        <div className="StatusM_Title">스터디 참여자 수</div>
        <div className="StatusM_Count">5명 / 10명</div>
        <div className="StatusM_Title_Line" />
        <div className="StatusM_NameBox">
          <div className="StatusM_ProfileImg" />
          <div className="StatusM_Name">모각고인물</div>
        </div>
        <div className="StatusM_NameBox">
          <div className="StatusM_ProfileImg" />
          <div className="StatusM_Name">신나는엘...님</div>
        </div>
        {/*<div className="Status_Line" />*/}
        <button
          className="StatusM_Btn"
          onClick={() => setIsOpenApplyStatusModal(true)}
        >
          전체 확인하기
        </button>
      </div>
      <ViewModal
        isOpen={isOpenApplyStatusModal}
        setIsOpen={setIsOpenApplyStatusModal}
      ></ViewModal>
    </div>
  );
}

export default OwnerJoinerCheck;
