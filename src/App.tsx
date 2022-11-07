import { ScrollTopButton } from '@components/atoms/ScrollTopButton/ScrollTopButton';
import { Footer, Header } from '@components/common';
import './App.css';
import { MainPage, PostsPage } from '@components/pages';
import { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import LoginOauth from '@components/common/login/LoginOauth';

import CreateStudyPage from '@components/pages/CreateStudyPage/CreateStudyPage';
import DetailPage from '@components/pages/DetailPage/DetailPage';
import EditPage from '@components/pages/EditPage/EditPage';
import MyPage from '@pages/MyPage/MyPage';

import { useGetUserAPI } from '@hooks/useGetQuery';
import {
  UserState,
  defaultLoginState,
  defaultUserState,
  loginState,
} from '@store/index';
import { NewDetailPage } from '@components/pages/DetailPage/NewDetailPage';

function App() {
  // const padding: any = {
  //   paddingTop: '100px',
  // };
  const [login, setLogin] = useRecoilState(loginState);
  const [user, setUser] = useRecoilState(UserState);

  const { data, isFetching, isError } = useGetUserAPI();

  let loginLocalStorage: any = localStorage.getItem('loginData');
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
      {/* <div style={padding} /> */}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/oauth/redirect" element={<LoginOauth />} />
        <Route path="/setupstudy" element={<CreateStudyPage />} />
        <Route path="/detail/:id" element={<NewDetailPage />} />
        <Route path="/edit/:id" element={<EditPage />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
      <ScrollTopButton />
      <Footer />
    </>
  );
}

export default App;
