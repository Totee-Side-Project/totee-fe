import ToteeBadgeIcon from '../../../../../../assets/svg/totee-badge.svg';
import { positionListKey } from '@utils/position.const';
import { useValidateNickName } from '@hooks/query/useMutateQuery';
import ProfileEditButton from './ProfileEditButton';
import './index.scss';
import { useEffect } from 'react';

const UserIdentificationWrapper = ({
  user,
  nickName,
  setNickName,
  isEditProfile,
  setIsEditProfile,
  updateUser,
}: any) => {
  const { mutate: validateNickName, isSuccess: isValidateNickName } =
    useValidateNickName();

  useEffect(() => {
    if (!isEditProfile) {
      return;
    }
    if (isValidateNickName) {
      updateUser();
      setIsEditProfile(false); // 업데이트 성공했을때만
      return;
    }
    setIsEditProfile(true);
  }, [isValidateNickName]);

  const onSubmitUser = (e: any) => {
    e.preventDefault();
    if (!isEditProfile) {
      setIsEditProfile(true);
      return;
    }
    validateNickName(nickName);
  };

  return (
    <form className="userIdentificationWrapper" onSubmit={onSubmitUser}>
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
