import { Dispatch, FunctionComponent, ReactNode, SetStateAction } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Circle } from '@components/atoms';
import { IResponsePostDetail } from 'types/api.types';
import classes from './postsFilter.module.scss';
import { ISortOptions, sortOptionNameType } from 'types/sort.types';
import { POSTS_URL_PARAMS } from 'pages/PostsPage';

interface Props {
  datas?: IResponsePostDetail[];
  setDatas?: Dispatch<SetStateAction<any>>;
  options: ISortOptions;
  Element?: FunctionComponent<{ center?: ReactNode; isSelected?: boolean }>;
}

export const PostsFilter = ({ datas, setDatas, options, Element }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const param = searchParams.get(POSTS_URL_PARAMS.SORT) || 'recent';
  const onClick = (key: sortOptionNameType) => {
    if (key === 'recent') return setSearchParams({});
    setSearchParams({ sort: key });
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
