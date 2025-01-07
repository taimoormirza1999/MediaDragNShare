import React, { useState } from 'react';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import { useNavigate, Link } from 'react-router-dom'; // Using react-router for navigation
import Star from '../Star';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      toast.error('All fields are required.',{
        draggable: true,
        progress: undefined,
        theme: "light",
       }
       
      );
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5002/auth/register', {
        username,
        email,
        password,
      });
      if (response.data.success) {
        toast.success('Registration completed successfully!', {
            draggable: true,
            progress: undefined,
            theme: "light",
           });
        setTimeout(() => {
          navigate('/login'); // Redirect to login after 2 seconds
        }, 2000);
      } else {
        toast.success(response.data.message || 'Something went wrong.');
        setTimeout(() => {
            navigate('/login'); // Redirect to login after 2 seconds
          }, 2000);
      }
    } catch (error) {
      toast.error('Unable to register. Please try again later.', {
        
            draggable: true,
            progress: undefined,
            theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-3">
        <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text text-transparent bg-gradient-to-r from-primaryBlue to-primaryPurple mb-6">
        <Star/> Create an Account <Star/>
        </h2>
        <form onSubmit={handleRegister} className="space-y-5">
          <div className="flex items-center border border-gray-300 rounded-lg p-3">
            <FaUser className="text-gray-500 mr-3" />
            <input
              type="text"
              placeholder="Username"
              className="w-full outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex items-center border border-gray-300 rounded-lg p-3">
            <FaEnvelope className="text-gray-500 mr-3" />
            <input
              type="email"
              placeholder="Email"
              className="w-full outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex items-center border border-gray-300 rounded-lg p-3">
            <FaLock className="text-gray-500 mr-3" />
            <input
              type="password"
              placeholder="Password"
              className="w-full outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-semibold text-white ${
              loading
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 animate-pulse'
                : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-500 hover:to-indigo-600'
            }`}
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-indigo-600 font-bold hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Register;
