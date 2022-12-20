import { ReactNode, useState } from 'react';
import { useRecoilValue } from 'recoil';
import Swal from 'sweetalert2';

import { NewIcon } from '@components/atoms/Icon/NewIcon';
import { Line } from '@components/atoms/Line/Line';
import { CommentSubmitArea } from 'pages/DetailPage';
import { useDeleteComment, useDeleteReply } from '@hooks/query/useMutateQuery';
import { UserState } from '@store/index';
import { createMarkup } from '@utils/createMarkup';
import { handleErrorType } from '@utils/handleErrorType';
import { handleTime } from '@utils/handleTime';
import type {
  IPostCommentDto,
  IReplyDto,
  IResponsePostDetail,
} from 'types/api.types';
import classes from './newComment.module.scss';

export const NewComments = ({
  postId,
  commentDTOList,
}: Pick<IResponsePostDetail, 'commentDTOList' | 'postId'>) => {
  return (
    <div className={classes.comments_container}>
      {commentDTOList.map((comment) => (
        <div key={comment.commentId}>
          <CommentItem
            key={`comment${comment.commentId}`}
            comment={comment}
            postId={postId}
            type={'comment'}
          />
        </div>
      ))}
    </div>
  );
};

interface CommentItemButtonListProps {
  comment: IPostCommentDto;
  buttonDataList: { [key in string]: [string, () => void] };
}

const CommentItemButtonList = ({
  comment,
  buttonDataList,
}: CommentItemButtonListProps) => {
  return (
    <div style={{ display: 'flex' }}>
      {Object.values(buttonDataList).map(([text, onClick], index) => (
        <span
          key={`${comment.commentId}_${text}_${index}_${Math.random()}`}
          style={{ display: 'flex', cursor: 'pointer' }}
        >
          <span onClick={onClick}>{text}</span>
          {index < Object.values(buttonDataList).length - 1 && (
            <hr style={{ margin: '0 7px' }} />
          )}
        </span>
      ))}
    </div>
  );
};

interface CommentReplyItemProps {
  postId: number;
  reply: IReplyDto;
  comment: IPostCommentDto;
}

const CommentReplyItem = ({
  postId,
  reply,
  comment,
}: CommentReplyItemProps) => {
  const [isModify, setIsModify] = useState(false);
  const [isReply, setIsReply] = useState(false);

  const toggleIsModify = () => setIsModify((pre) => !pre);
  const toggleIsReply = () => setIsReply((pre) => !pre);
  return (
    <CommentItemContainer>
      <CommentLeftWrap>
        <CommentItemProfile comment={reply} />
      </CommentLeftWrap>
      <div
        style={{
          width: '100%',
          backgroundColor: '#f9f9f9',
          padding: '10px 20px',
          borderRadius: '10px',
        }}
      >
        <CommentRightWrap>
          <CommentRightHeader
            postId={postId}
            comment={comment}
            reply={reply}
            type="reply"
            toggleIsModify={toggleIsModify}
            toggleIsReply={toggleIsReply}
          />
          <Line />
          {isModify ? (
            <CommentModifyWrap
              postId={postId}
              comment={comment}
              reply={reply}
              isModify={isModify}
              toggleIsModify={toggleIsModify}
            />
          ) : (
            <CommentContent comment={reply} />
          )}
        </CommentRightWrap>
      </div>
    </CommentItemContainer>
  );
};

const CommentItem = ({
  postId,
  comment,
  type,
}: {
  postId: number;
  comment: IPostCommentDto;
  type: 'comment';
}) => {
  const [isModify, setIsModify] = useState(false);
  const [isReply, setIsReply] = useState(false);

  const toggleIsModify = () => setIsModify((pre) => !pre);
  const toggleIsReply = () => setIsReply((pre) => !pre);
  return (
    <CommentItemContainer>
      <CommentLeftWrap>
        <CommentItemProfile comment={comment} />
        <CommentVerticalLine />
      </CommentLeftWrap>
      <CommentRightWrap>
        <CommentRightHeader
          comment={comment}
          toggleIsModify={toggleIsModify}
          toggleIsReply={toggleIsReply}
          postId={postId}
          type={type}
        />
        <Line />
        {isModify ? (
          <CommentModifyWrap
            postId={postId}
            comment={comment}
            isModify={isModify}
            toggleIsModify={toggleIsModify}
          />
        ) : (
          <CommentContent comment={comment} />
        )}
        {isReply && (
          <CommentSubmitArea
            postId={postId}
            comment={comment}
            type="reply"
            toggleParentBoolean={toggleIsReply}
          />
        )}
        <CommentReplyWrap postId={postId} comment={comment} />
      </CommentRightWrap>
    </CommentItemContainer>
  );
};

