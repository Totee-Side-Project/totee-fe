import { useGetSearchPostList } from '@hooks/query/useGetQuery';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { POSTS_URL_PARAMS } from 'pages/PostsPage';
import { PostsHeader } from '@components/domains/posts/PostsHeader';
import { PostPaginationSection } from '@components/domains/posts/PostsSection/PostsPaginationSection';

export const SearchPosts = () => {
  // const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const titleParam = searchParams.get(POSTS_URL_PARAMS.TITLE) || '';
  const sortParam = searchParams.get(POSTS_URL_PARAMS.SORT);
  const [currentPage, setCurrentPage] = useState(0);

  const { data } = useGetSearchPostList({
    title: titleParam,
    page: currentPage,
    size: 3,
  });

  return (
    <div>
      <div>
        <PostsHeader />
      </div>
      <PostPaginationSection />
    </div>
  );
};
