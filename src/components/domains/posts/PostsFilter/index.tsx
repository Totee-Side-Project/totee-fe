import {
  Dispatch,
  FunctionComponent,
  ReactElement,
  ReactNode,
  SetStateAction,
} from 'react';
import { useSearchParams } from 'react-router-dom';

import { Circle } from '@components/atoms';
import { IResponsePostDetail } from 'types/api.types';
import classes from './postsFilter.module.scss';
import { ISortOptions, sortOptionNameType } from 'types/sort.types';

interface Props {
  datas?: IResponsePostDetail[];
  setDatas?: Dispatch<SetStateAction<any>>;
  options: ISortOptions;
  Element?: FunctionComponent<{ center?: ReactNode; isSelected?: boolean }>;
}

export const PostsFilter = ({ datas, setDatas, options, Element }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const param = searchParams.get('filter') || 'recent';
  const onClick = (key: sortOptionNameType) => {
    if (key === 'recent') return setSearchParams({});
    setSearchParams({ filter: key });
  };

  const filterList = Object.entries(options) as [sortOptionNameType, string][];

  return (
    <ul className={classes.filters}>
      {filterList.map(([key, value]) => (
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
