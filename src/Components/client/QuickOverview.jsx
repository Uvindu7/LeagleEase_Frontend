import React, { useEffect, useState } from "react";

const QuickOverview = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost/backend/api/get_client_appointments.php", {
      credentials: "include", // send session cookie
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data.success === "success") {
          // Only keep future appointments
          const now = new Date();
          const upcoming = data.data.filter(
            (app) => new Date(app.appointment_date) >= now
          );
          // Show only the next 3 appointments
          setAppointments(upcoming.slice(0, 3));
        } else {
          console.warn("Error from API:", data.message);
          setAppointments([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching appointments:", err);
        setAppointments([]);
      })
      .finally(() => setLoading(false));
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
              key={appointment.appointment_id}
              className="bg-white border p-4 rounded-lg shadow hover:shadow-md transition-all flex items-center gap-4"
            >
              <img
                src={appointment.lawyer_profile}
                alt={appointment.lawyer_name}
                className="w-12 h-12 rounded-full border object-cover"
              />
              <div className="flex-1">
                <p className="text-gray-700 text-lg font-semibold">
                  {appointment.lawyer_name}
                </p>
                <p className="text-gray-600 text-sm">
                  {appointment.specialization}
                </p>
                <p className="text-gray-500 text-sm">
                  {new Date(appointment.appointment_date).toLocaleString()}
                </p>
                <p
                  className={`text-sm font-semibold ${
                    appointment.status === "confirmed"
                      ? "text-green-600"
                      : appointment.status === "canceled"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  Status:{" "}
                  {appointment.status.charAt(0).toUpperCase() +
                    appointment.status.slice(1)}
                </p>
              </div>
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
