import ToteeBadgeIcon from '../../../../../../assets/svg/totee-badge.svg';
import { positionListKey } from '@utils/position.const';

import './index.scss';

const UserIdentificationWrapper = ({
  user,
  isEditUserProfile,
  setIsEditUserProfile,
}: any) => {
  return (
    <div className="userIdentificationWrapper">
      <div className="titleWrapper">
        {isEditUserProfile ? (
          <input placeholder="최대 5글자" />
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
      <button
        className="userProfileEditButton"
        onClick={() => setIsEditUserProfile(!isEditUserProfile)}
        style={{
          backgroundColor: isEditUserProfile ? '#9C9C9C' : '#FFFFFF',
          color: isEditUserProfile ? '#FFFFFF' : '#898989',
        }}
      >
        프로필 수정
      </button>
    </div>
  );
};

export default UserIdentificationWrapper;
