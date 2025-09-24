import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function ClientAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch(`http://localhost/backend/api/get_client_appointments.php`, {
          credentials: "include" // Send cookies/session
        });
        const data = await res.json();
        if (data.success === "success") {
          setAppointments(data.data);
        } else {
          alert(data.message);
        }
      } catch (e) {
        console.error(e);
        alert("Failed to fetch appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f2eb]">
      <Navbar />
      <main className="flex-1 px-4 py-6 pt-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[#6e4e13] mb-6">My Appointments</h2>
          {loading ? (
            <p>Loading appointments...</p>
          ) : appointments.length === 0 ? (
            <p>No appointments found.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {appointments.map((app) => (
                <div key={app.appointment_id} className="flex items-center bg-white p-4 rounded-2xl shadow-md gap-4">
                  <img
                    src={app.lawyer_profile}
                    alt={app.lawyer_name}
                    className="w-16 h-16 rounded-full border-2 border-gray-200 object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[#6e4e13]">{app.lawyer_name}</h3>
                    <p className="text-sm text-gray-600">{app.specialization}</p>
                    <p className="text-sm text-gray-700">
                      Date: {new Date(app.appointment_date).toLocaleString()}
                    </p>
                    <p className={`font-semibold mt-1 ${app.status === 'confirmed' ? 'text-green-600' : 'text-red-600'}`}>
                      Status: {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-[#6e4e13]">Fee</p>
                    <p className="text-gray-700">Rs. {app.fee}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
