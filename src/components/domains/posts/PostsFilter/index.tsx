import { Dispatch, ReactNode, SetStateAction, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Circle } from '@components/atoms';
import { IResponsePostDetail } from 'types/api.types';
import { useSort } from '@hooks/useSort';
import classes from './postsFilter.module.scss';

interface Props {
  datas: IResponsePostDetail[];
  setDatas: Dispatch<SetStateAction<any>>;
  options: ISortOptions;
  element?: ReactNode;
}

// 이걸 객체로 받아서 key로 함수를 판단하고 value로 버튼의 text를 판단한다.
interface ISortOptions {
  [key: string]: string;
}
// 'recent' | 'comment' | 'like' | 'view'

export const PostsFilter = ({ datas, setDatas, options, element }: Props) => {
  const { sortedDatas, setSortFunctions } = useSort(datas);
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    setDatas(sortedDatas);
  }, [sortedDatas]);

  // Todo: onClick도 useSort로 뺄 수 있지 않을까?
  const onClick = (key: string) => {
    setSearchParams({ filter: key });
    setSortFunctions[key];
  };

  // 🟠 Todo: inlineStyle을 SCSS로 변경 예정
  return (
    <ul className={classes.filters}>
      {Object.entries(options).map(([key, value]) => (
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
