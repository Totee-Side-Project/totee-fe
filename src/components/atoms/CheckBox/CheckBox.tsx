import React from 'react'
import './checkbox.scss';
interface Props {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  data:any
  isChecked:boolean;
}

export const Checkbox = (props: Props) => {
  return (
    <div>
      <label>
        <input
          type="checkbox"
          id={props.label}
          checked={props.isChecked}
          onChange={props.handleChange}
          value={props.data}
          className="checkbox-input"
        />
      <span className="checkbox-label">{props.data}</span>
      </label>
    </div>
  );
};