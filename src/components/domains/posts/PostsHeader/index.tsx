import { PostsFilter } from '../PostsFilter';
import classes from './index.module.scss';

export const PostsHeader = () => {
  return (
    <div className={classes.postsHeaderContainer}>
      <div className={classes.postsFilterWrap}>
        <PostsFilter
          options={{
            recent: '최신순',
            commentNum: '댓글순',
            view: '조회순',
            likeNum: '좋아요순',
          }}
        />
      </div>
    </div>
  );
};
