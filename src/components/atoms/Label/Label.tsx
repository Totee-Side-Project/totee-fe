import classes from './label.module.scss';

export const Label = ({
  text,
  disabled,
}: {
  text: string;
  disabled?: string;
}) => {
  return (
    <div
      className={
        !disabled
          ? classes.category_label
          : [classes.category_label, classes.disabled_label].join(' ')
      }
    >
      <span>{text}</span>
    </div>
  );
};
