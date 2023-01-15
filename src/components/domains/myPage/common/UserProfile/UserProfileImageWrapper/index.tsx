import DefaultProfile from '../../../../../../assets/svg/profile-default.svg';
import './index.scss';
import useUploadImage from '@hooks/useProfileImage';

const UserProfileImageWrapper = ({ user }: any) => {
  // const {
  //   files: profileFile,
  //   UploadImage: UploadProfileImage,
  //   handleInitialImage: handleInitialProfileImage,
  //   resetFiles: resetProfileFiles,
  // } = useUploadImage({
  //   initialImage: user?.profileImageUrl,
  // });

  // const {
  //   files: backgroundFile,
  //   UploadBackgroundImage,
  //   ImgPlaceholder,
  //   handleInitialImage: handleInitialBackgroundImage,
  //   resetFiles: resetBackgroundFiles,
  // } = useUploadImage({
  //   initialImage: user?.backgroundImageUrl,
  // });

  // console.log(user);

  // //배경이미지가 뭐지?
  // //프로필수정눌렀을 때

  return (
    <div className="userProfileImageWrapper">
      {user.profileImageUrl ? (
        <img
          className="userProfileImage"
          src={user.profileImageUrl}
          alt="사용자 프로필 사진"
        />
      ) : (
        <img
          className="userProfileImage"
          src={DefaultProfile}
          alt="기본 프로필 사진"
        />
      )}
    </div>
  );
};

export default UserProfileImageWrapper;
