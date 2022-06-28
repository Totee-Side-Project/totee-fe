import React, {useState} from 'react';
import { Button, Input } from '@components/atoms';
import classes from './onboardmodal.module.scss';
import { IModalPropsType } from 'types/modal.types';

export default function AddProfileModal({step, setStep}:IModalPropsType) {
    const [value, setValue]=useState('');

    const onChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {value}= e.target;
        setValue(value);
    }
  return (
    <>
    <h1><span>토티</span> 에 처음 방문하셨군요?</h1>
    <h2>사용하실 프로필 사진과 닉네임을 입력해주세요</h2>
    <div className={classes.body}>
        <div className={classes.imagePlaceholder}>
            <div className={classes.imageButton}></div>
        </div>
        <div className={classes.flex}>
            <div style={{width:"100%"}}>
                <Input
                    value={value}
                    label="닉네임"
                    type="text"
                    name="nickname"
                    id="nickname"
                    placeholder='최대 5글자'
                    onChange={onChange}
                />
            </div>
            <Button
                text="중복확인"
                style={{
                backgroundColor:"#fff",
                color: "rgba(137, 137, 137, 1)",
                border: "2px solid #C9C9C9",
                }}
            />
        </div>
    </div>
    <div className={classes.footer}>
      <Button
        text="이전으로"
        style={{
          width: "210px",
          backgroundColor:"#fff",
          color: "rgba(137, 137, 137, 1)",
          border: "2px solid #C9C9C9",
        }}
        onClick={()=>setStep(step-1)}
      />
      <Button
        text="다음으로"
        style={{
          width: "210px",
          backgroundColor:"rgba(86, 138, 53, 1)",
          color:"#fff"
        }}
        onClick={()=>setStep(step+1)}
      />
    </div>
</>
  )
}
