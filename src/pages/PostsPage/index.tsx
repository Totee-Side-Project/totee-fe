import { SearchSection } from '@components/common';
import { PostsFooter } from '@components/domains/posts/PostsFooter';
import { PostsHeader } from '@components/domains/posts/PostsHeader';
import { PostsSection } from '@components/domains/posts/PostsSection';
import './PostsPage.scss';

const PostsPage = () => {
  return (
    <div>
      <SearchSection />
      <main>
        <PostsHeader />
        <PostsSection />
        <PostsFooter />
      </main>
    </div>
  );
};

export default PostsPage;
