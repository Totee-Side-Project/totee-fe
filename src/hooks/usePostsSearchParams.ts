import { useSearchParams } from 'react-router-dom';

export const POSTS_URL_PARAMS = {
  KEYWORD: 'kw',
  SORT: 'sort',
  PAGE: 'page',
  CAMEL_SORT: 'Sort',
  CAMEL_PAGE: 'Page',
} as const;

export const STUDY_POSTS_URL_PARAMS = {
  SORT: 'studySort',
  PAGE: 'studyPage',
};

export const MENTORING_POSTS_URL_PARAMS = {
  SORT: 'mentoringSort',
  PAGE: 'mentoringPage',
};

export const MENTO_POSTS_URL_PARAMS = {
  SORT: 'mentoSort',
  PAGE: 'mentoPage',
};

export const useGetPostsSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const keywordParam = searchParams.get(POSTS_URL_PARAMS.KEYWORD) || '';
  const sortParam = searchParams.get(POSTS_URL_PARAMS.SORT) || '';
  const pageParam = Number(searchParams.get(POSTS_URL_PARAMS.PAGE));

  const studySortParam = searchParams.get(STUDY_POSTS_URL_PARAMS.SORT) || '';
  const studyPageParam = Number(searchParams.get(STUDY_POSTS_URL_PARAMS.PAGE));

  const mentoringSortParam =
    searchParams.get(MENTORING_POSTS_URL_PARAMS.SORT) || '';
  const mentoringPageParam = Number(
    searchParams.get(MENTORING_POSTS_URL_PARAMS.PAGE),
  );

  const allParams = {
    study: {
      sort: studySortParam,
      page: studyPageParam,
    },
    mentoring: {
      sort: mentoringSortParam,
      page: mentoringPageParam,
    },
  };

  const allSearchParamsEntries = [...searchParams.entries()].reduce(
    (acc, [key, value]) => ({ ...acc, ...{ [key]: value } }),
    {} as { [key: string]: string },
  );

  return {
    keywordParam,
    sortParam,
    pageParam,
    setSearchParams,
    allParams,
    allSearchParamsEntries,
  };
};
