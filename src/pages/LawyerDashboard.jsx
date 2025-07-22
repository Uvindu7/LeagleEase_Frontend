import React, { useState } from 'react';


import TopBar from '../Components/lawyer/TopBar';
import OverviewCards from '../Components/lawyer/OverviewCards';


import Sidebar from '../Components/lawyer/SideBar';
import CalendarSection from '../Components/lawyer/CalenderSection';
import NotificationsSection from '../Components/lawyer/NotificatioSection';

const LawyerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar with toggle */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onOpen={() => setSidebarOpen(true)}
      />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-y-auto">
        {/* TopBar with hamburger menu toggle */}
        <TopBar onMenuClick={() => setSidebarOpen(true)} />

        <main className="p-4 flex flex-col gap-6">
          {/* Overview Cards */}
          <OverviewCards />

          {/* Calendar and Notifications */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Calendar Section */}
            <div className="flex-1">
              <CalendarSection/>
            </div>

            {/* Notifications Section */}
            <div className="flex-1 lg:max-w-sm">
              <NotificationsSection />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LawyerDashboard;
