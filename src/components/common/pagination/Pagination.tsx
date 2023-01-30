import { Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';

import { Icon } from '@components/atoms';
import ARROW_CIRCLE_SVG from '@assets/svg/common/arrowCircle.svg';
import classes from './pagination.module.scss';

const DIRECTIONS = {
  prev: 'prev',
  next: 'next',
} as const;

type DirectionsType = keyof typeof DIRECTIONS;
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
    setCurrentPage((slideNum - 2) * limitPageNum + (limitPageNum - 1));
  };

  const onClickNextArrow = () => {
    if (currentPage >= totalPageNum - 1) return;
    setSlideNum((pre) => pre + 1);
    setCurrentPage(slideNum * limitPageNum);
  };

  const pageNumbers = Array(limitPageNum).fill(null);
  const prevDisabled = slideNum <= 1;
  const nextDisabled = currentPage + limitPageNum >= totalPageNum;
  const isSelected = (btnNumber: number) => currentPage + 1 === btnNumber;
  return (
    <div className={classes.paginationContainer}>
      <ArrowButton
        disabled={prevDisabled}
        direction={DIRECTIONS.prev}
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
            isSelected={isSelected(btnNumber)}
          />
        );
      })}
      <ArrowButton
        disabled={nextDisabled}
        direction={DIRECTIONS.next}
        onClick={onClickNextArrow}
      />
    </div>
  );
};

interface ArrowButtonProps {
  disabled: boolean;
  direction: DirectionsType;
  onClick: () => void;
}

export const ArrowButton = ({
  disabled,
  direction,
  onClick,
}: ArrowButtonProps) => {
  const disabledClassName = disabled ? classes.disabled : '';
  const directionClassName =
    direction === 'next' ? classes.nextArrowButton : classes.prevArrowButton;

  return (
    <div
      className={classNames([disabledClassName, directionClassName])}
      onClick={onClick}
    >
      <Icon src={ARROW_CIRCLE_SVG} />
    </div>
  );
};

interface PaginationButtonProps {
  buttonNum: number;
  onClick: () => void;
  isSelected: boolean;
}

export const PaginationButton = ({
  buttonNum,
  onClick,
  isSelected,
}: PaginationButtonProps) => {
  const defaultClassName = classes.paginationNumberButton;
  const isSelectedClassName = isSelected ? classes.selected : '';
  return (
    <div
      className={classNames([defaultClassName, isSelectedClassName])}
      onClick={onClick}
    >
      {buttonNum}
    </div>
  );
};
