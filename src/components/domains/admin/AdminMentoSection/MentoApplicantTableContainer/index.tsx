import type { FunctionComponent, ReactNode } from 'react';
import classes from './index.module.scss';

interface IProps {
  children: ReactNode;
}

export const MentoApplicantTableContainer: FunctionComponent<IProps> = ({
  children,
}) => {
  return <div className={classes.tableContainer}>{children}</div>;
};
