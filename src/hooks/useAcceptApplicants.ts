import { useEffect } from 'react';

export const useAcceptApplicants = (
  { mutate, isSuccess },
  setIsOpenedModal,
  nickname,
) => {
  const onClickAcceptButton = (isAccept: boolean) => {
    mutate({
      accept: isAccept,
      nickname: nickname,
    });
  };

  useEffect(() => {
    setIsOpenedModal(false);
  }, [isSuccess]);

  return {
    onClickAcceptButton,
  };
};
