import { IUserType } from '@api/user/types';
import React from 'react';
import classes from '../index.module.scss';

interface INickNameProps {
  user: IUserType;
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
          className={classes.nickNameInput}
          placeholder="최대 5글자"
          maxLength={5}
          value={nickName}
          onChange={(e) => setNickName(e.target.value)}
        />
      ) : (
        <p className={classes.nickName}>{user.nickname}</p>
      )}
    </>
  );
};

export default NickName;
