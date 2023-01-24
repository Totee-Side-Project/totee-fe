import { useState } from 'react';
import classes from './index.module.scss';

interface IPaginationProps {
  pages: number[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({
  pages,
  currentPage,
  setCurrentPage,
}: IPaginationProps) => {
  const [slideNum, setSlideNum] = useState(1);

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
