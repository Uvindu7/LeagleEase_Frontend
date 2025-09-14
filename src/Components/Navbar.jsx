import React, { useState } from "react";
import { UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate(); // React Router hook

  const menuItems = [
    { label: "My Account", path: "/client"},
    { label: "Home", path: "/home" },
    { label: "About", path: "/aboutus" },
    { label: "Features", path: "/features" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#4b4030cc] backdrop-blur-md shadow-lg z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-4 relative">

        {/* Logo */}
        <div className="text-[#f3d999] text-3xl font-extrabold tracking-wide cursor-pointer select-none drop-shadow-lg z-20">
          LegalEase
        </div>

        {/* Central Nav Links */}
        <div className="hidden md:flex flex-1 justify-center">
          <ul className="flex space-x-12 font-semibold text-lg text-[#f3d999cc] select-none">
            {menuItems.map((item) => (
              <li
                key={item.label}
                onClick={() => navigate(item.path)}
                className="hover:text-white cursor-pointer transition"
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-6 z-20">
          {/* Logout Button */}
          <button
            onClick={() => navigate('/')}
            className="bg-[#f3d999] text-[#4b4030] font-semibold px-6 py-2 rounded-full shadow-lg hover:scale-105 transform transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            Logout
          </button>
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden z-30">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="text-[#f3d999] text-3xl focus:outline-none focus:ring-2 focus:ring-[#f3d999] rounded"
          >
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#4b4030cc] backdrop-blur-md shadow-inner py-8 space-y-6 text-center text-lg font-semibold text-[#f3d999cc] rounded-b-lg absolute top-full left-0 w-full z-20">
            {menuItems.map((item) => (
              <div
                key={item.label}
                className="hover:text-white cursor-pointer transition"
                onClick={() => {
                  navigate(item.path);
                  setMenuOpen(false);
                }}
              >
                {item.label}
              </div>
            ))}

            {/* Logout Button for Mobile */}
            <button
              onClick={() => {
                navigate('/');
                setMenuOpen(false);
              }}
              className="w-3/4 mx-auto bg-[#f3d999] text-[#4b4030] font-semibold px-5 py-2 rounded-full shadow-lg hover:scale-105 transform transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
