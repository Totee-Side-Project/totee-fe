import { useSearchParams } from 'react-router-dom';

import { PostAPI } from '@api/api';
import { NewPostCard } from '@components/common/post/PostCard/PostCard';
import { useInfiniteTotalPosts } from '@hooks/query/useInfiniteTotalPosts';
import { queryKeys } from '@hooks/query';
import classes from './postsSection.module.scss';

export const PostsInfiniteSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortParam = searchParams.get('sort');

  const { query, TriggerComponent } = useInfiniteTotalPosts({
    getPage: PostAPI.getPostList,
    queryKey: queryKeys.postsAll,
    pageSize: 15,
    sortOptions: !sortParam ? undefined : (sortParam as string),
  });

  if (query.isLoading) {
    return (
      <section className={classes.postsSectionContainer}>
        <ul className={classes.postsSection}>
          {Array(10)
            .fill(0)
            .map((ele, index) => (
              <NewPostCard key={index} />
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

  if (query.status === 'success' && query.data.pages.length) {
    return (
      <section className={classes.postsSectionContainer}>
        <ul className={classes.postsSection}>
          {query.data.pages
            .flatMap((page) => page.postData.content)
            .map((post) => (
              <NewPostCard key={post.postId} post={post} />
            ))}
        </ul>
        <div className={classes.postsTriggerWrap}>
          <TriggerComponent />
        </div>
      </section>
    );
  }

  // 🟠Todo: 보여줄 데이터들이 없거나 잘못된 정렬 카테고리가 선택된 경우 적절한 안내페이지르 보여줘야한다.
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
