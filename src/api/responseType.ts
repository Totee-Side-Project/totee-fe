// api reesponse types

import type { IPostType } from 'types/post.types';

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

export interface IGetApplicantResponse {
  body: {
    data: IApplicantDetail[];
  };
}

export interface IApplicantDetail {
  nickname: string;
  profileImg: string;
  email: string;
  message: string;
  applicationDate: string;
}
