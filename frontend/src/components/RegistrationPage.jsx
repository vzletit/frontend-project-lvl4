import React, {
  useEffect, useRef, useState, useContext,
} from 'react';
import Box from '@mui/material/Box';
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
  const { setIsAuthenticated } = useContext(AuthContext);
  const inputRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => inputRef.current.focus(), []);

  const [isAuthFailed, setAuthFailed] = useState(false); // eslint-disable-line
  const [isRegistering, setisRegistering] = useState(false);

  const validate = Yup.object().shape({
    username: Yup.string().min(3, 'Too short').max(20, 'Too long').required(),
    password: Yup.string().min(6, 'Too short').max(20, 'Too long').required(),
    passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
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
      console.log('User exists: ', err);
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
              <h1>Register</h1>

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
              <TextField
                id="passwordConfirm"
                label="Confirm password"
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
              {isAuthFailed ? <div className="invalid-feedback d-block">User Exists</div> : null}

              <Button
                disabled={isRegistering}
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
              >
                {isRegistering ? 'Wait...' : 'SignUp'}
              </Button>
            </Box>
          </Form>
        </Grid>
      )}

    </Formik>

  );
}
