import { useGetPostsSearchParams } from '@hooks/usePostsSearchParams';

interface IProps {
  size?: number;
  page?: number;
}

const DESC = 'desc';

export const useGetPostsParams = ({ size, page = 0 }: IProps) => {
  const { sortParam, keywordParam, allParams } = useGetPostsSearchParams();

  const allCategoryParams = {
    study: {
      keyword: keywordParam,
      size,
      sort: !allParams.study.sort ? [DESC] : [allParams.study.sort, DESC],
      page: allParams.study.page - 1,
    },
    mentoring: {
      keyword: keywordParam,
      size,
      sort: !allParams.mentoring.sort
        ? [DESC]
        : [allParams.mentoring.sort, DESC],
      page: allParams.mentoring.page - 1,
    },
  };
  const params = {
    keyword: keywordParam,
    size,
    sort: !sortParam ? [DESC] : [sortParam, DESC],
    page,
  };

  return {
    params,
    allCategoryParams,
    sortParam,
    keywordParam,
  };
};
