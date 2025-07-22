import React from 'react';
import { ScaleIcon } from '@heroicons/react/24/outline';

const DisputeResolution = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg h-80 flex flex-col items-center justify-center border border-gray-200 hover:shadow-xl transition cursor-pointer">
      
      {/* Header with Icon */}
      <div className="flex flex-col items-center mb-4">
        <ScaleIcon className="w-12 h-12 text-[#3e352a] mb-2" />
        <h2 className="text-2xl font-extrabold text-[#3e352a] tracking-wide">Dispute Resolution</h2>
      </div>

      {/* Description or Placeholder */}
      <p className="text-gray-500 text-center px-4">
        Manage and resolve disputes between clients and lawyers. Click to review active cases.
      </p>
    </div>
  );
};

export default DisputeResolution;
