import { FunctionComponent, ReactNode } from 'react';

import { Circle } from '@components/atoms';
import { ISortOptions, sortOptionNameType } from 'types/sort.types';
import classes from './postsFilter.module.scss';
import {
  POSTS_URL_PARAMS,
  useGetPostsSearchParams,
} from '@hooks/usePostsSearchParams';

interface Props {
  options: ISortOptions;
  Element?: FunctionComponent<{ center?: ReactNode; isSelected?: boolean }>;
}

const RECENT = 'recent';

export const PostsFilter = ({ options, Element }: Props) => {
  const { keywordParam, sortParam, setSearchParams } =
    useGetPostsSearchParams();
  const postsSortParam = sortParam || RECENT;

  const onClick = (sortValue: sortOptionNameType) => {
    const newSearchParams = keywordParam
      ? {
          [POSTS_URL_PARAMS.KEYWORD]: keywordParam,
          [POSTS_URL_PARAMS.SORT]: sortValue,
        }
      : { [POSTS_URL_PARAMS.SORT]: sortValue };

    if (sortValue === RECENT) {
      return setSearchParams(
        keywordParam ? { [POSTS_URL_PARAMS.KEYWORD]: keywordParam } : {},
      );
    }

    setSearchParams(newSearchParams);
  };

  const sortedList = Object.entries(options) as [sortOptionNameType, string][];

  return (
    <ul className={classes.filters}>
      {sortedList.map(([key, value]) => (
        <li key={key} className={classes.filter} onClick={() => onClick(key)}>
          {Element ? (
            <Element center={value} isSelected={postsSortParam === key} />
          ) : (
            <>
              <Circle
                selected={postsSortParam === key}
                options={{ outCircle: false }}
              />
              {value}
            </>
          )}
        </li>
      ))}
    </ul>
  );
};
