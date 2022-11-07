import { useNavigate } from 'react-router-dom';

export const useCustomNavigate = () => {
  const navigate = useNavigate();

  const navigatePrevious = () => navigate(-1);
  const navigateRoot = () => navigate('/');

  return { navigatePrevious, navigateRoot, navigate };
};
