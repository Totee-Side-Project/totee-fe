import { useRecoilState } from 'recoil';
import { loginState } from '@store/login';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function LoginOauth() {
  const [login, setLogin] = useRecoilState(loginState);
  const navigate = useNavigate();
  const token = new URL(window.location.href).searchParams.get('token');

  // token localstorage 저장
  let obj: any = { state: true, token: token };
  obj = JSON.stringify(obj);

  localStorage.setItem('loginData', obj);

  useEffect(() => {
    navigate('/');
  }, [login]);

  return null;
}

export default LoginOauth;
