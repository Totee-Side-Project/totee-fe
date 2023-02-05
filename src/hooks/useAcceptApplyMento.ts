import { useAcceptApplyMento } from '@hooks/query/useMutateQuery';

export const useAcceptAndRejectApplyMento = (nickName: string) => {
  const { mutate } = useAcceptApplyMento();

  const acceptApplyMento = () =>
    mutate(
      { accept: true, nickname: nickName },
      {
        // onSuccess: () => {},
        // onError: () => {},
      },
    );
  const rejectApplyMento = () =>
    mutate(
      { accept: false, nickname: nickName },
      {
        // onSuccess: () => {},
        // onError: () => {},
      },
    );

  return {
    acceptApplyMento,
    rejectApplyMento,
  };
};
