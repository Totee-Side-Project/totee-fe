export interface IMentoListRequestOptions {
  kind: MentoListRequestKindOption;
  page: number;
  size: number;
}

export type MentoListRequestKindOption = 'all' | 'approved' | 'pending';

export interface IApplyMentor {
  field: string;
  career: string;
  contact: string;
  portfolioUrl: string;
  comment: string;
}

export interface IMento {
  nickname: string;
  email: string;
  field: string;
  career: string;
  contact: string;
  portfolioUrl: string;
  comment: string;
  approval: string;
}
