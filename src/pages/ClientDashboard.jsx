import React, { useState } from 'react';

import Sidebar from '../Components/client/Sidebar';
import TopBar from '../Components/client/TopBar';
import DashboardContent from '../Components/client/DashboardContent';

const ClientDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* TopBar with hamburger menu control */}
      <TopBar onMenuClick={() => setSidebarOpen(true)} />

      {/* Sidebar and main content */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onOpen={() => setSidebarOpen(true)}
        />

        {/* Main content area */}
        <main className="flex-1 overflow-auto">
          <DashboardContent />
        </main>
      </div>
    </div>
  );
};

export default ClientDashboard;
