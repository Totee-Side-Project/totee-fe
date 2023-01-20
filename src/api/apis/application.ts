import { api } from '@api/instance';
import { AxiosResponse } from 'axios';
import { IGetApplicantResponse } from 'types/api.types';

export const ApplicationAPI = {
  getApplicant: (postId: any): Promise<AxiosResponse<IGetApplicantResponse>> =>
    api.get(`/api/v1/applicant/${postId}`),
  postApplicant: (postId: any, message: string) =>
    api.post(`/api/v1/applicant/${postId}`, { message }),
  deleteApplicant: (postId: any) => api.delete(`/api/v1/applicant/${postId}`),
};
