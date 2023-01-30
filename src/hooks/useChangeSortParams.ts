import { CategoryTypes } from '@components/domains/posts/PostsContainer';
import {
  POSTS_URL_PARAMS,
  useGetPostsSearchParams,
} from '@hooks/usePostsSearchParams';
import { PostsSortOptionNameType } from 'types/sort.types';

const RECENT = 'recent';

export const useChangeSortParams = () => {
  const { keywordParam, sortParam, setSearchParams, allSearchParamsEntries } =
    useGetPostsSearchParams();
  const postsSortParam = sortParam || RECENT;

  const handleSearchParamsWithCategory = (
    sortValue: PostsSortOptionNameType,
    category: CategoryTypes,
  ) => {
    const keywordParamObject = { [POSTS_URL_PARAMS.KEYWORD]: keywordParam };
    const categorySortParamKey = `${category}${POSTS_URL_PARAMS.CAMEL_SORT}`;
    const categorySortParamObject = {
      [categorySortParamKey]: sortValue,
    };

    const newSearchParams = keywordParam
      ? {
          ...keywordParamObject,
          ...categorySortParamObject,
        }
      : categorySortParamObject;

    if (sortValue === RECENT) {
      const newAllSearchParamsEntries = {
        ...allSearchParamsEntries,
      };
      delete newAllSearchParamsEntries[categorySortParamKey];

      return setSearchParams(newAllSearchParamsEntries);
    }

    setSearchParams({ ...allSearchParamsEntries, ...newSearchParams });
  };

  const handleSearchParamsWithNotCategory = (
    sortValue: PostsSortOptionNameType,
  ) => {
    const keywordParamObject = { [POSTS_URL_PARAMS.KEYWORD]: keywordParam };
    const sortParamObject = { [POSTS_URL_PARAMS.SORT]: sortValue };

    if (sortValue === RECENT)
      return setSearchParams(keywordParam ? keywordParamObject : {});

    const newSearchParam = keywordParam
      ? {
          ...keywordParamObject,
          ...sortParamObject,
        }
      : sortParamObject;

    setSearchParams(newSearchParam);
  };

  return {
    postsSortParam,
    handleSearchParamsWithCategory,
    handleSearchParamsWithNotCategory,
  };
};
