import { SelectAPI } from '@api/select';
import { useMutation } from 'react-query';
import { useQueryClient } from 'react-query';

export const useSelectCategory = () => {
  const queryClient = useQueryClient();
  return useMutation(() => SelectAPI.selectCategory(), {
    onSuccess: () => queryClient.invalidateQueries('post'),
  });
};
