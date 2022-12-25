import { ChangeEvent, useEffect, useState } from 'react';

import { Button } from '@components/atoms';
import { replaceLineBreakTagIntoString } from '@utils/replaceLineBreakStringIntoTag';
import { IPostCommentDto, IReplyDto } from 'types/api.types';
import {
  SubmitCommentButton,
  SubmitModifyButton,
  SubmitReplyButton,
} from '../CommentButtons/CommentButtons';

import classes from './commentSection.module.scss';

export const CommentSubmitArea = ({
  postId,
  comment,
  reply,
  type,
  isModify = false,
  isReply,
  toggleParentBoolean,
}: {
  postId: number;
  comment?: IPostCommentDto;
  reply?: IReplyDto;
  type: 'comment' | 'reply';
  isModify?: boolean;
  isReply?: boolean;
  toggleParentBoolean?: () => void;
}) => {
  const [formData, setFormData] = useState('');
  useEffect(() => {
    if (comment?.content && isModify) {
      const newValue = replaceLineBreakTagIntoString(comment.content);
      setFormData(newValue);
    }
    if (reply?.content && isModify) {
      const newValue = replaceLineBreakTagIntoString(reply.content);
      setFormData(newValue);
    }
  }, [comment?.content, isModify]);

  const onChangeCommentValueByTextrea = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setFormData(e.target.value);
  const onClickCancleButton = () =>
    toggleParentBoolean && toggleParentBoolean();

  return (
    <>
      <textarea
        className={classes.comment_textarea}
        placeholder={
          isModify
            ? ''
            : type === 'reply'
            ? '답글을 입력해주세요'
            : '댓글을 입력해주세요'
        }
        value={formData}
        onChange={onChangeCommentValueByTextrea}
      />
      <div className={classes.comment_button_wrap}>
        {isModify || isReply ? (
          <Button
            className={classes.cancle_button}
            center={'취소'}
            onClick={onClickCancleButton}
          />
        ) : null}
        {type === 'comment' && !isModify ? (
          <SubmitCommentButton
            formData={formData}
            postId={postId}
            clearParentFormData={() => setFormData('')}
          />
        ) : isModify ? (
          <SubmitModifyButton
            formData={formData}
            postId={postId}
            replyId={reply ? reply?.replyId : undefined}
            comment={comment as IPostCommentDto}
            toggleParentBoolean={toggleParentBoolean}
            clearParentFormData={() => setFormData('')}
          />
        ) : (
          <SubmitReplyButton
            postId={postId}
            formData={formData}
            comment={comment as IPostCommentDto}
            toggleParentBoolean={toggleParentBoolean}
            clearParentFormData={() => setFormData('')}
          />
        )}
      </div>
    </>
  );
};
