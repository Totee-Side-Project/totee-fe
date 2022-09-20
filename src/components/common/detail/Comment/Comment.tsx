import { SignInModal } from '@components/common';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './comment.module.scss';
import { handleTime } from '@utils/handleTime';
import { useRecoilState } from 'recoil';
import { UserState, loginState } from '@store/index';
import { Button, Input } from '@components/atoms';
import { useDeleteComment, useUpdateComment } from '@hooks/useMutateQuery';
import { CommentInput } from '../CommentInput/CommentInput';
import { ICommentPropsType } from 'types/comment.types';
import { ReplyComment } from './ReplyComment';

export function Comment({ postId, comment }: ICommentPropsType) {
  const [user, setUser] = useRecoilState(UserState);
  const [isEdit, setIsEdit] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const [inputValue, setInputValue] = useState(comment.content);
  const [replyInputValue, setReplyInputValue] = useState('');

  const UpdateCommentMutate = useUpdateComment(postId, comment.commentId);
  const DeleteCommentMutate = useDeleteComment(postId, comment.commentId);

  const [login, setLogin] = useRecoilState(loginState);
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);

  const checkLogin = () => {
    if (login.state) {
      setIsReply(!isReply);
    } else {
      setIsOpenLoginModal(true);
    }
  };

  const onClickUpdateBtn = () => [
    UpdateCommentMutate.mutateAsync({
      postId: postId,
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
    DeleteCommentMutate.mutateAsync()
      .then((res) => {
        if (res.status === 200) {
          setIsEdit(false);
        }
      })
      .catch((err) => err);
  };

  return (
    <div className={classes.comment_container}>
      <div className={classes.profile_wrapper}>
        <div
          className={classes.profile_img}
          style={{
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundImage: `url(${comment.profileImageUrl})`,
          }}
        ></div>
        <div className={classes.vertical_line}></div>
      </div>
      <div className={classes.content_wrapper}>
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
                  <hr className={classes.vertical_line2}></hr>
                </>
              )}
              <div
                className={classes.reply_button}
                // onClick={() => setIsReply(!isReply)}
                onClick={checkLogin}
              >
                답글달기
              </div>
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
        {/*<div*/}
        {/*  className={classes.reply_button}*/}
        {/*  onClick={() => setIsReply(!isReply)}*/}
        {/*>*/}
        {/*  답글달기*/}
        {/*</div>*/}

        <div className={classes.reply_comment_wrapper}>
          {comment.replyList &&
            comment.replyList.map((reply) => (
              <ReplyComment
                key={`reply-${reply.commentId}`}
                postId={postId}
                comment={reply}
                commentId={comment.commentId}
              ></ReplyComment>
            ))}
        </div>
        {isReply && (
          <CommentInput
            postId={postId}
            commentId={comment.commentId}
            type={'reply'}
            onClickCancle={() => setIsReply(false)}
          ></CommentInput>
        )}
      </div>
      <SignInModal
        isOpen={isOpenLoginModal}
        setIsOpen={setIsOpenLoginModal}
      ></SignInModal>
    </div>
  );
}
