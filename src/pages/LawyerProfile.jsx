import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckBadgeIcon, CalendarDaysIcon, StarIcon } from "@heroicons/react/24/solid";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import backgroundImg from "../assets/background.webp";

export default function LawyerProfilePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { lawyer } = location.state || {}; 
  const [availability, setAvailability] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(true);

  if (!lawyer) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-xl">No lawyer selected. Please go back and select a lawyer.</p>
        </div>
        <Footer />
      </div>
    );
  }

  // Fetch availability from API
  useEffect(() => {
    const fetchAvailability = async () => {
      setLoadingSlots(true);
      try {
        const response = await fetch(`http://localhost/backend/api/get_lawyer_availability.php?lawyer_id=${lawyer.id}`);
        if (!response.ok) throw new Error("Failed to fetch availability");
        const json = await response.json();
        if (json.success === "success") {
          setAvailability(json.data);
        } else {
          console.error(json.message);
          setAvailability([]);
        }
      } catch (error) {
        console.error("Error fetching availability:", error);
        setAvailability([]);
      } finally {
        setLoadingSlots(false);
      }
    };

    fetchAvailability();
  }, [lawyer.id]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <StarIcon
          key={i}
          className={`w-5 h-5 ${i <= rating ? "text-yellow-500" : "text-gray-300"}`}
        />
      );
    }
    return <div className="flex justify-center mt-2">{stars}</div>;
  };

  // Handle booking redirect
  const handleBookNow = () => {
    navigate("/bookappointment", { state: { lawyer } });
  };

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
          
          {/* Profile Header */}
          <div className="flex flex-col items-center">
            <img
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              src={lawyer.image_url}
              alt={lawyer.name}
            />
            <div className="mt-6 text-center w-full">
              <div className="flex items-center justify-center gap-2">
                <h2 className="text-2xl font-bold text-[#6e4e13] drop-shadow">{lawyer.name}</h2>
                {lawyer.verified && <CheckBadgeIcon className="w-6 h-6 text-green-500" title="Verified" />}
              </div>
              <div className="text-[#8a7750]">{lawyer.specialization}</div>
              <div className="text-[#ac9770] text-sm">{lawyer.yearsExperience ? `${lawyer.yearsExperience} years of experience` : "Experience info not available"}</div>
              {renderStars(lawyer.rating)}
            </div>
          </div>

          {/* Availability */}
          <div>
            <div className="flex items-center mb-2 text-[#6e4e13]">
              <CalendarDaysIcon className="w-5 h-5 mr-2" />
              <span className="font-medium">Availabile Times:</span>
            </div>
            {loadingSlots ? (
              <p>Loading slots...</p>
            ) : (
              <div className="flex flex-col gap-2">
                {availability.map((day) => (
                  <div key={day.date} className="flex items-center gap-2">
                    <span className="text-[#6e4e13] w-24 font-medium">{day.date}</span>
                    <div className="flex gap-1 flex-wrap">
                      {day.slots.map((slot) => (
                        <span
                          key={slot}
                          className="px-3 py-1 rounded font-semibold border bg-yellow-100 border-yellow-300 text-[#6e4e13]"
                        >
                          {slot}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Fee */}
          <div>
            <span className="font-medium text-[#6e4e13]">Fee per consultation: </span>
            <span className="text-green-700 font-semibold">Rs. {lawyer.fee}</span>
          </div>

          {/* Book Button */}
          <button
            onClick={handleBookNow}
            className="w-full py-2 font-semibold rounded transition shadow bg-gradient-to-tr from-[#a68e56] to-[#6e4e13] text-white hover:from-[#6e4e13] hover:to-[#a68e56]"
          >
            Book Appointment
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
