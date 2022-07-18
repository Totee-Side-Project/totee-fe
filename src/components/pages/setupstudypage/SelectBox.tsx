import React, { useEffect } from 'react';
import { useState } from 'react';
import Checkbox from './CheckBox';
import './selectbox.scss';
import recentIcon from '../../../assets/recentIcon.svg';
import recentLine from '../../../assets/recentLine.svg';

function SelectBox(props: any) {
  const [showOptions, setShowOptions] = useState(false);
  const [recentValue, setRecentValue] = useState('');

  const handleLabelClick = () => {
    setShowOptions((prev) => !prev);
  };

  const handleOnChangeSelectValue = (e: any) => {
    setRecentValue(e.target.getAttribute('value'));
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const copy: any = [...props.isChecked, e.target.value];
    let result = [...new Set(copy)];
    props.setIsChecked(result);
  };

  useEffect(() => {
    if (props.variable == '모집구분') {
      props.setValues({
        ...props.values,
        ['categoryName']: recentValue,
      });
    } else if (props.variable == '모집인원') {
      props.setValues({
        ...props.values,
        ['recruitNum']: recentValue,
      });
    } else if (props.variable == '진행방식') {
      // let OnOrOff: any;
      // recentValue == '온라인' ? (OnOrOff = 'ON') : (OnOrOff = 'OFF');
      props.setValues({
        ...props.values,
        ['onlineOrOffline']: recentValue,
      });
    } else if (props.variable == '진행기간') {
      props.setValues({
        ...props.values,
        ['period']: recentValue,
      });
    } else if (props.variable == '연락방식') {
      props.setValues({
        ...props.values,
        ['contactMethod']: recentValue,
      });
    }
  }, [recentValue]);

  return (
    <div className="box_container" onClick={handleLabelClick}>
      <label className="recent_wrapper">
        <div className="recent_value">
          {recentValue == '' ? (
            <span className="value_placeholder">{`${props.variable} 선택`}</span>
          ) : (
            recentValue
          )}
        </div>
        <img src={recentLine} className="recent_line" alt="|" />
        <img src={recentIcon} className="recent_icon" alt=">" />
      </label>
      {showOptions ? (
        <ul className="recent_list">
          {props.optionData.map((data: any, i: any) => {
            if (props.variable == '모집분야') {
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

export default SelectBox;
