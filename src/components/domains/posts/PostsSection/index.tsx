import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { PostAPI } from '@api/api';
import { Button } from '@components/atoms';
import { NewPostCard } from '@components/common/post/PostCard/PostCard';
import { useInfiniteTotalPosts } from '@hooks/query/useInfiniteTotalPosts';
import { queryKeys } from '@hooks/query';
// import { useSort } from '@hooks/useSort';
import { PostsFilter } from '../PostsFilter';
import classes from './postsSection.module.scss';
import { NotMatchPage } from 'pages';

export const PostsSection = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const param = searchParams.get('filter');

  const { query, TriggerComponent } = useInfiniteTotalPosts({
    getPage: PostAPI.getPostList,
    pageSize: 4,
    filter: param === 'recent' ? undefined : (param as string),
    queryKey: queryKeys.postsAll,
  });

  useEffect(() => {
    if (!param) setSearchParams({ filter: 'recent' });
  }, [searchParams]);

  // 제일처음에 로딩을 할 때

  if (query.isLoading) {
    return (
      <main>
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
          <Button onClick={() => navigate('/setupStudy')} center="글쓰기" />
        </div>
        <ul className={classes.postsSection}>
          {Array(8)
            .fill(0)
            .map((ele, index) => (
              <NewPostCard key={index} />
            ))}
        </ul>
        <div style={{ height: '200px' }} />
      </main>
    );
  }

  if (query.status === 'success' && query.data.pages.length) {
    return (
      <main>
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
          <Button onClick={() => navigate('/setupStudy')} center="글쓰기" />
        </div>
        <section>
          <div>
            <ul className={classes.postsSection}>
              {query.data.pages
                .flatMap((page) => page.postData.content)
                .map((post) => (
                  <NewPostCard key={post.postId} post={post} />
                ))}
            </ul>
          </div>
          <div style={{ height: '200px' }} />
          <TriggerComponent />
        </section>
      </main>
    );
  }

  //
  // 🟠Todo: 보여줄 데이터들이 없거나 잘못된 정렬 카테고리가 선택된 경우 적절한 안내페이지르 보여줘야한다.
  return (
    <main>
      <div>
        <ul className={classes.postsSection}>
          <h2>일치하는 게시물없음</h2>
        </ul>
      </div>
      <div style={{ height: '200px' }} />
    </main>
  );
};
