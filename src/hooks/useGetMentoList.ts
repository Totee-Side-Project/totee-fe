import {
  MENTO_APPLICANTS_KINDS,
  MENTO_APPLICANTS_SIZE,
} from 'constants/adminPage';
import { useGetMentoList } from '@hooks/query/useGetQuery';
import { useMentoPagination } from '@hooks/useMentoPagination';

export const useFetchMentoList = () => {
  const { currentPage } = useMentoPagination();

  const pendingMentoQuery = useGetMentoList({
    kind: MENTO_APPLICANTS_KINDS.pending,
    size: MENTO_APPLICANTS_SIZE,
    page: currentPage,
  });
  const approvedMentoQuery = useGetMentoList({
    kind: MENTO_APPLICANTS_KINDS.approved,
    size: MENTO_APPLICANTS_SIZE,
    page: currentPage,
  });

  return {
    pendingMentoQuery,
    approvedMentoQuery,
  };
};
