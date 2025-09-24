import React, { useState, useEffect } from "react";

export default function Feedback() {
  const [message, setMessage] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      const res = await fetch("http://localhost/backend/api/feedback.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // important for PHP session
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setStatus(data.message);

      if (data.success) {
        setMessage("");
        loadFeedback();
      }
    } catch (err) {
      setStatus("Error submitting feedback");
    }
  };

  const loadFeedback = async () => {
    try {
      const res = await fetch("http://localhost/your-backend/api/feedback.php", {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) setFeedbacks(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadFeedback();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Feedback</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-100 p-4 rounded-lg shadow">
        <textarea
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your feedback..."
          className="w-full p-2 border rounded"
          rows="4"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>

      {status && <p className="mt-2 text-sm text-gray-600">{status}</p>}

      {/* Display feedbacks */}
      <h2 className="text-xl font-semibold mt-6">Recent Feedback</h2>
      <div className="space-y-3 mt-2">
        {feedbacks.map((f) => (
          <div key={f.id} className="border p-3 rounded bg-white shadow">
            <p className="font-bold">{f.name} ({f.email})</p>
            <p>{f.message}</p>
            <small className="text-gray-500">{new Date(f.created_at).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
