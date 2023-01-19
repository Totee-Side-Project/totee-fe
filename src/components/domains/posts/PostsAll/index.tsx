import { SearchSection } from '@components/common';
import { PostsContainer } from '@components/domains/posts/PostsContainer';
import { PostPaginationSection } from '@components/domains/posts/PostsSection/PostsPaginationSection';

// TODO: mento Posts 도 보여줄 수 있도록 할 예정
export const PostsAll = () => {
  return (
    <>
      <SearchSection />
      <PostsContainer>
        <PostPaginationSection />
      </PostsContainer>
    </>
  );
};
