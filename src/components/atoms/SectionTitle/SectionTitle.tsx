import { ReactComponent as ChevronIcon } from '@assets/svg/chevron-down.svg';
import classes from './SectionTitle.module.scss';

interface Props {
  title: string;
  sub: string;
  description: string;
  isTotal: boolean;
  onClickTotal?: () => {};
}
export function SectionTitle({
  title,
  sub,
  description,
  isTotal,
  onClickTotal,
}: Props) {
  return (
    <div className={classes.title_wrapper}>
      <div>
        <div className={classes.title_sub}>{sub}</div>
        <h2 className={classes.title_main}>{title}</h2>
        <div className={classes.title_description}>{description}</div>
      </div>
      {isTotal && (
        <div className={classes.total_button_wrapper} onClick={onClickTotal}>
          <div className={classes.button_desc}>전체 보기</div>
          <ChevronIcon />
        </div>
      )}
    </div>
  );
}
