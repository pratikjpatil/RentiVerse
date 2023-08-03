import React, { useEffect, useRef } from "react";
import "./Overlay.css"; // Create a separate CSS file for notification card styles

const NotificationCard = ({ message, onClose }) => {
  // const cardRef = useRef(null);

  // // Close the card when clicked outside of it
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (cardRef.current && !cardRef.current.contains(event.target)) {
  //       onClose();
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, [onClose]);

  return (
    <div className="notification-card-overlay">
      {/* <div className="notification-card" ref={cardRef}> */}
        <div className="notification-content">
          {/* <p>{message || "No message"}</p>
          <button onClick={onClose}>Close</button> */}
        </div>
      </div>
    // </div>
  );
};

export default NotificationCard;
