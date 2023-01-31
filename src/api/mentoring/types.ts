export interface IGetMentoringListResponse {
  body: {
    data: {
      content: IMentoring[];
    };
  };
}

export interface IMentoring {
  mentoringId: number;
  title: string;
  content: string;
  cost: number;
  field: string;
  career: string;
  nickname: string;
  profileImageUrl: string;
}

export interface IMentoringListRequestOptions {
  page?: number;
  size?: number;
  sort?: string[];
}
