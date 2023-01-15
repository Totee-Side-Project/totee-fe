import { useUpdateUser } from '@hooks/query/useMutateQuery';
import { useState } from 'react';

export const useUserProfile = (user?: any) => {
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [nickName, setNickName] = useState(user?.nickname);
  const [introduction, setIntroduction] = useState(user?.intro);
  const [imageFile, setImageFile] = useState();
  const { mutate: updateUserInfo } = useUpdateUser();

  const updateUser = () => {
    const userInfo = {
      intro: introduction,
      keepProfileImage: false,
      nickname: nickName,
      position: 'BACK_END',
      profileImage: imageFile,
    };

    updateUserInfo(userInfo);
  };

  return {
    isEditProfile,
    setIsEditProfile,
    nickName,
    setNickName,
    introduction,
    setImageFile,
    setIntroduction,
    updateUser,
  };
};
