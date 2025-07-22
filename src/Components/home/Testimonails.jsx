import React from 'react';

const testimonials = [
  {
    id: 1,
    quote: "Quick, affordable, and professional service.",
    name: "Jane Doe",
    role: "Freelance Consultant",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 2,
    quote: "LegalEase connected me with a trustworthy lawyer effortlessly.",
    name: "John Smith",
    role: "Entrepreneur",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: 3,
    quote: "Highly recommend for anyone needing legal advice online!",
    name: "Sarah Lee",
    role: "Small Business Owner",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-gradient-to-r from-gray-100 to-gray-200 py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-[#594f3f] mb-4">Our Happy Clients</h2>
        <p className="text-gray-600 mb-12 text-lg max-w-2xl mx-auto">
          Trusted by professionals and businesses across industries.
        </p>
        <div className="grid md:grid-cols-3 gap-10">
          {testimonials.map(({ id, quote, name, role, avatar }) => (
            <div
              key={id}
              className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={avatar}
                alt={name}
                className="w-24 h-24 rounded-full mb-4 object-cover border-4 border-[#594f3f]"
              />
              <p className="text-gray-700 text-lg italic mb-6">&ldquo;{quote}&rdquo;</p>
              <h3 className="font-semibold text-xl text-[#594f3f]">{name}</h3>
              <p className="text-gray-500 text-sm">{role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
