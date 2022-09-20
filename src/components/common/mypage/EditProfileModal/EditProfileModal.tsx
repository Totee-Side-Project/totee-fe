import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import './EditProfileModal.scss';
import { EditModal } from '@components/atoms/Modal/EditModal';

import { EditPositionModal } from '@components/common/mypage/EditProfileModal/EditPositionModal';

import { positionList, positionListKey } from '@utils/position.const';
import { UpdateUser, User } from 'types/user.types';

import UserPostingList from './UserPostingList';
import LikePostingList from './LikePostingList';

import { useUpdateUser } from '@hooks/useMutateQuery';
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

  const useUpdateUserMutate = useUpdateUser();

  const [values, setValues] = useState({
    backgroundImage: undefined,
    email: user.email,
    intro: user.intro,
    nickname: user.nickname,
    position: positionListKey[user.position],
    profileImage: undefined,
    roleType: user.roleType,
  });

  const handleInitialData = () => {
    resetImages();
    setValues({
      backgroundImage: undefined,
      email: user.email,
      intro: user.intro,
      nickname: user.nickname,
      position: positionListKey[user.position],
      profileImage: undefined,
      roleType: user.roleType,
    });
  };

  useEffect(() => {
    setValues({
      ...values,
      ['profileImage']: profileFile,
    });
  }, [profileFile]);

  useEffect(() => {
    setValues({
      ...values,
      ['backgroundImage']: backgroundFile,
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

  const onClickSubmitBtn = async (e: React.MouseEvent<HTMLDivElement>) => {
    let newFormData = handleFormData(values);
    let formData = new FormData();
    for (const [key, value] of Object.entries(newFormData)) {
      formData.append(key, value);
    }

    await useUpdateUserMutate
      .mutateAsync(formData)
      .then(handleSuccess)
      .catch((err) => err);
  };

  const handleSuccess = () => {
    Swal.fire({
      title: '수정 완료!',
      text: '마이페이지에서 확인하세요',
      icon: 'success',
      confirmButtonText: '확인',
    }).then((result) => {
      setIsOpen(false);
    });
  };

  const handleFormData = (values: UpdateUser) => {
    let newFormData = {
      intro: values.intro,
      nickname: values.nickname,
      position: positionList[values.position],
    } as UpdateUser;

    if (values.profileImage !== undefined) {
      newFormData['keepProfileImage'] = 'N';
      newFormData['profileImage'] = values.profileImage;
    } else {
      let blob = new Blob();
      newFormData['keepProfileImage'] = 'Y';
      newFormData['profileImage'] = blob;
    }

    if (values.backgroundImage !== undefined) {
      newFormData['keepBackgroundImage'] = 'N';
      newFormData['backgroundImage'] = values.backgroundImage;
    } else {
      let blob = new Blob();
      newFormData['keepBackgroundImage'] = 'Y';
      newFormData['backgroundImage'] = blob;
    }

    return newFormData;
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
