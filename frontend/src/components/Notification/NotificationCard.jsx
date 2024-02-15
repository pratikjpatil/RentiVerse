// NotificationCard.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const NotificationCard = () => {
  const [notifications, setNotifications] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const backendUrl = process.env.REACT_APP_BACKEND_URL;

        const response = await axios.get(`${backendUrl}/api/notification/all`);

        setNotifications(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="absolute -right-6 mt-2 min-w-64 text-xs max-h-3/8 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-lg z-10">
      {!notifications ? (
        <p className="p-4">Loading...</p>
      ) : !notifications.length ? (
        <p className="p-4">No Notifications</p>
      ) : (
        <div className="divide-y divide-gray-200">
          {notifications.reverse().map((notification, index) => (
            <span key={notification.notificationId} className={`block p-2 ${index % 2 === 0 ? "bg-orange-50 border-b" : "bg-white border-b"}`}>
              {notification.content}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationCard;
