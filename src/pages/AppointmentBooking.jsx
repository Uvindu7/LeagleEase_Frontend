import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import backgroundImg from '../assets/browse lawyer bg.jpg';
import gaminiImg from '../assets/lawyers/Gamini Jayasinghe.jpg';

const AppointmentBooking = () => {
  const [selectedSlot, setSelectedSlot] = useState('');
  const [description, setDescription] = useState('');

  const lawyer = {
    name: "Gamini Jayasinghe",
    specialization: "Corporate Law",
    image: gaminiImg,
  };

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM",
    "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
  ];

  const handleBooking = () => {
    if (!selectedSlot) {
      alert("Please select a time slot");
      return;
    }
    alert(`Booking confirmed for ${selectedSlot}\nDescription: ${description}`);
    // Here, you could send booking info to backend
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Background image wrapper */}
      <div
        className="flex flex-1 items-center justify-center bg-gray-100 text-black p-6 mt-14"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="w-full max-w-2xl bg-gradient-to-b from-[#f1e4c3df] via-[#c5a473d3] to-[#6e4d1ee5] backdrop-blur-2xl rounded-lg shadow-lg p-6">
          
          {/* Lawyer Info */}
          <div className="bg-[#f8e7bde0] backdrop-blur-2xl shadow-md rounded-lg p-4 flex items-center gap-6 mb-6">
            <img
              src={lawyer.image}
              alt={lawyer.name}
              className="w-40 h-28 object-cover rounded-md"
            />
            <div>
              <h2 className="text-2xl font-bold">{lawyer.name}</h2>
              <p className="text-gray-600">{lawyer.specialization}</p>
            </div>
          </div>

          {/* Calendar View */}
          <div className="bg-[#f8e7bde0] backdrop-blur-2xl hishadow-md rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4">Select a Time Slot</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {timeSlots.map((slot, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSlot(slot)}
                  className={`px-4 py-2 rounded border transition ${
                    selectedSlot === slot
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 hover:bg-blue-100'
                    
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-[#f8e7bde0] backdrop-blur-2xl shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Booking Details</h3>
            <textarea
              placeholder="Description (optional)"
              className="w-full p-3 border rounded mb-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button
              onClick={handleBooking}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded text-lg font-semibold"
            >
              Confirm Booking
            </button>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AppointmentBooking;
