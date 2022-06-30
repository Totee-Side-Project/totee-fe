import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import {MainPage, PostsPage} from '@components/pages';
import LoginOauth from "@components/login/LoginOauth";


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/posts" element={<PostsPage/>}/>
        <Route path="/oauth/redirect" element={<LoginOauth/>}/>
      </Routes>
    </Router>
  );
}

export default App;
