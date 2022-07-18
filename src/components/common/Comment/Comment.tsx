import React from 'react';
import classes from './comment.module.scss';
import {handleTime} from '@utils/handleTime';

interface CommentType{
    username :string,
    commentId : number,
    content: string,
    replyList : CommentType[],
    created_at : string;
}

interface ICommentPropsType{
    comment:CommentType;
}

export function Comment({comment}:ICommentPropsType) {

    return (
        <div className={classes.CommentContainer}>
            <div className={classes.profileWrapper}>
                <div className={classes.profileImg}></div>
                <div className={classes.line}></div>
            </div>
            <div className={classes.contentWrapper}>
                <div className={classes.title}>
                    <div className={classes.nickname}>{comment?.username}</div>
                    <div className={classes.time}>{handleTime(comment?.created_at)}</div>
                </div>
                <div className={classes.line2}></div>
                <div className={classes.content}>
                    {comment?.content}
                </div>
            </div>
        </div>
    )
}
