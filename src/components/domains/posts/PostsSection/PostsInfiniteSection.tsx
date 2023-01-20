import { useSearchParams } from 'react-router-dom';

import { PostCard } from '@components/common/post/PostCard/PostCard';
import { useInfiniteTotalPosts } from '@hooks/query/useInfiniteTotalPosts';
import { queryKeys } from '@hooks/query/queryKeys';
import { POSTS_URL_PARAMS } from 'pages/PostsPage';
import classes from './postsSection.module.scss';
import { PostAPI } from '@api/apis/post';

export const PostsInfiniteSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortParam = searchParams.get(POSTS_URL_PARAMS.SORT) || '';
  const keywordParam = searchParams.get(POSTS_URL_PARAMS.KEYWORD) || '';

  const { query, TriggerComponent } = useInfiniteTotalPosts({
    keyword: keywordParam,
    getPage: PostAPI.getPostList,
    queryKey: queryKeys.postsInfiniteScroll({
      keyword: keywordParam,
      sortOption: sortParam,
    }),
    size: 15,
    sortOption: sortParam,
  });

  if (query.isLoading) {
    return (
      <section className={classes.postsSectionContainer}>
        <ul className={classes.postsSection}>
          {Array(10)
            .fill(0)
            .map((ele, index) => (
              <PostCard key={index} />
            ))}
        </ul>
        <div className={classes.postsTriggerWrap} />
      </section>
    );
  }

  if (query.isError) {
    // TODO: Error시 UI
    return null;
  }

  if (
    query.status === 'success' &&
    query.data?.pages[0].postData.content.length
  ) {
    return (
      <section className={classes.postsSectionContainer}>
        <ul className={classes.postsSection}>
          {query.data.pages
            .flatMap((page) => page.postData.content)
            .map((post) => (
              <PostCard key={post.postId} post={post} />
            ))}
        </ul>
        <div className={classes.postsTriggerWrap}>
          <TriggerComponent />
        </div>
      </section>
    );
  }

  // Todo: 보여줄 데이터들이 없거나 잘못된 정렬 카테고리가 선택된 경우 적절한 안내페이지르 보여줘야한다.
  return (
    <main>
      <div>
        <ul className={classes.postsSection}>
          <h2>일치하는 게시물없음</h2>
        </ul>
      </div>
      <div className={classes.postsTriggerWrap}></div>
    </main>
  );
};
