import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

const Profile = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-4">
          <FaUserCircle className=" text-primaryPurple text-7xl" />
        </div>
        <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primaryBlue to-primaryPurple mb-4">Taimoor </h2>
        <p className="text-center text-darkBlue mb-4">Full Stack Web Developer</p>
        <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-md hover:bg-gradient-to-l from-primaryBlue to-primaryPurple transition duration-200">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
