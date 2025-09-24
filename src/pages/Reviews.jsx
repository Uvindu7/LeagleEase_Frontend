import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Reviews = () => {
  const location = useLocation();
  const { lawyer } = location.state || {};

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  // Load reviews
  const loadReviews = () => {
    fetch(`http://localhost/backend/api/reviews.php?lawyer_id=${lawyer.id}`)
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error("Error fetching reviews:", err));
  };

  useEffect(() => {
    if (lawyer) loadReviews();
  }, [lawyer]);

  // Submit new review
  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewData = {
      lawyer_id: lawyer.id,
      client_id: 1, // replace with logged-in client id
      appointment_id: null,
      rating,
      comments: comment,
    };

    try {
      const response = await fetch("http://localhost/backend/api/reviews.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });

      const result = await response.json();
      if (result.success) {
        setMessage("✅ Review submitted successfully!");
        setComment("");
        setRating(5);
        loadReviews();
      } else {
        setMessage("❌ " + result.message);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      setMessage("⚠️ Error submitting review.");
    }
  };

  return (
    <div>
    <Navbar/>
    <div className="min-h-screen bg-[#f5f2eb] mt-18">
      <div className="max-w-5xl mx-auto px-4">

        {/* Lawyer Header */}
        <div className="bg-[#f8e7bd] shadow-lg rounded-xl p-6 mb-8 border-l-8 border-[#6e4d1e]">
          <h2 className="text-3xl font-bold text-[#6e4d1e]">
            Reviews for {lawyer?.name}
          </h2>
          <p className="text-gray-700 mt-2">
            Share your experience with <span className="font-semibold">{lawyer?.name}</span>.
          </p>
        </div>

        {/* Review Form */}
        <div className="bg-[#fff8e6] shadow-md rounded-xl p-6 mb-10 border border-[#c5a473]">
          <h3 className="text-xl font-semibold mb-4 text-[#6e4d1e]">✍ Write a Review</h3>
          {message && <p className="mb-4 text-center font-medium text-green-700">{message}</p>}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block font-medium mb-1 text-[#6e4d1e]">Rating</label>
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#c5a473] bg-[#fdf5dc]"
              >
                {[1,2,3,4,5].map(num => (
                  <option key={num} value={num}>{num} Star{num>1?"s":""}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium mb-1 text-[#6e4d1e]">Your Comment</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows="4"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#c5a473] bg-[#fdf5dc]"
                placeholder="Write your review..."
              />
            </div>

            <button
              type="submit"
              className="bg-[#6e4d1e] text-[#6e4d1e] py-2 px-4 rounded-lg shadow hover:bg-[#5a3e17] transition"
            >
              Submit Review
            </button>
          </form>
        </div>

        {/* Reviews List */}
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-[#6e4d1e]">⭐ All Reviews</h3>
          {reviews.length === 0 ? (
            <p className="text-[#6e4d1e]">No reviews yet. Be the first!</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {reviews.map((rev) => (
                <div key={rev.review_id} className="bg-[#f8e7bd] shadow-md rounded-xl p-5 hover:shadow-lg transition border border-[#c5a473]">
                  <p className="text-yellow-600 text-lg font-bold">{"⭐".repeat(rev.rating)}</p>
                  <p className="text-[#6e4d1e] font-medium mt-2">{rev.client_id || "Anonymous"}</p>
                  <p className="text-gray-800 mt-2">{rev.comments}</p>
                  <p className="text-xs text-gray-600 mt-3">{new Date(rev.created_at).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default Reviews;