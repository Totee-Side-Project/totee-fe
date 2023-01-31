import { useRecoilState } from 'recoil';
import { loginState } from '@store/login';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSetLocalStroageItem } from '@hooks/useLocalStorage';

function LoginOauth() {
  const [login, setLogin] = useRecoilState(loginState);
  const navigate = useNavigate();
  const token = new URL(window.location.href).searchParams.get('token');

  // token localstorage 저장
  useSetLocalStroageItem('loginData', { state: true, token: token });

  // login token 담길시 새로고침
  // 0min: 새로 고침이 아니라 url만 변경해 주는 것
  useEffect(() => {
    // document.location.href = '/';
    navigate('/');
  }, [login]);

  // Link tag를 반환할 필요가 있는가?
  return null;
  // return <Link to="/">메인으로 이동</Link>;
}

export default LoginOauth;
