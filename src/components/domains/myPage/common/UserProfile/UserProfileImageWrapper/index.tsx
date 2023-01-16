import { UserType } from 'types/user.types';
import profileCircle from '../../../../../../assets/svg/profile-circle.svg';
import profileSquare from '../../../../../../assets/svg/profile-square.svg';
import React, { useState } from 'react';
import './index.scss';

interface IUserProfileImageWrapperProps {
  user: UserType;
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

  const onChange = (e: any) => {
    const imageFile: Blob | MediaSource | undefined = e.target.files[0];
    if (!imageFile) {
      return;
    }
    setImageFile(imageFile);
    setImageUrl(URL.createObjectURL(imageFile));
  };

  return (
    <div className="userProfileImageWrapper">
      {isEditProfile ? (
        <>
          <img className="profileImage" src={imageUrl} />
          <label className="profileImageEditLabel" htmlFor="file">
            <img src={profileSquare} />
          </label>
          <input
            className="profileImageEditInput"
            type="file"
            id="file"
            onChange={onChange}
            accept="image/*"
          />
        </>
      ) : (
        <img
          className="profileImage"
          src={user.profileImageUrl ? user.profileImageUrl : profileCircle}
          alt={user.profileImageUrl ? '사용자 프로필 사진' : '기본 프로필 사진'}
        />
      )}
    </div>
  );
};

export default UserProfileImageWrapper;
