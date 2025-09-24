import React, { useState, useEffect } from "react";
import Navbar from '../Components/lawyer/TopBar';

export default function LawyerAppointments() {
  const [availability, setAvailability] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [newSlots, setNewSlots] = useState([{ date: "", slots: [""] }]);
  const [loading, setLoading] = useState(true);

  // Fetch lawyer availability + appointments
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resAvail = await fetch("http://localhost/backend/api/GetAvailability.php", {
          credentials: "include"
        });
        const dataAvail = await resAvail.json();

        const resApps = await fetch("http://localhost/backend/api/get_lawyer_appointments.php", {
          credentials: "include"
        });
        const dataApps = await resApps.json();

        if (dataAvail.success === "success") setAvailability(dataAvail.data);
        if (dataApps.success === "success") setAppointments(dataApps.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Add a slot to a day
  const addSlot = (dayIndex) => {
    const updated = [...newSlots];
    updated[dayIndex].slots.push("");
    setNewSlots(updated);
  };

  // Add new day
  const addDay = () => {
    if (newSlots.length < 5) {
      setNewSlots([...newSlots, { date: "", slots: [""] }]);
    } else {
      alert("Maximum 5 days allowed.");
    }
  };

  // Handle slot/date input change
  const handleInputChange = (dayIndex, slotIndex, value, type) => {
    const updated = [...newSlots];
    if (type === "date") updated[dayIndex].date = value;
    else updated[dayIndex].slots[slotIndex] = value;
    setNewSlots(updated);
  };

  // Save availability
  const saveAvailability = async () => {
    try {
      const res = await fetch("http://localhost/backend/api/save_lawyer_availability.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ availability: newSlots })
      });
      const json = await res.json();
      if (json.success === "success") {
        alert("Availability saved!");
        setAvailability(json.data);
        setNewSlots([{ date: "", slots: [""] }]);
      } else {
        alert(json.message);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save availability");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f2eb]">
      <Navbar />
      <main className="flex-1 px-4 py-6 pt-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-[#6e4e13] mb-6">Lawyer Appointments</h2>

          {/* --- Set Availability --- */}
          <div className="bg-white p-6 rounded-2xl shadow-md mb-8">
            <h3 className="text-xl font-semibold text-[#6e4e13] mb-4">Set Availability (Max 5 Days)</h3>
            {newSlots.map((day, dayIndex) => (
              <div key={dayIndex} className="mb-4 border-b pb-4">
                <input
                  type="date"
                  value={day.date}
                  min={new Date().toISOString().split("T")[0]}
                  className="border rounded px-2 py-1 mb-2"
                  onChange={(e) => handleInputChange(dayIndex, null, e.target.value, "date")}
                />
                <div className="flex flex-wrap gap-2">
                  {day.slots.map((slot, slotIndex) => (
                    <input
                      key={slotIndex}
                      type="time"
                      value={slot}
                      className="border rounded px-2 py-1"
                      onChange={(e) => handleInputChange(dayIndex, slotIndex, e.target.value, "slot")}
                    />
                  ))}
                  <button
                    onClick={() => addSlot(dayIndex)}
                    className="px-3 py-1 bg-yellow-200 rounded"
                  >
                    + Slot
                  </button>
                </div>
              </div>
            ))}
            <div className="flex gap-2">
              {newSlots.length < 5 && (
                <button
                  onClick={addDay}
                  className="px-4 py-2 rounded bg-yellow-300 text-[#6e4e13] font-semibold"
                >
                  + Add Day
                </button>
              )}
              <button
                onClick={saveAvailability}
                className="px-4 py-2 rounded bg-[#6e4e13] text-white font-semibold"
              >
                Save Availability
              </button>
            </div>
          </div>

          {/* --- Show Current Availability --- */}
          <div className="bg-white p-6 rounded-2xl shadow-md mb-8">
            <h3 className="text-xl font-semibold text-[#6e4e13] mb-4">My Availability</h3>
            {loading ? (
              <p>Loading...</p>
            ) : availability.length === 0 ? (
              <p>No availability set.</p>
            ) : (
              availability.map((day) => (
                <div key={day.date} className="mb-2">
                  <p className="font-semibold">{day.date}</p>
                  <div className="flex flex-wrap gap-2">
                    {day.slots.map((s, i) => (
                      <span key={i} className="px-3 py-1 rounded bg-yellow-100 border border-yellow-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* --- Show Upcoming Appointments --- */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold text-[#6e4e13] mb-4">Upcoming Appointments</h3>
            {loading ? (
              <p>Loading...</p>
            ) : appointments.length === 0 ? (
              <p>No appointments yet.</p>
            ) : (
              <div className="flex flex-col gap-4">
                {appointments.map((app) => (
                  <div
                    key={app.appointment_id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <p className="font-semibold">{app.client_name}</p>
                      <p className="text-sm text-gray-600">{app.client_email}</p>
                      <p className="text-sm text-gray-700">
                        Date: {new Date(app.appointment_date).toLocaleString()}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded font-medium ${
                        app.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
