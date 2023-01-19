import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import classes from './searchInput.module.scss';

interface IInputProps {
  value: string;
  type: string;
  name: string;
  id: string;
  placeholder: string;
  isPreview: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
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
  onFocus,
  setStatus,
}: // maxlength,
IInputProps) {
  const [inputType, setInputType] = useState('default');

  useEffect(() => {
    if (setStatus) {
      setStatus(inputType);
    }
  }, [inputType]);

  return (
    <div className={classNames(classes.input_group, classes[style])}>
      <label className={classes.label} htmlFor={name}>
        {label}
      </label>
      <input
        className={classNames(
          classes[inputType],
          // TODO: 추천검색어 기능을 추가할 시 주석제거
          // isPreview && classes.preview,
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
        onFocus={onFocus}
        // maxLength={maxlength}
      ></input>
      {img && <p className={classes.img}>{img}</p>}
    </div>
  );
}
