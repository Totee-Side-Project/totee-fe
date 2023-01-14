import { useGetUserAPI } from '@hooks/query/useGetQuery';
import useUploadImage from '@hooks/useProfileImage';
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
        <p className="userNickName">{user.nickname}</p>
        <p className="userIdentification">
          {user.roleType} | {user.position} <br />
          olo90632951@gmail.com
        </p>
        <button className="userProfileEditButton">프로필 수정</button>
      </div>
      <hr />
      <div>
        <div className="userIntroductionWrapper">
          <p className="userIntroductionTitle">소개</p>
          <p className="userIntroductionContent">
            {user.intro}본인에 대한 짧은 소개입니다.본인에 대한 짧은
            소개입니다.본인에 대한 짧은 소개입니다.본인에 대한 짧은
            소개입니다.본인에 대한 짧은 소개입니다.
          </p>
        </div>
        <div className="progressWrapper">
          <p className="progressTitle">진행중인 스터디 갯수</p>
          <p className="progressCount">1개</p>
        </div>
        <div className="progressWrapper">
          <p className="progressTitle">진행중인 멘토링</p>
          <p className="progressCount">1개</p>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
