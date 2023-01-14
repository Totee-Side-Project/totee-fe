import { useGetUserAPI } from '@hooks/query/useGetQuery';
import useUploadImage from '@hooks/useProfileImage';
import { positionListKey } from '@utils/position.const';
import ToteeBadgeIcon from '../../../../../../assets/svg/totee-badge.svg';
import './index.scss';

const UserProfile = () => {
  const user = useGetUserAPI().data.data.body.data;

  return (
    <section className="userProfile">
      <div className="userProfileImageWrapper">
        <img
          className="userProfileImage"
          src={user.profileImageUrl}
          alt="사용자 프로필 사진"
        />
      </div>
      <div className="userIdentificationWrapper">
        <div className="titleWrapper">
          <p className="userNickName">{user.nickname}</p>
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
        <button className="userProfileEditButton">프로필 수정</button>
      </div>
      <div className="userActivityWrapper">
        <div className="introduction">
          <p className="introductionTitle">소개</p>
          <p className="introductionContent">
            {user.intro ? user.intro : '소개가 없습니다.'}
          </p>
        </div>
        <div className="progress">
          <p className="progressTitle">진행중인 스터디 갯수</p>
          <p className="progressCount">1개 (수정 필요) </p>
        </div>
        <div className="progress">
          <p className="progressTitle">진행중인 멘토링</p>
          <p className="progressCount">1개 (수정 필요)</p>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
