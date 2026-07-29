import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Link } from "react-router-dom";
import defaultLawyerImg from '../assets/lawyerprofile.jpg';

const BrowseLawyers = () => {
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [specializationFilter, setSpecializationFilter] = useState('');
  const [minRating, setMinRating] = useState('');
  const [minFee, setMinFee] = useState('');
  const [maxFee, setMaxFee] = useState('');

  useEffect(() => {
    const fetchLawyers = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (specializationFilter) params.append('specialization', specializationFilter);
        if (minRating) params.append('minRating', minRating);
        if (minFee) params.append('minFee', minFee);
        if (maxFee) params.append('maxFee', maxFee);

        const url = `http://localhost/backend/api/get_lawyers.php?${params.toString()}`;
        const response = await fetch(url, { credentials: 'include' });
        if (!response.ok) throw new Error("Failed to fetch lawyers");

        const json = await response.json();
        if (json.success === 'success') {
          const normalized = json.data.map(l => {
            const normalizedName = (l.name || "").replace(/\s+/g, ' ').trim();
            const allowedLocalLawyers = [
              "Dilani Fernando",
              "Gamini Jayasinghe",
              "Harini Weerasinghe",
              "Kasun Jayawardena",
              "Nadeesha Silva",
              "Ruwan Gunasekara",
              "Shalini Rajapaksha",
              "Tharindu Perera"
            ];
            
            let finalImageUrl = "";
            if (allowedLocalLawyers.includes(normalizedName)) {
              finalImageUrl = new URL(`../assets/lawyers/${normalizedName}.jpg`, import.meta.url).href;
            } else {
              finalImageUrl = defaultLawyerImg;
            }

            return {
              id: l.id,
              name: l.name || "",
              image_url: finalImageUrl,
              specialization: l.specialization || "",
              rating: l.avg_rating ? parseFloat(l.avg_rating).toFixed(1) : 0,
              fee: l.fee || 0,
              bio: l.bio || ""
            };
          });
          setLawyers(normalized);
        } else {
          setLawyers([]);
          console.error(json.message);
        }
      } catch (err) {
        console.error(err);
        setLawyers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLawyers();
  }, [specializationFilter, minRating, minFee, maxFee]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 bg-[#f5f2eb]"> {/* background removed */}
        <aside className="w-1/4 h-[calc(100vh-64px)] sticky top-[64px] bg-white/80 backdrop-blur-sm p-6 text-black overflow-y-auto rounded-r-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 border-b-2 border-b-black">Filters</h2>

          <label>Specialization</label>
          <select className="w-full mb-4 p-2 border rounded bg-[#c5a473]" value={specializationFilter} onChange={e => setSpecializationFilter(e.target.value)}>
            <option value="">All</option>
            <option value="criminal">Criminal Law</option>
            <option value="family">Family Law</option>
            <option value="corporate">Corporate Law</option>
            <option value="civil">Civil Law</option>
          </select>

          <label>Rating</label>
          <select className="w-full mb-4 p-2 border rounded bg-[#c5a473]" value={minRating} onChange={e => setMinRating(e.target.value)}>
            <option value="">All</option>
            <option value="1">★☆☆☆☆</option>
            <option value="2">★★☆☆☆</option>
            <option value="3">★★★☆☆</option>
            <option value="4">★★★★☆</option>
            <option value="5">★★★★★</option>
          </select>

          <label>Fee Range (LKR)</label>
          <div className="flex gap-2 mb-4">
            <input type="number" placeholder="Min" value={minFee} onChange={e => setMinFee(e.target.value)} className="w-1/2 p-2 border rounded bg-[#c5a473]" />
            <input type="number" placeholder="Max" value={maxFee} onChange={e => setMaxFee(e.target.value)} className="w-1/2 p-2 border rounded bg-[#c5a473]" />
          </div>

          <button onClick={() => { setSpecializationFilter(''); setMinRating(''); setMinFee(''); setMaxFee(''); }} className="mt-2 w-full bg-[#6e4d1e] text-white py-2 rounded">
            Clear Filters
          </button>
        </aside>

        <main className="w-3/4 p-6 text-black pt-20">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Browse Lawyers</h1>
          {loading ? <div>Loading lawyers...</div> :
            lawyers.length === 0 ? <div>No lawyers match your criteria.</div> :
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {lawyers.map(lawyer => (
                  <div key={lawyer.id} className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
                    <img src={lawyer.image_url} onError={e => { e.currentTarget.src = defaultLawyerImg; }} alt={lawyer.name} className="w-full h-40 object-cover rounded-md mb-4" />
                    <h3 className="text-xl font-semibold">{lawyer.name}</h3>
                    <p className="text-sm text-gray-600">{lawyer.specialization}</p>
                    <p className="text-sm mt-1">Rating: ⭐ {lawyer.rating}</p>
                    <p className="text-sm">Fee: LKR {lawyer.fee}</p>
                    <p className="text-sm text-gray-700 mt-2 line-clamp-3">{lawyer.bio}</p>
                    <div className="flex flex-col gap-2 mt-4">
                      <Link to="/lawyerprofile" state={{ lawyer }} className="bg-[#a68e56] text-white px-4 py-2 rounded-lg text-center">👤 View Profile</Link>
                      <Link to="/bookappointment" state={{ lawyer }} className="bg-[#897547] text-white px-4 py-2 rounded-lg text-center">📅 Book Now</Link>
                      <Link to="/reviews" state={{ lawyer }} className="bg-[#6e4d1e] text-white px-4 py-2 rounded-lg text-center">⭐ Review</Link>
                    </div>
                  </div>
                ))}
              </div>
          }
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default BrowseLawyers;
