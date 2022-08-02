import './EditProfileModal.scss';
import { EditModal } from '@components/atoms/Modal/EditModal';
import { UserState } from '@store/user';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { EditPositionModal } from '@components/common/EditProfileModal/EditPositionModal';
import removeImg from '../../../assets/removeImg.svg';
import changeImg from '../../../assets/changeImg.svg';
import useProfileImage from '@hooks/useProfileImage';

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
  const { files, setFiles, ProfileImage, handleInitialImage, onPhotoBtnClick } =
    useProfileImage({
      initialImage: user.profileImageUrl,
    });
  const [values, setValues] = useState({
    backgroundImage: '',
    intro: '',
    newNickname: '',
    nickname: '',
    position: '',
    profileImage: '',
  });

  useEffect(() => {
    setValues({
      ...values,
      position: user.position,
      nickname: user.nickname,
      profileImage: user.profileImageUrl,
    });
  }, [user]);

  useEffect(() => {
    setValues({
      ...values,
      ['profileImage']: files,
    });
  }, [files]);

  const onChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <>
      <EditModal isOpen={isOpen} setIsOpen={setIsOpen}>
        <section>
          <div className="edit_PageWrapper">
            <div className="edit_myProfileWrapper">
              <div className="edit_myPageBackground">
                <div className="edit_myImgBtnWrapper">
                  <img
                    className="edit_myChangeImg"
                    src={changeImg}
                    onClick={onPhotoBtnClick}
                  />
                  <img
                    className="edit_myRemoveImg"
                    src={removeImg}
                    onClick={() => handleInitialImage()}
                  />
                </div>
                <div className="edit_myProfileImg">
                  <ProfileImage />
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
              value={values.intro}
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
        user={user}
      ></EditPositionModal>
    </>
  );
}
