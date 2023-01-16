import { Dispatch, SetStateAction } from 'react';

import arrowRightSvg from '@assets/svg/common/arrowRight.svg';
import { Icon } from '@components/atoms';

interface PaginationProps {
  currentPage: number;
  totalPageNum: number;
  limitPageNum: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  slideNum: number;
  setSlideNum: Dispatch<SetStateAction<number>>;
}

export const Pagination = ({
  currentPage,
  setCurrentPage,
  totalPageNum,
  limitPageNum,
  slideNum,
  setSlideNum,
}: PaginationProps) => {
  const onClickPrevArrow = () => {
    if (slideNum <= 1) return;
    setSlideNum((pre) => pre - 1);
    setCurrentPage((slideNum - 2) * limitPageNum);
  };

  const onClickNextArrow = () => {
    if (currentPage >= totalPageNum - 1) return;
    setSlideNum((pre) => pre + 1);
    setCurrentPage(slideNum * limitPageNum);
  };

  const pageNumbers = Array(limitPageNum).fill(null);

  return (
    <div style={{ gap: '10px', display: 'flex' }}>
      <ArrowButton
        isActive={currentPage >= 1}
        direction={'pre'}
        onClick={onClickPrevArrow}
      />
      {pageNumbers?.map((pageNum, index) => {
        const btnNumber = index + 1 + (slideNum - 1) * limitPageNum;

        if (btnNumber > totalPageNum) return null;
        return (
          <PaginationButton
            key={btnNumber}
            buttonNum={btnNumber}
            onClick={() => setCurrentPage(btnNumber - 1)}
            isActive={currentPage + 1 === btnNumber}
          />
        );
      })}
      <ArrowButton
        isActive={currentPage < totalPageNum - 1}
        direction={'next'}
        onClick={onClickNextArrow}
      />
    </div>
  );
};

export const ArrowButton = ({
  isActive,
  direction,
  onClick,
}: {
  isActive: boolean;
  direction: 'pre' | 'next';
  onClick: () => void;
}) => {
  const style = isActive ? {} : { display: 'none' };

  return (
    <div
      style={{ border: '1px solid green', borderRadius: '30px' }}
      onClick={onClick}
    >
      <Icon src={arrowRightSvg} />
    </div>
  );
};

export const PaginationButton = ({
  buttonNum,
  onClick,
  isActive,
}: {
  buttonNum: number;
  onClick: () => void;
  isActive: boolean;
}) => {
  const style = isActive ? { color: 'red' } : {};
  return (
    <div style={style} onClick={onClick}>
      {buttonNum}
    </div>
  );
};
