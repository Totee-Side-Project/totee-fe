import classes from './index.module.scss';
import ArrowIcon from '../../../../../../assets/svg/up-icon.svg';
import { useEffect, useState } from 'react';
import { useMobileView } from '@hooks/useMobileView';

interface IMobilePaginationProps {
  postsLength: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const MobilePagination = ({
  postsLength,
  currentPage,
  setCurrentPage,
}: IMobilePaginationProps) => {
  const isCurrentIPadWidth = useMobileView(425);
  const isCurrentMobileWidth = useMobileView(991);
  const [cardUnit, setCardUnit] = useState(4);

  useEffect(() => {
    if (isCurrentIPadWidth) {
      setCardUnit(2);
      return;
    }
    if (isCurrentMobileWidth) {
      setCardUnit(3);
      return;
    }
    setCardUnit(4);
  }, [isCurrentIPadWidth, isCurrentMobileWidth]);

  return (
    <div className={classes.mobilePagination}>
      {currentPage !== 1 && (
        <button
          className={classes.prevButton}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <img
            className={classes.renderSubMenuIcon}
            src={ArrowIcon}
            alt="이전 게시물"
          />
        </button>
      )}
      {currentPage !== Math.ceil(postsLength / cardUnit) && (
        <button
          className={classes.nextButton}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <img
            className={classes.renderSubMenuIcon}
            src={ArrowIcon}
            alt="다음 게시물"
          />
        </button>
      )}
    </div>
  );
};

export default MobilePagination;
