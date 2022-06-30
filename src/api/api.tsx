import axios from 'axios';

const BASE_URL = 'https://api.totee.link/';

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// swagger 링크
// https://api.totee.link/swagger-ui.html#/

export const PostAPI = {
  getPostList: (page: number = 0, size?: number, sort?: string) =>
    api.get(`/api/v1/post/list`),
};
