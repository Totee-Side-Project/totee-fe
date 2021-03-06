import React, { useEffect } from 'react';
import { useState } from 'react';
import { Checkbox } from '@components/atoms';
import './select.scss';
import recentIcon from '../../../assets/recentIcon.svg';
import recentLine from '../../../assets/recentLine.svg';
import {handleSelectValues} from '@utils/handleSelectValue';


interface ISelectPropsType{
    values:any;
    setValues: (e:any)=>void;
    optionData: any;
    variable: any;
    isChecked:any;
    setIsChecked:(e:any)=>void;
    initialData?:any;
}

export const Select=({values, setValues, optionData, variable, isChecked, setIsChecked, initialData}: ISelectPropsType) =>{
  const [showOptions, setShowOptions] = useState(false);
  const keyOfValues = handleSelectValues(variable);

  const handleLabelClick = () => {
    setShowOptions((prev) => !prev);
  };

  const handleOnChangeSelectValue = (e: any) => {
    setValues({
        ...values,
        [keyOfValues]: e.target.getAttribute('value'),
      });
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const copy: any = [...isChecked, e.target.value];
    let result = [...new Set(copy)];
    setIsChecked(result);
  };

  return (
    <div className="box_container" onClick={handleLabelClick}>
      <label className="recent_wrapper">
        <div className="recent_value">
          { (variable === '모집분야'|| values[keyOfValues] == '' )? (
            <span className="value_placeholder">{`${variable} 선택`}</span>
          ) : (
            values[keyOfValues]
          )}
        </div>
        <img src={recentLine} className="recent_line" alt="|" />
        <img src={recentIcon} className="recent_icon" alt=">" />
      </label>
      {showOptions ? (
        <ul className="recent_list">
          {optionData.map((data: any, i: any) => {
            if (variable == '모집분야') {
              return (
                <div className="recent_list_item">
                  <Checkbox
                    handleChange={handleOnChange}
                    label="A"
                    data={data}
                  />
                </div>
              );
            } else {
              return (
                <li
                  className="recent_list_item"
                  key={i}
                  value={data}
                  onClick={handleOnChangeSelectValue}
                >
                  {data}
                </li>
              );
            }
          })}
        </ul>
      ) : null}
    </div>
  );
}

