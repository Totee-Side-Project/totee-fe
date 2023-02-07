import type { AxiosResponse } from 'axios';
import { api } from '@api/instance';
import type {
  IPostRequestDto,
  IPostsPaginationOptions,
  StudyPostResponseData,
  StudyPostsResponseData,
} from '@api/post/types';

export const PostAPI = {
  getPostList: ({
    page,
    keyword,
    size,
    sort,
  }: IPostsPaginationOptions): Promise<
    AxiosResponse<StudyPostsResponseData>
  > => {
    return api.get(`/api/v1/post/list`, {
      params: { kw: keyword, page, size, sort: sort?.toString() },
    });
  },
  getPostByPostId: (
    postId: number,
  ): Promise<AxiosResponse<StudyPostResponseData>> =>
    api.get(`/api/v1/post/${postId}`),
  statusChange: (postId: number) => api.post(`api/v1/post/status/${postId}`),
  createPost: (form: IPostRequestDto) =>
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
  participatingStudyPosts: () =>
    api.get(`/api/v1/post/mystudy`).then((res) => res.data.body.data),
  participatingMentoringPosts: () =>
    api.get(`/api/v1/mentoring/mymentoring`).then((res) => res.data.body.data),
};
