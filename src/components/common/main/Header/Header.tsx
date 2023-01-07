import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { UserState, loginState } from '@store/index';
import { Icon } from '@components/atoms';
import { OnboardModal, SignInModal } from '@components/common';
import { AlarmIcon } from '@components/common';
import ApplyMentorModal from '@components/common/mentor/Modal/ApplyMentorModal';
import ToteeLogo from '@assets/svg/toteeLogo.svg';
import alarm from '@assets/svg/alarmicon.svg';
import { HeaderUserProfileNav } from './HeaderUserProfileNav';
import { routePaths } from 'App';
import './header.scss';

export const Header = () => {
  //? state
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
  const [isOpenOnboardModal, setIsOpenOnboardModal] = useState(false);
  const [isShowAlarm, setIsShowAlarm] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState<boolean>(false);

  //로그인 state 관리
  const [login, setLogin] = useRecoilState(loginState);
  const [user, setUser] = useRecoilState(UserState);
  let navigate = useNavigate();

  // const handleStudyClick = () => {
  //   if (login.state) {
  //     navigate('/setupstudy');
  //   } else {
  //     setIsOpenLoginModal(true);
  //   }
  // };

  useEffect(() => {
    // 가입되지 않은 유저일 경우 온보딩 모달 띄우기
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
          <Icon
            src={ToteeLogo}
            alt="토티 로고"
            style={{ width: '110px' }}
            onClick={() => navigate('/')}
          />
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
                <Link to={routePaths.createStudy}>
                  <button className="createStudyButton">스터디 개설</button>
                </Link>
              </li>
              <li>
                {login.state && user.roleType != 'totee' && (
                  <button
                    className="createStudyButton"
                    onClick={() => setShowApplyModal(true)}
                  >
                    멘토 지원
                  </button>
                )}
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
      {showApplyModal && (
        <ApplyMentorModal
          isShow={showApplyModal}
          setIsShow={setShowApplyModal}
        />
      )}
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
