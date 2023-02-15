import profileSquare from '../../../../../../assets/svg/profile-square.svg';
import React, { useState } from 'react';
import classes from './index.module.scss';
import { IUserType } from '@api/user/types';
import ProfileImage from '../../ProfileImage';
import { useMobileView } from '@hooks/useMobileView';

interface IUserProfileImageWrapperProps {
  user: IUserType;
  isEditProfile: boolean;
  setImageFile: React.Dispatch<
    React.SetStateAction<Blob | MediaSource | undefined>
  >;
}

const UserProfileImageWrapper = ({
  user,
  isEditProfile,
  setImageFile,
}: IUserProfileImageWrapperProps) => {
  const [imageUrl, setImageUrl] = useState(user.profileImageUrl);
  const isCurrentMobileWidth = useMobileView(991);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile: Blob | MediaSource | undefined = e.target.files?.[0];
    if (!imageFile) {
      return;
    }
    setImageFile(imageFile);
    setImageUrl(URL.createObjectURL(imageFile));
  };

  return (
    <div className={classes.userProfileImageWrapper}>
      {isEditProfile ? (
        <>
          <ProfileImage
            profileImgSrc={imageUrl}
            width={isCurrentMobileWidth ? '70px' : '131px'}
            height={isCurrentMobileWidth ? '70px' : '131px'}
          />
          <label className={classes.profileImageEditLabel} htmlFor="file">
            <img src={profileSquare} />
          </label>
          <input
            className={classes.profileImageEditInput}
            type="file"
            id="file"
            onChange={onChange}
            accept="image/*"
          />
        </>
      ) : (
        <ProfileImage
          profileImgSrc={user.profileImageUrl}
          width={isCurrentMobileWidth ? '70px' : '131px'}
          height={isCurrentMobileWidth ? '70px' : '131px'}
        />
      )}
    </div>
  );
};

export default UserProfileImageWrapper;
