import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

export default function LogoutPage() {
  AuthService.Logout();
  return (
    <Navigate to="/login" />
  );
}
