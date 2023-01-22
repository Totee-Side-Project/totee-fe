import axios, { AxiosResponse } from 'axios';
import { IApplyMentor } from 'types/api';
import {
  IGetApplicantResponse,
  IGetMentoringListResponse,
  IGetPostDetailResponse,
  IGetPostListResponse,
  IMentoringListRequestOptions,
  IMentoringSearchListRequestOptions,
  IPostTeamRequestFormData,
  IRequestReply,
  PostRequestDto,
} from 'types/api.types';
import { IGetPostListParams } from './api.types';

const BASE_URL = 'https://api.totee.link/';

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  // validateStatus: (status) => {
  //   // 400은 로컬에서 처리하기 위해서 해주었다.
  //   // 그럼 이 에러는 어디서 catch 할 수 있는가?
  //   return status < 500;
  // },
});

api.interceptors.request.use((config: any) => {
  if (!localStorage.getItem('loginData')) return config;
  const { token } = JSON.parse(localStorage.getItem('loginData') as string);
  if (!token) {
    config.headers!.common['Authorization'] = null;
    return config;
  } else {
    config.headers!.common['Authorization'] = `Bearer ${token}`;
    return config;
  }
});
// swagger 링크
// https://api.totee.link/swagger-ui.html#/

export const PostAPI = {
  getPostList: ({
    page = 0,
    keyword,
    size = 5,
    sort,
  }: IGetPostListParams): Promise<AxiosResponse<IGetPostListResponse>> => {
    return api.get(`/api/v1/post/list`, {
      params: { kw: keyword, page, size, sort: sort?.toString() },
    });
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
  myPost: () => api.get(`/api/v1/post/mypost`),
};

export const CommentAPI = {
  createComment: (form: any) => api.post('/api/v1/comment', form),
  updateComment: (commentId: number, form: any) =>
    api.put(`/api/v1/comment/${commentId}`, form),
  deleteComment: (commentId: number) =>
    api.delete(`/api/v1/comment/${commentId}`),
};

export const ReplyAPI = {
  createReply: (form: IRequestReply) => api.post('/api/v1/reply', form),
  updateReply: (replyId: number, form: any) =>
    api.put(`/api/v1/reply/${replyId}`, form),
  deleteReply: (replyId: number) => api.delete(`/api/v1/reply/${replyId}`),
};

export const CategoryAPI = {
  getCategoryList: () => api.get(`/api/v1/category`),
};

export const UserAPI = {
  getUserInfo: () => api.get('/api/v1/info'),
  addUserInfo: (form: any) =>
    api.post('/api/v1/info', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  updateUserInfo: (form: any) =>
    api.put('/api/v1/info', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  validateNickname: (nickname: string) =>
    api.post('/api/v1/validate/nickname', { nickname: nickname }),
};

export const LikeAPI = {
  getIsLikeInfo: (postId: any) => api.get(`/api/v1/post/isLike/${postId}`),
  postLike: (postId: any) => api.post(`/api/v1/post/like/${postId}`),
  LikeList: () => api.get(`/api/v1/post/like`),
};

export const AlarmAPI = {
  getAlarm: () => api.get(`/api/v1/notification`),
  updateAlarm: (notificationId: string) =>
    api.post(`/api/v1/notification/${notificationId}`),
};

export const ApplicationAPI = {
  getApplicant: (postId: any): Promise<AxiosResponse<IGetApplicantResponse>> =>
    api.get(`/api/v1/applicant/${postId}`),
  postApplicant: (postId: any, message: string) =>
    api.post(`/api/v1/applicant/${postId}`, { message }),
  deleteApplicant: (postId: any) => api.delete(`/api/v1/applicant/${postId}`),
};

export const TeamAPI = {
  getTeam: (postId: number) => api.get(`api/v1/team/${postId}`),
  postTeam: (postId: number, formData: IPostTeamRequestFormData) =>
    api.post(`api/v1/team/${postId}`, { ...formData }),
  resignateTeam: (postId: number) =>
    api.delete(`api/v1/team/resignation/${postId}`),
  secessionTeam: (postId: number) =>
    api.delete(`api/v1/team/secession/${postId}`),
};

export const MentorAPI = {
  applyMentor: (payload: IApplyMentor) =>
    api.post('/api/v1/mentor/apply', { ...payload }),
};

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
  searchMentoringList: ({
    keyword,
    page,
    size,
    sort,
  }: IMentoringSearchListRequestOptions): Promise<
    AxiosResponse<IGetMentoringListResponse>
  > => {
    return api.get(`api/v1/mentoring/list`, {
      params: { kw: keyword, page, size, sort: sort?.toString() },
    });
  },
};

// window.location.host;
// 로그인 리다이렉트 uri - 우선 local에서 테스트할 수 있게 작업함
// ? `${window.location.host}/oauth/redirect`
export const OAUTH2_REDIRECT_URI =
  process.env.NODE_ENV === 'production'
    ? 'https://totee-fe-omega.netlify.app/oauth/redirect'
    : 'http://localhost:3000/oauth/redirect';

// 구글 로그인
export const GOOGLE_AUTH_URL =
  BASE_URL + 'oauth2/authorization/google?redirect_uri=' + OAUTH2_REDIRECT_URI;

// 카카오로그인
export const KAKAO_AUTH_URL =
  BASE_URL + 'oauth2/authorization/kakao?redirect_uri=' + OAUTH2_REDIRECT_URI;

export const SelectAPI = {
  selectCategory: () => api.get('api/v1/category'),
};
