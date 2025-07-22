import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import HeroSection from '../Components/home/HeroSection'
import Features from '../Components/home/Features'
import HowItWorks from '../Components/home/HowItworks'
import Testimonials from '../Components/home/Testimonails'

function Homepage() {
  return (
    <div>
      <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Footer />

    </div>
    </div>
  )
}

export default Homepage
