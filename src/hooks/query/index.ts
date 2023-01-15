import { IMentoringListRequestOptions } from '@api/requestType';

export const queryKeys = {
  user: ['user'],
  postsAll: ['postsAll'],
  postsSlider: ['postsSlider'],
  post: (postId: number) => ['post', postId],
  applicant: (postId: number) => ['applicant', postId],
  searchTitle: (postTitle: string) => ['search', postTitle],
  categories: ['categories'],
  recommend: ['recommend'],
  likePost: (postId: number) => ['like', postId],
  alarms: ['alarms'],
  mentoringList: (options: IMentoringListRequestOptions) => [
    'mentoring',
    options,
  ],
  // 구현 전
  // team: (postId: number) => ['team', postId],
};
