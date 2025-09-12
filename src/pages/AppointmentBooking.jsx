import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { loadStripe } from "@stripe/stripe-js";
import backgroundImg from '../assets/browse lawyer bg.jpg';

const stripePromise = loadStripe("pk_test_51RwGmxC0IqUbyDKdGsDp40y18GoXlmNkNtt8vNQROmwMLADljtK6mwHvrJROPxPR79rdFmilC3ZH21uPlYz5chEq00uI6bFx18");

const AppointmentBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Only use the lawyer passed from Browse page
  const lawyer = location.state?.lawyer;

  // Redirect back if no lawyer is selected
  if (!lawyer) {
    navigate("/browse"); // or wherever you want
    return null;
  }

  const [selectedSlot, setSelectedSlot] = useState('');
  const [description, setDescription] = useState('');

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM",
    "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
  ];

  const handleBooking = async () => {
    if (!selectedSlot) {
      alert("Please select a time slot");
      return;
    }

    try {
      const response = await fetch("http://localhost/backend/payment.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slot: selectedSlot,
          description,
          lawyer: lawyer.name,
          price: 5000
        }),
      });

      const session = await response.json();
      if (session.error) {
        alert("Error: " + session.error);
        return;
      }

      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: session.id });

    } catch (error) {
      console.error(error);
      alert("Payment failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

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
              <h2 className="text-2xl font-bold">{lawyer.name}</h2>
              <p className="text-gray-600">{lawyer.specialization}</p>
           </div>
        

          {/* Calendar View */}
          <div className="bg-[#f8e7bde0] backdrop-blur-2xl shadow-md rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4">Select a Time Slot</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {timeSlots.map((slot, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSlot(slot)}
                  className={`px-4 py-2 rounded border transition ${
                    selectedSlot === slot
                      ? 'bg-[#a68e56]  text-white'
                      : 'bg-gray-200 hover:bg-[#e0d4aa]'
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
              className="w-full p-3 border rounded mb-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#b1a886]"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button
              onClick={handleBooking}
              className="bg-[#a68e56] hover:bg-[#b1a886] text-white px-6 py-3 rounded text-lg font-semibold w-full"
            >
              Confirm & Pay
            </button>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AppointmentBooking;


