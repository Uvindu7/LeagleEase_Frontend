import React from 'react';
import { useNavigate } from 'react-router-dom';
import profileImage from '../../assets/lawyerprofile.jpg';

const TopBar = () => {
  const navigate = useNavigate();

  // Navigate only to home
  const goHome = () => {
    navigate('/home'); // Home page
  };

  const handleLogout = () => {
    // Optional: Clear session or token here
    navigate('/'); // Redirect to homepage
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md border-b border-gray-200">
      {/* Title */}
      <h1 className="text-2xl font-bold text-[#3e352a]">Lawyer Dashboard</h1>

      {/* Right Side: Notifications, Profile, Logout */}
      <div className="flex items-center gap-6">
        {/* Notification Button */}
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition duration-300">
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-[#3e352a]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a3 3 0 11-6 0h6z"
            />
          </svg>
        </button>

        <button
          onClick={goHome}
          className="bg-[#3e352a] text-white px-5 py-2 rounded-full hover:bg-[#4e4234] transition font-medium shadow"
        >
          Home
        </button>
        

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-[#3e352a] text-white px-5 py-2 rounded-full hover:bg-[#4e4234] transition font-medium shadow"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default TopBar;
