import icon from '@components/common/svg';
// import { IResponsePostDetail } from '@components/pages/DetailPage/NewDetailPage';
import classes from './SkillIcon.module.scss';
interface Props {
  src: string;
}
export const SkillIcon = ({ src }: Props) => {
  return (
    <li className={classes.default}>
      <img src={icon[src] || src} alt="icon" />
    </li>
  );
};
