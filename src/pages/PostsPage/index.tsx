import { PostsFooter } from '@components/domains/posts/PostsFooter';
import { PostsHeader } from '@components/domains/posts/PostsHeader';
import { PostsSection } from '@components/domains/posts/PostsSection';
import './PostsPage.scss';

const PostsPage = () => {
  return (
    <main>
      <PostsHeader />
      <PostsSection />
      <PostsFooter />
    </main>
  );
};

export default PostsPage;
