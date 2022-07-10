import axios from 'axios';

const BASE_URL = 'https://api.totee.link/';

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config: any) => {
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
  getPostList: (page: number = 0, size: number = 8, sort?: string) =>
    api.get(`/api/v1/post/list`),
};

export const UserAPI = {
  getUserInfo: () => api.get('/api/v1/info'),
  updateUserInfo: (form: any) =>
    api.post('/api/v1/info', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  validateNickname: (nickname: string) =>
    api.post('/api/v1/validation/nickname', { nickname: nickname }),
};

// 로그인 리다이렉트 uri - 우선 local에서 테스트할 수 있게 작업함
export const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth/redirect';

// 구글 로그인
export const GOOGLE_AUTH_URL =
  BASE_URL + 'oauth2/authorization/google?redirect_uri=' + OAUTH2_REDIRECT_URI;

// 카카오로그인
export const KAKAO_AUTH_URL =
  BASE_URL + 'oauth2/authorization/kakao?redirect_uri=' + OAUTH2_REDIRECT_URI;
