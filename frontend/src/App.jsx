/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Link } from 'react-router-dom';
import { setUserName } from './store/dataSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './components/MainPage';
import LoginPage from './components/LoginPage';
import NotFoundPage from './components/NotFoundPage';
import LogoutPage from './components/LogoutPage';
import Context from './context/context';

function App() {
  const dispatch = useDispatch();
  const userNameFromState = useSelector((state) => state.data.userName);

  const user = JSON.parse(localStorage.getItem('user'));

  const [isAuthenticated, setIsAuthenticated] = useState(!!user);

  if (isAuthenticated && userNameFromState === null) { dispatch(setUserName(user.username)); }

  return (

    <Context.Provider value={{ isAuthenticated, setIsAuthenticated }}>

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
          <Route exact path="/" element={isAuthenticated ? <MainPage /> : <LoginPage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/logout" element={<LogoutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Context.Provider>

  );
}

export default App;
