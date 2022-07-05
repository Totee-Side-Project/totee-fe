import Footer from '@components/footer';
import Header from '@components/header';

import './App.css';
import { MainPage, PostsPage } from '@components/pages';
import { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import LoginOauth from '@components/login/LoginOauth';
import { useGetUserAPI } from '@hooks/useGetQuery';

function App() {
  const padding: any = {
    paddingTop: '100px',
  };
  const { data, isFetching, isError } = useGetUserAPI();

  return (
    <>
      <Header />
      <div style={padding} />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/oauth/redirect" element={<LoginOauth />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
