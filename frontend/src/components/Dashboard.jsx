import React, { useEffect, useState } from 'react';
import FileUpload from './FileUpload';
import FileList from './FileList';

import { ToastContainer, toast } from 'react-toastify';
import Star from './Star';
import DashboardHeader from './dashboard  /DashboardHeader';
import { fetchFiles } from '../utils/api'; 

const Dashboard = () => {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [files, setFiles] = useState([]);
  
  
useEffect(() => {
const gettingUserId = localStorage.getItem('userId')
const gettingUsername = localStorage.getItem('username')
const capitalizedUsername = gettingUsername.charAt(0).toUpperCase() + gettingUsername.slice(1);
setUsername(capitalizedUsername);
setUserId(gettingUserId);
toast.success('User Login Successfully!', {
});
},[]);

useEffect(() => {
  const getFiles = async () => {
    const files = await fetchFiles(); 
    setFiles(files);
  };

  getFiles();
}, [userId]);
const refreshFiles = async () => {
  const files = await fetchFiles(); 
  setFiles(files);
};
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
          <h2 className="text-2xl font-semibold mb-4 font-serif"><Star/> Upload File</h2>
          <FileUpload userId={userId} refreshFiles={refreshFiles}/>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 font-serif"><Star/> Uploaded Files</h2>
          <FileList files={files}/>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
