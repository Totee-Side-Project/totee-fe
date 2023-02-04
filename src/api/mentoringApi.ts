import { api } from './instance';

export interface ApplyMentoringRequestDto {
  mentoringId: number;
  comment: string;
  contact: string;
  endTime: string;
  startTime: string;
  week: string;
}

const MentoringAPI = {
  applyMentoring: ({ mentoringId, ...requestDto }: ApplyMentoringRequestDto) =>
    api.post(`/api/v2/applicant/${mentoringId}`, requestDto),
};

export default MentoringAPI;
