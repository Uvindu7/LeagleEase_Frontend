import React, { useState } from "react";
import { CheckBadgeIcon, CalendarDaysIcon } from "@heroicons/react/24/solid";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import backgroundImg from "../assets/background.webp";

const lawyerData = {
  name: "Adv. Asha Mehra",
  image: "https://randomuser.me/api/portraits/women/68.jpg",
  specialization: "Criminal Law",
  yearsExperience: 12,
  verified: true,
  availability: [
    { date: "2025-07-21", slots: ["10:00", "14:00", "16:00"] },
    { date: "2025-07-23", slots: ["09:00", "15:00"] },
  ],
  fee: 1500,
};

export default function LawyerProfilePage() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  // Helper: return all unique dates
  const allDates = lawyerData.availability.map((d) => d.date);

  // Find slots for a selected date
  function slotsForDate(date) {
    const entry = lawyerData.availability.find((d) => d.date === date);
    return entry ? entry.slots : [];
  }

  // Toggle slot selection on click
  function handleSlot(date, slot) {
    if (selectedDate === date && selectedSlot === slot) {
      setSelectedDate("");
      setSelectedSlot("");
    } else {
      setSelectedDate(date);
      setSelectedSlot(slot);
    }
  }

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-2 py-6 pt-24">
        <div className="w-full max-w-xl bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 flex flex-col gap-8 relative overflow-auto">
          <div className="flex flex-col items-center">
            <img
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              src={lawyerData.image}
              alt={lawyerData.name}
            />
            <div className="mt-6 text-center w-full">
              <div className="flex items-center justify-center gap-2">
                <h2 className="text-2xl font-bold text-[#6e4e13] drop-shadow">
                  {lawyerData.name}
                </h2>
                {lawyerData.verified && (
                  <CheckBadgeIcon
                    className="w-6 h-6 text-green-500"
                    title="Verified"
                  />
                )}
              </div>
              <div className="text-[#8a7750]">{lawyerData.specialization}</div>
              <div className="text-[#ac9770] text-sm">
                {lawyerData.yearsExperience} years of experience
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center mb-2 text-[#6e4e13]">
              <CalendarDaysIcon className="w-5 h-5 text-gold-500 mr-2" />
              <span className="font-medium">Select a Time Slot:</span>
            </div>
            <div className="flex flex-col gap-2">
              {lawyerData.availability.map((day) => (
                <div key={day.date} className="flex items-center gap-2">
                  <span className="text-[#6e4e13] w-24 font-medium">
                    {day.date}
                  </span>
                  <div className="flex gap-1 flex-wrap">
                    {day.slots.map((slot) => {
                      const isSelected =
                        selectedDate === day.date && selectedSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          className={`px-3 py-1 rounded font-semibold border transition ${
                            isSelected
                              ? "bg-[#a68e56] text-white border-[#a68e56]"
                              : "bg-yellow-100 border-yellow-300 text-[#6e4e13] hover:bg-[#ecd9c0]"
                          }`}
                          onClick={() => handleSlot(day.date, slot)}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <span className="font-medium text-[#6e4e13]">
              Fee per consultation:{" "}
            </span>
            <span className="text-green-700 font-semibold">
              Rs. {lawyerData.fee}
            </span>
          </div>
          <button
            disabled={!selectedSlot}
            className={`w-full py-2 font-semibold rounded transition shadow ${
              selectedSlot
                ? "bg-gradient-to-tr from-[#a68e56] to-[#6e4e13] text-white hover:from-[#6e4e13] hover:to-[#a68e56]"
                : "bg-gray-400 cursor-not-allowed text-gray-200"
            }`}
          >
            Book Appointment
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
