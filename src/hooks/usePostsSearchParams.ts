import { useSearchParams } from 'react-router-dom';

export const POSTS_URL_PARAMS = {
  KEYWORD: 'kw',
  SORT: 'sort',
  PAGE: 'page',
  CAMEL_SORT: 'Sort',
  CAMEL_PAGE: 'Page',
} as const;

export const useGetPostsSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const keywordParam = searchParams.get(POSTS_URL_PARAMS.KEYWORD) || '';
  const sortParam = searchParams.get(POSTS_URL_PARAMS.SORT) || '';
  const pageParam = Number(searchParams.get(POSTS_URL_PARAMS.PAGE));

  const allSearchParamsEntries = [...searchParams.entries()].reduce(
    (acc, [key, value]) => ({ ...acc, ...{ [key]: value } }),
    {} as { [key: string]: string },
  );

  return {
    keywordParam,
    sortParam,
    pageParam,
    setSearchParams,
    allSearchParamsEntries,
  };
};
