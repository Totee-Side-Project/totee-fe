export const queryKeys = {
  user: ['user'],
  post: (postId: number) => ['post', postId],
  postsAll: ['postsAll'],
  postsSlider: ['postsSlider'],
  postSearchTitle: (postTitle: string, pageNum: number) => [
    'postSearch',
    postTitle,
    pageNum,
  ],
  applicant: (postId: number) => ['applicant', postId],
  categories: ['categories'],
  recommend: ['recommend'],
  likePost: (postId: number) => ['like', postId],
  alarms: ['alarms'],
  // 구현 전
  // team: (postId: number) => ['team', postId],
};
