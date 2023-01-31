import { api } from '@api/instance';
import { AxiosResponse } from 'axios';

import {
  GetPostListParams,
  IGetPostDetailResponse,
  IGetPostListResponse,
  PostRequestDto,
} from './types';

export const PostAPI = {
  getPostList: ({
    page = 0,
    keyword = '',
    size = 5,
    sortOption,
  }: GetPostListParams): Promise<AxiosResponse<IGetPostListResponse>> => {
    if (!sortOption)
      return api.get(
        `/api/v1/post/list?kw=${keyword}&page=${page}&size=${size}`,
      );
    return api.get(
      `/api/v1/post/list?kw=${keyword}&page=${page}&size=${size}&sort=${sortOption},desc`,
    );
  },
  getPostByPostId: (
    postId: number,
  ): Promise<AxiosResponse<IGetPostDetailResponse>> =>
    api.get(`/api/v1/post/${postId}`),
  statusChange: (postId: number) => api.post(`api/v1/post/status/${postId}`),
  createPost: (form: PostRequestDto) =>
    api.post('/api/v1/post', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  upDatePost: (postId: number, form: any) =>
    api.put(`/api/v1/post/${postId}`, form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  deletePost: (postId: number) => api.delete(`/api/v1/post/${postId}`),
  recommendPostList: () => api.get(`/api/v1/post/recommend`),
  myStudyPost: () =>
    api.get(`/api/v1/post/mypost`).then((res) => res.data.body.data),
  participatingStudyPost: () =>
    api.get(`/api/v1/post/mystudy`).then((res) => res.data.body.data),
};
