import { SignInModal } from '@components/common';
import { EditProfileModal } from '@components/common/EditProfileModal/EditProfileModal';
import { UserState } from '@store/user';
import React, { useState } from 'react';
import './MyPage.scss';
import { useRecoilState } from 'recoil';

function MyPage() {
  const [user, setUser] = useRecoilState(UserState);
  const [isEditProfileModal, setIsEditProfileModal] = useState(false);

  return (
    <>
      <div className="myPageWrapper">
        <div className="myProfileWrapper">
          <div className="myPageBackground">
            <img className="myProfileImg" src={user.profileImageUrl} />
            <button
              className="myEditProfile"
              onClick={() => setIsEditProfileModal(true)}
            >
              프로필 수정
            </button>
          </div>
          <div className="myNickName">{user.nickname}</div>
          <div className="myInfo">{user.roleType}</div>
          <div className="myInfo">{user.email}</div>
        </div>
        <div className="myIntro">
          본인에 대한 짧은 소개입니다.본인에 대한 짧은 소개입니다.본인에 대한
          짧은 소개입니다. 본인에 대한 짧은 소개입니다.본인에 대한 짧은
          소개입니다.
        </div>
        <div className="myPositionWrapper">
          <div className="myPosition">{user.position}</div>
        </div>
        <div className="myPostsWrapper">
          <div className="myPosts">작성한 글 보기</div>
          <div className="myStudy">내 스터디 · 멘토 관리</div>
        </div>
        <div className="myLine" />
      </div>
      <EditProfileModal
        isOpen={isEditProfileModal}
        setIsOpen={setIsEditProfileModal}
      ></EditProfileModal>
    </>
  );
}

export default MyPage;
