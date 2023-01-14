import DefaultProfile from '../../../../../../assets/svg/profile-default.svg';
import './index.scss';

const UserProfileImageWrapper = ({ user }: any) => {
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
