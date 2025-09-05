import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import backgroundImg from '../assets/background.webp';

const Register = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: '',
    gender: '',
    lawyerId: '',
    registerDate: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setMessage("❌ Passwords do not match");
      return;
    }

    const formData = new FormData();
    for (let key in form) {
      formData.append(key, form[key]);
    }

    if (form.role === 'lawyer') {
      const fileInput = document.querySelector('input[name="verification_doc"]');
      if (!fileInput || fileInput.files.length === 0) {
        setMessage("📄 Please upload your verification document.");
        return;
      }
      formData.append("verification_doc", fileInput.files[0]);
    }

    try {
      const res = await fetch("http://localhost/backend/api/register.php", {
        method: "POST",
        body: formData,
      });

      const text = await res.text();
      const data = JSON.parse(text);
      setMessage(data.message || "✅ Registration complete.");
    } catch (err) {
      console.error("❌ Fetch error:", err);
      setMessage("⚠️ Server error or invalid response.");
    }
  };

  return (
    <div
      className="w-full h-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-full h-full gap-6 p-10">
        <h1 className="mb-4 text-4xl font-bold text-center">Register</h1>
        <div className="w-full max-w-md">
          <input name="firstName" onChange={handleChange} required placeholder="First Name"
            className="w-full px-4 py-2 mb-4 text-black bg-white rounded-md outline-none" />
          <input name="lastName" onChange={handleChange} required placeholder="Last Name"
            className="w-full px-4 py-2 mb-4 text-black bg-white rounded-md outline-none" />
          <input type="email" name="email" onChange={handleChange} required placeholder="Email"
            className="w-full px-4 py-2 mb-4 text-black bg-white rounded-md outline-none" />
          <input type="tel" name="phone" onChange={handleChange} required placeholder="Phone Number"
            className="w-full px-4 py-2 mb-4 text-black bg-white rounded-md outline-none" />

          <select name="role" value={form.role} onChange={handleChange} required
            className="w-full px-4 py-2 mb-4 text-black bg-white rounded-md">
            <option value="">Register as:</option>
            <option value="user">User</option>
            <option value="lawyer">Lawyer</option>
          </select>

          {form.role === 'lawyer' && (
            <>
              <input
                name="lawyerId"
                onChange={handleChange}
                value={form.lawyerId}
                required
                placeholder="Enter Lawyer ID"
                className="w-full px-4 py-2 mb-4 text-black bg-white rounded-md outline-none"
              />
              <input
                type="date-local"
                name="registerDate"
                placeholder="Enter Register Date"
                onChange={handleChange}
                value={form.registerDate}
                required
                className="w-full px-4 py-2 mb-4 text-black bg-white rounded-md outline-none"
              />
              <div className="mb-4">
                
                <input
                  type="file"
                  name="verification_doc"
                  accept="application/pdf"
                  required
                  className="w-full px-4 py-2 text-black bg-white rounded-md"
                />
              </div>
            </>
          )}

          <input type="password" name="password" onChange={handleChange} required placeholder="Password"
            className="w-full px-4 py-2 mb-4 text-black bg-white rounded-md outline-none" />
          <input type="password" name="confirmPassword" onChange={handleChange} required placeholder="Confirm Password"
            className="w-full px-4 py-2 mb-4 text-black bg-white rounded-md outline-none" />

          <div className="mb-6">
            <label className="block mb-2 font-semibold">Gender:</label>
            <div className="flex gap-10">
              <label className="flex items-center gap-2">
                <input type="radio" name="gender" value="male" onChange={handleChange} required className="w-4 h-4" />
                Male
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="gender" value="female" onChange={handleChange} required className="w-4 h-4" />
                Female
              </label>
            </div>
          </div>

          {message && (
            <div className="mb-4 text-center text-sm text-red-600">{message}</div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-white text-gray-800 font-bold rounded-md hover:bg-yellow-200 transition"
          >
            Register
          </button>

          <p className="mt-6 text-center">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-black underline">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;