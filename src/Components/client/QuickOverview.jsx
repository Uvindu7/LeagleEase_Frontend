import React, { useEffect, useState } from "react";

const QuickOverview = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState(null); // state for selected appointment

  useEffect(() => {
    fetch("http://localhost/project/get_client_appointments.php") // keep same backend
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
    <div className="w-[95%] md:w-[1000px] mx-auto mb-8 p-6 bg-white/80 backdrop-blur-md shadow-xl rounded-3xl border border-gray-200 hover:shadow-2xl transition-all duration-500">
      <h2 className="text-3xl font-extrabold text-[#3e352a] mb-6 tracking-wide">
        Upcoming Appointments
      </h2>

      {loading ? (
        <div className="text-center text-gray-500 py-10">
          <p className="text-lg">Loading appointments...</p>
        </div>
      ) : appointments.length > 0 ? (
        <ul className="space-y-6">
          {appointments.map((appointment) => (
            <li
              key={appointment.id}
              className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white hover:bg-gray-100 p-5 rounded-xl shadow-md hover:shadow-lg cursor-pointer transition-all duration-300"
            >
              <div className="mb-3 md:mb-0">
                <p className="text-gray-700 text-lg">
                  Appointment with{" "}
                  <span className="font-semibold text-[#3e352a]">
                    {appointment.lawyer}
                  </span>
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {appointment.date} at {appointment.time}
                </p>
              </div>

              <button
                onClick={() => setSelectedAppointment(appointment)} // open modal
                className="px-6 py-2 bg-gradient-to-r from-[#4b4030] to-[#6d5f4f] text-white rounded-full hover:from-[#3e352a] hover:to-[#5a4e41] hover:scale-105 transition-transform duration-300 shadow-lg"
              >
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

      {/* Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-[90%] md:w-[600px] relative">
            <button
              onClick={() => setSelectedAppointment(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold text-[#3e352a] mb-4">
              Appointment Details
            </h3>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Lawyer:</span>{" "}
              {selectedAppointment.lawyer}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Date:</span>{" "}
              {selectedAppointment.date}
            </p>
            <p className="text-gray-700 mb-4">
              <span className="font-semibold">Time:</span>{" "}
              {selectedAppointment.time}
            </p>
            {/* If your backend returns more fields, show them here */}
            <p className="text-gray-600">
              <span className="font-semibold">Appointment ID:</span>{" "}
              {selectedAppointment.id}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickOverview;
