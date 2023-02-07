import classes from './index.module.scss';

interface IProps {
  guideMessage: string;
}

export const AdminGuideMessage = ({ guideMessage }: IProps) => {
  return <div className={classes.guideMessage}>{guideMessage}</div>;
};
