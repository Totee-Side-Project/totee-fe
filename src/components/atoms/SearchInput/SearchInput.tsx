import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';

import classes from './searchInput.module.scss';

interface InputProps {
  value: string;
  type: string;
  name: string;
  id: string;
  placeholder: string;
  isPreview: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  style?: 'default' | 'search';
  img?: any;
  autoFocus?: boolean;
  autoComplete?: 'off' | 'on';
  setStatus?: (e: any) => void;
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
export function SearchInput({
  style = 'default',
  value,
  label,
  type,
  name,
  id,
  placeholder,
  img,
  autoFocus = true,
  autoComplete = 'off',
  isPreview,
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

  // useEffect(() => {
  //   value.length > 0 ? setInputType('focused') : setInputType('default');
  // }, [value]);

  return (
    <div className={classNames(classes.input_group, classes[style])}>
      <label className={classes.label} htmlFor={name}>
        {label}
      </label>
      <input
        className={classNames(
          classes[inputType],
          isPreview && classes.preview,
          classes.search,
        )}
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        // maxLength={maxlength}
      ></input>
      {img && <p className={classes.img}>{img}</p>}
    </div>
  );
}
