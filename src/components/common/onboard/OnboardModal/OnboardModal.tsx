import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Modal } from '@components/atoms';
import classes from './onboardmodal.module.scss';
import AddProfileModal from './AddProfileModal';
import CheckPositionModal from './CheckPositionModal';
import { useAddUserInfo } from '@hooks/query/useMutateQuery';
import useProfileImage from '@hooks/useProfileImage';

interface IOnboardModalProps {
  isOpen: boolean;
  setIsOpen: (e: boolean) => void;
}
export function OnboardModal({ isOpen, setIsOpen }: IOnboardModalProps) {
  let navigate = useNavigate();

  const [isShowAlert, setIsShowAlert] = useState(false);
  const [values, setValues] = useState({
    nickname: '',
    position: '',
    profileImage: null as any,
  });
  const [step, setStep] = useState(0);
  const addUserMutation = useAddUserInfo();

  const { files, UploadImage: ProfileImage } = useProfileImage({
    initalData: undefined,
  });

  const onClickConfimButton = async () => {
    let formData = new FormData();
    for (const [key, value] of Object.entries(values)) {
      formData.append(key, value);
    }

    const result = await addUserMutation.mutateAsync(formData);
    if (result.status === 200) {
      setTimeout(() => {
        setIsOpen(false);
        setIsShowAlert(false);
        navigate('/');
      }, 3000);

      setIsShowAlert(true);
    }
  };

  useEffect(() => {
    if (!isOpen) setStep(0);
  }, [isOpen]);

  const handleStep = (step: number) => {
    switch (step) {
      case 0:
        return (
          <AddProfileModal
            step={step}
            setStep={setStep}
            values={values}
            setValues={setValues}
            files={files}
            ProfileImage={ProfileImage}
          />
        );
      case 1:
        return (
          <CheckPositionModal
            step={step}
            setStep={setStep}
            values={values}
            setValues={setValues}
            setIsOpenModal={setIsOpen}
            onClickConfimButton={onClickConfimButton}
          ></CheckPositionModal>
        );
      default:
        return;
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} isCloseBtn={false}>
        <section className={classes.onboardModal}>{handleStep(step)}</section>
      </Modal>
      {isShowAlert && <Alert text="토티에 오신것을 환영합니다" />}
    </>
  );
}
