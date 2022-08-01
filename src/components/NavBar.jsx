import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import { AuthContext } from '../context/context';

export default function NavBar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext); // eslint-disable-line 

  const handleLogout = () => {
    setIsAuthenticated(false);
    AuthService.Logout();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            HEXLET CHAT
          </Typography>

          <Box sx={{ flexGrow: 0 }}>

            {isAuthenticated ? (
              <Button
                sx={{ my: 2, color: 'white', display: 'block' }}
                onClick={handleLogout}
              >
                {t('navBar.logout')}
              </Button>
            )
              : null}

          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
