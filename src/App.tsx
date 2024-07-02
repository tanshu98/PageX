import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/LoginPage/Login';
import Home from './components/HomePage/Home';
// import SignUp from './components/SignUp/SignUpFunctional';
import SignUp from './components/SignUp/SignUp';
import Header from './components/Header/Header';

const App: React.FC = () => {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
