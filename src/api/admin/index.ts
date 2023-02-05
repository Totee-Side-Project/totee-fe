import { AdminMentorRequestForm } from '@api/admin/types';
import { api } from '@api/instance';

const URL = 'api/v1/admin/mentor';

export const adminAPI = {
  mentor: (form: AdminMentorRequestForm) => api.post(URL, form),
};
