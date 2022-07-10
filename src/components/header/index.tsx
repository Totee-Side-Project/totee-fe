
import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loginState, UserState } from '@store/index';
import { MainPage } from '@pages/MainPage';
import { Icon } from '@components/atoms';
import { SignInModal, OnboardModal, ToggleIcon } from '@components/common';
import MeIcon from '@assets/me.jpeg';
import logo from '../../assets/toteelogo-kr.png';
import './header.scss';
import DownIcon from '../../assets/toggle-icon.svg';
const Header = () => {
  const [isOpenLoginModal, setIsOpenLoginModal]=useState(false);
  const [isOpenOnboardModal, setIsOpenOnboardModal]=useState(false);
  const [isShowToggle, setIsShowToggle]=useState(false);

  //로그인 state 관리
  const [login,setLogin] = useRecoilState(loginState)
  const [user,setUser] = useRecoilState(UserState)
  console.log(login);
  console.log(user);


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
            <ul>
              <li>
                <button className="createButton">스터디 개설</button>
              </li>
              <li className="line" />
              <li>
                {!login.state
                ?<button className="loginButton" onClick={()=>setIsOpenLoginModal(true)}>로그인</button>
                :
                <>
                <ToggleIcon 
                  imageUrl={MeIcon}
                  style={{width:"65px", height:"65px"}}
                  userInfo={{
                    nickname: user.nickname,
                    email:user.email
                  }}
                  handleLogout={handleLogout}
                  isShowToggle={isShowToggle}
                  onClick={()=>setIsShowToggle(!isShowToggle)}
                  ></ToggleIcon>
                  <img src={DownIcon} className="DownIcon" width={20} height={20} onClick={()=>setIsShowToggle(!isShowToggle)}></img>
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
