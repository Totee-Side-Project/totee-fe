import { api } from '@api/instance';
import { IApplyMentor } from './types';

export const MentorAPI = {
  applyMentor: (payload: IApplyMentor) =>
    api.post('/api/v1/mentor/apply', { ...payload }),
};
