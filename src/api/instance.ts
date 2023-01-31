import axios from 'axios';

// swagger 링크 https://api.totee.store/swagger-ui.html#/
export const BASE_URL = 'https://api.totee.store/';

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
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
