
import React, { useState, useEffect} from 'react';
import './MyPage.scss';

import { EditProfileModal } from '@components/common/EditProfileModal/EditProfileModal';
import { positionListKey } from '@utils/position.const';

import useProfileImage from '@hooks/useProfileImage';
import {useGetUserAPI} from '@hooks/useGetQuery';
import {User} from 'types/user.types';

function MyPage() {
  // const [user, setUser] = useRecoilState(UserState);
  const [user, setUser]=useState<User>();
  const [isEditProfileModal, setIsEditProfileModal] = useState(false);
  const {data} = useGetUserAPI();

  useEffect(()=>{
    if(data && data.status===200){
      setUser(data.data.body.data);
    }
  },[data])
  
  const {
    files: profileFile,
    UploadImage: UploadProfileImage,
    handleInitialImage: handleInitialProfileImage,
    resetFiles: resetProfileFiles,
  } = useProfileImage({
    initialImage: user?.profileImageUrl,
  });

  const {
    files: backgroundFile,
    UploadBackgroundImage,
    ImgPlaceholder,
    handleInitialImage: handleInitialBackgroundImage,
    resetFiles: resetBackgroundFiles,
  } = useProfileImage({
    initialImage: user?.backgroundImageUrl,
  });

  return (
    <>
      <div className="myPageWrapper">
        <div className="myProfileWrapper">
          <div className="myPageBackground"
            style={{
              backgroundRepeat: 'no-repeat',
              backgroundSize : 'cover',
              backgroundImage : `url(${user?.backgroundImageUrl})`
            }}
          >
            <img className="myProfileImg" src={user?.profileImageUrl} />
            <button
              className="myEditProfile"
              onClick={() => setIsEditProfileModal(true)}
            >
              프로필 수정
            </button>
          </div>
          <div className="myNickName">{user?.nickname}</div>
          <div className="myInfo">{user?.roleType}</div>
          <div className="myInfo">{user?.email}</div>
        </div>
        <div className="myIntro">
          {user?.intro}
        </div>
        <div className="myPositionWrapper">
          <div className="myPosition">{positionListKey[user?.position as string]}</div>
        </div>
        <div className="myPostsWrapper">
          <div className="myPosts">작성한 글 보기</div>
          <div className="myStudy">내 스터디 · 멘토 관리</div>
        </div>
        <div className="myLine" />
      </div>
      {user&&
      <EditProfileModal
        user={user}
        isOpen={isEditProfileModal}
        setIsOpen={setIsEditProfileModal}
        resetImages={() => {
          handleInitialProfileImage();
          handleInitialBackgroundImage();
          resetProfileFiles();
          resetBackgroundFiles();
        }}
        files={{
          profileFile: profileFile,
          backgroundFile: backgroundFile,
        }}
        Images={{
          UploadBackgroundImage: UploadBackgroundImage,
          UploadProfileImage: UploadProfileImage,
        }}
        ImgPlaceholder={ImgPlaceholder}
      ></EditProfileModal>
    }
    </>
  );
}

export default MyPage;
