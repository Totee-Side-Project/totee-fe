import { IResponsePostDetail } from 'types/api.types';
import { Comments } from './Comments';
import { CommentSubmitArea } from './CommentSubmitArea';

import classes from './commentSection.module.scss';

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
