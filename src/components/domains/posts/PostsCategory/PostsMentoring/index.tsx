import { useState } from 'react';

import { SearchSection } from '@components/atoms';
import MentoringPostCard from '@components/common/card/MentoringPostCard/MentoringPostCard';
import { PostsContainer } from '@components/domains/posts/PostsContainer';
import {
  INFINITE_PAGE_SIZE,
  PostsInfiniteSection,
  fetchFunctions,
  fetchQueryKeys,
} from '@components/domains/posts/PostsSection/PostsInfiniteSection';
import MentoringPostDetailModal from '@components/common/mentoring/MentoringPostDetailModal';
import { useInfiniteTotalPosts } from '@hooks/query/useInfiniteWithDraw';
import { useGetPostsParams } from '@hooks/useGetPostsParams';
import type { IMentoringPost } from '@api/mentoring/types';
import { mentoringSortOptions } from 'pages/PostsPage';

export const MENTORING = 'mentoring';

export const PostsMentoring = () => {
  const { params } = useGetPostsParams({ size: INFINITE_PAGE_SIZE });
  const { query } = useInfiniteTotalPosts({
    getPage: fetchFunctions[MENTORING],
    queryKey: fetchQueryKeys[MENTORING](params),
    params,
  });

  const datas = query?.data?.pages
    .map((page) => page.postData.content)
    .flat() as IMentoringPost[];

  const [currentModalMentoringPost, setCurrentModalMentoringPost] =
    useState<IMentoringPost | null>(null);

  const handleCloseClick = () => {
    setCurrentModalMentoringPost(null);
  };

  const getRecommendMentorCardHandler = (mentoring: IMentoringPost) => {
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
      <SearchSection />
      <PostsContainer options={mentoringSortOptions}>
        <PostsInfiniteSection category={MENTORING}>
          {datas && datas.length
            ? datas.map((mentoring) => (
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
        </PostsInfiniteSection>
      </PostsContainer>
    </>
  );
};
