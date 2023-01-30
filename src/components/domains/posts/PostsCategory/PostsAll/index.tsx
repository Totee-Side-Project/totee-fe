import { SearchSection } from '@components/atoms';
import MentoringPostCard from '@components/common/card/MentoringPostCard/MentoringPostCard';
import MentoringPostDetailModal from '@components/common/mentoring/MentoringPostDetailModal';
import { PostCard } from '@components/common/post/PostCard/PostCard';
import { PostsContainer } from '@components/domains/posts/PostsContainer';
import { PostPaginationSection } from '@components/domains/posts/PostsSection/PostsPaginationSection';
import {
  useGetSearchMentoringList,
  useGetSearchPostList,
} from '@hooks/query/useGetQuery';
import { useGetPostsParams } from '@hooks/useGetPostsParams';
import { SEARCH_PAGE_SIZE } from '@hooks/useSearch';
import { POSTS_CATEGORY_NAMES } from 'pages/PostsPage';
import { useState } from 'react';
import { IMentoring } from 'types/api.types';
import { IMentoringSortOptions, IPostsSortOptions } from 'types/sort.types';

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

export const PostsAll = () => {
  const { params } = useGetPostsParams({
    size: SEARCH_PAGE_SIZE,
    // TODO : page를 url searchParams를 이용해야한다.
    page: 0,
  });
  const GetSearchPostListQuery = useGetSearchPostList(params);
  const GetSearchMentoringListQuery = useGetSearchMentoringList(params);

  const studyPostDatas = GetSearchPostListQuery.data?.content;
  const mentoringPostDatas = GetSearchMentoringListQuery.data?.content;

  // TODO: Hook으로 분리
  const [currentModalMentoringPost, setCurrentModalMentoringPost] =
    useState<IMentoring | null>(null);

  const handleCloseClick = () => {
    setCurrentModalMentoringPost(null);
  };

  const getRecommendMentorCardHandler = (mentoring: IMentoring) => {
    return () => {
      setCurrentModalMentoringPost(mentoring);
    };
  };

  return (
    <>
      {currentModalMentoringPost !== null ? (
        <MentoringPostDetailModal
          mentoring={currentModalMentoringPost}
          onCloseClick={handleCloseClick}
          onApplyClick={() => {}}
        />
      ) : null}
      <SearchSection resultGuidText={'on'} />
      <PostsContainer category={'study'} options={postsSortOptions}>
        <PostPaginationSection
          categoryTitle={POSTS_CATEGORY_NAMES.STUDY}
          totalPages={GetSearchPostListQuery.data?.totalPages}
          isLoading={GetSearchPostListQuery.isLoading}
        >
          {studyPostDatas?.length
            ? studyPostDatas.map((studyPost) => (
                <PostCard key={studyPost.postId} post={studyPost} />
              ))
            : null}
        </PostPaginationSection>
      </PostsContainer>
      <PostsContainer category={'mentoring'} options={mentoringSortOptions}>
        <PostPaginationSection
          categoryTitle={POSTS_CATEGORY_NAMES.MENTORING}
          totalPages={GetSearchMentoringListQuery.data?.totalPages}
          isLoading={GetSearchMentoringListQuery.isLoading}
        >
          {mentoringPostDatas?.length
            ? mentoringPostDatas.map((mentoring) => (
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
                  onClick={getRecommendMentorCardHandler(mentoring)}
                />
              ))
            : null}
        </PostPaginationSection>
      </PostsContainer>
    </>
  );
};
