import { FunctionComponent, ReactNode } from 'react';

import { Circle } from '@components/atoms';
import { IMentoringSortOptions, IPostsSortOptions } from 'types/sort.types';
import { CategoryTypes } from '@components/domains/posts/PostsContainer';
import { useChangeSortParams } from '@hooks/useChangeSortParams';
import classes from './postsFilter.module.scss';

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
  } = useChangeSortParams(category);
  const sortedList = Object.entries(options) as [
    keyof IPostsSortOptions | keyof IMentoringSortOptions,
    string,
  ][];

  return (
    <ul className={classes.filters}>
      {sortedList.map(([sort, value]) => (
        <li
          key={sort}
          className={classes.filter}
          onClick={() =>
            category
              ? handleSearchParamsWithCategory(sort, category)
              : handleSearchParamsWithNotCategory(sort)
          }
        >
          {Element ? (
            <Element center={value} isSelected={postsSortParam === sort} />
          ) : (
            <>
              <Circle
                selected={postsSortParam === sort}
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
