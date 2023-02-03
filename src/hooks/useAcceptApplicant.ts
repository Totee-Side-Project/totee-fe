export const useAcceptApplicant = (
  applicantAcceptance,
  setIsOpenedModal: React.Dispatch<React.SetStateAction<boolean>>,
  nickname: string,
) => {
  if (applicantAcceptance.isSuccess) {
    setIsOpenedModal(false);
  }

  const onClickAcceptButton = (isAccept: boolean) => {
    applicantAcceptance.mutate({
      accept: isAccept,
      nickname: nickname,
    });
  };

  return {
    onClickAcceptButton,
  };
};
