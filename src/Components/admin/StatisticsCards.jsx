import React from 'react';
import { UsersIcon, BriefcaseIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

const StatisticsCards = () => {
  const stats = [
    { title: 'Users', value: 1200, icon: <UsersIcon className="w-8 h-8 text-white" /> },
    { title: 'Active Lawyers', value: 85, icon: <BriefcaseIcon className="w-8 h-8 text-white" /> },
    { title: 'Total Revenue', value: '$25,000', icon: <CurrencyDollarIcon className="w-8 h-8 text-white" /> },
  ];

  const cardColors = ['from-[#3e352a] to-[#5a4e41]', 'from-[#4e4234] to-[#6b5e4a]', 'from-[#6b5e4a] to-[#8a7a68]'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-gradient-to-br p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-between hover:scale-[1.02]"
          style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-from), var(--tw-gradient-to))` }}
        >
          <div className={`flex items-center justify-center p-4 rounded-full bg-white shadow`}>
            {React.cloneElement(stat.icon, { className: 'w-8 h-8 text-[#3e352a]' })}
          </div>
          <div className="text-right text-white">
            <h2 className="text-md font-medium">{stat.title}</h2>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
        </div>
      )).map((card, index) =>
        React.cloneElement(card, { className: `${card.props.className} ${cardColors[index % cardColors.length]}` })
      )}
    </div>
  );
};

export default StatisticsCards;
