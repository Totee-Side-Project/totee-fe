import { IMemberType } from 'types/member.types';
import profileCircle from '../../../../../assets/svg/profile-circle.svg';
import classes from './index.module.scss';

interface IDetailedMemberModalProps {
  title: string;
  subTitle: string;
  member?: IMemberType;
  isOpenedModal: boolean;
  setIsOpenedModal: React.Dispatch<React.SetStateAction<boolean>>;
  children?: any;
}

const DetailedMemberModal = ({
  title,
  subTitle,
  member,
  isOpenedModal,
  setIsOpenedModal,
  children,
}: IDetailedMemberModalProps) => {
  if (!isOpenedModal) {
    return <></>;
  }

  return (
    <div className={classes.modalContainer}>
      <div className={classes.detailedMemberModal}>
        <button
          className={classes.closeButton}
          onClick={() => setIsOpenedModal(false)}
        >
          X
        </button>
        <p className={classes.title}>{title}</p>
        <p className={classes.subTitle}>{subTitle}</p>
        <img
          className={classes.profileImg}
          src={member?.profileImg ? member.profileImg : profileCircle}
          alt={member?.profileImg ? '사용자 프로필 사진' : '기본 프로필 사진'}
        />
        <p className={classes.nickname}>{member?.nickname}</p>
        <p className={classes.email}>{member?.email}</p>
        <p className={classes.message}>
          {member?.message ? member.message : '내용이 없습니다.'}
        </p>
        {children}
      </div>
    </div>
  );
};

export default DetailedMemberModal;
