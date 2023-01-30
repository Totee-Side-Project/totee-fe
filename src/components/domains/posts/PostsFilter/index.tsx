import { FunctionComponent, ReactNode } from 'react';

import { Circle } from '@components/atoms';
import {
  IMentoringSortOptions,
  IPostsSortOptions,
  PostsSortOptionNameType,
} from 'types/sort.types';
import { CategoryTypes } from '@components/domains/posts/PostsContainer';
import classes from './postsFilter.module.scss';
import { useChangeSortParams } from '@hooks/useChangeSortParams';

interface Props {
  options: IPostsSortOptions | IMentoringSortOptions;
  category?: CategoryTypes;
  Element?: FunctionComponent<{ center?: ReactNode; isSelected?: boolean }>;
}

export const PostsFilter = ({ options, category, Element }: Props) => {
  const {
    postsSortParam,
    handleSearchParamsWithCategory,
    handleSearchParamsWithNotCategory,
  } = useChangeSortParams();
  const sortedList = Object.entries(options) as [
    PostsSortOptionNameType,
    string,
  ][];

  return (
    <ul className={classes.filters}>
      {sortedList.map(([key, value]) => (
        <li
          key={key}
          className={classes.filter}
          onClick={() =>
            category
              ? handleSearchParamsWithCategory(key, category)
              : handleSearchParamsWithNotCategory(key)
          }
        >
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
