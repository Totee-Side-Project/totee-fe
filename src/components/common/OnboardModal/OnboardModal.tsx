import React, { useEffect, useState } from 'react';
import { Button, Modal, Alert } from '@components/atoms';
import classes from './onboardmodal.module.scss';
import AddProfileModal from './AddProfileModal';
import CheckPositionModal from './CheckPositionModal';
import { useAddUserInfo } from '@hooks/useMutateQuery';

interface IOnboardModalProps {
  isOpen: boolean;
  setIsOpen: (e: boolean) => void;
}
export function OnboardModal({isOpen, setIsOpen}:IOnboardModalProps) {
  const [isShowAlert, setIsShowAlert]=useState(false);
  const [values, setValues]=useState({
    "nickname":"",
    "position":"",
    "profileImage":"",
  })
  const [step, setStep] = useState(0);

  const addUserMutation = useAddUserInfo();

  const onClickConfimButton=async()=>{
    let formData = new FormData();
    for (const [key, value] of Object.entries(values)){
      formData.append(key, value);
    }

    const result = await addUserMutation.mutateAsync(formData);
    if(result.status ===200){
      setTimeout(()=>{
        setIsShowAlert(false);
      },3000);

      if(setIsOpen){
        setIsOpen(false);
        setIsShowAlert(true);
      }
    }
  }

  useEffect(() => {
    if (!isOpen) setStep(0);
  }, [isOpen]);

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
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <section className={classes.onboardModal}>{handleStep(step)}</section>
      </Modal>
      {isShowAlert && <Alert text="토티에 오신것을 환영합니다"/>}
    </>
  );
}
