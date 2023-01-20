import { api } from '@api/instance';
import { IApplyMentor } from 'types/api';

export const MentorAPI = {
  applyMentor: (payload: IApplyMentor) =>
    api.post('/api/v1/mentor/apply', { ...payload }),
};
