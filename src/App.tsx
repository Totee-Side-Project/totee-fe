import Footer from '@components/footer';
import Header from '@components/header';

import './App.css';
import { MainPage, PostsPage } from '@components/pages';
import { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import LoginOauth from '@components/login/LoginOauth';

import SetUpStudyPage from "@components/pages/setupstudypage/SetUpStudyPage";

import {useGetUserAPI} from "@hooks/useGetQuery";
import { loginState, UserState } from "@store/index";

function App() {
  const padding: any = {
    paddingTop: '100px',
  };
  const [login, setLogin] = useRecoilState(loginState);

  const { data, isFetching, isError } = useGetUserAPI();

  let loginLocalStorage:any = localStorage.getItem("loginData")
  loginLocalStorage = JSON.parse(loginLocalStorage);

  // 로그인 상태 유지
  useEffect(()=>{
    if(loginLocalStorage === null) {
      return;
    } else {
      setLogin(loginLocalStorage);
    }
  },[])


  return (
    <>
      <Header />
      <div style={padding} />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/oauth/redirect" element={<LoginOauth />} />
        <Route path="/setupstudy" element={<SetUpStudyPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
