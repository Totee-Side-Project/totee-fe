import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { PostAPI } from '@api/api';
import { Button } from '@components/atoms';
import { NewPostCard } from '@components/common/post/PostCard/PostCard';
import { useInfiniteTotalPosts } from '@hooks/query/useInfiniteTotalPosts';
import { queryKeys } from '@hooks/query';
import { useSort } from '@hooks/useSort';
import { PostsFilter } from '../PostsFilter';
import classes from './postsSection.module.scss';

export const PostsSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { query, TriggerComponent } = useInfiniteTotalPosts({
    getPage: PostAPI.getPostList,
    pageSize: 4,
    queryKey: queryKeys.postsAll,
  });

  // 1차원 배열을 넣어준다.
  const {
    sortedDatas: totalPosts,
    setSortedDatas: setTotalPosts,
    setSortFunctions,
  } = useSort(query.data?.pages.flatMap((page) => page.postData.content));

  useEffect(() => {
    setSearchParams({ filter: 'recent' });
  }, []);

  useEffect(() => {
    const params = searchParams.get('filter');

    if (query.status === 'success' && query.data && params) {
      setSortFunctions[params]();
    }
  }, [query.status, query.data, searchParams]);

  if (query.status === 'success' && totalPosts && totalPosts.length) {
    return (
      <main>
        <div className={classes.postsFilterWrap}>
          <PostsFilter
            datas={totalPosts}
            setDatas={setTotalPosts}
            options={{
              recent: '최신순',
              comment: '댓글순',
              view: '조회순',
              like: '좋아요순',
            }}
            element={undefined}
          />
          <Button onClick={() => navigate('/setupStudy')} center="글쓰기" />
        </div>
        <section>
          <div>
            <ul className={classes.postsSection}>
              {totalPosts.map((post) => (
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

  // 보여줄 데이터들이 없는 상태
  return null;
};
