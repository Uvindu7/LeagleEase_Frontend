import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, Calendar, Bell, Settings, Menu, X } from 'lucide-react';
import profilePhoto from '../../assets/profile.jpg';

const Sidebar = ({ isOpen, onClose, onOpen }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost/backend/api/getuser.php", {
          method: "GET",
          credentials: "include", // important for session cookies
        });
        const data = await res.json();
        if (data.success === "success") {
          setUser(data.data);
        } else {
          console.error(data.message);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, []);

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/client' },
    { icon: Search, label: 'Browse Lawyers', path: '/browselawyers' },
    { icon: Calendar, label: 'Appointments', path: '/appointments' },
    { icon: Bell, label: 'Notifications', path: '/clientNotifications' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <>
      {/* Mobile Hamburger Icon */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#3e352a] text-white rounded-md shadow"
        onClick={onOpen}
        aria-label="Open sidebar"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-[1200px] w-64 bg-[#3e352a] text-white p-6 flex flex-col shadow-lg
        transform transition-transform duration-300 ease-in-out z-40
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:block lg:shadow-none`}
      >
        {/* Mobile Close Button */}
        <div className="flex justify-end lg:hidden mb-6">
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-[#4e4234] transition"
            aria-label="Close sidebar"
          >
            <X size={24} />
          </button>
        </div>

        {/* Profile Section */}
        <div className="flex flex-col items-center mb-10">
          <img
            src={profilePhoto}
            alt="User Profile"
            className="w-24 h-24 rounded-full object-cover mb-3 border-4 border-white shadow-md ring-2 ring-[#4e4234]"
          />
          <Link
            to="/settings"
            className="text-xl font-semibold hover:text-gray-300 transition"
            onClick={onClose}
          >
            {user ? user.full_name : "Loading..."}
          </Link>
          <p className="text-sm text-gray-300">
            {user ? user.email : ""}
          </p>
        </div>

        {/* Navigation Menu */}
        <ul className="space-y-5 flex flex-col">
          {menuItems.map(({ icon: Icon, label, path }) => (
            <li key={label}>
              <Link
                to={path}
                className="flex items-center space-x-3 hover:bg-[#4e4234] p-3 rounded-lg transition"
                onClick={onClose}
              >
                <Icon className="w-6 h-6" />
                <span className="text-lg">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Background Overlay on Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        ></div>
      )}
    </>
  );
};

export default Sidebar;
