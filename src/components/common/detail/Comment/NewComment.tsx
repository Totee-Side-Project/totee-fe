import { NewIcon } from '@components/atoms/Icon/NewIcon';
import { Line } from '@components/atoms/Line/Line';
import { IResponsePostDetail } from '@components/pages/DetailPage/NewDetailPage';
import { ICommentDto } from '@components/pages/DetailPage/NewDetailPage';
import { useDeleteComment } from '@hooks/useMutateQuery';
import { createMarkup } from '@utils/createMarkup';
import { handleErrorType } from '@utils/handleErrorType';
import { handleTime } from '@utils/handleTime';
import Swal from 'sweetalert2';
import classes from './newComment.module.scss';

export const NewComments = ({
  postId,
  commentDTOList,
}: Pick<IResponsePostDetail, 'commentDTOList' | 'postId'>) => {
  // 수정 삭제 답글 { title, onClick }[]
  return (
    <div className={classes.comments_container}>
      {commentDTOList.map((comment) => (
        <NewCommentItem
          key={comment.commentId}
          comment={comment}
          postId={postId}
        />
      ))}
    </div>
  );
};

const NewCommentItem = ({
  postId,
  comment,
}: {
  postId: number;
  comment: ICommentDto;
}) => {
  // comment를 가져와서 date를 변경하자.
  // const deleteCommentQuery = useDeleteComment(postId, comment.commentId);
  const deleteCommentQuery = useDeleteComment(postId, comment.commentId);
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
            {['수정', 'line', '삭제', 'line', '답글'].map((ele, index) =>
              ele === 'line' ? (
                <Line type="flexItem" key={'comment_header-right_' + index} />
              ) : (
                <span
                  key={'comment_header-right_' + ele}
                  onClick={onClickByRemoveButton}
                >
                  {ele}
                </span>
              ),
            )}
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

// 댓글 최대 글자수를 둬야겠다.
// 또한 간략히 보기도 있으면 좋을 것 같다.
