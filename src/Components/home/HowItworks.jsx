import React from 'react';
import { Link } from 'react-router-dom';

// Import your images
import im1 from '../../assets/im1.jpg';
import im2 from '../../assets/im2.jpg';
import im3 from '../../assets/im3.jpg';

const steps = [
  {
    step: '1',
    title: 'Register',
    desc: 'Create your free LegalEase account and start your legal journey with ease.',
    img: im1,
    link: '/features?tab=registration',
  },
  {
    step: '2',
    title: 'Book a Lawyer',
    desc: 'Find the perfect lawyer for your specific legal needs quickly and easily.',
    img: im2,
    link: '/features?tab=booking',
  },
  {
    step: '3',
    title: 'Join Consultation',
    desc: 'Securely meet your lawyer via video call from anywhere at your convenience.',
    img: im3,
    link: '/features?tab=consultation',
  }
];

const HowItWorks = () => {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Minimal Heading Style */}
        <h2 className="text-3xl sm:text-4xl font-semibold text-[#594f3f] tracking-wide mb-12 italic">
          How <span className="underline decoration-4 decoration-[#594f3f]">LegalEase</span> Works
        </h2>

        <div className="grid md:grid-cols-3 gap-14">
          {steps.map((s, idx) => (
            <Link
              key={idx}
              to={s.link}
              className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col transform hover:-translate-y-2 overflow-hidden hover:no-underline"
            >
              {/* Image Full Width */}
              <div className="relative w-full h-56 md:h-64 overflow-hidden">
                <img
                  src={s.img}
                  alt={s.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Step Badge on Image */}
                <div className="absolute top-4 left-4 flex items-center justify-center w-12 h-12 rounded-full bg-[#594f3f] text-white font-extrabold text-lg drop-shadow-lg">
                  {s.step}
                </div>
              </div>

              {/* Card Content */}
              <div className="flex flex-col items-center px-6 py-8 text-center">
                <h3 className="text-2xl font-semibold text-[#594f3f] mb-3">{s.title}</h3>
                <p className="text-gray-600 mb-6 max-w-xs">{s.desc}</p>

                {/* Button */}
                <span className="mt-auto inline-block bg-[#594f3f] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-[#4e4537] transition">
                  Learn More
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
