import { useQueryClient } from 'react-query';
import Swal, { SweetAlertOptions } from 'sweetalert2';

import { queryKeys } from '@hooks/query/queryKeys';
import { useAcceptApplyMento } from '@hooks/query/useMutateQuery';

type SwalFireOptionsType = Record<
  'success' | 'error',
  Record<'accept' | 'reject', SweetAlertOptions>
>;

const DEFAULT_SWAL_TIMER = 3000;
const SUCCESS = 'success';
const ERROR = 'error';

const SWAL_FIRE_OPTIONS: SwalFireOptionsType = {
  success: {
    accept: {
      title: '승인 성공',
      text: '승인을 성공했어요',
      icon: SUCCESS,
      timer: DEFAULT_SWAL_TIMER,
    },
    reject: {
      title: '거부 성공',
      text: '거부를 성공했어요',
      icon: SUCCESS,
      timer: DEFAULT_SWAL_TIMER,
    },
  },
  error: {
    accept: {
      title: '승인 실패',
      text: '승인을 실패했어요',
      icon: ERROR,
      timer: DEFAULT_SWAL_TIMER,
    },
    reject: {
      title: '거부 실패',
      text: '거부를 실패했어요',
      icon: ERROR,
      timer: DEFAULT_SWAL_TIMER,
    },
  },
};

export const useAcceptAndRejectApplyMento = (
  nickName: string,
  closeModal: () => void,
) => {
  const { mutateAsync } = useAcceptApplyMento();
  const queryClient = useQueryClient();

  const acceptApplyMento = () =>
    mutateAsync(
      { accept: true, nickname: nickName },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(queryKeys.mentoList);
          Swal.fire(SWAL_FIRE_OPTIONS.success.accept).then(() => closeModal());
        },
        onError: () => {
          Swal.fire(SWAL_FIRE_OPTIONS.error.accept).then(() => closeModal());
        },
      },
    );
  const rejectApplyMento = () =>
    mutateAsync(
      { accept: false, nickname: nickName },
      {
        onSuccess: () => {
          Swal.fire(SWAL_FIRE_OPTIONS.success.reject).then(() => closeModal());
          queryClient.invalidateQueries(queryKeys.mentoList);
        },
        onError: () => {
          Swal.fire(SWAL_FIRE_OPTIONS.error.reject).then(() => closeModal());
        },
      },
    );

  return {
    acceptApplyMento,
    rejectApplyMento,
  };
};
