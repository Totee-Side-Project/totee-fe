import { useRecoilState } from 'recoil';
import { loginState } from '@store/login';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function LoginOauth() {
  const [login, setLogin] = useRecoilState(loginState);
  const navigate = useNavigate();

  //token 받기
  const token = new URL(window.location.href).searchParams.get('token');

  // token localstorage 저장
  let obj: any = { state: true, token: token };
  obj = JSON.stringify(obj);

  localStorage.setItem('loginData', obj);

  //login token 담길시 새로고침
  useEffect(() => {
    document.location.href = '/';
  }, [login]);

  return (
    // <div></div>
    <Link to="/">메인으로 이동</Link>
  );
}

export default LoginOauth;
