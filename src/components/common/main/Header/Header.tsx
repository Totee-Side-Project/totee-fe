// <<<<<<< HEAD
// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useRecoilState } from 'recoil';
// import { UserState, loginState } from '@store/index';
// import { defaultUserState } from '@store/user';
// import { OnboardModal, SignInModal, ToggleIcon } from '@components/common';
// import { AlarmIcon } from '@components/common';
// import Swal from 'sweetalert2';
// import logo from '@assets/png/toteelogo-kr.png';
// import alarm from '@assets/svg/alarmicon.svg';
// =======
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { UserState, loginState } from '@store/index';
import { NewIcon } from '@components/atoms/Icon/NewIcon';
import { OnboardModal, SignInModal } from '@components/common';
import { AlarmIcon } from '@components/common';
import { HeaderUserProfileNav } from './HeaderUserProfileNav';
import logo from '@assets/png/toteelogo-kr.png';
import alarm from '@assets/svg/alarmicon.svg';
// >>>>>>> e00500473b4a552cfed31157c6ae56d1a0c7be86
import './header.scss';

export const Header = () => {
  // const [listening, setListening] = useState(false);
  // const [meventSource, msetEventSource] = useState<any>(undefined);

  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
  const [isOpenOnboardModal, setIsOpenOnboardModal] = useState(false);
  const [isShowAlarm, setIsShowAlarm] = useState(false);
  // const [isShowToggle, setIsShowToggle] = useState(false);

  //로그인 state 관리
  const [login, setLogin] = useRecoilState(loginState);
  const [user, setUser] = useRecoilState(UserState);
  let navigate = useNavigate();

  const handleStudyClick = () => {
    if (login.state) {
      navigate('/setupstudy');
    } else {
      setIsOpenLoginModal(true);
    }
  };

  //로그아웃 버튼
  // const handleLogout = () => {
  //   Swal.fire({
  //     position: 'top-end',
  //     icon: 'success',
  //     title: '로그아웃 완료!',
  //     iconColor: '#f48484',
  //     showConfirmButton: false,
  //     timer: 1100,
  //   });
  //   localStorage.removeItem('loginData');
  //   setLogin({
  //     state: false,
  //     token: '',
  //   });
  //   setUser({ ...defaultUserState });
  // };

  useEffect(() => {
    // 첫방문일 경우 온보딩 모달 띄우기
    if (login.state && user.nickname === null) {
      setIsOpenOnboardModal(true);
    }
  }, [login, user]);

  useEffect(() => {
    let eventSource: any;
    // console.log(user);
    // if(!listening && user && login.state){
    //   eventSource = new EventSource(`https://api.totee.link/subscribe/${user.id}`);
    //   msetEventSource(eventSource);

    //   eventSource.onopen = (event:any) => {
    //     console.log("connection opened", event);
    //   };

    //   eventSource.onmessage = (event:any) => {
    //     console.log("result", event.data);
    //   };

    //   eventSource.onerror = (event:any) => {
    //     console.log(event.target.readyState);
    //     eventSource.close();
    //   };

    //   setListening(true);
    // }

    // return () => {
    //   if (listening && eventSource) {
    //     eventSource.close();
    //   }
    // };

    //구독
  }, [user, login]);

  return (
    <>
      <header className="header">
        <div className="content">
          <NewIcon src={logo} alt="토티 로고" onClick={() => navigate('/')} />
          <div className="buttonWrapper">
            <ul className="profile_wrapper">
              <li>
                {!login.state ? null : (
                  <>
                    <AlarmIcon
                      imageUrl={alarm}
                      isShowAlarm={isShowAlarm}
                      setIsShowAlarm={setIsShowAlarm}
                      onClick={() => setIsShowAlarm(!isShowAlarm)}
                    ></AlarmIcon>
                  </>
                )}
              </li>
              <li>
                <button
                  className="createStudyButton"
                  onClick={handleStudyClick}
                >
                  스터디 개설
                </button>
              </li>
              <li>
                <button
                  className="createStudyButton"
                  onClick={() => navigate('reading')}
                >
                  멘토 지원
                </button>
              </li>
              <li className="line" />
              <li>
                {!login.state ? (
                  <button
                    className="loginButton"
                    onClick={() => setIsOpenLoginModal(true)}
                  >
                    로그인
                  </button>
                ) : (
                  <HeaderUserProfileNav />
                )}
              </li>
            </ul>
          </div>
        </div>
      </header>
      <SignInModal
        isOpen={isOpenLoginModal}
        setIsOpen={setIsOpenLoginModal}
      ></SignInModal>
      <OnboardModal
        isOpen={isOpenOnboardModal}
        setIsOpen={setIsOpenOnboardModal}
      ></OnboardModal>
    </>
  );
};
