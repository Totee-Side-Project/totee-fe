import { MainPage } from '@pages/MainPage';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/toteelogo-kr.png';
import './header.scss';

const Header = () => {
  let navigate = useNavigate();
  function handleStudyClick() {
    navigate("/setupstudy");
  }
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
                <button className="createButton" onClick={handleStudyClick}>스터디 개설</button>
              </li>
              <li className="line" />
              <li>
                <button className="loginButton">로그인</button>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
