import { ChangeEvent, useState } from 'react';

import { useUpdateApplicant } from '@hooks/query/useMutateQuery';

export const useApplyStudyCase = (postId: string, closeModal: () => void) => {
  const [formData, setFormData] = useState('');
  const { mutateAsync: addApplicantMutateAsync } = useUpdateApplicant(
    Number(postId),
  );
  const resetFormData = () => setFormData('');

  const addApplicationOnClick = () => {
    if (!formData) return alert('모든 정보를 입력해주세요');

    addApplicantMutateAsync(formData, {
      onSuccess: () => {
        resetFormData();
        closeModal();
      },
      onError: () => {
        resetFormData();
        closeModal();
      },
    });
  };
  const onChangeByTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setFormData(value);
  };

  return {
    formData,
    setFormData,
    addApplicantMutateAsync,
    addApplicationOnClick,
    onChangeByTextarea,
  };
};
