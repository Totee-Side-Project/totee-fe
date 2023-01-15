import './index.scss';
import Introduction from './Introduction/indext';

const UserActivityWrapper = ({
  user,
  isEditUserProfile,
  introduction,
  setIntroduction,
}: any) => {
  return (
    <div className="userActivityWrapper">
      <Introduction
        user={user}
        isEditUserProfile={isEditUserProfile}
        introduction={introduction}
        setIntroduction={setIntroduction}
      />
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
