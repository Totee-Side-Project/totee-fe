import UserIdentificationWrapper from './UserIdentificationWrapper';
import UserActivityWrapper from './UserActivityWrapper';
import UserProfileImageWrapper from './UserProfileImageWrapper';
import { useUserProfile } from '../../../../../hooks/useUserProfile';
import { useQuery } from 'react-query';
import { UserType } from 'types/user.types';
import './index.scss';
import { AxiosResponse } from 'axios';

const UserProfile = () => {
  const { data } = useQuery<AxiosResponse>('user');
  const user: UserType = data?.data?.body?.data;

  const {
    isEditProfile,
    setIsEditProfile,
    nickName,
    setNickName,
    introduction,
    setImageFile,
    setIntroduction,
    setPosition,
    onSubmitUser,
  } = useUserProfile(user);

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
        setPosition={setPosition}
        isEditProfile={isEditProfile}
        setIsEditProfile={setIsEditProfile}
        onSubmitUser={onSubmitUser}
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
