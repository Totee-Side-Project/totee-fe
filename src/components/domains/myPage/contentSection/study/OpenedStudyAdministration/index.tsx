import { PostCard } from '@components/common/post/PostCard/PostCard';
import Pagination from '@components/domains/myPage/common/Pagination';
import { useGetMyStudyPost } from '@hooks/query/useGetQuery';
import { useEffect, useState } from 'react';
import classes from '../../index.module.scss';

const OpenedStudyAdministration = () => {
  const { data } = useGetMyStudyPost();

  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState<number[]>([]);

  useEffect(() => {
    setPages(
      Array.from(
        { length: Math.ceil(data?.totalElements / 4) },
        (_, index) => index + 1,
      ),
    );
  }, [data]);

  return (
    <>
      <p className={classes.title}>내가 개설한 스터디</p>
      <div className={classes.postCard}>
        {data?.content
          .slice((currentPage - 1) * 4, (currentPage - 1) * 4 + 4)
          .map((post) => (
            <PostCard
              post={post}
              styles={{ width: '230px', height: '250px' }}
              key={post.postId}
            />
          ))}
      </div>
      <Pagination
        pages={pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <hr />
      <p className={classes.title}>현재 스터디 멤버</p>
    </>
  );
};

export default OpenedStudyAdministration;
