import classes from './label.module.scss';
export const Label = ({ text }: { text: string }) => {
  return (
    <div className={classes.category_label}>
      <span>{text}</span>
    </div>
  );
};
