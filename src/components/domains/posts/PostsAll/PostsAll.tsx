import { PostsHeader } from '@components/domains/posts/PostsHeader';
import { PostPaginationSection } from '@components/domains/posts/PostsSection/PostsPaginationSection';
import { SearchSection } from '@components/common';

// TODO: mento Posts 도 보여줄 수 있도록 할 예정
export const PostsAll = () => {
  return (
    <div>
      <SearchSection />
      <PostsHeader />
      <PostPaginationSection />
    </div>
  );
};
