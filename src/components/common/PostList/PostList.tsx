import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useSearchParams } from 'react-router-dom';

import { searchState } from '@store/search';
import { useGetPostListAPI } from '@hooks/useGetQuery';
import { ReactComponent as EllipseIcon } from '@assets/ellipse-icon.svg';
import { ReactComponent as UpIcon } from '@assets/up-icon.svg';

import { PostCard } from '../PostCard/PostCard';
import { IPostType } from 'types/post.types';
import classes from './postList.module.scss';

export function PostList() {
  const [posts, setPosts] = useState<IPostType[]>([]);
  const [postsFiltered, setPostsFiltered] = useState<IPostType[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('최신순');
  const [isShowTotal, setIsShowTotal] = useState(false);
  const [categoryName, setCategoryName] = useState('전체');
  const [searchResult, setSearchResult] = useRecoilState(searchState);

  let [searchParams, setSearchParams] = useSearchParams();

  const { data, isFetching, refetch } = useGetPostListAPI();

  useEffect(() => {
    if (searchResult && searchResult.data && searchResult.data.length > 0) {
      setPosts([...searchResult.data]);
      handleCategory([...searchResult.data]);
    } else {
      if (data?.data) {
        setPosts(data.data.body.data.content);
        handleCategory(data.data.body.data.content);
      }
    }
  }, [searchResult, data, categoryName]);

  const handleCategory = (data: IPostType[]) => {
    if (categoryName === '전체') {
      setPostsFiltered(sortingData(data));
    } else {
      setPostsFiltered(
        sortingData(
          data.filter((dt: IPostType) => dt.categoryName === categoryName),
        ),
      );
    }
  };

  useEffect(() => {
    searchParams.get('cateogory') !== null
      ? setCategoryName(searchParams.get('cateogory') as string)
      : setCategoryName('전체');

    searchParams.get('filter') !== null &&
      setSelectedFilter(searchParams.get('filter') as string);

    searchParams.get('isShowTotal') !== null
      ? setIsShowTotal(
          (searchParams.get('isShowTotal') as string) === '전체보기' && true,
        )
      : setIsShowTotal(false);
  }, [searchParams]);

  useEffect(() => {
    if (posts) {
      refetch();
      setPosts([...sortingData(posts)]);
    }
  }, [selectedFilter]);

  const sortingData = (data: IPostType[]): IPostType[] => {
    let newData = data;
    switch (selectedFilter) {
      case '최신순':
        newData.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
        break;
      case '댓글많은순':
        newData.sort((a, b) => b.commentNum - a.commentNum);
        break;
      case '좋아요순':
        newData.sort((a, b) => b.likeNum - a.likeNum);
        break;
    }

    return newData;
  };

  return (
    <>
      {searchResult && searchResult.data && searchResult.data.length > 0 && (
        <div className={classes.searchResult}>
          " {searchResult.keyword}" 에 대한 검색 결과{' '}
          <span>{searchResult.data.length}</span> 개
        </div>
      )}
      <div className={classes.postListContainer}>
        <div className={classes.postListContainerHeader}>
          {!isShowTotal ? (
            <span
              onClick={() => {
                setSearchParams({
                  ...Object.fromEntries(searchParams),
                  ['isShowTotal']: '전체보기',
                });
              }}
            >
              전체보기 &gt;
            </span>
          ) : (
            <ul className={classes.filterList}>
              {['최신순', '댓글많은순', '좋아요순'].map(
                (item: string, idx: number) => (
                  <li
                    onClick={() =>
                      setSearchParams({
                        ...Object.fromEntries(searchParams),
                        ['filter']: item,
                      })
                    }
                    key={`filter-${idx}`}
                  >
                    <EllipseIcon
                      fill={selectedFilter === item ? '#568A35' : '#A0AEC0'}
                    />
                    <span
                      className={
                        selectedFilter === item ? classes.selected : ''
                      }
                    >
                      {item}
                    </span>
                  </li>
                ),
              )}
            </ul>
          )}
        </div>
        <div className={classes.postWrapper}>
          {postsFiltered
            .slice(0, isShowTotal ? postsFiltered.length : 8)
            .map((post: IPostType, idx: number) => (
              <PostCard key={`postCard-${idx}`} post={post} />
            ))}
          {/* <div className={classes.upIconWrapper}>
          <div className={classes.upIcon}>
            <div><UpIcon/></div>
          </div>
          </div> */}
        </div>
      </div>
    </>
  );
}
