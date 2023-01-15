import './index.scss';

const profileEditButton = ({ nickName, isEditProfile }: any) => {
  const isDisabled = () => {
    if (!isEditProfile) {
      return false;
    }
    return nickName.length < 2 || 5 < nickName.length;
  };

  const style = {
    backgroundColor: isEditProfile ? '#9C9C9C' : '#FFFFFF',
    color: isEditProfile ? '#FFFFFF' : '#898989',
    border: isEditProfile && 'none',
  };

  return (
    <button className="profileEditButton" disabled={isDisabled()} style={style}>
      프로필 수정
    </button>
  );
};

export default profileEditButton;
