import React, { useState } from 'react';
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import backgroundImg from '../assets/background.webp'; 

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost/backend/api/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        // ✅ Save user info to localStorage
        localStorage.setItem("currentUserId", data.data.id);
        localStorage.setItem("userRole", data.data.role); // "client", "lawyer", "admin"

        setMessage("Login successful!");

        // ✅ Redirect based on role
        const role = data.data.role;
        if (role === "client") {
          navigate("/client");
        } else if (role === "lawyer") {
          navigate("/lawyer");
        } else if (role === "admin") {
          navigate("/admin");
        } else {
          navigate("/"); // fallback if role is unknown
        }
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage("Error connecting to server.");
    }
  };

  return (
    <div
      className="w-full h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      {/* Login Form */}
      <div className="relative z-10 w-[100%] max-w-[400px] bg-white backdrop-blur-md text-black rounded-xl shadow-lg p-8">
        <form onSubmit={handleSubmit}>
          <h1 className="mb-8 text-3xl font-bold text-center">Login</h1>

          <div className="relative w-full h-12 mb-8">
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full h-full pl-3 pr-10 text-base text-black bg-transparent border border-black rounded-md outline-none placeholder-black"
            />
            <FaUser className="absolute text-black transform -translate-y-1/2 right-3 top-1/2" />
          </div>

          <div className="relative w-full h-12 mb-8">
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full h-full pl-3 pr-10 text-base text-black bg-transparent border border-black rounded-md outline-none placeholder-black"
            />
            <FaLock className="absolute text-black transform -translate-y-1/2 right-3 top-1/2" />
          </div>

          {message && (
            <div className="text-center text-sm text-red-500 mb-4">{message}</div>
          )}

          <button
            type="submit"
            className="w-full h-10 mt-2 rounded-full bg-[#a68e56] text-black font-bold text-base hover:bg-[#e0d4aa] transition"
          >
            Login
          </button>

          <div className="mt-6 text-sm text-center">
            <p>
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold underline text-black hover:text-[#a68e56] transition"
              >
                Register
              </Link>
            </p>
            <p>
              <Link
                to="/resetpassword"
                className="font-semibold underline text-black hover:text-[#a68e56] transition"
              >
                Reset Password
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
