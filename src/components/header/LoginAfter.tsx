import MyPage from '@pages/MyPage/MyPage';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loginState, UserState } from '@store/index';
import Swal from 'sweetalert2';
import toggleimage from '../../assets/dropdown_down.svg';
import './loginafter.scss';

function LoginAfter() {
  let navigate = useNavigate();
  const [login, setLogin] = useRecoilState(loginState);
  const [user, setUser] = useRecoilState(UserState);
  const [view, setView] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('loginData');
    setLogin({
      state: false,
      token: '',
    });
    setUser({
      email: '',
      nickname: '',
      position: '',
      profileImageUrl: '',
      roleType: '',
    });
    document.location.href = '/';
  };

  const handleTogglieClick = () => {
    setView((prev) => !prev);
  };

  const ProfileView = () => {
    return (
      <div className="profile_content">
        <div className="profile_nickname">
          {user.nickname == null ? '미등록' : user.nickname}
        </div>
        <div className="profile_detail">
          {user.roleType == '' ? 'Personal' : user.roleType}
        </div>
        <div className="profile_detail">{user.email}</div>
        {user.roleType == 'admin' ? (
          <>
            <div className="profile_line"></div>
            <div>관리자페이지</div>
          </>
        ) : null}
        <div className="profile_line"></div>
        <div className="profile_button">
          <Link to="/mypage">내 정보 수정</Link>
        </div>
        <div className="profile_line"></div>;
        <div className="profile_button" onClick={handleLogout}>
          로그아웃
        </div>
        ;
      </div>
    );
  };

  return (
    <div className="profile_wrapper">
      <div
        className="header_profile"
        onClick={handleTogglieClick}
        style={{ backgroundImage: `url("${user.profileImageUrl}")` }}
      >
        {/* <img src= {user.profileImageUrl}></img> */}
      </div>
      <div className="toggle_button" onClick={handleTogglieClick}>
        <img src={toggleimage}></img>
      </div>
      {view ? <ProfileView /> : null}
    </div>
  );
}

export default LoginAfter;
