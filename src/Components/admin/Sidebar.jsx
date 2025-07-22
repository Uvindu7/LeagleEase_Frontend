import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import profileImage from '../../assets/adminProfile.jpg'; // Adjust the path if needed

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  // Define the sidebar navigation links and their paths
  const links = [
    { label: 'Dashboard', path: '/admin' },
    { label: 'Lawyers', path: '/admin/lawyer' },
    { label: 'Clients', path: '/admin/client' },
    { label: 'Bookings', path: '/admin/bookings' },
    { label: 'Payments', path: '/admin/payments' },
    { label: 'Reports', path: '/admin/reports' },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-fixed w-64 bg-[#3e352a] text-white p-6 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out z-50 lg:relative lg:translate-x-0 lg:w-64 lg:z-0 flex flex-col`}
    >
      {/* Mobile Close Button */}
      <div className="flex justify-between items-center lg:hidden mb-6">
        <h2 className="text-2xl font-extrabold tracking-wide">Admin Panel</h2>
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-white text-[#3e352a] hover:bg-gray-300 transition"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Admin Profile */}
      <div className="flex flex-col items-center mb-8">
        <img
          src={profileImage}
          alt="Admin Profile"
          className="w-24 h-24 rounded-full object-cover mb-3 border-4 border-white shadow-lg"
        />
        <h3 className="text-lg font-semibold">Admin Name</h3>
        <p className="text-sm text-gray-300">admin@example.com</p>
      </div>

      {/* Sidebar Navigation */}
      <nav className="flex flex-col gap-3">
        {links.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            onClick={onClose}
            className={`p-3 rounded-xl hover:bg-[#504534] transition text-lg font-medium hover:text-white ${
              location.pathname === item.path ? 'bg-[#504534]' : ''
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
