import axios from 'axios';

const BASE_URL = 'https://api.totee.link/';

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  validateStatus: (status) => {
    return status < 500;
  },
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
  getPostList: (page = 0, size = 5) =>
    api.get(`/api/v1/post/list?page=${page}&size=${size}`),
  getPostByPostId: (postId: string) => api.get(`/api/v1/post/${postId}`),
  searchPostList: (title: string) => api.get(`/api/v1/post/search/${title}`),
  statusChange: (postId: number) => api.post(`api/v1/post/status/${postId}`),
  createPost: (form: any) =>
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
  createReply: (form: any) => api.post('/api/v1/reply', form),
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
  updateUserInfo : (form:any)=>
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

// 로그인 리다이렉트 uri - 우선 local에서 테스트할 수 있게 작업함
export const OAUTH2_REDIRECT_URI =
  process.env.NODE_ENV === 'production'
    ? 'https://totee-fe-omega.vercel.app/oauth/redirect'
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
