import React from 'react';
import QuickOverview from './QuickOverview';
import ShortcutCards from './ShortcutCards';
import Notifications from './Notifications';

const DashboardContent = () => {
  // You can later pass the user name as a prop or get it from context/auth
  const userName = 'John Doe';

  return (
    <div className="dashboard-content p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-white shadow-lg rounded-2xl p-6 text-gray-800">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, {userName}!</h1>
        <p className="text-gray-600">Here’s what’s happening with your account today.</p>
      </div>

      {/* Dashboard Sections */}
      <QuickOverview />
      <ShortcutCards />
      <Notifications />
    </div>
  );
};

export default DashboardContent;
