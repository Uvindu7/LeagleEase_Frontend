import React, { useEffect, useState } from "react";
import QuickOverview from "./QuickOverview";
import ShortcutCards from "./ShortcutCards";

const DashboardContent = () => {
  const [notifications, setNotifications] = useState([]);

  // SSE to fetch notifications
  useEffect(() => {
    const eventSource = new EventSource(
      "http://localhost/backend/api/notifications_sse.php",
      { withCredentials: true }
    );

    eventSource.addEventListener("notifications", (event) => {
      try {
        const data = JSON.parse(event.data);
        // Keep only the 2 most recent notifications
        setNotifications(data.slice(0, 2));
      } catch (err) {
        console.error("Error parsing notifications:", err);
      }
    });

    eventSource.onerror = (err) => {
      console.error("SSE connection error:", err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="dashboard-content p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-white shadow-lg rounded-2xl p-6 text-gray-800">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back!</h1>
        <p className="text-gray-600">Here’s what’s happening with your account today.</p>
      </div>

      {/* Quick Overview & Shortcut Cards */}
      <QuickOverview />
      <ShortcutCards />

      {/* Notifications Box */}
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-4">🔔 Recent Notifications</h2>
        {notifications.length === 0 ? (
          <p className="text-gray-600">No new notifications.</p>
        ) : (
          <div className="space-y-4">
            {notifications.map((n) => (
              <div
                key={n.id}
                className="bg-gray-50 border border-gray-200 rounded-lg p-4"
              >
                <h3 className="font-semibold text-lg">{n.subject}</h3>
                <p className="text-gray-700">{n.message}</p>
                <small className="text-gray-400">
                  {new Date(n.created_at).toLocaleString()}
                </small>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardContent;
