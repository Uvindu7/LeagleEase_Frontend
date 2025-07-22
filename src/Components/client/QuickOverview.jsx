import React from 'react';

const appointments = [
  { id: 1, date: '2025-07-05', time: '10:00 AM', lawyer: 'Mr. Alex Smith' },
  { id: 2, date: '2025-07-10', time: '02:30 PM', lawyer: 'Ms. Sarah Johnson' },
];

const QuickOverview = () => {
  return (
    <div className="w-[95%] md:w-[1000px] mx-auto mb-8 p-6 bg-white/80 backdrop-blur-md shadow-xl rounded-3xl border border-gray-200 hover:shadow-2xl transition-all duration-500">
      <h2 className="text-3xl font-extrabold text-[#3e352a] mb-6 tracking-wide">
        Upcoming Appointments
      </h2>

      {appointments.length > 0 ? (
        <ul className="space-y-6">
          {appointments.map((appointment) => (
            <li
              key={appointment.id}
              className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white hover:bg-gray-100 p-5 rounded-xl shadow-md hover:shadow-lg cursor-pointer transition-all duration-300"
            >
              <div className="mb-3 md:mb-0">
                <p className="text-gray-700 text-lg">
                  Appointment with <span className="font-semibold text-[#3e352a]">{appointment.lawyer}</span>
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {appointment.date} at {appointment.time}
                </p>
              </div>

              <button className="px-6 py-2 bg-gradient-to-r from-[#4b4030] to-[#6d5f4f] text-white rounded-full hover:from-[#3e352a] hover:to-[#5a4e41] hover:scale-105 transition-transform duration-300 shadow-lg">
                View Details
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center text-gray-500 py-10">
          <p className="text-lg">No upcoming appointments</p>
        </div>
      )}
    </div>
  );
};

export default QuickOverview;
