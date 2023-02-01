import { api } from '@api/instance';
import { AxiosResponse } from 'axios';
import {
  IMentoringListRequestOptions,
  IMentoringSearchListRequestOptions,
  MentoringResponseData,
} from './types';

export const MentoringAPI = {
  getMentoringList: (
    options: IMentoringListRequestOptions,
  ): Promise<AxiosResponse<MentoringResponseData>> => {
    const query = new URLSearchParams({
      ...(options.page !== undefined ? { page: options.page.toString() } : {}),
      ...(options.size !== undefined ? { size: options.size.toString() } : {}),
      ...(options.sort !== undefined ? { sort: options.sort.toString() } : {}),
    });

    return api.get(`api/v1/mentoring/list?${query.toString()}`);
  },
  getMyMentoringPosts: () =>
    api.get('/api/v1/mentoring/mypost').then((res) => res.data.body.data),
  searchMentoringList: ({
    keyword,
    page,
    size,
    sort,
  }: IMentoringSearchListRequestOptions): Promise<
    AxiosResponse<MentoringResponseData>
  > => {
    return api.get(`api/v1/mentoring/list`, {
      params: { kw: keyword, page, size, sort: sort?.toString() },
    });
  },
};
