import React from 'react'

interface Props {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  data:any
}

const Checkbox = (props: Props) => {
  return (
    <div>
      <input
        type="checkbox"
        id={props.label}
        checked={false}
        onChange={props.handleChange}
        value={props.data}
      />{props.data}
    </div>
  );
};
export default Checkbox;