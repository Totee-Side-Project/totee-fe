import { ChangeEventHandler, forwardRef } from 'react';
import { Circle } from '@components/atoms/Circle/Circle';
import classes from './index.module.scss';

interface CheckboxProps {
  label: string;
  isChecked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const { label, isChecked, onChange } = props;

  return (
    <div className={classes.container}>
      <label>
        <input
          type="checkbox"
          onChange={onChange}
          ref={ref}
          value={String(isChecked)}
          hidden
        />
        <Circle
          selected={isChecked}
          backgroundColor="#7BA364"
          style={{ marginRight: 0, marginBottom: '12px' }}
        />
        {label}
      </label>
    </div>
  );
});

export default Checkbox;
