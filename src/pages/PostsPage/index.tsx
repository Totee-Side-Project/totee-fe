import { SearchSection } from '@components/common';
import { PostsAll } from '@components/domains/posts/PostsAll';
import { PostsHeader } from '@components/domains/posts/PostsHeader';
import { PostsInfiniteSection } from '@components/domains/posts/PostsSection/PostsInfiniteSection';
import { Route, Routes } from 'react-router-dom';
import './PostsPage.scss';

export const POSTS_CATEGORY_PATHS = {
  BASE: 'posts/',
  ALL: 'all',
  STUDY: 'study',
  MENTO: 'mento',
};

const PostsPage = () => {
  return (
    <Routes>
      <Route path={POSTS_CATEGORY_PATHS.ALL} element={<PostsAll />} />
      <Route
        path={POSTS_CATEGORY_PATHS.STUDY}
        element={
          <div>
            <SearchSection />
            <main>
              <PostsHeader />
              <PostsInfiniteSection />
            </main>
          </div>
        }
      />

      {/* 
      // TODO: 멘토링 카드 전체보기(무한스크롤) 구현해주어야 함
      // 스터디에서 apiCall, CardComponent 만 다르게 props로 넘겨서 쓸 수 있을 것 같음

      <Route
        path={POSTS_CATEGORY_PATHS.MENTO}
        element={
          <div>
            <SearchSection />
            <main>   
              <PostsHeader />
              <PostsInfiniteSection />
            </main>
          </div>
        }
      /> */}
    </Routes>
  );
};

export default PostsPage;
