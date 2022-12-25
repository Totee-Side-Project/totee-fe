import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import {
  CreateStudyPage,
  EditStudyPage,
  MainPage,
  MyPage,
  NewDetailPage,
  NotMatchPage,
} from 'pages';
import { ScrollTopButton } from '@components/atoms/ScrollTopButton/ScrollTopButton';
import { Banner, Footer, Header } from '@components/common';
import LoginOauth from '@components/common/login/LoginOauth';
import { useGetUserAPI } from '@hooks/query/useGetQuery';
import {
  UserState,
  defaultLoginState,
  defaultUserState,
  loginState,
} from '@store/index';
import studyBanner from '@assets/png/banner/study_banner2.png';
import './App.css';

const isNotLoginRoutes = [
  { path: '/', element: <MainPage /> },
  // { path: '/posts', element: <PostsPage /> },
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
  const { data, status } = useGetUserAPI();

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

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/setupstudy"
          element={
            <img
              src={studyBanner}
              alt="스터디 배너"
              style={{ width: '100%', marginTop: 70 }}
            />
          }
        />
        <Route
          path="/edit/:id"
          element={
            <img
              src={studyBanner}
              alt="스터디 배너"
              style={{ width: '100%', marginTop: 70 }}
            />
          }
        />
        <Route path="*" element={<Banner />} />
      </Routes>
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
      <ScrollTopButton />
      <Footer />
    </>
  );
}

export default App;
