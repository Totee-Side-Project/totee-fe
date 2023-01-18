import { UserType } from 'types/user.types';
import React from 'react';
import classes from '../index.module.scss';

interface IIntroductionProps {
  user: UserType;
  isEditProfile: boolean;
  introduction: string;
  setIntroduction: React.Dispatch<React.SetStateAction<string>>;
}

const Introduction = ({
  user,
  isEditProfile,
  introduction,
  setIntroduction,
}: IIntroductionProps) => {
  return (
    <div className={classes.introduction}>
      <p className={classes.introductionTitle}>소개</p>
      {isEditProfile ? (
        <>
          <textarea
            className={classes.introductionTextarea}
            placeholder="소개를 입력해주세요."
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            maxLength={120}
          />
          <p
            className={classes.introductionLength}
          >{`${introduction.length} / 120`}</p>
        </>
      ) : (
        <p className={classes.introductionText}>
          {user.intro ? user.intro : '소개가 없습니다.'}
        </p>
      )}
    </div>
  );
};

export default Introduction;
