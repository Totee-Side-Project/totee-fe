import { ReactNode } from 'react';

import { Circle } from '@components/atoms/Circle/Circle';
import classes from './SortButton.module.scss';

interface Props {
  center?: ReactNode;
  isSelected?: boolean;
  onClick?: () => void;
}

export const SortButton = ({ center, isSelected, onClick }: Props) => {
  const classNames = isSelected
    ? [classes.sortButtonContainer, classes.selected]
    : [classes.sortButtonContainer];

  return (
    <li className={classNames.join(' ')} onClick={onClick}>
      <Circle selected={isSelected} />
      {center}
    </li>
  );
};
