import React, { useEffect, useState } from 'react';
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
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [specializationFilter, setSpecializationFilter] = useState('');
  const [minRating, setMinRating] = useState('');
  const [minFee, setMinFee] = useState('');
  const [maxFee, setMaxFee] = useState('');

  useEffect(() => {

    //Sample lawyer dara cards.. 
    const sampleData = [
      {
        id: 1,
        name: "Tharindu Perera",
        specialization: "Criminal Law",
        rating: 1,
        fee: 9000,
        bio: "Young and energetic defense lawyer with a fresh perspective.",
        image_url: tharinduImg,
      },
      {
        id: 2,
        name: "Dilani Fernando",
        specialization: "Family Law",
        rating: 4,
        fee: 10000,
        bio: "Specialist in divorce, custody, and adoption cases.",
        image_url: dilaniImg,
      },
      {
        id: 3,
        name: "Gamini Jayasinghe",
        specialization: "Corporate Law",
        rating: 5,
        fee: 25000,
        bio: "Handles corporate mergers, acquisitions, and contracts for international firms.",
        image_url: gaminiImg,
      },
      {
        id: 4,
        name: "Nadeesha Silva",
        specialization: "Family Law",
        rating: 2,
        fee: 12000,
        bio: "Passionate about helping families through legal processes smoothly.",
        image_url: nadeeshaImg,
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

    /*
    === connect database to get lawyer details ===

    setLawyers(sampleData);
    setLoading(false);

     fetch(" ") //backend php file location
      .then((res) => res.json())
      .then((data) => {
        setLawyers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching lawyers:", error);
        setLoading(false);
      });
    */

  setLawyers(sampleData);
  setLoading(false);
  }, []);

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

      <div
        className="flex flex-1"
        style={{ backgroundImage: `url(${backgroundImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >

        {/* Sidebar / Filters */}
        <div className="w-1/4 h-[calc(100vh-64px)] sticky top-[64px] bg-gradient-to-b from-[#f1e4c3df] via-[#c5a473d3] to-[#6e4d1ee5] p-6 text-black overflow-y-auto">
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
            <option value="Corporate Law">Corporate Law</option>s
          </select>

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

          <label className="block mb-1 font-medium">Fee Range (LKR)</label>
          <div className="flex gap-2 mb-4">
            <input
              type="number"
              placeholder="Min"
              className="w-1/2 p-2 border rounded bg-[#c5a473] text-black focus:outline-none focus:ring-2 focus:ring-[#b89450]"
              step="5000"
              min="0"
              max="40000"
              value={minFee}
              onChange={(e) => setMinFee(e.target.value)}
            />
            <input
              type="number"
              placeholder="Max"
              className="w-1/2 p-2 border rounded bg-[#c5a473] text-black focus:outline-none focus:ring-2 focus:ring-[#b89450]"
              step="5000"
              min="10000"
              max="50000"
              value={maxFee}
              onChange={(e) => setMaxFee(e.target.value)}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="w-3/4 p-6 text-black">
          <h1 className="text-3xl font-bold mb-6">Browse Lawyers</h1>

          {loading ? (
            <div className="text-lg">Loading lawyers...</div>
          ) : filteredLawyers.length === 0 ? (
            <div className="text-gray-700">No lawyers match your criteria.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLawyers.map((lawyer) => (
                <div
                  key={lawyer.id}
                  className="bg-[#f8e7bdf3] rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
                >
                  <img
                    src={lawyer.image_url}
                    alt={lawyer.name}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-xl font-semibold">{lawyer.name}</h3>
                  <p className="text-sm text-gray-600">{lawyer.specialization}</p>
                  <p className="text-sm mt-1">Rating: ⭐ {lawyer.rating}</p>
                  <p className="text-sm">Fee: LKR {lawyer.fee}</p>
                  <p className="text-sm text-gray-700 mt-2">{lawyer.bio}</p>
                  <div className="flex justify-between mt-4">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
                      View Profile
                    </button>
                    <Link
                      to="/bookappointment"
                      state={{ lawyer }} // pass the selected lawyer object
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm text-center"
                    >
                      Book Now
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
