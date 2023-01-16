import './index.scss';

const profileEditButton = ({
  nickName,
  isEditProfile,
  setIsEditProfile,
}: any) => {
  return (
    <>
      {isEditProfile ? (
        <div className="editMode">
          <button
            className="button submitUserButton"
            disabled={nickName.length < 2 || 5 < nickName.length}
            type="submit"
          >
            수정하기
          </button>
          <button
            className="button cancelButton"
            onClick={() => setIsEditProfile(false)}
          >
            취소하기
          </button>
        </div>
      ) : (
        <button
          className="button editProfileButton"
          onClick={() => setIsEditProfile(true)}
        >
          프로필 수정
        </button>
      )}
    </>
  );
};

export default profileEditButton;
