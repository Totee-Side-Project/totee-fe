import ToteeBadgeIcon from '../../../../../../assets/svg/totee-badge.svg';
import { positionListKey } from '@utils/position.const';
import './index.scss';
import ProfileEditButton from './ProfileEditButton';

//최소1글자  , 아니면 버튼 disabled됨
//여기태그 form바꾸기
//파일이름도 form바꾸기

const UserIdentificationWrapper = ({
  user,
  userNickName,
  setUserNickName,
  isEditUserProfile,
  setIsEditUserProfile,
  refetchUserInfo,
}: any) => {
  return (
    <form className="userIdentificationWrapper">
      <div className="titleWrapper">
        {isEditUserProfile ? (
          <input
            className="userNickNameInput"
            placeholder="최대 5글자"
            maxLength={5}
            value={userNickName}
            onChange={(e) => setUserNickName(e.target.value)}
          />
        ) : (
          <p className="userNickName">{user.nickname}</p>
        )}
        {user.roleType === 'totee' && (
          <img
            className="toteeBadgeIcon"
            src={ToteeBadgeIcon}
            alt="토티 뱃지"
          />
        )}
      </div>
      <p className="userIdentification">
        {user.roleType} | {positionListKey[user.position as string]} <br />
        {user.email !== 'NO_EMAIL' && user.email}
      </p>
      <ProfileEditButton
        userNickName={userNickName}
        isEditUserProfile={isEditUserProfile}
        setIsEditUserProfile={setIsEditUserProfile}
        refetchUserInfo={refetchUserInfo}
      />
    </form>
  );
};

export default UserIdentificationWrapper;
