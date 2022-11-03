import classes from './line.module.scss';

interface Props {
  className?: string;
  style?: {
    backgroundColor: string;
    width: number;
    height: number;
  };
}

export const Line = ({ className, style }: Props) => {
  return (
    <div
      className={className ? className : classes.default_line}
      style={style}
    />
  );
};
