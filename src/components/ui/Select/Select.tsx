import { useBoolean } from '@hooks/useBoolean';
import React, { useContext } from 'react';
import { ReactNode, SelectHTMLAttributes } from 'react';
import './select.scss';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label: ReactNode;
  value: any;
  trigger: ReactNode;
  onChange: () => void;
  options: any[];
  children?: ReactNode;
}

const DropDownContext = React.createContext({
  isOpen: false,
  setOpen: () => {},
  setClose: () => {},
  setToggle: () => {},
});
export const Select = ({ label, trigger, value, onChange, options }: Props) => {
  return (
    <DropDown
      label={label}
      value={value}
      trigger={trigger}
      onChange={onChange}
      options={options}
    />
  );
};

const DropDown = (props: Props) => {
  const { value, open, close, toggle } = useBoolean(false);

  return (
    <DropDownContext.Provider
      value={{
        isOpen: value,
        setOpen: open,
        setClose: close,
        setToggle: toggle,
      }}
    >
      <div className="dropdown_wrap">
        {props.label}
        <Trigger trigger={props.trigger} />
        <Menu>
          {props.options.map((option) => (
            <Item key={option}>{option}</Item>
          ))}
        </Menu>
      </div>
    </DropDownContext.Provider>
  );
};

const Trigger = ({ trigger }: { trigger: ReactNode }) => {
  const { setToggle } = useContext(DropDownContext);
  return <div onClick={setToggle}>{trigger}</div>;
};

const Menu = ({ children }: { children: ReactNode }) => {
  const { isOpen, setClose } = useContext(DropDownContext);
  return (
    <ul className="recent_list" onClick={setClose}>
      {isOpen ? children : null}
    </ul>
  );
};

const Item = ({ children }: { children: ReactNode }) => {
  return <li className="recent_list_item">{children}</li>;
};
