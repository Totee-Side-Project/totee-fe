import { api } from '@api/instance';
import { IPostTeamRequestFormData } from '@api/post/types';

export const TeamAPI = {
  getTeam: (postId?: number) =>
    api.get(`api/v1/team/${postId}`).then((res) => res.data.body.data),
  getMentoringTeam: (mentoringId?: number) =>
    api.get(`api/v2/team/${mentoringId}`).then((res) => res.data.body.data),
  postTeam: (postId: number, formData: IPostTeamRequestFormData) =>
    api.post(`api/v1/team/${postId}`, { ...formData }),
  acceptMentoringApplicants: (
    mentoringId: number,
    formData: IPostTeamRequestFormData,
  ) => api.post(`api/v2/team/${mentoringId}`, { ...formData }),
  resignateTeam: (postId: number, nickname: string) =>
    api.delete(`api/v1/team/resignation/${postId}`, {
      data: { nickname: nickname },
    }),
  secessionTeam: (postId: number) =>
    api.delete(`api/v1/team/secession/${postId}`),
};
