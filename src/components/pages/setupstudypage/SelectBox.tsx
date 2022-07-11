import React, { useEffect } from 'react';
import { useState } from 'react';
import Checkbox from "./CheckBox";
import './selectbox.scss';


function SelectBox(props:any) {
  const [showOptions, setShowOptions] = useState(false);
  const [recentValue, setRecentValue] = useState("");

  const handleLabelClick = () => {
    setShowOptions((prev) => !prev);
  };

  const handleOnChangeSelectValue = (e:any) => {
    setRecentValue(e.target.getAttribute('value'));
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const copy:any = [...props.isChecked,e.target.value]
      let result = [...new Set(copy)];
      props.setIsChecked(result)
  };

  useEffect(()=>{
    if(props.variable == "모집구분") {
      props.setValues({
        ...props.values,
        ["categoryName"]:recentValue,
      })
      console.log("5",props.values)
    } 
    
    else if(props.variable == "모집인원") {
      let People
      if(recentValue=="제한없음"){
        People=0
      } else if(recentValue == "1~2명" ) {
        People=2
      } else if(recentValue == "3~5명" ) {
        People=5
      } else if(recentValue == "5명이상" ) {
        People=8
      }
      props.setValues({
        ...props.values,
        ["recruitNum"]:People,
      })
    } 
    
    else if(props.variable == "진행방식") {
      let OnOrOff:any 
      recentValue=="온라인"? OnOrOff="ON" : OnOrOff="OFF"
      props.setValues({
        ...props.values,
        ["onlineOrOffline"]:OnOrOff,
      })
    } 
    
    else if(props.variable == "진행기간") {
      let Period
      if(recentValue=="1개월미만"){
        Period=1
      } else if(recentValue == "1개월~3개월" ) {
        Period=3
      } else if(recentValue == "3개월~6개월" ) {
        Period=6
      } else if(recentValue == "3개월~6개월" ) {
        Period=12
      }
      props.setValues({
        ...props.values,
        ["period"]:Period,
      })
    } 

    else if(props.variable == "연락방식") {
      props.setValues({
        ...props.values,
        ["contactMethod"]:recentValue,
      })
    } 
  },[recentValue])


  return (
    <div className="box_container" onClick={handleLabelClick}>
      <label className="recent_wrapper">
        <div className="recent_value">{recentValue == "" ? <span className="value_placeholder">{`${props.variable} 선택`}</span> : recentValue}</div>
        <div className="recent_line">|</div>
        <div className="recent_icon">〉</div>
      </label>
      {showOptions ? (
        <ul className="recent_list">
          {props.optionData.map((data:any, i:any) => {
            if(props.variable == "모집분야") {
              return (
                <div className="recent_list_item" >
                  <Checkbox handleChange={handleOnChange} label="A" data={data}/>
                </div>
              )
            }
            else {
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
}})}
        </ul>
      ) : null}
    </div>
  );
}

export default SelectBox;
