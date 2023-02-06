import { useRecoilValue } from 'recoil';

import { Button, Modal } from '@components/atoms';
import { UserState } from '@store/user';
import { useApplyStudyCase } from '@hooks/useApplyStudyCase';
import './joinModal.scss';

interface IJoinModalProps {
  isOpen: boolean;
  closeModal: () => void;
  postId: string;
}

export function JoinModal({ isOpen, closeModal, postId }: IJoinModalProps) {
  const useProfile = useRecoilValue(UserState);
  const { formData, onChangeByTextarea, addApplicationOnClick } =
    useApplyStudyCase(postId, closeModal);

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <div className="ApplyModalWrapper">
        <div className="ApplyTitle">지원 하기</div>
        <div className="SubTitle">지원하실 포지션과 소개를 적어주세요.</div>
        <div>
          <div className="ApplyProfile">
            <img src={useProfile.profileImageUrl} alt="userProfile_image" />
          </div>
          <div className="ApplyName">{useProfile.nickname}</div>
          <div className="ApplyEmail">{useProfile.email}</div>
          <textarea
            maxLength={500}
            className="ApplyIntro"
            placeholder="본인에 대한 짧은 소개입니다."
            value={formData}
            onChange={onChangeByTextarea}
          />
          <Button
            center="완료"
            style={{
              color: '#fff',
              width: '210px',
              backgroundColor: '#568A35',
              margin: '30px auto 0 auto',
            }}
            onClick={addApplicationOnClick}
          />
        </div>
      </div>
    </Modal>
  );
}
