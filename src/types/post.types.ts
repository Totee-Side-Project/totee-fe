export interface Post {
  status: 'Y' | 'N';
  title: string;
  content: string;
  nickname: string;
  likeCount: number;
  commentCount: number;
  view: number;
}
