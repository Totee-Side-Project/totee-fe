import { NewIcon } from '@components/atoms/Icon/NewIcon';
import { Line } from '@components/atoms/Line/Line';
import { IResponsePostDetail } from '@components/pages/DetailPage/NewDetailPage';
import { ICommentDto } from '@components/pages/DetailPage/NewDetailPage';
import { useDeleteComment } from '@hooks/useMutateQuery';
import { UserState } from '@store/user';
import { createMarkup } from '@utils/createMarkup';
import { handleErrorType } from '@utils/handleErrorType';
import { handleTime } from '@utils/handleTime';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import Swal from 'sweetalert2';
import classes from './newComment.module.scss';

export const NewComments = ({
  postId,
  commentDTOList,
  nickname,
}: Pick<IResponsePostDetail, 'commentDTOList' | 'postId' | 'nickname'>) => {
  // 수정 삭제 답글 { title, onClick }[]
  return (
    <div className={classes.comments_container}>
      {commentDTOList.map((comment) => (
        <NewCommentItem
          key={comment.commentId}
          comment={comment}
          postId={postId}
          nickname={nickname}
        />
      ))}
    </div>
  );
};

const NewCommentItem = ({
  postId,
  comment,
  nickname,
}: {
  postId: number;
  comment: ICommentDto;
  nickname: string;
}) => {
  const deleteCommentQuery = useDeleteComment(postId, comment.commentId);
  const { nickname: currentUserNickname } = useRecoilValue(UserState);
  const [commentItemData, setCommentItemData] = useState<{
    [key in string]: [string, () => void];
  }>({
    modify: ['수정', () => {}],
    remove: ['삭제', () => {}],
    reply: ['답글', () => {}],
  });

  useEffect(() => {
    const newCommentItemData: { [key in string]: [string, () => void] } =
      currentUserNickname === comment.nickname
        ? {
            modify: ['수정', onClickByModifyButton],
            remove: ['삭제', onClickByRemoveButton],
            reply: ['답글', onClickByReplyButton],
          }
        : { reply: ['답글', onClickByReplyButton] };
    setCommentItemData(newCommentItemData);
  }, []);

  const onClickByModifyButton = () => {};
  const onClickByRemoveButton = () => {
    Swal.fire({
      title: '댓글 삭제',
      text: '댓글을 삭제하시겠어요?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#568A35',
      confirmButtonText: '삭제',
      cancelButtonColor: '#C0C0C0',
      cancelButtonText: '취소',
      preConfirm: async () => {
        try {
          await deleteCommentQuery.mutateAsync();
        } catch (error) {
          const errorMessage = handleErrorType(error);
          Swal.showValidationMessage(errorMessage);
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        return Swal.fire({
          title: '삭제완료!',
          text: '삭제가 완료되었습니다.',
          icon: 'success',
          confirmButtonText: '확인',
          confirmButtonColor: '#568A35',
        });
      }
    });
  };
  const onClickByReplyButton = () => {};

  const renderCommentItemButton = () =>
    Object.values(commentItemData).map(([text, onClick], index) => (
      <>
        <span key={'comment_header-right_' + text} onClick={onClick}>
          {text}
        </span>
        {index < Object.values(commentItemData).length - 1 && (
          <Line type="flexItem" key={'comment_header-right_' + index} />
        )}
      </>
    ));

  return (
    <div className={classes.comment_container}>
      <div className={classes.left_item_wrap}>
        <div className={classes.left_item_img_wrap}>
          <NewIcon
            src={comment.profileImageUrl}
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
            }}
            alt="user_profile_image"
            onClick={() => {}}
          />
        </div>
        <div className={classes.left_vertical_line_wrap}>
          <Line type="column" />
        </div>
      </div>
      <div className={classes.right_item_wrap}>
        <div className={classes.right_item_header}>
          <div className={classes.right_item_header_left}>
            <div className={classes.nickname}>{comment.nickname}</div>
            <div className={classes.date}>{handleTime(comment.createdAt)}</div>
          </div>
          <div className={classes.right_item_header_right}>
            {renderCommentItemButton()}
          </div>
        </div>
        <Line />
        <div
          className={classes.right_item_content}
          dangerouslySetInnerHTML={createMarkup(comment.content)}
        ></div>
      </div>
    </div>
  );
};
