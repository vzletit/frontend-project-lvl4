/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { setUserName } from './store/generalSlice';
import MainPage from './Pages/MainPage';
import LoginPage from './Pages/LoginPage';
import { AuthContext } from './context/context';
import RegistrationPage from './Pages/RegistrationPage';
import NavBar from './components/NavBar';

const theme = createTheme({
  palette: { primary: { main: '#ff3355' } },
});

function App() {
  const dispatch = useDispatch();
  const userNameFromState = useSelector((state) => state.general.userName);
  const user = JSON.parse(localStorage.getItem('user'));

  const [isAuthenticated, setIsAuthenticated] = useState(!!user);

  if (isAuthenticated && userNameFromState === null) { dispatch(setUserName(user.username)); }

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <ThemeProvider theme={theme}>
        <Box sx={{
          display: 'flex', flexDirection: 'column', minHeight: '100vh', minWidth: '360px',
        }}
        >
          <Box sx={{ display: 'flex' }}>
            <NavBar />
          </Box>
          <Box
            sx={{
              display: 'flex', flex: 1, flexDirection: 'row',
            }}
          >
            <Routes>
              <Route exact path="/login" element={<LoginPage />} />
              <Route exact path="/signup" element={<RegistrationPage />} />
              <Route exact path="/" element={isAuthenticated ? <MainPage /> : <LoginPage />} />
              <Route path="*" element={isAuthenticated ? <MainPage /> : <LoginPage />} />
            </Routes>
          </Box>

        </Box>
      </ThemeProvider>
      <ToastContainer autoClose={2000} />

    </AuthContext.Provider>

  );
}

export default App;
