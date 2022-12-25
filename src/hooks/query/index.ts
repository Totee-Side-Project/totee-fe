export const queryKeys = {
  user: ['user'],
  postsAll: ['postAll'],
  post: (postId: number) => ['post', postId],
  applicant: (postId: number) => ['applicant', postId],
  searchTitle: (postTitle: string) => ['search', postTitle],
  categories: ['categories'],
  recommend: ['recommend'],
  likePost: (postId: number) => ['like', postId],
  alarms: ['alarms'],
  // 구현 전
  // team: (postId: number) => ['team', postId],
};
