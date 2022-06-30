import React from 'react'
import { Button } from '@components/atoms';
import {ReactComponent as KakakoIcon} from '@assets/kakao-logo.svg';
import {ReactComponent as GoogleIcon} from '@assets/google-logo.svg';
import classes from './onboardmodal.module.scss';
import { IModalPropsType } from 'types/modal.types';

export default function SignInModal({step, setStep}:IModalPropsType) {
  return (
    <>
        <h1><span>토티</span> 에 오신 것을 환경합니다.</h1>
        <h2>소셜 아이디로 쉽게 로그인해 보세요!</h2>
        <div className={classes.footer}>
          <Button
            text="구글로 로그인하기"
            style={{
              width: "210px",
              backgroundColor:"#fff",
              border: "2px solid #C9C9C9",
            }}
            icon={<GoogleIcon/>}
            onClick={()=>setStep(step+1)}
          ></Button>
          <Button
            text="카카오로 로그인하기"
            style={{
              width: "210px",
              backgroundColor:"rgba(255, 232, 18, 1)",
            }}
            icon={<KakakoIcon/>}
            onClick={()=>setStep(step+1)}
          ></Button>
        </div>
    </>
  )
}
