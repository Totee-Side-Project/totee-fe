import { UserType } from 'types/user.types';
import React from 'react';
import './index.scss';

interface INickNameProps {
  user: UserType;
  nickName: string;
  setNickName: React.Dispatch<React.SetStateAction<string>>;
  isEditProfile: boolean;
}

const NickName = ({
  user,
  nickName,
  setNickName,
  isEditProfile,
}: INickNameProps) => {
  return (
    <>
      {isEditProfile ? (
        <input
          className="nickNameInput"
          placeholder="최대 5글자"
          maxLength={5}
          value={nickName}
          onChange={(e) => setNickName(e.target.value)}
        />
      ) : (
        <p className="nickName">{user.nickname}</p>
      )}
    </>
  );
};

export default NickName;
