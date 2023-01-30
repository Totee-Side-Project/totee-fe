import { ReactNode } from 'react';

import { useInfiniteTotalPosts } from '@hooks/query/useInfiniteWithDraw';
import { useGetPostsParams } from '@hooks/useGetPostsParams';
import { PostCard } from '@components/common/post/PostCard/PostCard';
import { SearchResultGuideText } from '@components/atoms';
import { MentoringAPI, PostAPI } from '@api/api';
import { queryKeys } from '@hooks/query';
import { CategoryTypes } from '@components/domains/posts/PostsContainer';
import classes from './postsSection.module.scss';

export const INFINITE_LOADING_PAGE_SIZE = 10;
export const INFINITE_PAGE_SIZE = 20;

interface IProps {
  children?: ReactNode;
  category: CategoryTypes;
}

export const fetchFunctions = {
  study: PostAPI.getPostList,
  mentoring: MentoringAPI.searchMentoringList,
};

export const fetchQueryKeys = {
  study: queryKeys.postsInfiniteScroll,
  mentoring: queryKeys.mentoringInfiniteScroll,
};

export const PostsInfiniteSection = ({ children, category }: IProps) => {
  const { params } = useGetPostsParams({ size: INFINITE_PAGE_SIZE });

  const { query, TriggerComponent } = useInfiniteTotalPosts({
    getPage: fetchFunctions[category],
    queryKey: fetchQueryKeys[category](params),
    params,
  });

  if (query.isLoading) {
    const loadingList = [...Array(INFINITE_LOADING_PAGE_SIZE)];
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

  if (!children) {
    return (
      <main>
        <div>
          <SearchResultGuideText className={classes.postsCategoryTitle} />
          <ul className={classes.postsSection}>
            <h2>일치하는 게시물없음</h2>
          </ul>
        </div>
        <div className={classes.postsTriggerWrap}></div>
      </main>
    );
  }

  return (
    <>
      <SearchResultGuideText className={classes.postsCategoryTitle} />
      <section className={classes.postsSectionContainer}>
        <ul className={classes.postsSection}>{children}</ul>
        <div className={classes.postsTriggerWrap}>
          <TriggerComponent />
        </div>
      </section>
    </>
  );
};
