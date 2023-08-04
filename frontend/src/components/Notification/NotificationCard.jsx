// NotificationCard.js
import React from "react";
import "./NotificationCard.css";

const NotificationCard = ({ messages, onClose }) => {
  return (
    <div className="notification-card">
      <div className="notification-content">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <p key={index}>{message}</p>
          ))
        ) : (
          <p>No messages</p>
        )}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default NotificationCard;
