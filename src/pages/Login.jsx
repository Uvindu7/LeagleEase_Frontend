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
      const res = await fetch("http://localhost/BackEnd/Login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("Login successful!");
        navigate("/home"); 
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
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-60 z-0"></div>

      {/* Login Form */}
      <div className="relative z-10 w-[100%] max-w-[400px] bg-white/10 backdrop-blur-md text-white rounded-xl shadow-lg p-8">
        <form onSubmit={handleSubmit}>
          <h1 className="mb-8 text-3xl font-bold text-center">Login</h1>

          <div className="relative w-full h-12 mb-8">
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Username or Email"
              required
              className="w-full h-full pl-3 pr-10 text-base text-white bg-transparent border border-white rounded-md outline-none placeholder-white"
            />
            <FaUser className="absolute text-white transform -translate-y-1/2 right-3 top-1/2" />
          </div>

          <div className="relative w-full h-12 mb-8">
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full h-full pl-3 pr-10 text-base text-white bg-transparent border border-white rounded-md outline-none placeholder-white"
            />
            <FaLock className="absolute text-white transform -translate-y-1/2 right-3 top-1/2" />
          </div>

          {message && (
            <div className="text-center text-sm text-red-400 mb-4">{message}</div>
          )}

          <button
            type="submit"
            className="w-full h-10 mt-2 rounded-full bg-white text-black font-bold text-base hover:bg-[#e0d4aa] transition"
          >
            Login
          </button>

          <div className="mt-6 text-sm text-center">
            <p>
              Don't have an account?{" "}
              <Link to="/register" className="font-semibold underline text-white">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;