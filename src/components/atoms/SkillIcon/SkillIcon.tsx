import icon from '@components/atoms/svg';
import classes from './SkillIcon.module.scss';
interface Props {
  className?: string;
  alt?: string;
  src: string;
}
export const SkillIcon = ({ className, src, alt }: Props) => {
  return (
    <li className={[classes.default, className].join(' ')}>
      <img src={icon[src] || src} alt={!alt ? 'icon' : alt} />
    </li>
  );
};
