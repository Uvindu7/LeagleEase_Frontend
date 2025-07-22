// components/NotificationsSection.jsx
import React from 'react';
import { BellIcon, XCircleIcon, StarIcon } from '@heroicons/react/24/outline';

const notifications = [
  { id: 1, text: 'New appointment scheduled', icon: <BellIcon className="w-6 h-6 text-[#3e352a]" /> },
  { id: 2, text: 'Appointment canceled', icon: <XCircleIcon className="w-6 h-6 text-[#3e352a]" /> },
  { id: 3, text: 'New review received', icon: <StarIcon className="w-6 h-6 text-[#3e352a]" /> },
];

const NotificationsSection = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg h-full transition-transform duration-300 hover:shadow-2xl">
      <h2 className="text-2xl font-semibold text-[#3e352a] mb-6 flex items-center gap-2">
        Notifications
      </h2>

      <ul className="space-y-4">
        {notifications.map((notification) => (
          <li
            key={notification.id}
            className="flex items-center gap-3 p-4 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer transition-colors duration-300"
          >
            {notification.icon}
            <span className="text-gray-700">{notification.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationsSection;
