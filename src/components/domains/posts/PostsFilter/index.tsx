import { FunctionComponent, ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Circle } from '@components/atoms';
import { ISortOptions, sortOptionNameType } from 'types/sort.types';
import { POSTS_URL_PARAMS } from 'pages/PostsPage';
import classes from './postsFilter.module.scss';

interface Props {
  options: ISortOptions;
  Element?: FunctionComponent<{ center?: ReactNode; isSelected?: boolean }>;
}

export const PostsFilter = ({ options, Element }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const param = searchParams.get(POSTS_URL_PARAMS.SORT) || 'recent';
  const titleParam = searchParams.get(POSTS_URL_PARAMS.KEYWORD) || null;
  const onClick = (sortValue: sortOptionNameType) => {
    const newSearchParams = titleParam
      ? { qw: titleParam, sort: sortValue }
      : { sort: sortValue };

    if (sortValue === 'recent')
      return setSearchParams(titleParam ? { qw: titleParam } : {});

    setSearchParams(newSearchParams as {});
  };

  const sortedList = Object.entries(options) as [sortOptionNameType, string][];

  return (
    <ul className={classes.filters}>
      {sortedList.map(([key, value]) => (
        <li key={key} className={classes.filter} onClick={() => onClick(key)}>
          {Element ? (
            <Element center={value} isSelected={param === key} />
          ) : (
            <>
              <Circle selected={param === key} options={{ outCircle: false }} />
              {value}
            </>
          )}
        </li>
      ))}
    </ul>
  );
};
