import { api } from '@api/instance';

export const LikeAPI = {
  getIsLikeInfo: (postId: any) => api.get(`/api/v1/post/isLike/${postId}`),
  postLike: (postId: any) => api.post(`/api/v1/post/like/${postId}`),
  studyPosts: () =>
    api.get(`/api/v1/post/like`).then((res) => res.data.body.data),
  mentoringPosts: () =>
    api.get(`/api/v1/mentoring/like`).then((res) => res.data.body.data),
};
