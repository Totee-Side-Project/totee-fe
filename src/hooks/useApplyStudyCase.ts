import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

import {
  // useDeleteApplicant,
  useUpdateApplicant,
} from '@hooks/query/useMutateQuery';

export const useApplyStudyCase = (
  postId: string,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
) => {
  const [formData, setFormData] = useState('');
  const { mutateAsync: addApplicantMutateAsync } = useUpdateApplicant(
    Number(postId),
  );

  const addApplicationOnClick = () => {
    if (!formData) return alert('모든 정보를 입력해주세요');

    addApplicantMutateAsync(formData, {
      onSuccess: () => {
        setIsOpen((pre) => !pre);
      },
    });
  };
  const onChangeByTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setFormData(value);
  };

  // const applyApplicationQuery = useDeleteApplicant(postId);

  return {
    formData,
    setFormData,
    addApplicantMutateAsync,
    addApplicationOnClick,
    onChangeByTextarea,
  };
};
