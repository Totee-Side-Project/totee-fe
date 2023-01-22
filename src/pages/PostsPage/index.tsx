import { Route, Routes } from 'react-router-dom';

import { PostsContainer } from '@components/domains/posts/PostsContainer';
import { PostsInfiniteSection } from '@components/domains/posts/PostsSection/PostsInfiniteSection';
import { PostPaginationSection } from '@components/domains/posts/PostsSection/PostsPaginationSection';
import { SearchSection } from '@components/atoms';
// import { queryKeys } from '@hooks/query';
// import { MentoringAPI, PostAPI } from '@api/api';
// import { PostCard } from '@components/common/post/PostCard/PostCard';
// import MentoringPostCard from '@components/common/card/MentoringPostCard/MentoringPostCard';
import './PostsPage.scss';

export const POSTS_CATEGORY_PATHS = {
  BASE: 'posts/',
  ALL: 'all',
  STUDY: 'study',
  MENTO: 'mento',
};

export const POSTS_CATEGORY_NAMES = {
  STUDY: '스터디',
  MENTORING: '멘토링',
  MENTO: '멘토',
};

const PostsPage = () => {
  return (
    <Routes>
      <Route
        path={POSTS_CATEGORY_PATHS.ALL}
        element={
          <>
            <SearchSection resultGuidText={'on'} />
            <PostsContainer>
              <PostPaginationSection
                categoryTitle={POSTS_CATEGORY_NAMES.STUDY}
              />
            </PostsContainer>
            {/* <PostsContainer>
              <PostPaginationSection
                categoryTitle={POSTS_CATEGORY_NAMES.MENTORING}
              />
            </PostsContainer>
            <PostsContainer>
              <PostPaginationSection
                categoryTitle={POSTS_CATEGORY_NAMES.MENTO}
              />
            </PostsContainer> */}
          </>
        }
      />
      <Route
        path={POSTS_CATEGORY_PATHS.STUDY}
        element={
          <>
            <SearchSection />
            <PostsContainer>
              <PostsInfiniteSection />
            </PostsContainer>
          </>
        }
      />
      <Route
        path={POSTS_CATEGORY_PATHS.MENTO}
        element={
          <>
            <SearchSection />
            <PostsContainer>
              <PostsInfiniteSection
              // queryKey={queryKeys.mentoringSearchList}
              // getApi={MentoringAPI.searchMentoringList}
              // Element={MentoringPostCard}
              />
            </PostsContainer>
          </>
        }
      />
    </Routes>
  );
};

export default PostsPage;
