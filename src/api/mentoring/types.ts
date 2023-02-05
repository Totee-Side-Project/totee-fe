import { IPageableResponse, IResponseOfPage } from '@api/post/types';

export interface IGetMentoringListResponse {
  body: {
    data: {
      content: IMentoringPost[];
    };
  };
}

export type MentoringResponseData = IResponseOfPage<IMentoringPost>;
export type MentoringPostsType = IPageableResponse<IMentoringPost>;

export interface IMentoringPost {
  mentoringId: number;
  title: string;
  content: string;
  cost: number;
  field: string;
  career: string;
  nickname: string;
  profileImageUrl: string;
}

export interface IMentoringPostsType {
  content: IMentoringPost[];
  totalElements: number;
}

export interface IMentoringListRequestOptions {
  page?: number;
  size?: number;
  sort?: string[];
}

export interface IMentoringSearchListRequestOptions
  extends IMentoringListRequestOptions {
  keyword?: string;
}

export interface IApplyMentoringRequestDto {
  mentoringId: number;
  comment: string;
  contact: string;
  endTime: string;
  startTime: string;
  week: string;
}
