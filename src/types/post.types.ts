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
}
