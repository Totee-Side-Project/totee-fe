import {
  IMentoringListRequestOptions,
  IMentoringSearchListRequestOptions,
  IPostSliderOptions,
  IPostsInfiniteScrollOptions,
  IPostsPaginationoptions,
} from 'types/api.types';

export const queryKeys = {
  user: ['user'],
  post: (postId: number) => ['post', postId],
  postsSlider: (options: IPostSliderOptions) => ['postsSlider', options],
  postsInfiniteScroll: (options: IPostsInfiniteScrollOptions) => [
    'postsInfiniteScroll',
    options,
  ],
  mentoringInfiniteScroll: (options: IPostsInfiniteScrollOptions) => [
    'mentoringInfiniteScroll',
    options,
  ],
  postSearchTitle: (options: IPostsPaginationoptions) => [
    'postSearch',
    options,
  ],
  mentoringSearchList: (options: IMentoringSearchListRequestOptions) => [
    'mentoringSearch',
    options,
  ],
  applicant: (postId: number) => ['applicant', postId],
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
