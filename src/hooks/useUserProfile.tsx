import { useUpdateUser } from '@hooks/query/useMutateQuery';
import { useValidateNickName } from '@hooks/query/useMutateQuery';
import { useEffect, useState } from 'react';

export const useUserProfile = (user: any) => {
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [nickName, setNickName] = useState(user.nickname);
  const [introduction, setIntroduction] = useState(user.intro);
  const [imageFile, setImageFile] = useState();

  const { mutate: updateUserInfo, isSuccess: isUpdateUser } = useUpdateUser();
  const { mutate: validateNickName, isSuccess: isValidateNickName } =
    useValidateNickName();

  // 닉네임 중복 검사 요청 성공, 실패했을 때
  useEffect(() => {
    if (!isEditProfile) {
      return;
    }
    if (isValidateNickName) {
      updateUser();
      return;
    }
    setIsEditProfile(true);
  }, [isValidateNickName]);

  // 사용자 정보 업데이트 요청 성공했을 때
  useEffect(() => {
    if (isUpdateUser) {
      setIsEditProfile(false);
    }
  }, [isUpdateUser]);

  // 프로필 수정 버튼 클릭 시
  const onClickProfileEditButton = (e: any) => {
    e.preventDefault();
    if (!isEditProfile) {
      setIsEditProfile(true);
      return;
    }
    validateNickName(nickName);
  };

  // 사용자 정보 업데이트 요청
  const updateUser = () => {
    const userInfo = {
      intro: introduction,
      keepProfileImage: imageFile ? false : true,
      nickname: nickName,
      position: 'BACK_END',
      profileImage: imageFile,
    };
    updateUserInfo(userInfo);
  };

  return {
    isEditProfile,
    nickName,
    setNickName,
    introduction,
    setImageFile,
    setIntroduction,
    onClickProfileEditButton,
  };
};
