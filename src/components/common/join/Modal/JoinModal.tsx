import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { Button, Modal } from '@components/atoms';
import './joinModal.scss';
// import { useParams } from 'react-router-dom';
import {
  useDeleteApplicant,
  useUpdateApplicant,
} from '@hooks/query/useMutateQuery';
import { useRecoilValue } from 'recoil';
import { UserState } from '@store/user';

interface IJoinModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  postId: string;
}

export function JoinModal({ isOpen, setIsOpen, postId }: IJoinModalProps) {
  const useProfile = useRecoilValue(UserState);
  const [formData, setFormData] = useState('');
  const { mutateAsync: addApplicantMutateAsync } = useUpdateApplicant(
    Number(postId),
  );
  const applyApplicationQuery = useDeleteApplicant(postId);

  const addApplicationOnClick = () => {
    addApplicantMutateAsync(formData, {
      onSuccess: () => {
        setIsOpen((pre) => !pre);
      },
    });
  };
  const onChangeByTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setFormData(value);
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
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
            placeholder="본인에 대한 짧은 소개입니다. 본인에 대한 짧은 소개입니다. 본인에 대한 짧은 소개입니다. 본인에 대한 짧은 소개입니다."
            value={formData}
            onChange={onChangeByTextarea}
          />
          <Button
            text="완료"
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
