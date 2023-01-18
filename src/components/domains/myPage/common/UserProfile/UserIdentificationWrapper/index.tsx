import ToteeBadgeIcon from '../../../../../../assets/svg/totee-badge.svg';
import ProfileEditButton from './ProfileEditButton';
import Position from './Position';
import NickName from './NickName';
import { UserType } from 'types/user.types';
import React from 'react';
import classes from './index.module.scss';

interface IUserIdentificationWrapperProps {
  user: UserType;
  nickName: string;
  setNickName: React.Dispatch<React.SetStateAction<string>>;
  setPosition: React.Dispatch<React.SetStateAction<string>>;
  isEditProfile: boolean;
  setIsEditProfile: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmitUser: (e: React.FormEvent<HTMLFormElement>) => void;
}

const UserIdentificationWrapper = ({
  user,
  nickName,
  setNickName,
  setPosition,
  isEditProfile,
  setIsEditProfile,
  onSubmitUser,
}: IUserIdentificationWrapperProps) => {
  return (
    <form className={classes.userIdentificationWrapper} onSubmit={onSubmitUser}>
      <div className={classes.titleWrapper}>
        <NickName
          user={user}
          nickName={nickName}
          setNickName={setNickName}
          isEditProfile={isEditProfile}
        />
        {user.roleType === 'totee' && (
          <img
            className={classes.toteeBadgeIcon}
            src={ToteeBadgeIcon}
            alt="토티 뱃지"
          />
        )}
      </div>
      <span className={classes.identification}>{user.roleType} | </span>
      <Position
        user={user}
        isEditProfile={isEditProfile}
        setPosition={setPosition}
      />
      <p className={classes.identification}>
        {user.email !== 'NO_EMAIL' && user.email}
      </p>
      <ProfileEditButton
        nickName={nickName}
        isEditProfile={isEditProfile}
        setIsEditProfile={setIsEditProfile}
      />
    </form>
  );
};

export default UserIdentificationWrapper;
