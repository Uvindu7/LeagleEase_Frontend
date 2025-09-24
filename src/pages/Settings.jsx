import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const [form, setForm] = useState({ full_name: "", email: "", profile_photo: "" });
  const [photoFile, setPhotoFile] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

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

  // Handle file selection
  const handleFileChange = (e) => {
    setPhotoFile(e.target.files[0]);
  };

  // Submit updated user details
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("full_name", form.full_name);
      formData.append("email", form.email);

      if (photoFile) {
        formData.append("profile_photo", photoFile);
      }

      const res = await fetch("http://localhost/backend/api/updateuser.php", {
        method: "POST",
        credentials: "include",
        body: formData,
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

        {/* ✅ Upload photo instead of text input */}
        <div>
          <label className="block mb-2 font-semibold">Profile Photo:</label>
          <input
            type="file"
            name="profile_photo"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border p-2 rounded"
          />
          {form.profile_photo && (
            <img
              src={form.profile_photo}
              alt="Profile"
              className="mt-3 w-24 h-24 rounded-full object-cover border"
            />
          )}
        </div>

        {/* ✅ Reset password button */}
        <button
          type="button"
          onClick={() => navigate("/resetpassword")}
          className="bg-[#a68e56] text-white px-4 py-2 rounded w-full hover:bg-[#e0d4aa] transition"
        >
          Reset Password
        </button>

        <button
          type="submit"
          className="bg-[#3e352a] text-white px-4 py-2 rounded w-full hover:bg-[#5c4a3b] transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
