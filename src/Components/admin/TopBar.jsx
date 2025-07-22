import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bars3Icon } from '@heroicons/react/24/outline';
import profileImage from '../../assets/adminProfile.jpg'; // Adjust the path as needed

const TopBar = ({ onMenuClick }) => {
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = () => {
    // Optional: clear user session or token here
    navigate('/'); // Navigate to homepage
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md lg:shadow-none border-b border-gray-200">
      
      {/* Hamburger menu for mobile */}
      <button onClick={onMenuClick} className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition">
        <Bars3Icon className="w-8 h-8 text-[#3e352a]" />
      </button>

      {/* Page Title */}
      <h1 className="text-2xl font-extrabold text-[#3e352a] tracking-wide">Admin Dashboard</h1>

      {/* Admin Info and Logout */}
      <div className="flex items-center gap-4">
        {/* Admin Name */}
        <span className="text-gray-700 font-medium hidden md:block">Admin</span>

        {/* Admin Profile Photo */}
        <img
          src={profileImage}
          alt="Admin Profile"
          className="w-10 h-10 rounded-full object-cover border-2 border-[#3e352a] shadow-sm"
        />

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-[#3e352a] text-white px-4 py-2 rounded-full hover:bg-[#4e4234] transition font-medium"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default TopBar;
