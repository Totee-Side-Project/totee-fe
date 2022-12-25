import React from 'react';
import './footer.scss';
// import logo from '@assets/png/ToteeLogo.png';
import ToteeLogo from '@assets/svg/toteeLogo.svg';
import facebook from '@assets/svg/Facebook.svg';
import twitter from '@assets/svg/Twitter.svg';
import LinkedIn from '@assets/svg/LinkedIn.svg';
import instagram from '@assets/svg/Instagram.svg';
import youtube from '@assets/svg/YouTube.svg';

export const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="footerWrap">
          <div className="footerAbout">
            <div>
              <img src={ToteeLogo} alt="토티 로고" />
            </div>
            <p>스터디와 멘토&멘티를 찾는 가장 쉬운 방법</p>
            <p>토티에서 함께 할 멘토&멘티를 찾아보세요!</p>
            <div className="footerIconWrap">
              <img src={facebook} />
              <img src={twitter} />
              <img src={LinkedIn} />
              <img src={instagram} />
              <img src={youtube} />
            </div>
          </div>
          <div className="footerName">
            <h2>FRONTEND</h2>
            <p
              onClick={() =>
                window.open('https://github.com/LucaRune', '_blank')
              }
            >
              Rulu
            </p>
            <p
              onClick={() =>
                window.open('https://github.com/aeong98', '_blank')
              }
            >
              aeong98
            </p>
            <p
              onClick={() => window.open('https://github.com/ctaaag', '_blank')}
            >
              ctaaag
            </p>
          </div>
          <div className="footerName">
            <h2>BACKEND</h2>
            <p
              onClick={() =>
                window.open('https://github.com/rnjstmdals6', '_blank')
              }
            >
              Marine
            </p>
          </div>
          <div className="footerName">
            <h2>DESIGNER</h2>
            <p
              onClick={() =>
                window.open('https://github.com/haezoo25', '_blank')
              }
            >
              Hazel
            </p>
            <p>Yoon</p>
          </div>
          <div className="footerName">
            <h2>Contacts us</h2>
            <p>rnjstmdals6@gmail.com</p>
          </div>
        </div>
        <div className="footerLine" />
        <div className="lineWrap">
          <div className="lineDownL">
            <p>Copyright © 2022 Totee</p>
            <p>Templates</p>
          </div>
          <div className="lineDownR">
            <p>All Rights Reserved | Terms and Conditions</p>
            <p>| Privacy Policy</p>
          </div>
        </div>
      </div>
    </>
  );
};