interface IHaveChildren {
  children: ReactNode;
}

const CommentItemContainer = ({ children }: IHaveChildren) => {
  return <div className={classes.comment_container}>{children}</div>;
};

const CommentLeftWrap = ({ children }: IHaveChildren) => {
  return <div className={classes.left_item_wrap}>{children}</div>;
};

const CommentRightWrap = ({ children }: IHaveChildren) => {
  return <div className={classes.right_item_wrap}>{children}</div>;
};

const CommentRightHeader = ({
  postId,
  comment,
  reply,
  type,
  toggleIsModify,
  toggleIsReply,
}: {
  postId: number;
  comment: IPostCommentDto;
  reply?: IReplyDto;
  type: 'comment' | 'reply';
  toggleIsModify: () => void;
  toggleIsReply: () => void;
}) => {
  const { nickname: currentUserNickname } = useRecoilValue(UserState);
  const deleteQuery =
    type === 'comment'
      ? useDeleteComment(postId, comment.commentId)
      : useDeleteReply(postId, reply?.replyId as number);
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
          await deleteQuery.mutateAsync();
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

  const commentButtonDataList: { [key in string]: [string, () => void] } =
    currentUserNickname === comment.nickname
      ? {
          modify: ['수정', toggleIsModify],
          remove: ['삭제', onClickByRemoveButton],
          reply: ['답글', toggleIsReply],
        }
      : {
          reply: ['답글', toggleIsReply],
        };

  const replyButtonDataList: { [key in string]: [string, () => void] } =
    currentUserNickname === reply?.nickname
      ? {
          modify: ['수정', toggleIsModify],
          remove: ['삭제', onClickByRemoveButton],
        }
      : { modify: ['', () => {}] };
  return (
    <div className={classes.right_item_header}>
      <div className={classes.right_item_header_left}>
        <div className={classes.nickname}>{comment.nickname}</div>
        <div className={classes.date}>{handleTime(comment.createdAt)}</div>
      </div>
      <CommentItemButtonList
        buttonDataList={
          type === 'comment' ? commentButtonDataList : replyButtonDataList
        }
        comment={comment}
      />
    </div>
  );
};

interface CommentModifyProps {
  postId: number;
  comment: IPostCommentDto;
  reply?: IReplyDto;
  isModify: boolean;
  toggleIsModify: () => void;
}

const CommentModifyWrap = ({
  postId,
  comment,
  reply,
  isModify,
  toggleIsModify,
}: CommentModifyProps) => {
  return (
    <div className={classes.right_item_modify_wrap}>
      <CommentSubmitArea
        postId={postId}
        comment={comment}
        reply={reply}
        isModify={isModify}
        toggleParentBoolean={toggleIsModify}
        type={'comment'}
      />
    </div>
  );
};

const CommentContent = ({
  comment,
}: {
  comment: IPostCommentDto | IReplyDto;
}) => {
  return (
    <div
      className={classes.right_item_content}
      dangerouslySetInnerHTML={createMarkup(comment.content)}
    ></div>
  );
};

interface CommentReplyProps {
  postId: number;
  comment: IPostCommentDto;
}

const CommentReplyWrap = ({ postId, comment }: CommentReplyProps) => {
  return (
    <div className={classes.right_item_reply_wrap}>
      {comment.replyList.map((reply) => (
        <CommentReplyItem
          key={reply.replyId}
          reply={reply}
          postId={postId}
          comment={comment}
        />
      ))}
    </div>
  );
};

const CommentVerticalLine = () => {
  return (
    <div className={classes.left_vertical_line_wrap}>
      <Line type="column" />
    </div>
  );
};

const CommentItemProfile = ({
  comment,
}: {
  comment: IPostCommentDto | IReplyDto;
}) => {
  return (
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
  );
};
