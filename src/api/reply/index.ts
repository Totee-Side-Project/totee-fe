import { api } from '@api/instance';
import { IRequestReply } from './types';

export const ReplyAPI = {
  createReply: (form: IRequestReply) => api.post('/api/v1/reply', form),
  updateReply: (replyId: number, form: any) =>
    api.put(`/api/v1/reply/${replyId}`, form),
  deleteReply: (replyId: number) => api.delete(`/api/v1/reply/${replyId}`),
};
