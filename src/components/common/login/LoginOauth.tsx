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

  useEffect(() => {
    navigate('/');
  }, [login]);

  return null;
}

export default LoginOauth;
