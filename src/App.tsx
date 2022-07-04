import Footer from '@components/footer';
import Header from '@components/header';

import './App.css';
import { MainPage, PostsPage } from '@components/pages';
import { useState, useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import LoginOauth from '@components/login/LoginOauth';
<<<<<<< HEAD
import SetUpStudyPage from "@components/pages/setupstudypage/SetUpStudyPage";
=======
import {useGetUserAPI} from "@hooks/useGetQuery";
>>>>>>> fea/i6

function App() {
  const padding = {
    paddingTop: '100px',
  };
  const {data, isFetching, isError} = useGetUserAPI();
  
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
