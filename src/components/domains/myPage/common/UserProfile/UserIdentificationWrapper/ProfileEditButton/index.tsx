import React from 'react';
import classes from '../index.module.scss';

interface IProfileEditButtonProps {
  nickName: string;
  isEditProfile: boolean;
  setIsEditProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileEditButton = ({
  nickName,
  isEditProfile,
  setIsEditProfile,
}: IProfileEditButtonProps) => {
  return (
    <div className={classes.profileEditButton}>
      {isEditProfile ? (
        <div className={classes.editMode}>
          <button
            className={classes.submitUserButton}
            disabled={nickName.length < 2 || 5 < nickName.length}
            type="submit"
          >
            수정하기
          </button>
          <button
            className={classes.cancelButton}
            onClick={() => setIsEditProfile(false)}
          >
            취소하기
          </button>
        </div>
      ) : (
        <button
          className={classes.editProfileButton}
          onClick={() => setIsEditProfile(true)}
        >
          프로필 수정
        </button>
      )}
    </div>
  );
};

export default ProfileEditButton;
