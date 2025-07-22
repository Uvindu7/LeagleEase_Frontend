import React from 'react';
import { Bell } from 'lucide-react';

const Notifications = () => {
  return (
    <div className="w-[95%] md:w-[500px] mx-auto bg-white/80 backdrop-blur-md border border-gray-200 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <div className="flex items-center mb-6">
        <Bell className="w-7 h-7 text-[#3e352a] mr-2" />
        <h2 className="text-2xl font-bold text-[#3e352a]">Notifications</h2>
      </div>

      <ul className="space-y-4">
        <li className="p-4 bg-gray-100 hover:bg-gray-200 rounded-xl cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md">
          <p className="text-gray-700">Your appointment with <span className="font-semibold text-[#3e352a]">Lawyer A</span> has been confirmed.</p>
        </li>
        <li className="p-4 bg-gray-100 hover:bg-gray-200 rounded-xl cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md">
          <p className="text-gray-700">You received a new message from <span className="font-semibold text-[#3e352a]">Lawyer B</span>.</p>
        </li>
      </ul>
    </div>
  );
};

export default Notifications;
