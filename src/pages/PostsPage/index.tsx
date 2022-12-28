import { PostAPI } from '@api/api';
import { NewPostCard } from '@components/common/post/PostCard/PostCard';
import { queryKeys } from '@hooks/query';
import { useInfiniteTotalPosts } from '@hooks/query/useInfiniteTotalPosts';
import { IResponsePostDetail } from 'types/api.types';

const PostsPage = () => {
  const { query, TriggerComponent } = useInfiniteTotalPosts({
    getPage: PostAPI.getPostList,
    pageSize: 2,
    queryKey: queryKeys.postsAll,
  });

  const pages = query.data?.pages;
  return (
    <div>
      <div>
        {pages?.map((page) =>
          page.postData.content.map((post: IResponsePostDetail) => (
            <NewPostCard key={post.postId} post={post} />
          )),
        )}
      </div>
      <TriggerComponent />
    </div>
  );
};
export default PostsPage;
