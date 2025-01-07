import React, { useEffect, useState } from 'react';
import FileUpload from './FileUpload';
import FileList from './FileList';

import { ToastContainer, toast } from 'react-toastify';
import Star from './Star';
import DashboardHeader from './dashboard  /DashboardHeader';

const Dashboard = () => {
  const [username, setUsername] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
useEffect(() => {
// alert("dsfs")
const gettingUsername = localStorage.getItem('username')
const capitalizedUsername = gettingUsername.charAt(0).toUpperCase() + gettingUsername.slice(1);
setUsername(capitalizedUsername);
toast.success('User Login Successfully!', {
});
});
  const handleLogout = () => {
    toast.success('User Logout Successfully!', {
       });
 localStorage.removeItem('token');
 localStorage.removeItem('username');
 setTimeout(() => {
   window.location.href = '/login';
 }, 1000);
};

  return (
    <div className="min-h-screen bg-gray-50 ">
<DashboardHeader  
username={username}
dropdownOpen={dropdownOpen} 
        setDropdownOpen={setDropdownOpen} 
        handleLogout={handleLogout}  />
      <main className="container mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 font-serif"><Star/> Upload Your Files</h2>
          <FileUpload />
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 font-serif"><Star/> Your Files</h2>
          <FileList />
        </div>
      </main>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
