import './index.scss';

const NickName = ({ user, nickName, setNickName, isEditProfile }: any) => {
  return (
    <>
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
    </>
  );
};

export default NickName;
