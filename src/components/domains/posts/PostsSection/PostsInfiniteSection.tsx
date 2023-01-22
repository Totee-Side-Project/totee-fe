import { PostAPI } from '@api/api';
import { useInfiniteTotalPosts } from '@hooks/query/useInfiniteWithDraw';
import { queryKeys } from '@hooks/query';
import { useGetPostsParams } from '@hooks/useGetPostsParams';
import { PostCard } from '@components/common/post/PostCard/PostCard';
import { SearchResultGuideText } from '@components/atoms';
import classes from './postsSection.module.scss';

const LOADING_PAGE_SIZE = 10;
const PAGE_SIZE = 20;

export const PostsInfiniteSection = () => {
  const { params } = useGetPostsParams({ size: PAGE_SIZE });

  const { query, TriggerComponent } = useInfiniteTotalPosts({
    getPage: PostAPI.getPostList,
    queryKey: queryKeys.postsInfiniteScroll(params),
    params,
  });

  if (query.isLoading) {
    const loadingList = [...Array(LOADING_PAGE_SIZE)];
    return (
      <section className={classes.postsSectionContainer}>
        <ul className={classes.postsSection}>
          {loadingList.map((ele, index) => (
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
      <>
        <SearchResultGuideText className={classes.postsCategoryTitle} />
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
      </>
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
