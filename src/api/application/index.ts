import { api } from '@api/instance';

export const ApplicationAPI = {
  getApplicant: (postId: any) =>
    api.get(`/api/v1/applicant/${postId}`).then((res) => res.data.body.data),
  postApplicant: (postId: any, message: string) =>
    api.post(`/api/v1/applicant/${postId}`, { message }),
  deleteApplicant: (postId: any) => api.delete(`/api/v1/applicant/${postId}`),
};
