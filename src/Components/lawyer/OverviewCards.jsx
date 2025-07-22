import React from 'react';
import { CalendarDaysIcon, CurrencyDollarIcon, StarIcon } from '@heroicons/react/24/outline';


const cards = [
  {
    title: 'Appointments',
    value: 24,
    iconBg: 'from-[#3e352a] to-[#5a4e41]',
    icon: <CalendarDaysIcon className="w-6 h-6 text-white" />,
  },
  {
    title: 'Earnings',
    value: '$5,200',
    iconBg: 'from-[#4e4234] to-[#6d5f4f]',
    icon: <CurrencyDollarIcon className="w-6 h-6 text-white" />,
  },
  {
    title: 'Reviews',
    value: '4.8',
    iconBg: 'from-[#6b5e4a] to-[#857661]',
    icon: <StarIcon className="w-6 h-6 text-white" />,
  },
];

const OverviewCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
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
      ))}
    </div>
  );
};

export default OverviewCards;
