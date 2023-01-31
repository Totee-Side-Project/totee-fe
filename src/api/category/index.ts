import { api } from '@api/instance';

export const CategoryAPI = {
  getCategoryList: () => api.get(`/api/v1/category`),
};
