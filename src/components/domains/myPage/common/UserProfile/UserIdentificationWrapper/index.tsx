import ToteeBadgeIcon from '../../../../../../assets/svg/totee-badge.svg';
import { positionListKey } from '@utils/position.const';
import ProfileEditButton from './ProfileEditButton';
import './index.scss';

const UserIdentificationWrapper = ({
  user,
  nickName,
  setNickName,
  isEditProfile,
  onClickProfileEditButton,
}: any) => {
  return (
    <form
      className="userIdentificationWrapper"
      onSubmit={onClickProfileEditButton}
    >
      <div className="titleWrapper">
        {isEditProfile ? (
          <input
            className="nickNameInput"
            placeholder="최대 5글자"
            maxLength={5}
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
          />
        ) : (
          <p className="nickName">{user.nickname}</p>
        )}
        {user.roleType === 'totee' && (
          <img
            className="toteeBadgeIcon"
            src={ToteeBadgeIcon}
            alt="토티 뱃지"
          />
        )}
      </div>
      <p className="identification">
        {user.roleType} | {positionListKey[user.position as string]} <br />
        {user.email !== 'NO_EMAIL' && user.email}
      </p>
      <ProfileEditButton nickName={nickName} isEditProfile={isEditProfile} />
    </form>
  );
};

export default UserIdentificationWrapper;
