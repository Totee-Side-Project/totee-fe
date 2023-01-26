import { SearchSection } from '@components/atoms';
import { PostCard } from '@components/common/post/PostCard/PostCard';
import { PostsContainer } from '@components/domains/posts/PostsContainer';
import {
  fetchFunctions,
  fetchQueryKeys,
} from '@components/domains/posts/PostsSection';
import {
  INFINITE_PAGE_SIZE,
  PostsInfiniteSection,
} from '@components/domains/posts/PostsSection/PostsInfiniteSection';
import { useInfiniteTotalPosts } from '@hooks/query/useInfiniteWithDraw';
import { useGetPostsParams } from '@hooks/useGetPostsParams';
import { postsSortOptions } from 'pages/PostsPage';
import type { IResponsePostDetail } from 'types/api.types';

export const STUDY = 'study';

export const PostsStudy = () => {
  const { params } = useGetPostsParams({ size: INFINITE_PAGE_SIZE });
  const { query } = useInfiniteTotalPosts({
    getPage: fetchFunctions[STUDY],
    queryKey: fetchQueryKeys[STUDY](params),
    params,
  });

  const datas = query.data?.pages
    .map((page) => page.postData.content)
    .flat() as IResponsePostDetail[];

  return (
    <>
      <SearchSection />
      <PostsContainer options={postsSortOptions}>
        <PostsInfiniteSection category="study">
          {datas && datas.length
            ? datas.map((studyPost) => (
                <PostCard key={studyPost.postId} post={studyPost} />
              ))
            : null}
        </PostsInfiniteSection>
      </PostsContainer>
    </>
  );
};
