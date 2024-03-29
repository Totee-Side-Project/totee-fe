import classes from './index.module.scss';
import Modal from '../Modal';
import ProfileImage from '../ProfileImage';
import { useState } from 'react';
import { IMentoringMemberType } from '@api/team/types';

interface IDetailedMentoringMemberModalProps {
  title: string;
  subTitle: string;
  member?: IMentoringMemberType;
  isOpenedModal: boolean;
  setIsOpenedModal: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
}

const DetailedMentoringMemberModal = ({
  title,
  subTitle,
  member,
  isOpenedModal,
  setIsOpenedModal,
  children,
}: IDetailedMentoringMemberModalProps) => {
  const [modalPage, setModalPage] = useState(0);

  if (!member) {
    return <></>;
  }

  return (
    <Modal
      isOpenedModal={isOpenedModal}
      setIsOpenedModal={setIsOpenedModal}
      setModalPage={setModalPage}
      title={title}
      subTitle={subTitle}
    >
      <ProfileImage
        profileImgSrc={member.profileImg}
        width={'105px'}
        height={'105px'}
        margin={'20px 0 0 0'}
      />
      <p className={classes.nickname}>{member.nickname}</p>
      <p className={classes.email}>{member.email}</p>
      <hr />
      {modalPage === 0 && (
        <>
          <p className={classes.hopeDateTimeTitle}>강습 희망 요일</p>
          <p className={`${classes.hopeDateTimeBorder} ${classes.date}`}>
            {member.week}
          </p>
          <p className={classes.hopeDateTimeTitle}>강습 희망 시간대</p>
          <div className={classes.time}>
            <p className={`${classes.hopeDateTimeBorder} ${classes.startTime}`}>
              {member.startTime}
            </p>
            <span className={classes.wave}>~</span>
            <p className={`${classes.hopeDateTimeBorder} ${classes.endTime}`}>
              {member.endTime}
            </p>
          </div>
          <button
            className={classes.nextButton}
            onClick={() => setModalPage(1)}
          >
            다음 페이지
          </button>
        </>
      )}
      {modalPage === 1 && (
        <>
          <div className={classes.commentTitle}>기타 자기소개 코멘트</div>
          <div className={classes.comment}>
            {member.comment ? member.comment : '내용이 없습니다.'}
          </div>
          {children}
        </>
      )}
    </Modal>
  );
};

export default DetailedMentoringMemberModal;
