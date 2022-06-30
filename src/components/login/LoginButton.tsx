import React, { useState } from 'react';
import { LoginModal } from "@components/login/LoginModal";
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginState, loginLabelSelector, modalState } from "@store/login";
import { useEffect } from "react";


function LoginButton() {

  // 로그인 state 확인
  const loginLabel = useRecoilValue(loginLabelSelector);

  // 로그인 modal 관리
  const [modal, setModal]= useRecoilState(modalState);
  const handlerLoginModal = () => {
    setModal((prev:any)=>!prev)
  }

  //로그인 state 관리
  const [login,setLogin] = useRecoilState(loginState)
  let loginLocalStorage:any = localStorage.getItem("loginData")
  loginLocalStorage = JSON.parse(loginLocalStorage);


// 로그인 상태 유지
  useEffect(()=>{
    if(loginLocalStorage === null) {
      return;
    } else {
      setLogin(loginLocalStorage);
    }
  },[])

  //로그아웃 버튼
  const handleLogout = () => {
    localStorage.removeItem('loginData')
    setLogin({
      state:false,
      token:""
    })
  }
  return (
    <div>
      {login.state === true ? <div onClick={handleLogout}>로그아웃</div> : <div className="login_button" onClick={handlerLoginModal}>로그인</div>}
      {modal === true ? <LoginModal/> : null}
      <h2>{loginLabel}</h2>
    </div>
    
  )
}

export default LoginButton