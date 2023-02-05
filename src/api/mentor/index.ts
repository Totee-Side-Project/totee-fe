import { api } from '@api/instance';
import { IResponseOfPage } from '@api/post/types';
import { AxiosResponse } from 'axios';
import { IApplyMentor, IMento, IMentoListRequestOptions } from './types';

export const MentorAPI = {
  applyMentor: (payload: IApplyMentor) =>
    api.post('/api/v1/mentor/apply', { ...payload }),
  getMentorList: ({
    kind,
    page,
    size,
  }: IMentoListRequestOptions): Promise<
    AxiosResponse<IResponseOfPage<IMento>>
  > => api.get(`/api/v1/mentor/list/${kind}`, { params: { page, size } }),
};
