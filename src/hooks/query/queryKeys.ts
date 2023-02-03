import type {
  IMentoringListRequestOptions,
  IMentoringSearchListRequestOptions,
} from '@api/mentoring/types';
import type {
  IPostSliderOptions,
  IPostsInfiniteScrollOptions,
  IPostsPaginationOptions,
} from '@api/post/types';

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
  postSearchTitle: (options: IPostsPaginationOptions) => [
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
  myStudyPost: ['myStudyPost'],
  participatingStudyPosts: ['participatingStudyPosts'],
  participatingMentoringPosts: ['participatingMentoringPosts'],
  likedStudyPosts: ['likedStudyPosts'],
  likedMentoringPosts: ['likedMentoringPosts'],
  studyMembers: (postId: number) => ['studyMembers', postId],
  myMentoringPosts: ['myMentoringPosts'],
  mentoringMembers: (mentoringId?: number) => ['mentoringMembers', mentoringId],
  mentoringApplicants: (mentoringId: number) => [
    'mentoringApplicants',
    mentoringId,
  ],
};
