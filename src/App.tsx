import Footer from '@components/footer';
import Header from '@components/header';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import { MainPage, PostsPage } from '@components/pages';

function App() {
  const padding = {
    paddingTop: '100px',
  };
  return (
    <>
      <Header />
      <div style={padding} />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/posts" element={<PostsPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
