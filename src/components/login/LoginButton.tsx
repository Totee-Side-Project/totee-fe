import React, { useState } from 'react';
import { SignInModal } from "@components/common/OnboardModal/SignInModal";
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginState, loginLabelSelector, UserState } from "@store/index";
import { useEffect } from "react";


function LoginButton() {
  const [isModalOpen, setIsModalOpen]=useState(false);

  // 로그인 state 확인
  const loginLabel = useRecoilValue(loginLabelSelector);

  //로그인 state 관리
  const [login,setLogin] = useRecoilState(loginState)
  const [user,setUser] = useRecoilState(UserState)

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
    setUser({
      email: "",
      nickname: null,
      position: null,
      profileImgaeUrl: "",
      roleType:""
    })
  }
  return (
    <div>
      {login.state === true ? <div onClick={handleLogout}>로그아웃</div> : <div className="login_button" onClick={()=>setIsModalOpen(!isModalOpen)}>로그인</div>}
        <SignInModal isOpen={isModalOpen} setIsOpen={setIsModalOpen}/>
      <h2>{loginLabel}</h2>
      <h2>현재 로그인한 사용자 정보 : {user.email}</h2>
    </div>
    
  )
}

export default LoginButton