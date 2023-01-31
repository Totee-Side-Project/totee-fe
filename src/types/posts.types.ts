import { IResponsePostDetail } from './api.types';

export interface IStudyPostsType {
  content: IResponsePostDetail[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  size: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  totalElements: number;
  totalPages: number;
}

export interface IMentoringPostType {
  mentoringId: number;
  title: string;
  field: string;
  career: string;
  content: string;
  profileImageUrl: string;
  nickname: string;
}

export interface IMentoringPostsType {
  content: IMentoringPostType[];
  totalElements: number;
}
