import {
  IMentoringListRequestOptions,
  IPostSliderOptions,
  IPostsInfiniteScrollOptions,
  IPostsPaginationoptions,
} from 'types/api.types';

export const queryKeys = {
  user: ['user'],
  post: (postId: number) => ['post', postId],
  postsInfiniteScroll: (options: IPostsInfiniteScrollOptions) => [
    'postsInfiniteScroll',
    options,
  ],
  postsSlider: (options: IPostSliderOptions) => ['postsSlider', options],
  postSearchTitle: (options: IPostsPaginationoptions) => [
    'postSearch',
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
  mentoList: 'mentoList',
};
