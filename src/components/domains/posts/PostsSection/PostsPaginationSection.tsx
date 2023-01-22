import { useEffect, useState } from 'react';

import { PostCard } from '@components/common/post/PostCard/PostCard';
import { Pagination } from '@components/common/pagination/Pagination';
import { useGetSearchPostList } from '@hooks/query/useGetQuery';
import { useGetPostsParams } from '@hooks/useGetPostsParams';
import { SEARCH_PAGE_SIZE } from '@hooks/useSearch';
import classes from './postsSection.module.scss';

interface IProps {
  categoryTitle: string;
}

export const PostPaginationSection = ({ categoryTitle }: IProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [slideNum, setSlideNum] = useState(1);
  const { params } = useGetPostsParams({
    size: SEARCH_PAGE_SIZE,
    page: currentPage,
  });

  const { data, isLoading, status } = useGetSearchPostList(params);

  if (isLoading) {
    const loadingList = [...Array(SEARCH_PAGE_SIZE)];
    return (
      <section className={classes.postsSectionContainer}>
        <ul className={classes.postsSection}>
          {loadingList.map((ele, index) => (
            <PostCard key={index} />
          ))}
        </ul>
        <div className={classes.postsTriggerWrap}></div>
      </section>
    );
  }

  if (status === 'success' && data.content.length) {
    return (
      <>
        <div className={classes.postsCategoryTitle}>{categoryTitle}</div>
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
      </>
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
