import Introduction from './Introduction/indext';
import React from 'react';
import classes from './index.module.scss';
import { IUserType } from '@api/user/types';

interface IUserActivityWrapperProps {
  user: IUserType;
  isEditProfile: boolean;
  introduction: string;
  setIntroduction: React.Dispatch<React.SetStateAction<string>>;
}

const UserActivityWrapper = ({
  user,
  isEditProfile,
  introduction,
  setIntroduction,
}: IUserActivityWrapperProps) => {
  return (
    <div className={classes.userActivityWrapper}>
      <Introduction
        user={user}
        isEditProfile={isEditProfile}
        introduction={introduction}
        setIntroduction={setIntroduction}
      />
      <div className={classes.progress}>
        <p className={classes.progressTitle}>진행중인 스터디 갯수</p>
        <p className={classes.progressCount}>{user.studyNum}개</p>
      </div>
      <div className={classes.progress}>
        <p className={classes.progressTitle}>진행중인 멘토링</p>
        <p className={classes.progressCount}>{user.mentoringNum}개</p>
      </div>
    </div>
  );
};

export default UserActivityWrapper;
