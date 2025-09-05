import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';

const TopBar = ({ onMenuClick }) => {
  const navigate = useNavigate();

  // Navigate only to home
  const goHome = () => {
    navigate('/home'); // Home page
  };

  // Logout logic + redirect
  const handleLogout = () => {
    // Example: Clear session/localStorage/token here
    localStorage.removeItem("authToken"); 
    sessionStorage.clear();

    navigate('/login'); // Redirect to login page after logout
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
        <div 
          className="text-white text-3xl font-extrabold tracking-wider cursor-pointer hover:text-gray-300 transition duration-300"
          onClick={goHome} // Logo also takes you home
        >
          LegalEase
        </div>

        {/* Profile & Logout */}
        <div className="flex items-center space-x-6">
          {/* Home Button */}
          <button
            onClick={goHome}
            className="bg-white text-[#3e352a] px-5 py-2 rounded-full hover:bg-gray-200 transition duration-300 font-medium shadow hover:scale-105"
          >
            Home
          </button>

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

