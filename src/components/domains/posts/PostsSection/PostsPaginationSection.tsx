import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PostCard } from '@components/common/post/PostCard/PostCard';
import { Pagination } from '@components/common/pagination/Pagination';
import { useGetSearchPostList } from '@hooks/query/useGetQuery';
import { POSTS_URL_PARAMS } from 'pages/PostsPage';
import classes from './postsSection.module.scss';

// call API
// Item Component UI
const PAGE_SIZE = 10;

export const PostPaginationSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const title = searchParams.get('title') || '';
  const sortParam = searchParams.get(POSTS_URL_PARAMS.SORT) || '';

  const [currentPage, setCurrentPage] = useState(0);
  const [slideNum, setSlideNum] = useState(1);

  const { data, isLoading, isFetching, status, refetch } = useGetSearchPostList(
    {
      title,
      page: currentPage,
      size: PAGE_SIZE,
      sortOptions: sortParam,
    },
  );

  useEffect(() => {
    refetch();
  }, [sortParam]);

  if (isLoading || isFetching) {
    return (
      <section className={classes.postsSectionContainer}>
        <ul className={classes.postsSection}>
          {Array(PAGE_SIZE)
            .fill(null)
            .map((ele, index) => (
              <PostCard key={index} />
            ))}
        </ul>
        <div className={classes.postsTriggerWrap}></div>
      </section>
    );
  }

  if (status === 'success' && data.content.length) {
    return (
      <section className={classes.postsSectionContainer}>
        <ul className={classes.postsSection}>
          {data.content.map((post) => (
            <PostCard key={post.postId} post={post} />
          ))}
        </ul>
        <div className={classes.postsTriggerWrap}>
          <Pagination
            currentPage={currentPage}
            totalPageNum={data.totalPages}
            limitPageNum={4}
            setCurrentPage={setCurrentPage}
            slideNum={slideNum}
            setSlideNum={setSlideNum}
          />
        </div>
      </section>
    );
  }

  // 🟠Todo: 보여줄 데이터들이 없거나 잘못된 정렬 카테고리가 선택된 경우 적절한 안내페이지르 보여줘야한다.
  return (
    <main>
      <div>
        <ul className={classes.postsSection}>
          <h2>일치하는 게시물없음</h2>
        </ul>
      </div>
      <div className={classes.postsTriggerWrap}></div>
    </main>
  );
};
