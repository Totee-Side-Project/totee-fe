import { PostCard } from '@components/common/post/PostCard/PostCard';
import { useEffect, useState } from 'react';
import Pagination from '../Pagination';
import classes from './index.module.scss';

const StudyPostCard = ({ data }: any) => {
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
    </>
  );
};

export default StudyPostCard;
