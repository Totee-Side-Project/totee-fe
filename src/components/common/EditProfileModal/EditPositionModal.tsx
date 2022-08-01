import { EditModal } from '@components/atoms/Modal/EditModal';
import React, { useState } from 'react';

interface IEditPositionModalProps {
  isOpen: boolean;
  setIsOpen: (e: boolean) => void;
}

export function EditPositionModal({
  isOpen,
  setIsOpen,
}: IEditPositionModalProps) {
  return (
    <>
      <EditModal isOpen={isOpen} setIsOpen={setIsOpen}>
        <section>
          <div className="edit_Position_Wrapper">
            <div className="edit_Position_title">나의 포지션을 수정할까요?</div>
            <div className="edit_Position_subTitle">
              사용하실 프로필 사진과 닉네임을 입력해주세요.
            </div>
            <div className="edit_Position_label">포지션</div>
            <div className="edit_Position_selectBoxWrapper">
              <select className="edit_Position_select">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
            </div>
          </div>
          <div className="edit_myBtnWrapper">
            <div className="edit_myEditBtn">수정</div>
            <div
              className="edit_myCancelBtn"
              onClick={() => setIsOpen(!isOpen)}
            >
              취소
            </div>
          </div>
        </section>
      </EditModal>
    </>
  );
}
