import { SignInModal } from '@components/common';
import { loginState } from '@store/login';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import classes from './commentInput.module.scss';
import { Input, Button } from '@components/atoms';
import { useAddComment, useAddReply } from '@hooks/useMutateQuery';
interface ICommentInputPropsType {
  postId?: number;
  commentId?: number;
  type: string;
  onClickCancle?: () => void;
}

export function CommentInput({
  postId,
  commentId,
  type = 'comment',
  onClickCancle,
}: ICommentInputPropsType) {
  const [inputValue, setInputValue] = useState('');

  const [login, setLogin] = useRecoilState(loginState);
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);

  const AddPostCommentMutate = useAddComment(postId as number);
  const AddPostReplyMutate = useAddReply(postId as number);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.length === 0) return;

    if (type === 'comment') {
      AddPostCommentMutate.mutateAsync({
        postId: postId,
        content: inputValue,
      })
        .then((res) => res)
        .catch((err) => err);
    } else {
      AddPostReplyMutate.mutateAsync({
        commentId: commentId,
        content: inputValue,
      })
        .then((res) => res)
        .catch((err) => err);
    }
  };

  const checkLogin = (e: any) => {
    if (login.state) {
      setInputValue(e.target.value);
    } else {
      setIsOpenLoginModal(true);
    }
  };

  return (
    <>
      <form className={classes.commentInput_wrapper} onSubmit={onSubmit}>
        <Input
          autoFocus
          value={inputValue}
          type="text"
          name="comment"
          id="comment"
          placeholder="댓글을 입력해주세요"
          onChange={checkLogin}
        ></Input>
        <div className={classes.btn_wrapper}>
          <Button
            text="취소"
            type="button"
            style={{
              width: '150px',
              backgroundColor: '#fff',
              border: '2px solid #BFBFBF',
              borderRadius: '10px',
              color: '#6A6A6A',
            }}
            onClick={() => {
              setInputValue('');
              onClickCancle && onClickCancle();
            }}
          ></Button>
          <Button
            text="댓글 등록"
            type="submit"
            style={{
              width: '250px',
              backgroundColor: '#568A35',
              border: 'none',
              borderRadius: '10px',
              color: '#fff',
            }}
          ></Button>
        </div>
      </form>
      <SignInModal
        isOpen={isOpenLoginModal}
        setIsOpen={setIsOpenLoginModal}
      ></SignInModal>
    </>
  );
}
