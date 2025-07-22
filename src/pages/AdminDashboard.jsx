import React, { useState } from 'react';

import TopBar from '../Components/admin/TopBar';

import LawyerVerification from '../Components/admin/LawyerVerification';
import DisputeResolution from '../Components/admin/DisputeResolution';
import BookingMonitor from '../Components/admin/BookingMonitor';
import PaymentLogs from '../Components/admin/PaymentLogs';
import Sidebar from '../Components/admin/sidebar';
import StatisticsCards from '../Components/admin/StatisticsCards';

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); //Sidebar state

  return (
    <div className="flex flex-col min-h-screen lg:flex-row relative">
      
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col">
        
        <TopBar onMenuClick={() => setIsSidebarOpen(true)} />

        <div className="p-4 flex flex-col gap-6">
          <StatisticsCards />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LawyerVerification />
            <DisputeResolution />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BookingMonitor />
            <PaymentLogs />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
