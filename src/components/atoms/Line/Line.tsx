import classes from './line.module.scss';

interface Props {
  className?: string;
  type?: 'row' | 'column' | 'flexItem';
  style?: {
    backgroundColor: string;
    width: number;
    height: number;
  };
}

export const Line = ({ className, type = 'row', style }: Props) => {
  return (
    <div
      // className={className ? className : classes.default_line}
      className={className ? className : classes[type]}
      style={style}
    />
  );
};
