import { Comments } from './Comments';
import { CommentSubmitArea } from './CommentSubmitArea';
import classes from './commentSection.module.scss';
import { IResponsePostDetail } from '@api/post/types';

export const SectionComments = ({
  commentDTOList,
  postId,
}: Pick<IResponsePostDetail, 'commentDTOList' | 'postId'>) => {
  return (
    <div className={classes.comment_wrap}>
      <div className={classes.comment_list_wrap}>
        <Comments commentDTOList={commentDTOList} postId={postId} />
      </div>
      <CommentSubmitArea postId={postId} type={'comment'} />
    </div>
  );
};
