import { IPost } from '@api/post/types';
import { useState } from 'react';

type useSortPropsType = IPost[];

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

  type sortOptionNameType = 'recent' | 'commentNum' | 'likeNum' | 'view';
  type ISortFunctions = Record<sortOptionNameType, () => IPost[]>;
  type ISetSortFunctions = Record<sortOptionNameType, () => void>;

  const sortFunctions: ISortFunctions = {
    recent: sortRecent,
    commentNum: sortCommentCount,
    likeNum: sortLikeCount,
    view: sortViewCount,
  };

  const setSortFunctions: ISetSortFunctions = {
    recent: setSortRecent,
    commentNum: setSortCommentCount,
    likeNum: setSortLikeCount,
    view: setSortViewCount,
  };

  return { sortedDatas, setSortedDatas, setSortFunctions, sortFunctions };
};
