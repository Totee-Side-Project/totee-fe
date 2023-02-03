export const useAcceptApplicant = (
  useAccept,
  currentPostId: number,
  setIsOpenedModal: React.Dispatch<React.SetStateAction<boolean>>,
  nickname: string,
) => {
  const { mutate, isSuccess } = useAccept(currentPostId);

  if (isSuccess) {
    setIsOpenedModal(false);
  }

  const onClickAcceptButton = (isAccept: boolean) => {
    mutate({
      accept: isAccept,
      nickname: nickname,
    });
  };

  return {
    onClickAcceptButton,
  };
};
