import { useValidateUserNickName } from '@hooks/query/useMutateQuery';
import './index.scss';

const profileEditButton = ({
  userNickName,
  isEditUserProfile,
  setIsEditUserProfile,
  refetchUserInfo,
}: any) => {
  const { mutate: validateUserNickName } =
    useValidateUserNickName(userNickName);

  const onClick = (e: any) => {
    e.preventDefault();
    setIsEditUserProfile(!isEditUserProfile);
    if (isEditUserProfile) {
      validateUserNickName();
      //refetchUserInfo();   //중복 검사 후 성공하면 -> 업데이트
    }
  };

  const isDisabled = () => {
    if (!isEditUserProfile) {
      return false;
    }
    return userNickName.length < 2 || 5 < userNickName.length;
  };

  const style = {
    backgroundColor: isEditUserProfile ? '#9C9C9C' : '#FFFFFF',
    color: isEditUserProfile ? '#FFFFFF' : '#898989',
    border: isEditUserProfile && 'none',
  };

  return (
    <button
      className="profileEditButton"
      onClick={onClick}
      disabled={isDisabled()}
      style={style}
    >
      프로필 수정
    </button>
  );
};

export default profileEditButton;
