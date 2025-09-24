// components/CalendarSection.jsx
import React, { useEffect, useState } from "react";
import { CalendarDaysIcon, ClockIcon } from "@heroicons/react/24/outline";

const CalendarSection = () => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost/backend/api/GetAvailability.php", {
      method: "GET",
      credentials: "include", // ✅ allow session cookie to be sent
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("API response:", data);
        if (data.success === "success") {
          setSlots(data.data); // ✅ correct property
        } else {
          setSlots([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching slots:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg h-full border border-gray-100">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <CalendarDaysIcon className="w-9 h-9 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">
          Upcoming Availability
        </h2>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {slots.length > 0 ? (
            slots.map((day, index) => (
              <div key={index} className="flex items-start gap-4">
                {/* Timeline indicator */}
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  {index !== slots.length - 1 && (
                    <div className="w-px flex-1 bg-gray-300"></div>
                  )}
                </div>

                {/* Card */}
                <div className="flex-1 bg-gray-50 rounded-xl p-5 shadow-sm hover:shadow-md transition">
                  {/* Date */}
                  <p className="font-semibold text-gray-900 text-lg">
                    {new Date(day.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>

                  {/* Slots */}
                  {day.slots.length > 0 ? (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {day.slots.map((slot, i) => (
                        <span
                          key={i}
                          className="flex items-center gap-1 px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-200 transition cursor-pointer"
                        >
                          <ClockIcon className="w-4 h-4" />
                          {slot}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 mt-2 italic">
                      No slots available
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 italic">
              No upcoming availability
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarSection;
