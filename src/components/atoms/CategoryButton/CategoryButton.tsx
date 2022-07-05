import React from 'react';
import classes from './categoryButton.module.scss';
import classNames from 'classnames';

interface ICategoryButtonProps {
  type: string;
  isSelected: boolean;
  text?: string;
  img?: any;
  onClick: (e: any) => void;
}

export function CategoryButton({
  type,
  isSelected,
  text,
  img,
  onClick,
}: ICategoryButtonProps) {
  return (
    <div
      onClick={onClick}
      className={classNames(
        classes[type],
        classes.categoryButton,
        isSelected ? classes.selected : '',
      )}
    >
      {img && <div className={classes.img}>{img}</div>}
      {text && <p>{text}</p>}
    </div>
  );
}
