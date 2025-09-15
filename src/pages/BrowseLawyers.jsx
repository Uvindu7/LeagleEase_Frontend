import React, { useEffect, useState } from 'react';

// Import components and assets
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import backgroundImg from '../assets/browse lawyer bg.jpg';
import { Link } from "react-router-dom";

import tharinduImg from '../assets/lawyers/Tharindu Perera.jpg';
import dilaniImg from '../assets/lawyers/Dilani Fernando.jpg';
import gaminiImg from '../assets/lawyers/Gamini Jayasinghe.jpg';
import nadeeshaImg from '../assets/lawyers/Nadeesha Silva.jpg';
import ruwanImg from '../assets/lawyers/Ruwan Gunasekara.jpg';

const BrowseLawyers = () => {
  // State for lawyer data
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);

  // States for filters
  const [specializationFilter, setSpecializationFilter] = useState('');
  const [minRating, setMinRating] = useState('');
  const [minFee, setMinFee] = useState('');
  const [maxFee, setMaxFee] = useState('');

  // useEffect to get fetching data from backend
  useEffect(() => {
    // Sample lawyer data
    const sampleData = [
      {
        id: 1,
        name: "Tharindu Perera",
        specialization: "Criminal Law",
        rating: 1,
        fee: 9000,
        bio: "Young and energetic defense lawyer with a fresh perspective.",
        image_url: tharinduImg,
        verified: true,
        yearsExperience: 3,
      },
      {
        id: 2,
        name: "Dilani Fernando",
        specialization: "Family Law",
        rating: 4,
        fee: 10000,
        bio: "Specialist in divorce, custody, and adoption cases.",
        image_url: dilaniImg,
        verified: true,
        yearsExperience: 6,
      },
      {
        id: 3,
        name: "Gamini Jayasinghe",
        specialization: "Corporate Law",
        rating: 5,
        fee: 25000,
        bio: "Handles corporate mergers, acquisitions, and contracts for international firms.",
        image_url: gaminiImg,
        verified: false,
        yearsExperience: 15,
      },
      {
        id: 4,
        name: "Nadeesha Silva",
        specialization: "Family Law",
        rating: 2,
        fee: 12000,
        bio: "Passionate about helping families through legal processes smoothly.",
        image_url: nadeeshaImg,
        verified: true,
        yearsExperience: 4,
      },
      {
        id: 5,
        name: "Ruwan Gunasekara",
        specialization: "Criminal Law",
        rating: 3,
        fee: 15000,
        bio: "Experienced criminal defense lawyer with over 10 years in high-profile cases.",
        image_url: ruwanImg,
      }
    ];

    setLawyers(sampleData);
    setLoading(false);
  }, []);

  // Apply filtering options on lawyers
  const filteredLawyers = lawyers.filter((lawyer) => {
    const matchSpecialization = !specializationFilter || lawyer.specialization === specializationFilter;
    const matchRating = !minRating || parseFloat(lawyer.rating) >= parseFloat(minRating);
    const matchFee =
      (!minFee || lawyer.fee >= parseFloat(minFee)) &&
      (!maxFee || lawyer.fee <= parseFloat(maxFee));
    return matchSpecialization && matchRating && matchFee;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Main Container with background */}
      <div
        className="flex flex-1"
        style={{ backgroundImage: `url(${backgroundImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        {/* Sidebar / Filters */}
        <div className="w-1/4 h-[calc(100vh-64px)] sticky top-[64px] bg-gradient-to-b from-[#f1e4c3df] via-[#c5a47396] to-[#6e4d1e1c] p-6 text-black overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-4 border-b-2 border-b-black">Filters</h2>
          <label className="block mb-1 font-medium">Specialization</label>
          <select
            className="w-full mb-4 p-2 border rounded bg-[#c5a473] text-black"
            value={specializationFilter}
            onChange={(e) => setSpecializationFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="Criminal Law">Criminal Law</option>
            <option value="Family Law">Family Law</option>
            <option value="Corporate Law">Corporate Law</option>
          </select>

          {/* Rating Filter */}
          <label className="block mb-1 font-medium">Rating</label>
          <select
            className="w-full mb-4 p-2 border rounded bg-[#c5a473] text-black" 
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
          >
            <option value="">All</option>
            <option value="1">★☆☆☆☆</option>
            <option value="2">★★☆☆☆</option>
            <option value="3">★★★☆☆</option>
            <option value="4">★★★★☆</option>
            <option value="5">★★★★★</option>
          </select>

          {/* Fee Range Filter */}
          <label className="block mb-1 font-medium">Fee Range (LKR)</label>
          <div className="flex gap-2 mb-4">
            <input
              type="number"
              placeholder="Min"
              className="w-1/2 p-2 border rounded bg-[#c5a473] text-black"
              step="5000"
              min="0"
              max="40000"
              value={minFee}
              onChange={(e) => setMinFee(e.target.value)}
            />
            <input
              type="number"
              placeholder="Max"
              className="w-1/2 p-2 border rounded bg-[#c5a473] text-black"
              step="5000"
              min="10000"
              max="50000"
              value={maxFee}
              onChange={(e) => setMaxFee(e.target.value)}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="w-3/4 p-6 text-black pt-20">
          <h1 className="text-3xl font-bold mb-6 text-white">Browse Lawyers</h1>

          {loading ? (
            <div className="text-lg">Loading lawyers...</div>
          ) : filteredLawyers.length === 0 ? (
            <div className="text-gray-700">No lawyers match your criteria.</div>
          ) : (
            // Lawyer Cards Grid
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLawyers.map((lawyer) => (
                <div
                  key={lawyer.id}
                  className="bg-[#f8e7bdf3] rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
                >
                  {/* Lawyer Image */}
                  <img
                    src={lawyer.image_url}
                    alt={lawyer.name}
                    className="w-full h-40 object-cover rounded-md mb-4 transform group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Lawyer Info */}
                  <h3 className="text-xl font-semibold">{lawyer.name}</h3>
                  <p className="text-sm text-gray-600">{lawyer.specialization}</p>
                  <p className="text-sm mt-1">Rating: ⭐ {lawyer.rating}</p>
                  <p className="text-sm">Fee: LKR {lawyer.fee}</p>
                  <p className="text-sm text-gray-700 mt-2">{lawyer.bio}</p>

                  {/* Action Buttons - Vertical */}
                  <div className="flex flex-col gap-2 mt-4">
                    <Link
                      to="/lawyerprofile"
                      state={{ lawyer }}
                      className="bg-[#a68e56] text-white px-4 py-2 rounded-lg text-center font-medium hover:bg-[#8b7842] transition-colors"
                    >
                      👤 View Profile
                    </Link>
                    
                    <Link
                      to="/bookappointment"
                      state={{ lawyer }}
                      className="bg-[#897547] text-white px-4 py-2 rounded-lg text-center font-medium hover:bg-[#6e5c35] transition-colors"
                    >
                      📅 Book Now
                    </Link>
                    
                    <Link
                      to="/reviews"
                      state={{ lawyer }}
                      className="bg-[#6e4d1e] text-white px-4 py-2 rounded-lg text-center font-medium hover:bg-[#5a3e17] transition-colors"
                    >
                      ⭐ Review
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BrowseLawyers;

