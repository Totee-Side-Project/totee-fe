import { CommentType } from './comment.types';
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

export interface IPostDetailType {
  author: string;
  authorPosition: string;
  categoryName: string;
  commentDTOList: CommentType[];
  commentNum: number;
  contactLink: string;
  contactMethod: string;
  content: string;
  createdAt: string;
  imageUrl: string;
  likeNum: number;
  onlineOrOffline: string;
  period: string;
  positionList: string[];
  postId: number;
  recruitNum: string;
  status: string;
  title: string;
  view: number;
}

export interface ISearchType {
  data: IPostType[] | null;
  keyword: string | null;
}
