import React, {
  useEffect, useRef, useState, useContext,
} from 'react';
import { useDispatch } from 'react-redux';
import Link from '@mui/material/Link';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { setUserName } from '../store/generalSlice';
import AuthService from '../services/AuthService';
import { AuthContext } from '../context/context';

export default function LoginPage() {
  const { t } = useTranslation();
  const { setIsAuthenticated } = useContext(AuthContext); // eslint-disable-line 
  const inputRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => inputRef.current.focus(), []);

  const [isAuthFailed, setAuthFailed] = useState(false);
  const [isLoggingIn, setLoggingIn] = useState(false);

  const validate = Yup.object().shape({
    username: Yup.string().min(3, t('ErrorUsernameLength')).max(20, t('ErrorUsernameLength')).required(t('ErrorRequired')),
    password: Yup.string().min(3, t('ErrorPasswordLength')).max(20, t('ErrorPasswordLength')).required(t('ErrorRequired')),
  });

  const handleLogin = async ({ username, password }) => {
    try {
      setLoggingIn(true);
      await AuthService.Login(username, password);
      setIsAuthenticated(true);
      dispatch(setUserName(username));
      setAuthFailed(false);
      setLoggingIn(false);

      navigate('/');
    } catch (err) {
      setLoggingIn(false);
      setAuthFailed(true);
    }
  };

  return (

    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={validate}
      onSubmit={handleLogin}
    >
      {(formik) => (

        <Box
          sx={{
            width: '100%',
            minWidth: '300px',
            display: 'flex',
            padding: '20px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Form>
            <Box sx={{
              display: 'flex', flexWrap: 'wrap', maxWidth: 600
            }}
            >
              <h1>{t('loginPageTitle')}</h1>

              <TextField
                id="username"
                inputRef={inputRef}
                label={t('username')}
                variant="outlined"
                onChange={formik.handleChange}
                type="text"
                autoFocus
                error={!!formik.errors.username}
                helperText={formik.errors.username}
                autoComplete="off"
                margin="dense"
                fullWidth
                value={formik.values.username}
              />
              <TextField
                id="password"
                label={t('password')}
                variant="outlined"
                onChange={formik.handleChange}
                type="password"
                autoFocus
                error={!!formik.errors.password}
                helperText={formik.errors.password}
                autoComplete="off"
                margin="dense"
                fullWidth
                value={formik.values.password}
              />

              {isAuthFailed ? <div className="invalid-feedback d-block">{t('ErrorWrongPassword')}</div> : null}

              <Button
                disabled={isLoggingIn}
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
              >
                {isLoggingIn ? t('wait') : t('loginPageSubmit')}
              </Button>
              <Box
                mt={3}
                ml={2}
                sx={{ display: 'flex' }}
              >
                или
                <Link
                  href="/signup"
                  ml={1}
                >
                  зарегистрироваться
                </Link>
              </Box>

            </Box>
          </Form>

        </Box>
      )}

    </Formik>

  );
}
