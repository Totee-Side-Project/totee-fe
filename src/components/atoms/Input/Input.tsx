import React, { useCallback, useEffect, useState } from 'react';
import classes from './input.module.scss';
import classNames from 'classnames';

interface InputProps {
  style?: string;
  value: string;
  label?: string;
  type: string;
  name: string;
  id: string;
  placeholder: string;
  img?: any;
  autoFocus?: boolean;
  setStatus?: (e: any) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // maxlength: string | any;
}

/**
 *
 * @param value : input 값
 * @param label : input 라벨
 * @param type : input 종류 default | active | focused
 * @param name : input name
 * @param id : input id
 * @param placeholder : input placeholder
 * @param onChange : onChange 콜백 함수
 * @returns
 */
export function Input({
  style = 'default',
  value,
  label,
  type,
  name,
  id,
  placeholder,
  img,
  autoFocus = true,
  onChange,
  setStatus,
}: // maxlength,
InputProps) {
  const [inputType, setInputType] = useState('default');

  useEffect(() => {
    if (setStatus) {
      setStatus(inputType);
    }
  }, [inputType]);

  const handleFocus = useCallback(() => {
    setInputType('focused');
  }, [inputType]);

  const handleBlur = useCallback(() => {
    if (value.length == 0) {
      setInputType('default');
    } else {
      setInputType('active');
    }
  }, [value, inputType]);

  useEffect(() => {
    value.length > 0 ? setInputType('focused') : setInputType('default');
  }, [value]);

  return (
    <div className={classNames(classes.input_group, classes[style])}>
      <label className={classes.label} htmlFor={name}>
        {label}
      </label>
      <input
        autoFocus={autoFocus}
        className={classNames(classes[inputType], 'border')}
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        onFocus={() => handleFocus()}
        onBlur={() => handleBlur()}
        value={value}
        // maxLength={maxlength}
      ></input>
      {img && (
        <>
          <p className={classes.img}>{img}</p>
        </>
      )}
    </div>
  );
}
