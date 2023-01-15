import { useGetUserAPI } from '@hooks/query/useGetQuery';
import { useState } from 'react';
import UserIdentificationWrapper from './UserIdentificationWrapper';
import UserActivityWrapper from './UserActivityWrapper';
import UserProfileImageWrapper from './UserProfileImageWrapper';
import './index.scss';
import { useUserProfile } from './ex';

const UserProfile = () => {
  const { data, refetch } = useGetUserAPI();
  const user = data.data.body.data;

  const {
    isEditProfile,
    setIsEditProfile,
    nickName,
    setNickName,
    introduction,
    setImageFile,
    setIntroduction,
    updateUser,
  } = useUserProfile(user);

  //console.log(user);

  return (
    <section className="userProfile">
      <UserProfileImageWrapper
        user={user}
        isEditProfile={isEditProfile}
        setImageFile={setImageFile}
      />
      <UserIdentificationWrapper
        user={user}
        nickName={nickName}
        setNickName={setNickName}
        isEditProfile={isEditProfile}
        setIsEditProfile={setIsEditProfile}
        refetchUser={refetch}
        updateUser={updateUser}
      />
      <UserActivityWrapper
        user={user}
        isEditProfile={isEditProfile}
        introduction={introduction}
        setIntroduction={setIntroduction}
      />
    </section>
  );
};

export default UserProfile;
