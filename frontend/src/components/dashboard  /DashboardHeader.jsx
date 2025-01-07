import React from 'react'
import { Menu, Transition } from '@headlessui/react'; 
import { Fragment } from 'react';
import { FaUserCircle } from 'react-icons/fa';
function DashboardHeader({username,dropdownOpen, setDropdownOpen, handleLogout }) {
   
  return (
    <header className=" shadow-xl rounded-lg mx-1  py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white my-1 ">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <h1 className="text-xl font-bold font-serif ">✦ Welcome Mr. {username} ✦ </h1>
          <div className="relative flex items-center">
            <h3 className='text-base font-serif mx-3 font-semibold '>{username} </h3>
        
             <FaUserCircle className=" text-white text-5xl cursor-pointer shadow-xl"   onClick={() => setDropdownOpen(!dropdownOpen)} />
            {dropdownOpen && (
              <div className="relative">
                <div className="absolute right-0 mt-6 w-52 bg-white rounded-md shadow-lg px-1">
                  <ul className="py-1">
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 font-medium text-sm text-gray-700 hover:bg-red-600 hover:text-white rounded shadow"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
  )
}

export default DashboardHeader