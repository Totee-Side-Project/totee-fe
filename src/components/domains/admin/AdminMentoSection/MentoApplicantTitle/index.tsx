import { FunctionComponent } from 'react';
import classes from './index.module.scss';

interface IProps {
  title: string;
}

export const MentoApplicantTitle: FunctionComponent<IProps> = ({ title }) => {
  return <h1 className={classes.pageTitle}>{title}</h1>;
};
