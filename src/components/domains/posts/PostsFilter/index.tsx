import { Dispatch, ReactNode, SetStateAction } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Circle } from '@components/atoms';
import { IResponsePostDetail } from 'types/api.types';
import classes from './postsFilter.module.scss';
import { ISortOptions, sortOptionNameType } from 'types/sort.types';

interface Props {
  datas?: IResponsePostDetail[];
  setDatas?: Dispatch<SetStateAction<any>>;
  options: ISortOptions;
  element?: ReactNode;
}

export const PostsFilter = ({ datas, setDatas, options, element }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const onClick = (key: sortOptionNameType) => {
    setSearchParams({ filter: key });
  };

  const filterList = Object.entries(options) as [sortOptionNameType, string][];

  return (
    <ul className={classes.filters}>
      {filterList.map(([key, value]) => (
        <li key={key} className={classes.filter} onClick={() => onClick(key)}>
          <Circle
            selected={searchParams.get('filter') === key}
            options={{ outCircle: false }}
          />
          {value}
        </li>
      ))}
    </ul>
  );
};
