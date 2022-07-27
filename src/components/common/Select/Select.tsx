import React, { useEffect } from 'react';
import { useState } from 'react';
import { Checkbox } from '@components/atoms';
import './select.scss';
import recentIcon from '../../../assets/recentIcon.svg';
import recentLine from '../../../assets/recentLine.svg';
import {handleSelectValues, checkingDetailPeriod} from '@utils/handleSelectValue';



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

  const selectedValue = variable === '진행기간' && ['VeryShortTerm', 'ShortTerm', 'MidTerm', 'LongTerm'].includes(values[keyOfValues]) ?
  checkingDetailPeriod(values[keyOfValues]) : values[keyOfValues]


  return (
    <div className="box_container" onClick={handleLabelClick}>
      <label className="recent_wrapper">
        <div className="recent_value">
          { (variable === '모집분야'|| values[keyOfValues] == '' )? (
            <span className="value_placeholder">{`${variable} 선택`}</span>
          ) : <span>{selectedValue}</span>
          }
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
                    isChecked={isChecked.includes(data)}
                  />
                </div>
              );
            } else {
              return (
                <li
                  className={selectedValue === data? "recent_list_item_selected" :"recent_list_item"}
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

