import React, { useEffect, useState } from "react";

export default function Settings() {
  const [form, setForm] = useState({ full_name: "", email: "", password: "", profile_photo: "" });
  const [message, setMessage] = useState("");

  // Load current user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost/backend/api/getuser.php", {
          credentials: "include",
        });
        const data = await res.json();
        if (data.success === "success") {
          setForm({
            full_name: data.data.full_name,
            email: data.data.email,
            password: "",
            profile_photo: data.data.profile_photo || "",
          });
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, []);

  // Handle form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit updated user details
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost/backend/api/updateuser.php", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      console.error("Error updating user:", err);
      setMessage("Error updating profile");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          value={form.full_name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="New Password (optional)"
          value={form.password}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="profile_photo"
          placeholder="Profile Photo URL"
          value={form.profile_photo}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <button type="submit" className="bg-[#3e352a] text-white px-4 py-2 rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
}
