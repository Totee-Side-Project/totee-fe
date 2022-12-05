import { loginState } from '@store/login';
import { UserState } from '@store/user';
import { useNavigate } from 'react-router-dom';
import { Resetter, useResetRecoilState } from 'recoil';
import Swal from 'sweetalert2';

export const useLogout = (url: string = '/') => {
  const resetUser = useResetRecoilState(UserState);
  const resetLogin = useResetRecoilState(loginState);
  const navigate = useNavigate();

  const handleLogout = () => {
    fireLogoutSwal();
    localStorage.removeItem('loginData');
    resetRecoilStates([resetUser, resetLogin]);
    navigate(url);
  };

  const fireLogoutSwal = () => {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: '로그아웃 완료!',
      iconColor: '#f48484',
      showConfirmButton: false,
      timer: 1100,
    });
  };

  const resetRecoilStates = (recoilStates: Resetter[]) => {
    recoilStates.forEach((resetFuncion) => resetFuncion());
  };

  return handleLogout;
};
