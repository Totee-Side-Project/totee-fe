import { useSearchParams } from 'react-router-dom';

import { PostAPI } from '@api/api';
import { NewPostCard } from '@components/common/post/PostCard/PostCard';
import { useInfiniteTotalPosts } from '@hooks/query/useInfiniteTotalPosts';
import { queryKeys } from '@hooks/query';
import classes from './postsSection.module.scss';

export const PostsSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const param = searchParams.get('filter');

  const { query, TriggerComponent } = useInfiniteTotalPosts({
    getPage: PostAPI.getPostList,
    pageSize: 15,
    filter: !param ? undefined : (param as string),
    queryKey: queryKeys.postsAll,
  });

  // 제일처음에 로딩을 할 때
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

  //
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
