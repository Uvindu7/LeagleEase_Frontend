import React, { useEffect, useState } from "react";

const QuickOverview = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost/backend/api/get_client_appointments.php")
      .then((res) => res.json())
      .then((data) => {
        setAppointments(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching appointments:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-[95%] md:w-[600px] mx-auto mb-8 p-6 bg-white/90 backdrop-blur-md shadow-xl rounded-2xl border border-gray-200">
      <h2 className="text-2xl font-extrabold text-[#3e352a] mb-6">
        Upcoming Appointments
      </h2>

      {loading ? (
        <div className="text-center text-gray-500 py-10">
          <p className="text-lg">Loading appointments...</p>
        </div>
      ) : appointments.length > 0 ? (
        <ul className="space-y-4">
          {appointments.map((appointment) => (
            <li
              key={appointment.id}
              className="bg-white border p-4 rounded-lg shadow hover:shadow-md transition-all"
            >
              <p className="text-gray-700 text-lg font-semibold">
                {appointment.date} at {appointment.time}
              </p>
              <p className="text-gray-600">{appointment.lawyer}</p>
              <p className="text-gray-500 text-sm">Status: {appointment.status}</p>
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

