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
  PostsPage,
} from 'pages';
import { ScrollTopButton } from '@components/atoms';
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

export const routePaths = {
  main: '/',
  posts: '/posts/*',
  oauth: '/oauth/redirect',
  detail: '/detail',
  detailId: '/detail/:id',
  createStudy: '/createstudy',
  edit: '/editstudy/',
  editId: '/editstudy/:id',
  mypage: '/mypage',
};

export const isNotLoginRoutes = [
  { path: routePaths.main, element: <MainPage /> },
  { path: routePaths.posts, element: <PostsPage /> },
  { path: routePaths.oauth, element: <LoginOauth /> },
  { path: routePaths.detailId, element: <NewDetailPage /> },
];

export const isLoginRoutes = [
  { path: routePaths.createStudy, element: <CreateStudyPage /> },
  { path: routePaths.mypage, element: <MyPage /> },
  { path: routePaths.editId, element: <EditStudyPage /> },
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
          path={routePaths.createStudy}
          element={
            <img
              src={studyBanner}
              alt="스터디 배너"
              style={{ width: '100%', marginTop: 70 }}
            />
          }
        />
        <Route
          path={routePaths.editId}
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
