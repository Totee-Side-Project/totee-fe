import { api } from '@api/instance';
import { AxiosResponse } from 'axios';
import {
  IGetMentoringListResponse,
  IMentoringListRequestOptions,
} from 'types/api.types';

export const MentoringAPI = {
  getMentoringList: (
    options: IMentoringListRequestOptions,
  ): Promise<AxiosResponse<IGetMentoringListResponse>> => {
    const query = new URLSearchParams({
      ...(options.page !== undefined ? { page: options.page.toString() } : {}),
      ...(options.size !== undefined ? { size: options.size.toString() } : {}),
      ...(options.sort !== undefined ? { sort: options.sort.toString() } : {}),
    });

    return api.get(`api/v1/mentoring/list?${query.toString()}`);
  },
  getMyMentoringPosts: () =>
    api.get('/api/v1/mentoring/mypost').then((res) => res.data.body.data),
};
