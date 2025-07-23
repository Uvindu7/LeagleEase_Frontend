import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImg from '../assets/background.webp'; // optional background image

const StartPage = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <div
      className="flex flex-col justify-center items-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="bg-white bg-opacity-90 rounded-xl shadow-xl p-10 text-center max-w-md w-full">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome to LegalEase</h1>
        <p className="mb-8 text-gray-600">Connect with verified lawyers for secure online consultations.</p>
        <div className="flex flex-col gap-4">
          <button
            onClick={goToLogin}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Sign In
          </button>
          <button
            onClick={goToRegister}
            className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartPage;