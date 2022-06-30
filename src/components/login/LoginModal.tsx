import { useRecoilState, useRecoilValue } from 'recoil';
import { loginState, loginLabelSelector, modalState } from "../../store/login";
import {KAKAO_AUTH_URL, GOOGLE_AUTH_URL} from '../../api/api';
import "./LoginModalStyle.scss"
import GoogleLogo from '../../images/googleLogo.svg';
import KakaoLogo from '../../images/kakaoLogo.svg';


export function LoginModal() {
  const [login, setLogin]= useRecoilState(loginState);

  // 로그인 modal 관리
  const [modal, setModal]= useRecoilState(modalState);
  const handlerLoginModal = () => {
    setModal((prev:any)=>!prev)
  }

   return (
    <div className="modal_background">
      <div className="modal_container">
          <div className="modal_cancel_container">
            <button className="modal_cancel_button" onClick={handlerLoginModal}>X</button>
          </div>
          <div className="modal_title">토티에 오신 것을 환영합니다!</div>
          <div className="modal_subtitle">소셜로그인으로 편하게 로그인하세요</div>
          <div className="login_container">
            <a className="google_button_container" href={GOOGLE_AUTH_URL}>
              <img src={GoogleLogo} />
              <span>구글로그인</span>
            </a>
            <a className="kakao_button_container" href={KAKAO_AUTH_URL}>
              <img src={KakaoLogo} />
              <span>카카오로그인</span>
            </a>       
          </div>
      </div>
    </div>
  );
}