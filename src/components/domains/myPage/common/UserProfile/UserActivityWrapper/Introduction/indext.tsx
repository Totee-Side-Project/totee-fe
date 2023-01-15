import './index.scss';

const Introduction = ({
  user,
  isEditUserProfile,
  introduction,
  setIntroduction,
}: any) => {
  return (
    <div className="introduction">
      <p className="title">소개</p>
      {isEditUserProfile ? (
        <>
          <textarea
            className="textarea"
            placeholder="소개를 입력해주세요."
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            maxLength={120}
          />
          <p className="introductionLength">{`${introduction.length} / 120`}</p>
        </>
      ) : (
        <p className="text">{user.intro ? user.intro : '소개가 없습니다.'}</p>
      )}
    </div>
  );
};

export default Introduction;
