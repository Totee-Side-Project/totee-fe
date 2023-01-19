import { useSearchParams } from 'react-router-dom';

export const POSTS_URL_PARAMS = {
  KEYWORD: 'kw',
  SORT: 'sort',
  PAGE: 'page',
};

export const useGetPostsSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const keywordParam = searchParams.get(POSTS_URL_PARAMS.KEYWORD) || '';
  const sortParam = searchParams.get(POSTS_URL_PARAMS.SORT) || '';
  const pageParam = Number(searchParams.get(POSTS_URL_PARAMS.PAGE));

  return {
    keywordParam,
    sortParam,
    pageParam,
    setSearchParams,
  };
};
