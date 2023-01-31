import { api } from '@api/api';

export type AdminMentorRequestForm = { accept: boolean; nickname: string };
const URL = 'api/v1/admin/mentor';

export const adminAPI = {
  mentor: (form: AdminMentorRequestForm) => api.post(URL, form),
};
