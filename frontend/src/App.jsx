import React, { useState, useContext } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {Routes, Route,Link, } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import LogoutPage from './pages/LogoutPage';
import Context from './context/context.js';

function App() {

  const user = JSON.parse(localStorage.getItem('user'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);
  
  console.log('IsAuth: ', isAuthenticated)

  return (
<Context.Provider value={{isAuthenticated, setIsAuthenticated}}>

      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
        <hr />
        <Routes>
          <Route exact path="/" element={ isAuthenticated ? <MainPage /> : <LoginPage/>} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/logout" element={<LogoutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Context.Provider>

  );
}

export default App;
