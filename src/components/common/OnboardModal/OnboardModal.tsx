import React, { useEffect, useState } from 'react';
import { Button, Modal } from '@components/atoms';
import classes from './onboardmodal.module.scss';
import AddProfileModal from './AddProfileModal';
import CheckPositionModal from './CheckPositionModal';

export function OnboardModal() {
  const [values, setValues]=useState({
    "grade":"",
    "nickname":"",
    "position":"",
    "profileImage":"",
  })
  const [step, setStep] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    if (!isOpenModal) setStep(0);
  }, [isOpenModal]);

  const handleStep = (step: number) => {
    switch (step) {
      case 0:
        return <AddProfileModal step={step} setStep={setStep} values={values} setValues={setValues}/>;
      case 1:
        return (
          <CheckPositionModal
            step={step}
            setStep={setStep}
            values={values} 
            setValues={setValues}
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
