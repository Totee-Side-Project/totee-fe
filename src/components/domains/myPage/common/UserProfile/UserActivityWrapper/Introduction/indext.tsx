import './index.scss';

const Introduction = ({
  user,
  isEditProfile,
  introduction,
  setIntroduction,
}: any) => {
  return (
    <div className="introduction">
      <p className="introductionTitle">소개</p>
      {isEditProfile ? (
        <>
          <textarea
            className="introductionTextarea"
            placeholder="소개를 입력해주세요."
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            maxLength={120}
          />
          <p className="introductionLength">{`${introduction.length} / 120`}</p>
        </>
      ) : (
        <p className="introductionText">
          {user.intro ? user.intro : '소개가 없습니다.'}
        </p>
      )}
    </div>
  );
};

export default Introduction;
