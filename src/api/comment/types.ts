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
