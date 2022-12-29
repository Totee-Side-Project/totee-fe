import { useState } from 'react';
import { IResponsePostDetail } from 'types/api.types';

type useSortPropsType = IResponsePostDetail[];

// 🟠 Todo: hooks 폴더 내부로 이동시킬 예정
export const useSort = (posts: useSortPropsType = []) => {
  const [sortedDatas, setSortedDatas] = useState<any[]>(posts);

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

  return { sortedDatas, setSortedDatas, setSortFunctions, sortFunctions };
};
