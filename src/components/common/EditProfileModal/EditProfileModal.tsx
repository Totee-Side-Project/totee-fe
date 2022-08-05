import './EditProfileModal.scss';
import { EditModal } from '@components/atoms/Modal/EditModal';
import { UserState } from '@store/user';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { EditPositionModal } from '@components/common/EditProfileModal/EditPositionModal';
import removeImg from '../../../assets/removeImg.svg';
import changeImg from '../../../assets/changeImg.svg';
import UserPostingList from './UserPostingList';
import LikePostingList from './LikePostingList';

interface IEditProfileModalProps {
  isOpen: boolean;
  setIsOpen: (e: boolean) => void;
}

export function EditProfileModal({
  isOpen,
  setIsOpen,
}: IEditProfileModalProps) {
  const [user, setUser] = useRecoilState(UserState);
  const [isEditPositionModal, setIsEditPositionModal] = useState(false);

  return (
    <>
      <EditModal isOpen={isOpen} setIsOpen={setIsOpen}>
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
              <div
                className="edit_myEditPositionBtn"
                onClick={() => setIsEditPositionModal(true)}
              >
                수정
              </div>
            </div>
            <div className="edit_myBtnWrapper">
              <div className="edit_myEditBtn">저장하기</div>
              <div
                className="edit_myCancelBtn"
                onClick={() => setIsOpen(!isOpen)}
              >
                수정 취소하기
              </div>
            </div>
          </div>
        </section>
      </EditModal>
      <EditPositionModal
        isOpen={isEditPositionModal}
        setIsOpen={setIsEditPositionModal}
      ></EditPositionModal>
      <UserPostingList />
      <LikePostingList />
    </>
  );
}
