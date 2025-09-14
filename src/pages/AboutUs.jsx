import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import bgImage from "../assets/hero-background1.jpg";

const AboutUs = () => {
  return (
    <div>
      <Navbar />
      <section
        className="relative bg-no-repeat bg-top bg-cover py-20 px-6 md:px-20 mt-16"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-[#f1e4c3df]/50"></div>

        {/* Content */}
        <div className="relative max-w-4xl mx-auto text-center text-white">
          <h1 className="text-4xl font-bold mb-6">About LegalEase</h1>
          <p className="text-lg leading-relaxed">
            LegalEase is a web-based legal consultation platform that connects
            users with verified lawyers in a secure and convenient online
            environment. Our goal is to make legal services more accessible,
            affordable, and efficient by digitizing essential processes such as
            lawyer verification, appointment booking, secure payments, and video
            consultations.
          </p>
          <p className="text-lg leading-relaxed mt-4">
            Through LegalEase, clients can easily find and book consultations
            with qualified legal professionals from anywhere, while lawyers can
            expand their reach and manage their schedules more effectively. We
            are committed to building a reliable, secure, and user-friendly
            platform that bridges the gap between people and justice in today’s
            digital age.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AboutUs;
