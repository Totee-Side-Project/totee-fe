import { useEffect, useState } from 'react';
import classes from './index.module.scss';

interface IPaginationProps {
  postsLength: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({
  postsLength,
  currentPage,
  setCurrentPage,
}: IPaginationProps) => {
  const [slideNum, setSlideNum] = useState(1);
  const [pages, setPages] = useState<number[]>([]);

  useEffect(() => {
    setPages(
      Array.from(
        { length: Math.ceil(postsLength / 4) },
        (_, index) => index + 1,
      ),
    );
  }, [postsLength]);

  if (postsLength === 0) {
    return <></>;
  }

  return (
    <div className={classes.pagination}>
      <button
        disabled={slideNum === 1}
        onClick={() => setSlideNum(slideNum - 1)}
      >
        &lt;
      </button>
      {pages?.slice((slideNum - 1) * 10, slideNum * 10).map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          style={{ color: currentPage === page ? 'black' : '#999999' }}
        >
          {page}
        </button>
      ))}
      <button
        disabled={slideNum === Math.ceil(pages?.length / 10)}
        onClick={() => setSlideNum(slideNum + 1)}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
