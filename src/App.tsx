import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import './App.css';
import {MainPage, PostsPage} from '@components/pages';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/posts" element={<PostsPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
