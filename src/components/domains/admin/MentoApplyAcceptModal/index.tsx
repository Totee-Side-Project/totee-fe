import { useState } from 'react';

import { Modal } from '@components/atoms';
import { useAcceptAndRejectApplyMento } from '@hooks/useAcceptApplyMento';
import { IMento } from '@api/mentor/types';

import classes from './index.module.scss';

interface IMentoApplyAcceptModalProps {
  mento: IMento;
}

export const MentoApplyAcceptModal = ({
  mento,
}: IMentoApplyAcceptModalProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const { acceptApplyMento, rejectApplyMento } = useAcceptAndRejectApplyMento(
    mento.nickname,
  );
  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      className={classes.modalContent}
    >
      <div className={classes.mentoApplyAcceptModal}>
        <div className={classes.mentoProfile}>
          <img
            className={classes.profileImage}
            src={mento.portfolioUrl}
            alt="멘토 프로필 이미지"
          />
          <h3 className={classes.nickName}>{mento.nickname}</h3>
          <p className={classes.email}>{mento.email}</p>
          <div className={classes.contact}>{mento.contact}</div>
        </div>
        <div className={classes.mentoCareerProfile}>
          <div className={classes.mentoCarrerProfleTop}>
            <span className={classes.fieldWrap}>
              <div className={classes.label}>분야</div>
              <div className={classes.field}>{mento.field}</div>
            </span>
            <span className={classes.careerWrap}>
              <div className={classes.label}>실무 경력</div>
              <div className={classes.career}>{mento.career}</div>
            </span>
          </div>
          <div className={classes.mentoCarrerProfleBottom}>
            <div className={classes.portfolioWrap}>
              <div className={classes.label}>포트폴리오주소</div>
              <a
                className={classes.portfolio}
                href={mento.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {mento.portfolioUrl}
              </a>
            </div>
          </div>
          <p className={classes.comment}>{mento.comment}</p>
        </div>
        <div className={classes.buttonWrap}>
          <button
            type="submit"
            className={classes.rejectButton}
            onClick={rejectApplyMento}
          >
            거부
          </button>
          <button
            type="submit"
            className={classes.acceptButton}
            onClick={acceptApplyMento}
          >
            허용
          </button>
        </div>
      </div>
    </Modal>
  );
};
