/* eslint-disable react/jsx-filename-extension */
// import { Navigate } from 'react-router-dom';
import React, {
  useEffect, useRef, useState, useContext
} from 'react';
import {useNavigate} from 'react-router-dom'
import { Formik, Form as LoginForm } from 'formik';
import { Form, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import AuthService from '../services/AuthService';
import Context from '../context/context';


export default function LoginPage() {
  
  const {isAuthenticated, setIsAuthenticated} = useContext(Context);
  const inputRef = useRef();
  const passRef = useRef();
  const navigate = useNavigate();
  
  useEffect(() => inputRef.current.focus(), []);
   
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [isAuthFailed, setAuthFailed] = useState(false);
   const [isLoggingIn, setLoggingIn] = useState(false);

  const validate = Yup.object().shape({
    username: Yup.string().min(3, 'Too short').max(20, 'Too long').required(),
    password: Yup.string().min(3, 'Too short').max(20, 'Too long').required(),
  });

const handleLogin = async ({ username, password }) => {
  try {
  await AuthService.Login(username, password);
  const user = JSON.parse(localStorage.getItem('user'));
  setAuthFailed(false); 
  setIsAuthenticated(true);
  navigate('/');
}
catch (e) {
    console.log('%cLoginPage.jsx line:43 isAuthFailed', 'color: #007acc;', isAuthFailed);
    setAuthFailed(true);
  }

}

  return (

    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={validate}
      onSubmit={handleLogin}
        
    >
      {(formik) => (
        <>
          <h1>Log In</h1>
          <LoginForm>
            <Form.Group>
              <Form.Label htmlFor="username">User name</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.username}
                name="username"
                id="username"
                ref={inputRef}
                required
                isInvalid={formik.errors.username}
              />
              <Form.Control.Feedback type="invalid">{formik.errors.username}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                type="password"
                name="password"
                id="password"
                isInvalid={formik.errors.password}
                ref={passRef}
                required
              />
              <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
            </Form.Group>

            {isAuthFailed ? <div className="invalid-feedback d-block">Invalid Username or Password</div> : null}

            <Button
              disabled={isLoggingIn}
              className="mt-3"
              type="submit"
            >
              {isLoggingIn ? 'Wait...' : 'LogIn'}
            </Button>

          </LoginForm>
        </>
      )}

    </Formik>

  );
}
