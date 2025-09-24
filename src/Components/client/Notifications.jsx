import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import backgroundImg from "../../assets/browse lawyer bg.jpg";

const ClientNotifications = () => {
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
        setNotifications(data);
      } catch (err) {
        console.error("Error parsing notifications:", err);
      }
    });

    eventSource.onerror = () => {
      console.error("Error receiving notifications");
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  // Mark notification as read
  const markAsRead = async (notification_id) => {
    try {
      await fetch("http://localhost/backend/api/mark_as_read.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ notification_id }),
      });

      setNotifications((prev) =>
        prev.map((n) =>
          n.notification_id === notification_id ? { ...n, is_read: 1 } : n
        )
      );
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div
        className="flex flex-1"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <main className="flex-1 p-6 text-black pt-20">
          <h1 className="text-3xl font-bold mb-6 px-4 py-2 rounded-md bg-black/50 text-white inline-block">
            🔔 Your Notifications
          </h1>

          {notifications.length === 0 ? (
            <div className="bg-[#f8e7bdf3] rounded-lg p-6 text-center shadow-md">
              <p className="text-gray-700">No new notifications.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((n) => (
                <div
                  key={n.notification_id}
                  className="bg-[#f8e7bdf3] rounded-lg shadow-md p-4 flex justify-between items-center hover:shadow-lg transition-shadow"
                >
                  <div>
                    <h3 className="font-semibold text-lg">
                      {n.subject.includes("Payment") ? "✅ " : "📝 "}
                      {n.subject}
                    </h3>
                    <p className="text-gray-700">{n.message}</p>
                    <small className="text-gray-500">
                      {new Date(n.created_at).toLocaleString()}
                    </small>
                  </div>
                  {n.is_read !== 1 && (
                    <button
                      onClick={() => markAsRead(n.notification_id)}
                      className="ml-4 px-4 py-2 bg-[#6e4d1e] text-white rounded-lg hover:bg-[#4a3414]"
                    >
                      Mark as Read
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default ClientNotifications;
