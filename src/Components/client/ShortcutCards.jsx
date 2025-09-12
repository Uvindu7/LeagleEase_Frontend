import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Video } from 'lucide-react';

const ShortcutCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      
      {/* Book Lawyer Card */}
      <Link 
        to="/browselawyers" 
        className="bg-white/80 backdrop-blur-md border border-gray-200 p-6 rounded-3xl shadow-lg flex items-center justify-between cursor-pointer hover:scale-105 transition-transform duration-300 hover:shadow-2xl"
      >
        <div>
          <h3 className="text-2xl font-bold text-[#3e352a] mb-1">Book a Lawyer</h3>
          <p className="text-gray-600 text-sm">Find and schedule a lawyer now</p>
        </div>
        <PlusCircle className="w-12 h-12 text-[#3e352a] hover:text-[#5a4e41] transition-colors duration-300" />
      </Link>

      {/* Join Meeting Card */}
      <Link 
        to="/meeting" 
        className="bg-white/80 backdrop-blur-md border border-gray-200 p-6 rounded-3xl shadow-lg flex items-center justify-between cursor-pointer hover:scale-105 transition-transform duration-300 hover:shadow-2xl"
      >
        <div>
          <h3 className="text-2xl font-bold text-[#3e352a] mb-1">Join Meeting</h3>
          <p className="text-gray-600 text-sm">Quickly access your scheduled meeting</p>
        </div>
        <Video className="w-12 h-12 text-[#3e352a] hover:text-[#5a4e41] transition-colors duration-300" />
      </Link>
    </div>
  );
};

export default ShortcutCards;

