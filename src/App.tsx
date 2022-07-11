import Footer from '@components/footer';
import Header from '@components/header';

import './App.css';
import { MainPage, PostsPage } from '@components/pages';
import { useState, useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import LoginOauth from '@components/login/LoginOauth';

import SetUpStudyPage from "@components/pages/setupstudypage/SetUpStudyPage";

import {useGetUserAPI} from "@hooks/useGetQuery";
import { useRecoilState } from "recoil";

import { loginState, UserState } from "@store/index";

function App() {
  const padding = {
    paddingTop: '100px',
  };
  const {data, isFetching, isError} = useGetUserAPI();
  const [login,setLogin] = useRecoilState(loginState)
  
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
