// src/Components/client/Sidebar.jsx

import React from 'react';
import { Home, Search, Calendar, Bell, Settings, Menu, X } from 'lucide-react';
import profilePhoto from '../../assets/profile.jpg';

const Sidebar = ({ isOpen, onClose, onOpen }) => {
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
        className={`fixed top-0 left-0 h-fixed w-64 bg-[#3e352a] text-white p-6 flex flex-col shadow-lg
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

        {/* Profile Section - Clean, No Background */}
        <div className="flex flex-col items-center mb-10">
          <img
            src={profilePhoto}
            alt="User Profile"
            className="w-24 h-24 rounded-full object-cover mb-3 border-4 border-white shadow-md ring-2 ring-[#4e4234]"
          />
          <h3 className="text-xl font-semibold">Client Name</h3>
          <p className="text-sm text-gray-300">client@example.com</p>
        </div>

        {/* Navigation Menu */}
        <ul className="space-y-5 flex flex-col">
          {[
            { icon: Home, label: 'Dashboard' },
            { icon: Search, label: 'Browse Lawyers' },
            { icon: Calendar, label: 'Appointments' },
            { icon: Bell, label: 'Notifications' },
            { icon: Settings, label: 'Settings' },
          ].map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center space-x-3 cursor-pointer hover:bg-[#4e4234] p-3 rounded-lg transition"
              onClick={onClose} // Close sidebar on mobile when clicking
            >
              <Icon className="w-6 h-6" />
              <span className="text-lg">{label}</span>
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
