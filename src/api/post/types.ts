import { IPostCommentDto } from '@api/comment/types';

export type StudyPostsResponseData = IResponseOfPage<IPost>;
export type StudyPostResponseData = IResponseOfDetail<IPost>;

export type StudyPostsType = IPageableResponse<IPost>;

export interface IResponseOfDetail<T> {
  header: {
    code: number;
    message: string;
  };
  body: {
    data: T;
  };
}

export interface IResponseOfPage<T> {
  header: {
    code: number;
    message: string;
  };
  body: {
    data: IPageableResponse<T>;
  };
}

export interface IPageableResponse<T> {
  content: T[];
  pageable: {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  empty: boolean;
}

export interface IPost {
  postId: number;
  title: string;
  content: string;
  nickname: string;
  view: number;
  likeNum: number;
  commentNum: number;
  commentDTOList: IPostCommentDto[];
  imageUrl: string;
  createdAt: string;
  onlineOrOffline: string;
  period: string;
  status: string;
  positionList: string[];
  skillList: string[];
  recruitNum: number;
  contactMethod: string;
  contactLink: string;
  region: string;
  detailedRegion: string;
  categoryName: string;
  authorPosition: string;
}

export interface IPostRequestDto {
  [key: string]: string | string[];
  title: string; // 제목
  content: string; // 내용,
  contactLink: string; // 연락 링크,
  contactMethod: string; // 연락 방법,
  detailedRegion: string; // 상세주소,
  onlineOrOffline: string; // 미팅 방식 (온라인 or 오프라인),
  region: string; // 지역,
  period: string; // 예상 기간 (ex 1개월 미만 or 1~3개월 or 3~6개월 or 6개월 이상),
  recruitNum: string; // 모집 인원 수,
  skillList: string[]; // 기술 스택 리스트 (ex JavaScript, C, Java),
}

export interface IPostTeamRequestFormData {
  accept: boolean;
  nickname: string;
}
export interface IPostSliderOptions {
  sort: string[];
}
export interface IPostsInfiniteScrollOptions extends IPostSliderOptions {
  keyword?: string;
  page?: number;
}
export interface IPostsPaginationOptions extends IPostsInfiniteScrollOptions {
  size?: number;
}

export interface IStudyPostType {
  status: 'Y' | 'N';
  title: string;
  content: string;
  nickname: string;
  likeNum: number;
  commentNum: number;
  view: number;
  createdAt: string;
  position: string;
  postId: number;
  imageUrl: any;
  author: string;
  categoryName: string;
}

export interface IStudySearchType {
  data: IStudyPostType[];
  keyword: string;
}
