import { IPostCommentDto } from '@api/comment/types';
import { Button } from '@components/atoms';
import {
  useAddComment,
  useAddReply,
  useUpdateComment,
  useUpdateReply,
} from '@hooks/query/useMutateQuery';
import { replaceLineBreakStringIntoTag } from '@utils/replaceLineBreakStringIntoTag';
import Swal from 'sweetalert2';

const validateWithReplaceData = (data: string) => {
  const textList = replaceLineBreakStringIntoTag(data);
  return textList.map((text) => `<p>${text}</p>`).join('');
};

export const SubmitReplyButton = ({
  postId,
  formData,
  comment,
  toggleParentBoolean,
  clearParentFormData,
}: {
  postId: number;
  formData: string;
  comment: IPostCommentDto;
  toggleParentBoolean?: () => void;
  clearParentFormData: () => void;
}) => {
  const addReplyQuery = useAddReply(postId);
  const onSubmitReplyByButton = () => {
    const content = validateWithReplaceData(formData);
    if (!content) {
      alert('댓글을 입력해주세요.');
      return;
    }
    addReplyQuery
      .mutateAsync({
        commentId: comment.commentId,
        content,
      })
      .then((response) => {
        if (response.status === 200 && toggleParentBoolean) {
          clearParentFormData();
          toggleParentBoolean();
          return;
        }
        if (response.status !== 200) {
          Swal.fire({
            title: '답글 작성 실패',
            text: '답글 작성이 실패했습니다.',
            icon: 'error',
          });
        }
      });
  };
  return (
    <Button
      style={{ width: '100%' }}
      center="답글 등록"
      onClick={onSubmitReplyByButton}
    />
  );
};

export const SubmitModifyButton = ({
  formData,
  postId,
  replyId,
  comment,
  toggleParentBoolean,
  clearParentFormData,
}: {
  formData: string;
  postId: number;
  replyId?: number;
  comment: IPostCommentDto;
  toggleParentBoolean?: () => void;
  clearParentFormData: () => void;
}) => {
  const updateCommentQuery = useUpdateComment(postId, comment.commentId);
  const updateReplyQuery = useUpdateReply(postId, replyId as number);
  const updateCommentOnClick = () => {
    const content = validateWithReplaceData(formData);
    if (!content) {
      alert('댓글을 입력해주세요.');
      return;
    }
    updateCommentQuery
      .mutateAsync({
        postId,
        content,
      })
      .then((response) => {
        if (response.status === 200 && toggleParentBoolean) {
          clearParentFormData();
          toggleParentBoolean();
          return;
        }
        Swal.fire({
          title: '댓글 수정 실패',
          text: '댓글 수정이 실패했습니다.',
          icon: 'error',
        });
      });
  };

  const updateReplyOnClick = () => {
    const content = validateWithReplaceData(formData);
    updateReplyQuery
      .mutateAsync({
        commentId: comment.commentId,
        content,
      })
      .then((response) => {
        if (response.status === 200 && toggleParentBoolean) {
          clearParentFormData();
          toggleParentBoolean();
          return;
        }
        Swal.fire({
          title: '답글 수정 실패',
          text: '답글 수정이 실패했습니다.',
          icon: 'error',
        });
      });
  };

  return (
    <Button
      center="댓글 수정"
      style={{ width: '100%' }}
      onClick={replyId ? updateReplyOnClick : updateCommentOnClick}
    />
  );
};

export const SubmitCommentButton = ({
  formData,
  postId,
  clearParentFormData,
}: {
  formData: string;
  postId: number;
  clearParentFormData: () => void;
}) => {
  const addCommentQuery = useAddComment(postId);
  const onSubmitCommentByButton = () => {
    const content = validateWithReplaceData(formData);
    if (!content) {
      alert('댓글을 입력해주세요.');
      return;
    }
    addCommentQuery
      .mutateAsync({
        postId,
        content,
      })
      .then((response) => {
        if (response.status === 200) return clearParentFormData();
        Swal.fire({
          title: '댓글 작성 실패',
          text: '댓글 작성이 실패했습니다.',
          icon: 'error',
        });
      });
  };
  return (
    <Button
      style={{ width: '100%' }}
      center="댓글 등록"
      onClick={onSubmitCommentByButton}
    />
  );
};
