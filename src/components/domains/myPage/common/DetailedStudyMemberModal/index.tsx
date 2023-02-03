import { IMemberType } from '@api/team/types';
import Modal from '../Modal';
import ProfileImage from '../ProfileImage';
import classes from './index.module.scss';

interface IDetailedStudyMemberModalProps {
  title: string;
  subTitle: string;
  member?: IMemberType;
  isOpenedModal: boolean;
  setIsOpenedModal: React.Dispatch<React.SetStateAction<boolean>>;
  children?: any;
}

const DetailedStudyMemberModal = ({
  title,
  subTitle,
  member,
  isOpenedModal,
  setIsOpenedModal,
  children,
}: IDetailedStudyMemberModalProps) => {
  if (!member) {
    return <></>;
  }

  return (
    <Modal
      isOpenedModal={isOpenedModal}
      setIsOpenedModal={setIsOpenedModal}
      title={title}
      subTitle={subTitle}
    >
      <ProfileImage
        profileImgSrc={member.profileImg}
        width={'135px'}
        height={'135px'}
        margin={'32px 0 0 0'}
      />
      <p className={classes.nickname}>{member.nickname}</p>
      <p className={classes.email}>{member.email}</p>
      <p className={classes.message}>
        {member.message ? member.message : '내용이 없습니다.'}
      </p>
      {children}
    </Modal>
  );
};

export default DetailedStudyMemberModal;
