import { useGetPostsSearchParams } from '@hooks/usePostsSearchParams';

interface IProps {
  size?: number;
  page?: number;
}

export const useGetPostsParams = ({ size, page = 0 }: IProps) => {
  const { sortParam, keywordParam } = useGetPostsSearchParams();
  const params = {
    keyword: keywordParam,
    size,
    sort: !sortParam ? ['desc'] : [sortParam, 'desc'],
    page,
  };

  return {
    params,
    sortParam,
    keywordParam,
  };
};
