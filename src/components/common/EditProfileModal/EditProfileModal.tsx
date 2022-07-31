import { Modal } from '@components/atoms';
import './EditProfileModal.scss';
import classes from '@components/atoms/CategoryButton/categoryButton.module.scss';
import { UserState } from '@store/user';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import removeImg from '../../../assets/removeImg.svg';
import changeImg from '../../../assets/changeImg.svg';

interface IEditProfileModalProps {
  isOpen: boolean;
  setIsOpen: (e: boolean) => void;
}

export function EditProfileModal({
  isOpen,
  setIsOpen,
}: IEditProfileModalProps) {
  const [user, setUser] = useRecoilState(UserState);

  return (
    <>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <section>
          <div className="edit_PageWrapper">
            <div className="edit_myProfileWrapper">
              <div className="edit_myPageBackground">
                <div className="edit_myImgBtnWrapper">
                  <img className="edit_myChangeImg" src={changeImg} />
                  <img className="edit_myRemoveImg" src={removeImg} />
                </div>
                <img className="edit_myProfileImg" src={user.profileImageUrl} />
              </div>
              <input
                className="edit_myNickName"
                value="닉네임"
                // placeholder="최대 5글자"
              />
              <div className="edit_myInfo">{user.roleType}</div>
              <div className="edit_myInfo">{user.email}</div>
            </div>
            <textarea
              className="edit_myIntro"
              value="본인에 대한 짧은 소개입니다.본인에 대한 짧은 소개입니다.본인에
              대한 짧은 소개입니다. 본인에 대한 짧은 소개입니다.본인에 대한 짧은
              소개입니다."
            />
            <div className="edit_myPositionWrapper">
              <div className="edit_myPosition">{user.position}</div>
              <div className="edit_myEditPositionBtn">수정</div>
            </div>
            <div className="edit_myBtnWrapper">
              <div className="edit_myEditBtn">저장하기</div>
              <div className="edit_myCancelBtn">수정 취소하기</div>
            </div>
          </div>
        </section>
      </Modal>
    </>
  );
}
