
import React from 'react';
import { CheckCircle, Video, Lock } from 'lucide-react';

import bgImage1 from '../../assets/feature-bg1.jpg';
import bgImage2 from '../../assets/feature-bg2.jpg';
import bgImage3 from '../../assets/feature-bg3.jpg';

const features = [
  {
    icon: <CheckCircle className="text-white w-12 h-12" />,
    title: 'Verified Lawyers',
    desc: 'All professionals are carefully background checked and verified.',
    bgImage: bgImage1,
    link: '/browselawyers',
  },
  {
    icon: <Video className="text-white w-12 h-12" />,
    title: 'Video Consultations',
    desc: 'Easily connect with lawyers via secure and private video calls.',
    bgImage: bgImage2,
    link: '',
  },
  {
    icon: <Lock className="text-white w-12 h-12" />,
    title: 'Secure Payments',
    desc: 'We provide safe, encrypted, and seamless transaction methods.',
    bgImage: bgImage3,
    link: '/paymentpage',
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-gray-50 to-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center text-[#594f3f] mb-14">
          Why Choose <span className="text-[#594f3f] underline decoration-[#594f3f] decoration-4">LegalEase</span>
        </h2>
        <div className="grid gap-10 md:grid-cols-3">
          {features.map((f, idx) => (
            <div
              key={idx}
              className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
            >
              {/* Background Image with Zoom on Hover */}
              <div
                className="absolute inset-0 bg-center bg-cover transform scale-100 group-hover:scale-110 transition-transform duration-500"
                style={{ backgroundImage: `url('${f.bgImage}')` }}
              ></div>

              {/* Gradient Overlay Appears on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Content Card with Glassmorphism Effect */}
              <div className="relative z-10 text-white p-6 opacity-0 group-hover:opacity-100 translate-y-8 group-hover:translate-y-0 transition-all duration-500 ease-in-out text-center flex flex-col items-center justify-center h-full backdrop-blur-md bg-[#594f3f]/80 rounded-2xl m-6">
                <div className="flex justify-center mb-4">{f.icon}</div>
                <h3 className="text-2xl font-semibold mb-2">{f.title}</h3>
                <p className="text-gray-200 text-sm">{f.desc}</p>
              </div>

              {/* Bottom Center Title, always visible */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] px-4 py-1 rounded-lg bg-[#594f3f]/70 backdrop-blur-sm">
                <h4
                  title={f.title}
                  className="text-center text-white text-xl font-semibold truncate whitespace-nowrap drop-shadow-lg"
                >
                  {f.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
