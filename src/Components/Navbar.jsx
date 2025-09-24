import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState(null); // "client" or "lawyer"
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setUserRole(role);
  }, []);

  const handleMyAccount = () => {
    if (userRole === "lawyer") {
      navigate("/lawyer");
    } else if (userRole === "client") {
      navigate("/client");
    } else {
      navigate("/login"); // fallback
    }
  };

  const menuItems = [
    { label: "My Account", onClick: handleMyAccount },
    { label: "Home", path: "/home" },
    { label: "About", path: "/aboutus" },
    { label: "Features", path: "/features" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#4b4030cc] backdrop-blur-md shadow-lg z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-4 relative">

        {/* Logo */}
        <div
          className="text-[#f3d999] text-3xl font-extrabold tracking-wide cursor-pointer select-none drop-shadow-lg z-20"
          onClick={() => navigate("/home")}
        >
          LegalEase
        </div>

        {/* Central Nav Links */}
        <div className="hidden md:flex flex-1 justify-center">
          <ul className="flex space-x-12 font-semibold text-lg text-[#f3d999cc] select-none">
            {menuItems.map((item) => (
              <li
                key={item.label}
                onClick={() =>
                  item.path ? navigate(item.path) : item.onClick()
                }
                className="hover:text-white cursor-pointer transition"
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Logout */}
        <div className="hidden md:flex items-center space-x-6 z-20">
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
            className="bg-[#f3d999] text-[#4b4030] font-semibold px-6 py-2 rounded-full shadow-lg hover:scale-105 transform transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Toggle */}
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
                  item.path ? navigate(item.path) : item.onClick();
                  setMenuOpen(false);
                }}
              >
                {item.label}
              </div>
            ))}

            <button
              onClick={() => {
                localStorage.clear();
                navigate("/");
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
