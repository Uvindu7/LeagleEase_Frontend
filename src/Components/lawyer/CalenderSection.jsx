import React, { useState } from 'react';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarSection = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Example available times for the selected date
  const availableTimes = [
    "09:00 AM",
    "10:30 AM",
    "01:00 PM",
    "03:00 PM",
    "04:30 PM",
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg h-full transition-transform duration-300 hover:shadow-2xl flex flex-col">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <CalendarDaysIcon className="w-8 h-8 text-[#3e352a]" />
        <h2 className="text-2xl font-semibold text-[#3e352a]">Upcoming Appointments</h2>
      </div>

      {/* React Calendar */}
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        className="react-calendar rounded-xl shadow-md"
      />

      {/* Available Times */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2 text-[#3e352a]">
          Available Times on {selectedDate.toDateString()}
        </h3>
        <ul className="grid grid-cols-3 gap-3">
          {availableTimes.map((time) => (
            <li
              key={time}
              className="bg-[#3e352a] text-white rounded-md px-3 py-1 text-center cursor-pointer hover:bg-[#5a4e41] transition"
            >
              {time}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CalendarSection;
