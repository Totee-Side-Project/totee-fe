import { useGetUserAPI } from '@hooks/query/useGetQuery';
import { useState } from 'react';
import UserIdentificationWrapper from './UserIdentificationWrapper';
import UserActivityWrapper from './UserActivityWrapper';
import UserProfileImageWrapper from './UserProfileImageWrapper';
import './index.scss';

const UserProfile = () => {
  const { data, refetch } = useGetUserAPI();
  const user = data.data.body.data;

  const [isEditUserProfile, setIsEditUserProfile] = useState(false);
  const [userNickName, setUserNickName] = useState(user.nickname);
  const [introduction, setIntroduction] = useState(user.intro);

  return (
    <section className="userProfile">
      <UserProfileImageWrapper user={user} />
      <UserIdentificationWrapper
        user={user}
        userNickName={userNickName}
        setUserNickName={setUserNickName}
        isEditUserProfile={isEditUserProfile}
        setIsEditUserProfile={setIsEditUserProfile}
        refetchUserInfo={refetch}
      />
      <UserActivityWrapper
        user={user}
        isEditUserProfile={isEditUserProfile}
        introduction={introduction}
        setIntroduction={setIntroduction}
      />
    </section>
  );
};

export default UserProfile;
