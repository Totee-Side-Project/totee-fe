import { isLoginRoutes } from 'App';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classes from './style.module.scss';
interface Props {
  status: string;
}

// 여기서 라우팅 표에 들어가 있다면 case1, 그렇지 않으면 case2
const NotMatchPage = ({ status }: Props) => {
  const [isNotMatch, setIsNotMatch] = useState(true);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoginRoutes.find(({ path }) => path === pathname))
      setIsNotMatch(false);
  }, []);

  if (status === 'loading') return <Lodaing />;
  // if (status === 'error') return <NotMatch />;

  return (
    <div className={classes.NotMatchContainer}>
      <h1 className={classes.Title}>
        {isNotMatch ? '올바르지 않은 경로입니다.' : '로그인이 필요합니다.'}
      </h1>
      <button className={classes.NavButton} onClick={() => navigate('/')}>
        홈으로
      </button>
    </div>
  );
};

export const Lodaing = () => {
  return (
    <div className={classes.NotMatchContainer}>
      <h1>로딩중 입니다.</h1>
    </div>
  );
};

// export const NotMatch = () => {
//   const navigate = useNavigate();
//   return (
//     <div className={classes.NotMatchContainer}>
//       <h1 className={classes.Title}>올바르지 않은 경로입니다.</h1>
//       <button className={classes.NavButton} onClick={() => navigate('/')}>
//         홈으로
//       </button>
//     </div>
//   );
// };

export default NotMatchPage;
