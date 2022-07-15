
import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loginState, UserState } from '@store/index';
import { SignInModal, OnboardModal, ToggleIcon } from '@components/common';
import { Button } from '@components/atoms';
import MeIcon from '@assets/me.jpeg';
import logo from '../../assets/toteelogo-kr.png';
import './header.scss';

const Header = () => {
  const [isOpenLoginModal, setIsOpenLoginModal]=useState(false);
  const [isOpenOnboardModal, setIsOpenOnboardModal]=useState(false);
  const [isShowToggle, setIsShowToggle]=useState(false);

  //로그인 state 관리
  const [login,setLogin] = useRecoilState(loginState)
  const [user,setUser] = useRecoilState(UserState)
  let navigate = useNavigate();


  const handleStudyClick=()=> {
    if(login.state){
      navigate("/setupstudy");
    }
    else{
      setIsOpenLoginModal(true);
    }
  }

  //로그아웃 버튼
  const handleLogout = () => {
    localStorage.removeItem('loginData')
    setLogin({
      state:false,
      token:""
    })
    setUser({
      email: "",
      nickname: "",
      position: "",
      profileImageUrl: "",
      roleType:""
  })}

  useEffect(()=>{
    // 첫방문일 경우 온보딩 모달 띄우기
    if(login.state && user.nickname === null){
      setIsOpenOnboardModal(true);
    }
  },[login,user]);


  return (
    <>
      <header className="header">
        <div className="content">
          <Link to="/">
            <img src={logo} alt="토티 로고" />
          </Link>
          <div className="buttonWrapper">
            <ul className="profile_wrapper">
              <li>
                <button className="createButton" onClick={handleStudyClick}>스터디 개설</button>             
              </li>
              <li className="line" />
              <li>
                {!login.state
                ?<button className="loginButton" onClick={()=>setIsOpenLoginModal(true)}>로그인</button>
                :
                <>
                <ToggleIcon 
                  imageUrl={user.profileImageUrl}
                  style={{width:"65px", height:"65px"}}
                  userInfo={{
                    roleType: user.roleType,
                    nickname: user.nickname,
                    email:user.email
                  }}
                  handleLogout={handleLogout}
                  isShowToggle={isShowToggle}
                  setIsShowToggle={setIsShowToggle}
                  onClick={()=>setIsShowToggle(!isShowToggle)}
                  ></ToggleIcon>
                </>
              }
              </li>        
            </ul>
          </div>
        </div>
      </header>
      <SignInModal isOpen={isOpenLoginModal} setIsOpen={setIsOpenLoginModal}></SignInModal>
      <OnboardModal isOpen={isOpenOnboardModal} setIsOpen={setIsOpenOnboardModal}></OnboardModal>
    </>
  );
};


export default Header;
