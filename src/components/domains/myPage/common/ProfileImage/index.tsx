import classes from './index.module.scss';
import profileCircle from '../../../../../assets/svg/profile-circle.svg';

interface IProfileImageProps {
  profileImgSrc: string;
  width?: string;
  height?: string;
  margin?: string;
}

const ProfileImage = ({
  profileImgSrc,
  width,
  height,
  margin,
}: IProfileImageProps) => {
  return (
    <img
      className={classes.profileImg}
      src={profileImgSrc ? profileImgSrc : profileCircle}
      alt={profileImgSrc ? '사용자 프로필 사진' : '기본 프로필 사진'}
      width={width}
      height={height}
      style={{ margin }}
    />
  );
};

export default ProfileImage;
