import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';

import { Circle } from '@components/atoms';
import { IResponsePostDetail } from 'types/api.types';
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
    <ul style={{ display: 'flex', gap: 10 }}>
      {Object.entries(options).map(([key, value]) => (
        <li
          style={{ display: 'flex', cursor: 'pointer' }}
          key={value}
          onClick={() => onClick(key)}
        >
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

type useSortPropsType = IResponsePostDetail[];

// 🟠 Todo: hooks 폴더 내부로 이동시킬 예정
export const useSort = (posts: useSortPropsType = []) => {
  const [sortedDatas, setSortedDatas] = useState<any[]>(posts);

  // posts를 직접적으로 호출해주지 않기 때문이 아닐까?
  // 빈배열이 넘어오더라도 결국 component에서 data가 있을 때에만 해당 hooks를 호출해주도록 한다면 문제는 없을 것 같다.;

  // setSortFunctions
  const sortRecent = () => {
    return [...posts].sort(
      (left, right) =>
        Number(new Date(right.createdAt)) - Number(new Date(left.createdAt)),
    );
  };
  const sortCommentCount = () => {
    return [...posts].sort((left, right) => right.commentNum - left.commentNum);
  };
  const sortLikeCount = () => {
    return [...posts].sort((left, right) => right.likeNum - left.likeNum);
  };
  const sortViewCount = () => {
    return [...posts].sort((left, right) => right.view - left.view);
  };

  // sortFunctions
  const setSortRecent = () => {
    const result = sortRecent();
    setSortedDatas(result);
  };
  const setSortCommentCount = () => {
    const result = sortCommentCount();
    setSortedDatas(result);
  };
  const setSortLikeCount = () => {
    const result = sortLikeCount();
    setSortedDatas(result);
  };
  const setSortViewCount = () => {
    const result = sortViewCount();
    setSortedDatas(result);
  };

  const sortFunctions = {
    recent: sortRecent,
    comment: sortCommentCount,
    like: sortLikeCount,
    view: sortViewCount,
  };

  const setSortFunctions = {
    recent: setSortRecent,
    comment: setSortCommentCount,
    like: setSortLikeCount,
    view: setSortViewCount,
  } as { [key: string]: () => void };

  // setsortFunctions, sortFunctions, sortedDatas를 return 받는다.
  // 값만 리턴받기를 원한다면 sortFuctions를 사용하면 되고 setState까지 원한다면 setSortFunctions를 사용하면 된다.
  // 해당 컴포넌트에서 state를 필요로 할 경우에도 사용가능하고, 해당 컴포넌트에서 props setState를 전달받으면 부모의 state까지 변경해줄 수 있다.

  return { sortedDatas, setSortedDatas, setSortFunctions, sortFunctions };
};
