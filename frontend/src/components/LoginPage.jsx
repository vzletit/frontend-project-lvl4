import React, {
  useEffect, useRef, useState, useContext,
} from 'react';
import { useDispatch } from 'react-redux';
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
  const { setIsAuthenticated } = useContext(AuthContext); // eslint-disable-line 
  const inputRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => inputRef.current.focus(), []);

  const [isAuthFailed, setAuthFailed] = useState(false);
  const [isLoggingIn, setLoggingIn] = useState(false);

  const validate = Yup.object().shape({
    username: Yup.string().min(3, 'Too short').max(20, 'Too long').required(),
    password: Yup.string().min(3, 'Too short').max(20, 'Too long').required(),
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
      console.log('Login failed pochemu-to: ', err);
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
              <h1>Login</h1>

              <TextField
                id="username"
                inputRef={inputRef}
                label="Username"
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
                label="Password"
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

              {isAuthFailed ? <div className="invalid-feedback d-block">Invalid Username or Password</div> : null}

              <Button
                disabled={isLoggingIn}
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
              >
                {isLoggingIn ? 'Wait...' : 'SignUp'}
              </Button>
            </Box>
          </Form>

        </Grid>
      )}

    </Formik>

  );
}
