import { ScrollTopButton } from '@components/atoms/ScrollTopButton/ScrollTopButton';
import { Footer, Header } from '@components/common';
import './App.css';
import { MainPage, PostsPage } from '@components/pages';
import {
  // FC,
  // ReactComponentElement,
  // Suspense,
  // createElement,
  // lazy,
  useEffect,
  // useState,
} from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import LoginOauth from '@components/common/login/LoginOauth';
import CreateStudyPage from '@components/pages/CreateStudyPage/CreateStudyPage';
import MyPage from '@pages/MyPage/MyPage';
import { useGetUserAPI } from '@hooks/useGetQuery';
import {
  UserState,
  defaultLoginState,
  defaultUserState,
  loginState,
} from '@store/index';
import { NewDetailPage } from '@components/pages/DetailPage/NewDetailPage';
import { EditStudyPage } from '@components/pages/EditStudyPage/EditStudyPage';
import NotMatchPage from '@components/pages/NotMatchPage';
// import React from 'react';

// const NotMatchPage = React.lazy(() => import('@components/pages/NotMatchPage'));
// const NewDetailPage = React.lazy(
//   () => import('@components/pages/DetailPage/NewDetailPage'),
// );
const isNotLoginRoutes = [
  { path: '/', element: <MainPage /> },
  { path: '/posts', element: <PostsPage /> },
  { path: '/oauth/redirect', element: <LoginOauth /> },
  { path: '/detail/:id', element: <NewDetailPage /> },
];

export const isLoginRoutes = [
  { path: '/setupstudy', element: <CreateStudyPage /> },
  { path: '/mypage', element: <MyPage /> },
  { path: '/edit/:id', element: <EditStudyPage /> },
];

function App() {
  const [login, setLogin] = useRecoilState(loginState);
  const [user, setUser] = useRecoilState(UserState);
  const { data, status, isFetching, isError } = useGetUserAPI();

  // localStorage에서 loginData를 get한다.
  let loginLocalStorage: any = localStorage.getItem('loginData');
  // javascript 객체로 변경해줘야한다.
  loginLocalStorage = JSON.parse(loginLocalStorage);
  useEffect(() => {
    if (data && data.status === 200) {
      setLogin(loginLocalStorage);
      return;
    }
    // 리프레시 토큰 발금
    else {
      setLogin(defaultLoginState);
      setUser(defaultUserState);
    }
  }, [data]);

  // 여기서 로그인이 필요한 페이지 어디인가?
  return (
    <>
      <Header />
      {/* <Suspense
        fallback={
          <div style={{ height: '300px', padding: '100px' }}>loading...</div>
        }
      > */}
      <Routes>
        {isNotLoginRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
        {login.state &&
          isLoginRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}

        <Route path="*" element={<NotMatchPage status={status} />} />
      </Routes>
      {/* </Suspense> */}
      <ScrollTopButton />
      <Footer />
    </>
  );
}

// const RouteComponent = ({ path }: { path: string }) => {
//   console.log(path);
//   const url = `./pages/${path}.tsx`;
//   const [Component, setComponent] = useState<FC | null>(null);
//   useEffect(() => {
//     const Component = lazy(() => import(url));
//     setComponent(Component);
//   }, [path]);

//   console.log(Component);

//   return Component ? (
//     <Suspense>
//       <Component />
//     </Suspense>
//   ) : null;
// };

export default App;
