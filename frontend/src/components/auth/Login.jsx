import React, { useState } from 'react';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Star from '../Star';

const Login = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !username || !password) {
      toast.error('All fields are required.', {
       
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5002/auth/login', { email, username, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.user.username);
        localStorage.setItem('userId', response.data.user.$id);
        toast.success('Login successful!', {
         
        });
        setTimeout(() => {
          window.location.href = '/'; // Redirect after showing toast
        }, 1000); // Delay for toast notification
      }
    } catch (err) {
      toast.error('Invalid credentials or server error.', {
       
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen  bg-gradient-to-r from-blue-500 to-purple-600 "
      // style={{
      //   backgroundSize: 'cover',
      //   backgroundAttachment: 'fixed',
      //   backgroundPosition: 'center',
      //   backgroundImage:
      //     "url('https://static.wixstatic.com/media/14322a_2a19926c1ad54d1690c1fd04f4b10344~mv2.jpg/v1/fill/w_924,h_3000,al_c,q_90,enc_avif,quality_auto/14322a_2a19926c1ad54d1690c1fd04f4b10344~mv2.jpg')",
      // }}
    >
      <div style={{
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundImage:
          "url('https://static.wixstatic.com/media/14322a_2a19926c1ad54d1690c1fd04f4b10344~mv2.jpg/v1/fill/w_924,h_3000,al_c,q_90,enc_avif,quality_auto/14322a_2a19926c1ad54d1690c1fd04f4b10344~mv2.jpg')",
      }}>

     
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md px-10" >
        <h2 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primaryBlue to-primaryPurple mb-4">
         <Star/> Login  <Star/>
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="flex items-center border border-gray-300 rounded-md p-2">
            <FaEnvelope className="text-gray-500 mr-2" />
            <input
              type="email"
              placeholder="Email"
              className="outline-none w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex items-center border border-gray-300 rounded-md p-2">
            <FaUser className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Username"
              className="outline-none w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex items-center border border-gray-300 rounded-md p-2">
            <FaLock className="text-gray-500 mr-2" />
            <input
              type="password"
              placeholder="Password"
              className="outline-none w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className={`w-full ${
              loading
                ? 'bg-gradient-to-l from-primaryBlue to-primaryPurple'
                : 'bg-gradient-to-l from-primaryBlue to-primaryPurple'
            } text-white p-2 rounded-md transition duration-200 flex justify-center items-center`}
            disabled={loading}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291a7.962 7.962 0 01-2-5.291H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              'Login'
            )}
          </button>
        </form>
         <div className="mt-4 text-center">
                  <p className="text-gray-600">
                    Don't have an account?{' '}
                    <Link
                      to="/register"
                      className="text-indigo-600 font-semibold hover:underline"
                    >
                      Register here
                    </Link>
                  </p>
                </div>
        <ToastContainer />
      </div>
      </div>
    </div>
  );
};

export default Login;
