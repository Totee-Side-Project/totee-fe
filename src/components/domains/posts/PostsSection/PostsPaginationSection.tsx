import { ReactNode, useState } from 'react';

import { PostCard } from '@components/common/post/PostCard/PostCard';
import { Pagination } from '@components/common/pagination/Pagination';
import { SEARCH_PAGE_SIZE } from '@hooks/useSearch';
import { PostsCategoryNames } from 'pages/PostsPage';
import classes from './postsSection.module.scss';

interface IProps {
  categoryTitle: PostsCategoryNames;
  children: ReactNode;
  totalPages: number | undefined;
  isLoading: boolean;
}

// data를 props로 받자.
export const PostPaginationSection = ({
  categoryTitle,
  children,
  totalPages,
  isLoading,
}: IProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [slideNum, setSlideNum] = useState(1);

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

  // 🟠Todo: 보여줄 데이터들이 없거나 잘못된 정렬 카테고리가 선택된 경우 적절한 안내페이지르 보여줘야한다.
  if (!children) {
    return (
      <main>
        <div>
          <ul className={classes.postsSection}>
            <h2>일치하는 게시물이 없어요</h2>
          </ul>
        </div>
        <div className={classes.postsTriggerWrap}></div>
      </main>
    );
  }
  // }

  return (
    <>
      <div className={classes.postsCategoryTitle}>{categoryTitle}</div>
      <section className={classes.postsSectionContainer}>
        <ul className={classes.postsSection}>{children}</ul>
        <div className={classes.postsTriggerWrap}>
          <Pagination
            currentPage={currentPage}
            totalPageNum={totalPages || 0}
            limitPageNum={4}
            setCurrentPage={setCurrentPage}
            slideNum={slideNum}
            setSlideNum={setSlideNum}
          />
        </div>
      </section>
    </>
  );
};
