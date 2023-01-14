import './index.scss';

const UserActivityWrapper = ({ user, isEditUserProfile }: any) => {
  return (
    <div className="userActivityWrapper">
      <div className="introduction">
        <p className="introductionTitle">소개</p>
        {isEditUserProfile ? (
          <input />
        ) : (
          <p className="introductionContent">
            {user.intro ? user.intro : '소개가 없습니다.'}
          </p>
        )}
      </div>
      <div className="progress">
        <p className="progressTitle">진행중인 스터디 갯수</p>
        <p className="progressCount">{user.studyNum}개</p>
      </div>
      <div className="progress">
        <p className="progressTitle">진행중인 멘토링</p>
        <p className="progressCount">{user.mentoringNum}개</p>
      </div>
    </div>
  );
};

export default UserActivityWrapper;
