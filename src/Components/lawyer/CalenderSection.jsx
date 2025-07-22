// components/CalendarSection.jsx
// components/CalendarSection.jsx
import React from 'react';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';

const CalendarSection = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg h-full transition-transform duration-300 hover:shadow-2xl">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <CalendarDaysIcon className="w-8 h-8 text-[#3e352a]" />
        <h2 className="text-2xl font-semibold text-[#3e352a]">Upcoming Appointments</h2>
      </div>

      {/* Placeholder for Calendar */}
      <div className="flex flex-col items-center justify-center text-gray-500 bg-gray-100 rounded-xl h-60">
        <p className="text-lg">Calendar Integration Coming Soon</p>
      </div>
    </div>
  );
};

export default CalendarSection;
