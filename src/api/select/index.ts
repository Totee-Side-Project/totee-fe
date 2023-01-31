import { api } from '@api/instance';

export const SelectAPI = {
  selectCategory: () => api.get('api/v1/category'),
};
