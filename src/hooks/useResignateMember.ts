export const useResignateMember = (
  useResignate,
  currentPostId: number,
  setIsOpenedModal: React.Dispatch<React.SetStateAction<boolean>>,
  nickname: string,
) => {
  const { mutate, isSuccess } = useResignate(currentPostId, nickname);

  if (isSuccess) {
    setIsOpenedModal(false);
  }

  return {
    onClickResignateButton: mutate,
  };
};
