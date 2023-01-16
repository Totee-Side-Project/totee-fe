// import { PostAPI } from '@api/api';
import { useGetSearchPostList } from '@hooks/query/useGetQuery';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// import { PostsInfiniteSection } from '../PostsSection/PostsInfiniteSection';
import { PostPaginationSection } from '../PostsSection/PostsPaginationSection';
import { PostsHeader } from '../PostsHeader';
import { PostsFooter } from '../PostsFooter';

export const SearchPosts = () => {
  // const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const title = searchParams.get('title') || '';
  const sort = searchParams.get('sort');
  const [currentPage, setCurrentPage] = useState(0);

  const { data } = useGetSearchPostList({
    title,
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
