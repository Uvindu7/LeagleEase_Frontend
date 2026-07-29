import React from 'react';
import heroImage from '../../assets/background.webp';
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section
      className="relative min-h-screen bg-center bg-cover bg-no-repeat flex items-center justify-baseline"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/50 to-black/20"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-start justify-center text-left px-6 md:px-16 ml-16 animate-fade-in">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-8 leading-tight drop-shadow-lg">
          Get Legal Advice <br /> Online, Anytime.
        </h1>

        <p className="text-lg sm:text-xl text-gray-200 mb-10 max-w-lg">
          Trusted lawyers at your fingertips. Secure. Fast. Reliable.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-start w-full sm:w-auto">
          <Link to="/browselawyers">
            <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-200 transition transform hover:scale-105 duration-300 shadow-lg">
              Find a Lawyer
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
