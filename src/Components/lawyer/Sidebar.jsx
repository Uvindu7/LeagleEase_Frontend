import React from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import profileImage from "../../assets/lawyerprofile.jpg";

const Sidebar = ({ isOpen, onClose, onOpen }) => {
  return (
    <>
      {/* Hamburger button - shown only on mobile */}
      <button
        onClick={onOpen}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-md bg-[#3e352a] text-white shadow-md"
        aria-label="Open sidebar"
      >
        <Bars3Icon className="w-8 h-8" />
      </button>

      {/* Sidebar panel */}
      <div
        className={`fixed top-0 left-0 h-fixed w-64 bg-[#3e352a] text-white p-6 flex flex-col shadow-lg transform transition-transform duration-300 ease-in-out z-40
        ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:shadow-none`}
      >
        {/* Close button on mobile */}
        <div className="flex justify-end lg:hidden mb-6">
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-[#4e4234] transition"
            aria-label="Close sidebar"
          >
            <XMarkIcon className="w-8 h-8" />
          </button>
        </div>

        {/* Profile Section */}
        <div className="mb-10 text-center">
          <img
            src={profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto border-4 border-white shadow-md"
          />
          <h2 className="mt-4 text-xl font-semibold">Lawyer Name</h2>
          <p className="text-sm text-gray-300">lawyer@example.com</p>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-3">
          {["Dashboard", "Appointments", "Messages", "Calendar", "Profile", "Logout"].map(
            (item) => (
              <a
                key={item}
                href="#"
                className="p-2 rounded-lg hover:bg-[#4e4234] transition-colors duration-300"
              >
                {item}
              </a>
            )
          )}
        </nav>
      </div>

      {/* Overlay when sidebar is open on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Sidebar;
