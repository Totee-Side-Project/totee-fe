// api responseType
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
export interface IGetPostDetailResponse {
  body: {
    data: IResponsePostDetail;
  };
}
export interface IGetApplicantResponse {
  body: {
    data: IApplicantDetail[];
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
      content: IPostType[];
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

// response comment
export interface ICommentDto {
  nickname: string;
  content: string;
  createdAt: string;
  modifiedAt: string;
  profileImageUrl: string;
}
export interface IPostCommentDto extends ICommentDto {
  commentId: number;
  replyList: IReplyDto[];
}
export interface IReplyDto extends ICommentDto {
  commentId(commentId: any): unknown;
  replyId: number;
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

// response applicant
export interface IApplicantDetail {
  nickname: string;
  profileImg: string;
  email: string;
  message: string;
  applicationDate: string;
}

export interface PostRequestDto extends IPostRequestDto {
  [key: string]: string | string[];
}

// response alarm
export interface AlarmType {
  content: string;
  createdAt: string;
  isRead: 'N' | 'Y';
  notificationId: number;
  postId: number;
}

// response search data
export interface ISearchType {
  data: IPostType[] | null;
  keyword: string | null;
}

/*  request payload  */
export interface IPostTeamRequestFormData {
  accept: boolean;
  nickname: string;
}
export interface IRequestReply {
  commentId: number;
  content: string;
}

export interface IMentoringListRequestOptions {
  page?: number;
  size?: number;
  sort?: string[];
}

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

// export interface CommentType {
//   nickname: string;
//   commentId: number;
//   content: string;
//   replyList?: CommentType[];
//   created_at: string;
//   replyId?: number;
//   profileImageUrl?: string;
// }

// export interface ICommentPropsType {
//   postId: number;
//   comment: CommentType;
//   commentId?: number;
// }

// import { CommentType } from './comment.types';

// export interface IPostDetailType {
//   author: string;
//   authorPosition: string;
//   categoryName: string;
//   commentDTOList: CommentType[];
//   commentNum: number;
//   contactLink: string;
//   contactMethod: string;
//   content: string;
//   createdAt: string;
//   imageUrl: string;
//   likeNum: number;
//   onlineOrOffline: string;
//   period: string;
//   positionList: string[];
//   postId: number;
//   recruitNum: string;
//   status: string;
//   title: string;
//   view: number;
// }
