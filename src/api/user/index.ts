import { api } from '@api/instance';

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
