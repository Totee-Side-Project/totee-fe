import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQueryClient } from 'react-query';

import { searchState } from '@store/search';
import useInfiniteQuerywithScroll from '@hooks/useInfiniteQuerywithScroll';
import { SectionTitle } from '@components/atoms';
import { SectionSlider } from '@components/common/main/SectionSlider/SectionSlider';
import { PostAPI } from '@api/api';

import { PostCard } from '../PostCard/PostCard';
import { IPostType } from 'types/post.types';
import classes from './postList.module.scss';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};

export function PostList() {
  const [posts, setPosts] = useState<IPostType[]>([]);
  const [postsFiltered, setPostsFiltered] = useState<IPostType[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('최신순');
  const [isShowTotal, setIsShowTotal] = useState(false);
  const [categoryName, setCategoryName] = useState('전체');
  const [searchResult, setSearchResult] = useRecoilState(searchState);

  let [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const { data, isFetching, ObservationComponent } = useInfiniteQuerywithScroll(
    {
      getData: PostAPI.getPostList,
      queryKey: 'posts',
      pageSize: 5,
    },
  );

  useEffect(() => {
    return () => {
      setPosts([]);
      queryClient.removeQueries('posts');
    };
  }, []);

  useEffect(() => {
    if (searchResult && searchResult.data) {
      setPosts([...searchResult.data]);
      handleCategory([...searchResult.data]);
    } else {
      if (data?.result?.content) {
        setPosts([...data.result.content]);
        handleCategory([...data.result.content]);
      }
    }
  }, [searchResult, data]);

  useEffect(() => {
    handleCategory(posts);
  }, [posts, categoryName]);

  const handleCategory = (data: IPostType[]) => {
    if (!data) return;
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

    searchParams.get('filter') !== null
      ? setSelectedFilter(searchParams.get('filter') as string)
      : setSelectedFilter('최신순');

    searchParams.get('isShowTotal') !== null
      ? setIsShowTotal(
          (searchParams.get('isShowTotal') as string) === '전체보기' && true,
        )
      : setIsShowTotal(false);
  }, [searchParams]);

  useEffect(() => {
    if (posts && posts.length > 0) {
      const newData = [...sortingData(posts)];
      setPosts(newData);
      handleCategory(newData);
    }
  }, [selectedFilter]);

  const sortingData = (data: IPostType[]): IPostType[] => {
    let newData = [...data];
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
      <div className={classes.postListContainer}>
        <div className={classes.postListContainerHeader}>
          <SectionTitle
            title={'커리어 성장을 위한 스터디'}
            sub={'Level Up Study'}
            description={
              '커리어 성장을 위한 스터디를 찾으시나요? 토티에는 이런저런 여러분야의 스터디가 모여있어요.'
            }
          />
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
                  className={selectedFilter === item ? classes.selected : ''}
                  key={`filter-${idx}`}
                >
                  <span className={classes.tag_wrapper}>
                    <div className={classes.outer_circle}>
                      <div className={classes.inner_circle}></div>
                    </div>
                    #{item}
                  </span>
                </li>
              ),
            )}
          </ul>
        </div>
        <motion.ul initial="hidden" animate="show" variants={container}>
          <div>
            <SectionSlider>
              {postsFiltered &&
                postsFiltered.length > 0 &&
                postsFiltered
                  .slice(0, isShowTotal ? postsFiltered.length : 8)
                  .map((post: IPostType, idx: number) => (
                    <PostCard key={`postCard-${idx}`} post={post} />
                  ))}
            </SectionSlider>
          </div>
          <ObservationComponent />
        </motion.ul>
      </div>
    </>
  );
}
