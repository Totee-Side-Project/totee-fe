import { BASE_URL } from '@api/instance';

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
