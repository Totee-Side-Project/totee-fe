import React, { useEffect, useState } from 'react';
import { Button, Modal } from '@components/atoms';
import classes from './onboardmodal.module.scss';
import SignInModal from './SignInModal';
import AddProfileModal from './AddProfileModal';
import CheckPositionModal from './CheckPositionModal';

export function OnboardModal() {
  const [step, setStep] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    if (!isOpenModal) setStep(0);
  }, [isOpenModal]);

  const handleStep = (step: number) => {
    switch (step) {
      case 0:
        return <SignInModal step={step} setStep={setStep} />;
      case 1:
        return <AddProfileModal step={step} setStep={setStep} />;
      case 2:
        return (
          <CheckPositionModal
            step={step}
            setStep={setStep}
          ></CheckPositionModal>
        );
      default:
        return;
    }
  };

  return (
    <>
      <button onClick={() => setIsOpenModal(!isOpenModal)}>모달버튼</button>
      <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal}>
        <section className={classes.onboardModal}>{handleStep(step)}</section>
      </Modal>
    </>
  );
}
