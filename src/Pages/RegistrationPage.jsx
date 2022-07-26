import React, {
  useEffect, useRef, useState, useContext,
} from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { setUserName } from '../store/generalSlice';
import AuthService from '../services/AuthService';
import { AuthContext } from '../context/context';

export default function RegistrationPage() {
  const { t } = useTranslation();
  const { setIsAuthenticated } = useContext(AuthContext);
  const inputRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => inputRef.current.focus(), []);

  const [isAuthFailed, setAuthFailed] = useState(false); // eslint-disable-line
  const [isRegistering, setisRegistering] = useState(false);

  const validate = Yup.object().shape({
    username: Yup.string().min(3, t('ErrorUsernameLength')).max(20, t('ErrorUsernameLength')).required(t('ErrorRequired')),
    password: Yup.string().min(6, t('ErrorPasswordLength')).max(20, t('ErrorPasswordLength')).required(t('ErrorRequired')),
    passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], t('ErrorPasswordsNotSame')).required(t('ErrorRequired')),
  });

  const handleSignUp = async ({ username, password }) => {
    try {
      setisRegistering(true);
      await AuthService.Signup(username, password);
      setIsAuthenticated(true);
      dispatch(setUserName(username));
      setAuthFailed(false);
      setisRegistering(false);

      navigate('/');
    } catch (err) {
      setAuthFailed(true);
      setisRegistering(false);
    }
  };

  return (

    <Formik
      initialValues={{ username: '', password: '', passwordConfirm: '' }}
      validationSchema={validate}
      onSubmit={handleSignUp}
    >
      {(formik) => (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: '100vh' }}
        >

          <Form>
            <Box sx={{
              display: 'flex', flexWrap: 'wrap', maxWidth: 600,
            }}
            >
              <h1>{t('signUpPageTitle')}</h1>

              <TextField
                id="username"
                inputRef={inputRef}
                label={t('usernameReg')}
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
              <TextField
                id="passwordConfirm"
                label={t('passwordConfirm')}
                variant="outlined"
                onChange={formik.handleChange}
                type="password"
                autoFocus
                error={!!formik.errors.passwordConfirm}
                helperText={formik.errors.passwordConfirm}
                autoComplete="off"
                margin="dense"
                fullWidth
                value={formik.values.passwordConfirm}
              />
              {isAuthFailed ? <div className="invalid-feedback d-block">{t('ErrorUserExists')}</div> : null}

              <Button
                disabled={isRegistering}
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
              >
                {isRegistering ? t('wait') : t('signUpPageSubmit')}
              </Button>
              <Box
                mt={3}
                ml={2}
                sx={{ display: 'flex' }}
              >
                или
                <Link
                  href="/login"
                  ml={1}
                >
                  войти
                </Link>
              </Box>

            </Box>
          </Form>
        </Grid>
      )}

    </Formik>

  );
}
