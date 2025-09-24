import React, { useEffect, useState } from 'react';
import { CalendarDaysIcon, CurrencyDollarIcon, StarIcon, VideoCameraIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const OverviewCards = ({ lawyer }) => {
  const [reviews, setReviews] = useState([]);
  const [appointments, setAppointments] = useState(24); // example static data
  const [earnings, setEarnings] = useState(5200);      // example static data

  // Fetch reviews
  useEffect(() => {
    if (!lawyer?.id) return;

    fetch(`http://localhost/backend/api/reviews.php?lawyer_id=${lawyer.id}`)
      .then(res => res.json())
      .then(data => setReviews(data))
      .catch(err => console.error("Error fetching reviews:", err));
  }, [lawyer]);

  // Calculate average rating
  const averageRating =
    reviews.length === 0
      ? 0
      : (reviews.reduce((sum, r) => sum + parseInt(r.rating), 0) / reviews.length).toFixed(1);

  const cards = [
    {
      key: "appointments",
      title: "Appointments",
      value: appointments,
      iconBg: "from-[#3e352a] to-[#5a4e41]",
      icon: <CalendarDaysIcon className="w-6 h-6 text-white" />,
      clickable: false,
    },
    {
      key: "reviews",
      title: "Reviews",
      value: reviews.length === 0 ? "No reviews" : `${averageRating} (${reviews.length})`,
      iconBg: "from-[#6b5e4a] to-[#857661]",
      icon: <StarIcon className="w-6 h-6 text-white" />,
      clickable: true,
      path: "/reviews",
    },
    {
      key: "meeting",
      title: "Join Meeting",
      value: "Quick access",
      iconBg: "from-[#3e352a] to-[#5a4e41]",
      icon: <VideoCameraIcon className="w-6 h-6 text-white" />,
      clickable: true,
      path: "/video",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card) => {
        const cardContent = (
          <div
            className="flex items-center justify-between p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer"
          >
            {/* Icon Circle */}
            <div
              className={`w-14 h-14 rounded-full bg-gradient-to-r ${card.iconBg} flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}
            >
              {card.icon}
            </div>

            {/* Text Content */}
            <div className="text-right">
              <h2 className="text-lg font-medium text-gray-600">{card.title}</h2>
              <p className="text-3xl font-bold text-gray-900 mt-1">{card.value}</p>
            </div>
          </div>
        );

        return card.clickable ? (
          <Link key={card.key} to={card.path} state={{ lawyer }}>
            {cardContent}
          </Link>
        ) : (
          <div key={card.key}>{cardContent}</div>
        );
      })}
    </div>
  );
};

export default OverviewCards;


