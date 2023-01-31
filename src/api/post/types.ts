import { IPostCommentDto } from '@api/comment/types';

export interface GetPostListParams {
  page: number;
  keyword: string;
  size: number;
  sortOption: string;
}

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

export interface IPostRequestDto {
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

export interface PostRequestDto extends IPostRequestDto {
  [key: string]: string | string[];
}

export interface IPostTeamRequestFormData {
  accept: boolean;
  nickname: string;
}

export interface IPostSliderOptions {
  sortOption: string;
}
export interface IPostsInfiniteScrollOptions extends IPostSliderOptions {
  keyword: string;
}
export interface IPostsPaginationoptions extends IPostsInfiniteScrollOptions {
  pageNum: number;
}

////////////////////////////
export interface IGetPostDetailResponse {
  body: {
    data: IResponsePostDetail;
  };
}

// response page body
export interface IResponseOfPage {
  header: {
    code: number;
    message: string;
  };
  body: {
    data: {
      content: any;
      last: boolean;
    };
  };
}

export interface IGetPostListResponse extends IResponseOfPage {
  body: {
    data: {
      content: IResponsePostDetail[];
      pageable: {};
      last: boolean;
      totalPages: number;
      totalElements: number;
      sort: {};
      first: boolean;
      number: number;
      numberOfElements: number;
      size: number;
      empty: boolean;
    };
  };
}

// response post type
export interface IPostType {
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

// response post detail
export interface IResponsePostDetail {
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

// response search data
export interface ISearchType {
  data: IPostType[] | null;
  keyword: string | null;
}
