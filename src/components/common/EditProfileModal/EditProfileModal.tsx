import React, { useEffect, useState } from 'react';

import './EditProfileModal.scss';
import { EditModal } from '@components/atoms/Modal/EditModal';

import { EditPositionModal } from '@components/common/EditProfileModal/EditPositionModal';
import useProfileImage from '@hooks/useProfileImage';
import { positionListKey } from '@utils/position.const';
import { User } from 'types/user.types';

import UserPostingList from './UserPostingList';
import LikePostingList from './LikePostingList';

interface IEditProfileModalProps {
  user: User;
  isOpen: boolean;
  setIsOpen: (e: boolean) => void;
  resetImages: () => void;
  files: any;
  Images: any;
  ImgPlaceholder: any;
}

export function EditProfileModal({
  user,
  isOpen,
  setIsOpen,
  resetImages,
  files,
  Images,
  ImgPlaceholder,
}: IEditProfileModalProps) {
  const [isEditPositionModal, setIsEditPositionModal] = useState(false);
  const { profileFile, backgroundFile } = files;
  const { UploadBackgroundImage, UploadProfileImage } = Images;

  const [values, setValues] = useState({
    backgroundImageUrl: user.backgroundImageUrl,
    email: user.email,
    intro: user.intro,
    nickname: user.nickname,
    position: positionListKey[user.position],
    profileImageUrl: user.profileImageUrl,
    roleType: user.roleType,
  });

  const handleInitialData = () => {
    resetImages();
    setValues({
      backgroundImageUrl: user.backgroundImageUrl,
      email: user.email,
      intro: user.intro,
      nickname: user.nickname,
      position: positionListKey[user.position],
      profileImageUrl: user.profileImageUrl,
      roleType: user.roleType,
    });
  };

  useEffect(() => {
    setValues({
      ...values,
      ['profileImageUrl']: profileFile,
    });
  }, [profileFile]);

  useEffect(() => {
    setValues({
      ...values,
      ['backgroundImageUrl']: backgroundFile,
    });
  }, [backgroundFile]);

  const onChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const onClickSubmitBtn = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log(values);
  };

  return (
    <>
      <EditModal isOpen={isOpen} setIsOpen={setIsOpen}>
        <section>
          <div className="edit_PageWrapper">
            <div className="edit_myProfileWrapper">
              <div className="edit_myPageBackground" ref={ImgPlaceholder}>
                <UploadBackgroundImage />
                <div className="edit_myProfileImg">
                  <UploadProfileImage />
                </div>
                {/* <img className="edit_myProfileImg" src={user.profileImageUrl} /> */}
              </div>
              <div className="edit_myNicknameWrapper">
                <input
                  name="nickname"
                  className="edit_myNickName"
                  value={values.nickname}
                  onChange={onChangeInput}
                  // placeholder="최대 5글자"
                />
              </div>
              <div className="edit_myInfo">{user.roleType}</div>
              <div className="edit_myInfo">{user.email}</div>
            </div>
            <textarea
              name="intro"
              className="edit_myIntro border"
              placeholder="본인에 대한 짧은 소개입니다."
              value={values.intro || undefined}
              onChange={onChangeInput}
            />
            <div className="edit_myPositionWrapper">
              <div className="edit_myPosition">{values.position}</div>
              <div
                className="edit_myEditPositionBtn"
                onClick={() => setIsEditPositionModal(true)}
              >
                수정
              </div>
            </div>
            <div className="edit_myBtnWrapper">
              <div className="edit_myEditBtn" onClick={onClickSubmitBtn}>
                저장하기
              </div>
              <div
                className="edit_myCancelBtn"
                onClick={() => {
                  handleInitialData();
                  setIsOpen(!isOpen);
                }}
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
        values={values}
        setValues={setValues}
      ></EditPositionModal>
      <UserPostingList />
      <LikePostingList />
    </>
  );
}
