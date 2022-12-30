import { useNavigate } from 'react-router-dom';

// import { Button } from '@components/atoms';
import { PostsFilter } from '../PostsFilter';
import classes from './PostsHeader.module.scss';

export const PostsHeader = () => {
  const navigate = useNavigate();

  return (
    <div className={classes.postsFilterContainer}>
      <div className={classes.postsFilterWrap}>
        <PostsFilter
          // datas={totalPosts}
          // setDatas={setTotalPosts}
          options={{
            recent: '최신순',
            commentNum: '댓글순',
            view: '조회순',
            likeNum: '좋아요순',
          }}
          // element={undefined}
        />
        {/* <Button onClick={() => navigate('/setupStudy')} center="글쓰기" /> */}
      </div>
    </div>
  );
};
