import React from 'react';
import logo from '../assets/logo.jpg';
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#4b4030cc] backdrop-blur-md text-[#f3d999] px-6 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo & Description */}
        <div className="flex flex-col items-start space-y-3">
          <img src={logo} alt="Farm Master Logo" className="h-20 w-auto rounded-lg shadow-lg" />
          <p className="text-[#f3d999cc] text-sm">
            Empowering legal access through<br/>
            technology and trusted <br/>professionals.
          </p>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Services</h3>
          <ul className="space-y-2 text-[#f3d999cc] text-sm">
            <li className="hover:text-white cursor-pointer transition">Verified Lawyer Directory</li>
            <li className="hover:text-white cursor-pointer transition">Online Video Consultations</li>
            <li className="hover:text-white cursor-pointer transition">Legal Document Review</li>
            <li className="hover:text-white cursor-pointer transition">Booking and Scheduling</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-[#f3d999cc] text-sm">
            <li className="hover:text-white cursor-pointer transition">Help Center</li>
            <li className="hover:text-white cursor-pointer transition">
            <Link to="/feedback">Contact Us</Link></li>
            <li className="hover:text-white cursor-pointer transition">Documentation</li>
            <li className="hover:text-white cursor-pointer transition">Community</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-[#f3d999cc] text-sm">
            <li className="hover:text-white cursor-pointer transition">legaleaseproject1@gmail.com</li>
            <li className="hover:text-white cursor-pointer transition">+94 716949819</li>
            <li className="hover:text-white cursor-pointer transition">Badulla, Sri Lanka</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#f3d99966] mt-10 pt-4 text-center text-sm text-[#f3d99999]">
        © 2025 LegalEase. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
