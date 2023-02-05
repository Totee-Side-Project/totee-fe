export interface IMentoListRequestOptions {
  kind?: 'all' | 'n' | 'y';
  page?: number;
  size?: number;
}

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
