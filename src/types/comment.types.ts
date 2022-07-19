export interface CommentType{
    nickname :string,
    commentId : number,
    content: string,
    replyList?: CommentType[],
    created_at : string;
    replyId?:number,
}

export interface ICommentPropsType{
    postId:number;
    comment:CommentType;
    commentId?:number;
}
