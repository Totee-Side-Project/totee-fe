import { useGetUserAPI } from '@hooks/query/useGetQuery';
import useUploadImage from '@hooks/useProfileImage';
import { useState } from 'react';
import UserIdentificationWrapper from './UserIdentificationWrapper';
import UserActivityWrapper from './UserActivityWrapper';
import UserProfileImageWrapper from './UserProfileImageWrapper';
import './index.scss';

const UserProfile = () => {
  const user = useGetUserAPI().data.data.body.data;
  const [isEditUserProfile, setIsEditUserProfile] = useState(false);

  return (
    <section className="userProfile">
      <UserProfileImageWrapper user={user} />
      <UserIdentificationWrapper
        user={user}
        isEditUserProfile={isEditUserProfile}
        setIsEditUserProfile={setIsEditUserProfile}
      />
      <UserActivityWrapper user={user} isEditUserProfile={isEditUserProfile} />
    </section>
  );
};

export default UserProfile;
