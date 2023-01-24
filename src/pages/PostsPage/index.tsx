import { Route, Routes } from 'react-router-dom';

import {
  useGetSearchMentoringList,
  useGetSearchPostList,
} from '@hooks/query/useGetQuery';
import { useGetPostsParams } from '@hooks/useGetPostsParams';
import { SEARCH_PAGE_SIZE } from '@hooks/useSearch';
import { queryKeys } from '@hooks/query';
import { PostsContainer } from '@components/domains/posts/PostsContainer';
import { PostsInfiniteSection } from '@components/domains/posts/PostsSection/PostsInfiniteSection';
import { PostPaginationSection } from '@components/domains/posts/PostsSection/PostsPaginationSection';
import { SearchSection } from '@components/atoms';
import { PostCard } from '@components/common/post/PostCard/PostCard';
import MentoringPostCard from '@components/common/card/MentoringPostCard/MentoringPostCard';
import { IMentoringSortOptions, IPostsSortOptions } from 'types/sort.types';
import { MentoringAPI, PostAPI } from '@api/api';
import './PostsPage.scss';

export const POSTS_CATEGORY_PATHS = {
  BASE: 'posts/',
  ALL: 'all',
  STUDY: 'study',
  MENTORING: 'mentoring',
  TOTAL_STUDY: 'posts/study',
  TOTAL_MENTORING: 'posts/mentoring',
} as const;

export const POSTS_CATEGORY_NAMES = {
  STUDY: '스터디',
  MENTORING: '멘토링',
  MENTO: '멘토',
} as const;

const postsSortOptions: IPostsSortOptions = {
  recent: '최신순',
  commentNum: '댓글순',
  view: '조회순',
  likeNum: '좋아요순',
} as const;

const mentoringSortOptions: IMentoringSortOptions = {
  recent: '최신순',
  likeNum: '좋아요순',
} as const;

type ValueOf<T> = T[keyof T];
export type PostsCategoryNames = ValueOf<typeof POSTS_CATEGORY_NAMES>;

const PostsPage = () => {
  const { params } = useGetPostsParams({
    size: SEARCH_PAGE_SIZE,
    // TODO : page를 url searchParams를 이용해야한다.
    page: 0,
  });

  const GetSearchPostListQuery = useGetSearchPostList(params);
  const GetSearchMentoringList = useGetSearchMentoringList(params);
  return (
    <Routes>
      <Route
        path={POSTS_CATEGORY_PATHS.ALL}
        element={
          <>
            <SearchSection resultGuidText={'on'} />
            <PostsContainer options={postsSortOptions}>
              <PostPaginationSection
                categoryTitle={POSTS_CATEGORY_NAMES.STUDY}
                totalPages={GetSearchPostListQuery.data?.totalPages}
                isLoading={GetSearchPostListQuery.isLoading}
              >
                {GetSearchPostListQuery.data?.content.map((post) => (
                  <PostCard key={post.postId} post={post} />
                ))}
              </PostPaginationSection>
            </PostsContainer>
            <PostsContainer options={mentoringSortOptions}>
              <PostPaginationSection
                categoryTitle={POSTS_CATEGORY_NAMES.MENTORING}
                totalPages={GetSearchMentoringList.data?.totalPages}
                isLoading={GetSearchMentoringList.isLoading}
              >
                {GetSearchMentoringList.data?.content.map((mentoring) => (
                  <MentoringPostCard
                    key={mentoring.mentoringId}
                    mentoringPost={{
                      title: mentoring.title,
                      description: mentoring.content,
                      mentor: {
                        career: mentoring.career,
                        position: mentoring.field,
                        profileImageUrl: mentoring.profileImageUrl,
                        nickname: mentoring.nickname,
                      },
                    }}
                  />
                ))}
              </PostPaginationSection>
            </PostsContainer>
            {/* <PostsContainer>
              <PostPaginationSection
                categoryTitle={POSTS_CATEGORY_NAMES.MENTO}
              />
            </PostsContainer> */}
          </>
        }
      />
      <Route
        path={POSTS_CATEGORY_PATHS.STUDY}
        element={
          <>
            <SearchSection />
            <PostsContainer options={postsSortOptions}>
              <PostsInfiniteSection
                fetchPageFunction={PostAPI.getPostList}
                getQueryKeyFuntion={queryKeys.postsInfiniteScroll}
              />
            </PostsContainer>
          </>
        }
      />
      <Route
        path={POSTS_CATEGORY_PATHS.MENTORING}
        element={
          <>
            <SearchSection />
            <PostsContainer options={mentoringSortOptions}>
              <PostsInfiniteSection
                fetchPageFunction={MentoringAPI.searchMentoringList}
                getQueryKeyFuntion={queryKeys.mentoringInfiniteScroll}
              />
            </PostsContainer>
          </>
        }
      />
    </Routes>
  );
};

export default PostsPage;
