import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Get the token from localStorage

  // If the user is logged in, redirect to the home page (or dashboard)
  if (token) {
    return <Navigate to="/" />; // Redirect to the home page or dashboard
  }

  // If no token, render the children (e.g., login page)
  return children;
};

export default AuthRoute;
