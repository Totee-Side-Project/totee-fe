import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import MainPage from '@components/pages/MainPage';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
