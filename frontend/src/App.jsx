import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Profile from './components/profile/Profile';
import Logout from './components/auth/Logout';
import './styles/tailwind.css';
import Register from './components/auth/Register';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/Dashboard';
import AuthRoute from './components/auth/AuthRoute'; // Import AuthRoute

const App = () => {
  return (
    <Router>
      <div>
      <Routes>
          {/* If already logged in, redirect to / */}
          <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
          <Route path="/register" element={<AuthRoute><Register /></AuthRoute>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={<AuthRoute><Dashboard /></AuthRoute>} />
          
          {/* Default Route */}
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
