import { api } from '@api/instance';

export const CommentAPI = {
  createComment: (form: any) => api.post('/api/v1/comment', form),
  updateComment: (commentId: number, form: any) =>
    api.put(`/api/v1/comment/${commentId}`, form),
  deleteComment: (commentId: number) =>
    api.delete(`/api/v1/comment/${commentId}`),
};
