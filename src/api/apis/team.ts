import { api } from '@api/instance';
import { IPostTeamRequestFormData } from 'types/api.types';

export const TeamAPI = {
  getTeam: (postId: number) => api.get(`api/v1/team/${postId}`),
  postTeam: (postId: number, formData: IPostTeamRequestFormData) =>
    api.post(`api/v1/team/${postId}`, { ...formData }),
  resignateTeam: (postId: number) =>
    api.delete(`api/v1/team/resignation/${postId}`),
  secessionTeam: (postId: number) =>
    api.delete(`api/v1/team/secession/${postId}`),
};
