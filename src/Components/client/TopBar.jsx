import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import profilePhoto from '../../assets/profile.jpg';

const TopBar = ({ onMenuClick }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Optional: You can add session clearing logic here if needed
    navigate('/'); // Redirect to the homepage
  };

  return (
    <header className="w-full backdrop-blur-md bg-[#3e352ad9] shadow-lg border-b border-[#4e4234] sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">

        {/* Hamburger for mobile */}
        <button
          className="lg:hidden text-white p-2 rounded-lg bg-[#4e4234] hover:bg-[#5e4f3f] transition duration-300 shadow"
          onClick={onMenuClick}
        >
          <Menu size={24} />
        </button>

        {/* Logo */}
        <div className="text-white text-3xl font-extrabold tracking-wider cursor-pointer hover:text-gray-300 transition duration-300">
          LegalEase
        </div>

        {/* Profile & Logout */}
        <div className="flex items-center space-x-6">
          {/* Profile Photo */}
          <div className="flex items-center space-x-3 cursor-pointer hover:opacity-90 transition duration-300">
            <img
              src={profilePhoto}
              alt="User Profile"
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md hover:scale-105 transition-transform duration-300"
            />
            <span className="hidden sm:block text-white text-lg font-semibold">Profile</span>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-white text-[#3e352a] px-5 py-2 rounded-full hover:bg-gray-200 transition duration-300 font-medium shadow hover:scale-105"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
