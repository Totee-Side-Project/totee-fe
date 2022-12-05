// import { IResponsePostDetail } from '@components/pages/DetailPage/NewDetailPage';
import classes from './SkillIcons.module.scss';
import icon from '@components/common/svg';
import { NewIcon } from '../Icon/NewIcon';
import EllipsisIcon from '@assets/svg/common/ellipsis.svg';
import { SkillIcon } from './SkillIcon';

export const OverLimitIcons = ({
  list,
  limit,
}: {
  list: string[];
  limit: number;
}) => {
  return (
    <ul className={classes.default_skillIcons_wrap}>
      {list
        .filter((value, index) => index < limit)
        .map((src, index) => (
          <li
            className={classes.default_skillIcons_over_wrap}
            key={src + index}
          >
            <div className={classes.default_skillIcons_over}>
              <NewIcon src={icon[src] || src} alt="skill_icon" />
            </div>
          </li>
        ))}
      <li className={classes.default_skillIcons_ellipsis}>
        <img src={EllipsisIcon} alt="ellipssis_icon" />
      </li>
    </ul>
  );
};

export const UnOverLimitIcons = ({ list }: { list: string[] }) => {
  return (
    <ul className={classes.default_skillIcons_wrap}>
      {list.map((src, index) => (
        <SkillIcon key={src + index} src={src} />
      ))}
    </ul>
  );
};
