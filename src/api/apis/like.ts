import { api } from '@api/instance';

export const LikeAPI = {
  getIsLikeInfo: (postId: any) => api.get(`/api/v1/post/isLike/${postId}`),
  postLike: (postId: any) => api.post(`/api/v1/post/like/${postId}`),
  LikeList: () => api.get(`/api/v1/post/like`),
};
