import React, { useState } from 'react';
import classNames from 'classnames';
import classes from './comment.module.scss';
import { handleTime } from '@utils/handleTime';
import { useRecoilState } from 'recoil';
import { UserState } from '@store/index';
import { Input } from '@components/atoms';

import { useDeleteReply, useUpdateReply } from '@hooks/useMutateQuery';

import { ICommentPropsType } from 'types/comment.types';

export function ReplyComment({
  postId,
  comment,
  commentId,
}: ICommentPropsType) {
  const [user, setUser] = useRecoilState(UserState);
  const [isEdit, setIsEdit] = useState(false);
  const [inputValue, setInputValue] = useState(comment.content);

  const UpdateReplyMutate = useUpdateReply(postId, comment.replyId as number);
  const DeleteReplyMutate = useDeleteReply(postId, comment.replyId as number);

  const onClickUpdateBtn = () => [
    UpdateReplyMutate.mutateAsync({
      commentId: commentId,
      content: inputValue,
    })
      .then((res) => {
        if (res.status === 200) {
          setIsEdit(false);
        }
      })
      .catch((err) => err),
  ];

  const onClickDeleteBtn = () => {
    DeleteReplyMutate.mutateAsync()
      .then((res) => {
        if (res.status === 200) {
          setIsEdit(false);
        }
      })
      .catch((err) => err);
  };

  return (
    <div className={classNames(classes.comment_container, classes.reply)}>
      <div className={classes.profile_wrapper}>
        <div
          className={classes.profile_img}
          style={{
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundImage: `url(${comment.profileImageUrl})`,
          }}
        ></div>
      </div>
      <div
        className={classNames(classes.content_wrapper, classes.reply_comment)}
      >
        <div className={classes.title}>
          <div className={classes.flex}>
            <div className={classes.nickname}>{comment?.nickname}</div>
            <div className={classes.time}>
              {handleTime(comment?.created_at)}
            </div>
          </div>
          {isEdit ? (
            <div className={classes.text_button}>
              <span
                onClick={() => {
                  setIsEdit(false);
                  setInputValue(comment.content);
                }}
              >
                취소
              </span>
              <hr className={classes.vertical_line2}></hr>
              <span onClick={onClickUpdateBtn}>수정</span>
            </div>
          ) : (
            <div className={classes.text_button}>
              {user.nickname === comment.nickname && (
                <>
                  <span onClick={() => setIsEdit(true)}>수정</span>
                  <hr className={classes.vertical_line2}></hr>
                  <span onClick={onClickDeleteBtn}>삭제</span>
                </>
              )}
            </div>
          )}
        </div>
        <hr className={classes.line2}></hr>
        <div className={classes.content}>
          {isEdit ? (
            <Input
              value={inputValue}
              type="text"
              name="comment"
              id="comment"
              placeholder="댓글을 입력해주세요"
              onChange={(e) => setInputValue(e.target.value)}
            ></Input>
          ) : (
            <>{comment?.content}</>
          )}
        </div>
      </div>
    </div>
  );
}
