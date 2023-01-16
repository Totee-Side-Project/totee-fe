import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import 'react-loading-skeleton/dist/skeleton.css';

import { PostAPI } from '@api/api';
import { SectionTitle } from '@components/atoms';
import { Carousel } from '@components/common';
import { NewPostCard } from '@components/common/post/PostCard/PostCard';
import { queryKeys } from '@hooks/query';
import { useSortWithClient } from '@hooks/useSortWithClient';
import { useInfiniteTotalPosts } from '@hooks/query/useInfiniteTotalPosts';
import { PostsFilter } from '@components/domains/posts/PostsFilter';
import { SortButton } from '@components/atoms/Button/SortButton/SortButton';
import { IResponsePostDetail } from 'types/api.types';
import classes from './studySection.module.scss';
import { POSTS_CATEGORY_PATHS } from 'pages/PostsPage';
import './studySection.scss';

export function StudySection() {
  const [searchParams, setSearchParams] = useSearchParams();
  // TODO: 'sort' 를 변수에 할당하여 다른 컴포넌트에서도 가져다 쓰자
  const sortParam = searchParams.get('sort');

  const { query } = useInfiniteTotalPosts({
    getPage: PostAPI.getPostList,
    queryKey: queryKeys.postsSlider,
    sortOptions: !sortParam ? undefined : (sortParam as string),
    pageSize: 16,
  });
  const { chunkData } = useSortWithClient();
  const queryClient = useQueryClient();

  const resetPageList = () => {
    queryClient.invalidateQueries(queryKeys.postsSlider);
  };

  useEffect(() => {
    resetPageList();
  }, [sortParam]);

  const pages = query.data?.pages.reduce(
    (acc: IResponsePostDetail[], cur) => cur.postData.content,
    [],
  );
  const renderPages = chunkData(pages || [], 4);
  return (
    <>
      <div className={classes.section_header}>
        <div className={classes.section_title_wrap}>
          <SectionTitle
            title={'커리어 성장을 위한 <mark>스터디</mark>'}
            sub={'Level Up Study'}
            description={`커리어 성장을 위한 스터디를 찾으시나요?\n토티에는 이런저런 여러분야의 스터디가 모여있어요.`}
            to={POSTS_CATEGORY_PATHS.BASE + POSTS_CATEGORY_PATHS.STUDY}
          />
        </div>
        <div className={classes.filter_wrap}>
          <PostsFilter
            options={{
              recent: '#최신순',
              commentNum: '#댓글순',
              view: '#조회순',
              likeNum: '#좋아요순',
            }}
            Element={SortButton}
          />
        </div>
      </div>
      <div className={classes.section_body}>
        <Carousel
          style={{
            paddingTop: '20px',
            paddingBottom: '50px',
          }}
          options={{
            slidesPerView: 1,
            pagination: {
              clickable: true,
              type: 'bullets',
            },
            observer: true,
            observeParents: true,
          }}
          isLoading={query.isLoading}
          isFetching={query.isFetching}
          fallback={<SectionSkeleton />}
        >
          {renderPages.map((page, index) => (
            <div
              key={'pages' + index}
              style={{
                display: 'flex',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}
            >
              {page.map((post) => (
                <li key={post.postId}>
                  <NewPostCard post={post} />
                </li>
              ))}
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
}

const SectionSkeleton = () => {
  return (
    <div className={classes.section_body}>
      <ul
        style={{
          display: 'flex',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        {[0, 1, 2, 3].map((ele) => (
          <li key={ele}>
            <NewPostCard />
          </li>
        ))}
      </ul>
    </div>
  );
};
