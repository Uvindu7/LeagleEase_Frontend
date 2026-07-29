import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { CheckBadgeIcon, CalendarDaysIcon, StarIcon } from "@heroicons/react/24/solid";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import defaultLawyerImg from "../assets/lawyerprofile.jpg";

const stripePromise = loadStripe("pk_test_51RwGmxC0IqUbyDKdGsDp40y18GoXlmNkNtt8vNQROmwMLADljtK6mwHvrJROPxPR79rdFmilC3ZH21uPlYz5chEq00uI6bFx18");

export default function AppointmentBooking() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const client_id = 1; // Replace with logged-in user ID

  // 1️⃣ Get lawyer from state, localStorage, or query params
  let lawyer = location.state?.lawyer;
  if (!lawyer) {
    const storedLawyer = localStorage.getItem("bookingLawyer");
    if (storedLawyer) {
      lawyer = JSON.parse(storedLawyer);
    } else {
      const lawyerId = searchParams.get("lawyer_id");
      const lawyerName = searchParams.get("lawyer_name");
      if (lawyerId && lawyerName) {
        lawyer = { id: parseInt(lawyerId), name: lawyerName, fee: 5000 };
      }
    }
  }

  // Redirect if no lawyer info
  useEffect(() => {
    if (!lawyer || !lawyer.id) navigate("/browselawyers");
  }, [lawyer, navigate]);

  const price = lawyer?.fee ? lawyer.fee * 100 : 5000;
  const [availability, setAvailability] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [loadingSlots, setLoadingSlots] = useState(true);
  const [paymentMessage, setPaymentMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  // Fetch lawyer availability
  const fetchAvailability = async () => {
    if (!lawyer?.id) return;
    setLoadingSlots(true);
    try {
      const response = await fetch(`http://localhost/backend/api/get_lawyer_availability.php?lawyer_id=${lawyer.id}`);
      if (!response.ok) throw new Error("Failed to fetch availability");
      const json = await response.json();
      setAvailability(json.success === "success" ? json.data : []);
    } catch (error) {
      console.error(error);
      setAvailability([]);
    } finally {
      setLoadingSlots(false);
    }
  };

  useEffect(() => {
    fetchAvailability();
  }, [lawyer?.id]);

  // Check payment result from URL
  useEffect(() => {
    const payment = searchParams.get("payment");
    if (payment === "success") {
      setPaymentMessage("✅ Payment successful! Your appointment is booked.");
      setMessageType('success');
      fetchAvailability(); // Refresh available slots
    } else if (payment === "failed") {
      setPaymentMessage("❌ Payment failed. Please try again.");
      setMessageType('error');
    }

    if (payment) {
      const timer = setTimeout(() => setPaymentMessage(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  const handleBooking = async () => {
    if (!selectedSlot) return alert("Please select a slot");
    try {
      const res = await fetch("http://localhost/backend/api/payment.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slot: selectedSlot,
          lawyer_id: lawyer.id,
          price,
          lawyer_name: lawyer.name,
        }),
        credentials: "include",
      });

      const session = await res.json();
      if (session.error) return alert(session.error);

      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: session.id });
    } catch (e) {
      console.error(e);
      alert("Payment failed");
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <StarIcon key={i} className={`w-5 h-5 ${i <= rating ? "text-yellow-500" : "text-gray-300"}`} />
      );
    }
    return <div className="flex justify-center mt-2">{stars}</div>;
  };

  const ratingValue = Math.round(lawyer?.rating || lawyer?.avg_rating || 0);

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f2eb]">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-6 pt-24">
        {lawyer ? (
          <div className="w-full max-w-xl bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 flex flex-col gap-6">

            {/* Lawyer Profile */}
            <div className="flex flex-col items-center">
              <img
                src={lawyer.profile_picture || lawyer.image_url}
                onError={e => { e.currentTarget.src = defaultLawyerImg; }}
                alt={lawyer.name}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
              />
              <div className="mt-4 text-center w-full">
                <div className="flex items-center justify-center gap-2">
                  <h2 className="text-2xl font-bold text-[#6e4e13] drop-shadow">{lawyer.name}</h2>
                  {lawyer.verified && <CheckBadgeIcon className="w-6 h-6 text-green-500" title="Verified" />}
                </div>
                <div className="text-[#8a7750]">{lawyer.specialization}</div>
                {lawyer.yearsExperience && <div className="text-[#ac9770] text-sm">{lawyer.yearsExperience} years of experience</div>}
                {renderStars(ratingValue)}
                <div className="text-green-700 font-semibold mt-1">Fee: Rs. {lawyer.fee}</div>
              </div>
            </div>

            {/* Payment Message */}
            {paymentMessage && (
              <div className={`p-2 text-center rounded ${messageType === 'success' ? 'bg-green-200' : 'bg-red-200'}`}>
                {paymentMessage}
              </div>
            )}

            {/* Availability */}
            <div>
              <div className="flex items-center mb-2 text-[#6e4e13]">
                <CalendarDaysIcon className="w-5 h-5 mr-2" />
                <span className="font-medium">Available Times:</span>
              </div>
              {loadingSlots ? <p>Loading slots...</p> :
                <div className="flex flex-col gap-2">
                  {availability.map((day) => (
                    <div key={day.date}>
                      <p className="font-semibold mb-1 text-[#6e4e13]">{day.date}</p>
                      <div className="flex gap-2 flex-wrap">
                        {day.slots.map((time) => {
                          const slotStr = `${day.date} ${time}`;
                          return (
                            <button
                              key={time}
                              onClick={() => setSelectedSlot(slotStr)}
                              className={`px-3 py-1 rounded border text-sm transition ${selectedSlot === slotStr ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-blue-100"}`}
                            >
                              {time}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              }
            </div>

            {/* Book & Pay Button */}
            <button
              onClick={handleBooking}
              disabled={!selectedSlot}
              className={`w-full py-3 font-semibold rounded shadow transition bg-gradient-to-tr from-[#a68e56] to-[#6e4e13] text-white hover:from-[#6e4e13] hover:to-[#a68e56] ${!selectedSlot ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              Confirm & Pay Rs.{price / 100}
            </button>

          </div>
        ) : (
          <p>Loading lawyer details...</p>
        )}
      </main>
      <Footer />
    </div>
  );
}
