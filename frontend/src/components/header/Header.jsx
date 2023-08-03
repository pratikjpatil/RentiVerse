// Header.js

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext"; // Import the AuthContext for user authentication
import logop from "../../assets/logop.png"; // Import the logo image
import notification from "../../assets/notification.png"; // Import the notification icon
import NotificationCard from "../Notification/NotificationCard"; 
import "./header.css"; 

const Header = ({ onSearch }) => {
  // Define state variables using the useState hook
  const [searchTerm, setSearchTerm] = useState("");
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);
  const [notificationMessages, setNotificationMessages] = useState([]);

  // Use the useNavigate hook to get the navigate function for programmatic navigation
  const navigate = useNavigate();

  // Use the useContext hook to get the AuthContext data for user authentication
  const { isLoggedIn, setIsLoggedIn, firstName, setFirstName } =
    useContext(AuthContext);

  // Event handler for input change in the search bar
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  // Event handler for search form submission
  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  // Event handler for profile menu click (toggling profile dropdown)
  const handleProfileClick = () => {
    setIsProfileDropdownOpen((prevState) => !prevState);
    // Close the notification dropdown when profile dropdown is opened
    if (isNotificationDropdownOpen) {
      setIsNotificationDropdownOpen(false);
    }
  };

  // Event handler for user logout
  const handleLogout = async () => {
    try {
      // Make an API call to logout the user
      const result = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/logout`,
        { withCredentials: true }
      );

      // If logout is successful, update the state and navigate to login page
      if (result.status === 200) {
        setIsProfileDropdownOpen(false);
        setFirstName("?");
        setIsLoggedIn(false);
        navigate("/login");
      } else {
        // If logout fails, show an error message
        window.alert("Failed to logout.");
      }
    } catch (error) {
      // If an error occurs during logout, show an error message
      console.error("Logout error:", error);
      window.alert("Failed to logout. Please try again.");
    }
  };

  // Event handler for notification icon click (toggling notification dropdown)
  const handleNotificationClick = () => {
    setIsNotificationDropdownOpen((prev) => !prev);
    // Close the profile dropdown when notification dropdown is opened
    if (isProfileDropdownOpen) {
      setIsProfileDropdownOpen(false);
    }
    // For demonstration purposes, set some example notification messages
    setNotificationMessages([
      "Your Request is accepted or not",
      "Your Request is accepted or not",
      "Your Request is accepted or not",
      "Notification 2",
      "Notification 3",
    ]);
  };

  // Event handler for closing the notification dropdown
  const handleNotificationClose = () => {
    setIsNotificationDropdownOpen(false);
    setNotificationMessages([]); 
  };

  return (
    <>
      <header style={{ position: "fixed", width: "100%", zIndex: 2 }}>
        <div className="logo flex-center">
          <img
            src={logop}
            alt="logos"
            onClick={() => {
              navigate("/");
            }}
          />
        </div>

        {/* Search Bar */}
        {window.location.href !== "http://localhost:3000/addonrent" &&
          window.location.href !== "http://localhost:3000/product" &&
          window.location.href !== "http://localhost:3000/request" &&
          window.location.href !== "http://localhost:3000/profile" && (
            <div className="search flex-center">
              <div className="search-logo flex-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </div>

              <form onSubmit={handleSearch}>
                <input
                  id="input_search"
                  type="text"
                  name="input"
                  placeholder="Search what you want"
                  value={searchTerm}
                  onChange={handleInputChange}
                />
                <button className="search-button" type="submit">
                  Search
                </button>
              </form>
            </div>
          )}

        {/* Profile Section */}
        <div className="profile flex-center">
          <div className="profile-cart flex-center">
            <img
              className="notification-img"
              src={notification}
              alt="notification"
              onClick={handleNotificationClick}
            />
          </div>

          {/* Profile Menu */}
          <div className="profile-menu flex-center" onClick={handleProfileClick}>
            <div className="profile-logo">{firstName.charAt(0)}</div>
            <div className="flex-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
          </div>

          {/* Render the profile dropdown when isProfileDropdownOpen is true */}
          {isProfileDropdownOpen && (
            <div className="dropdown-menu">
              <ul>
                <li onClick={() => navigate("/profile")}>Profile</li>
                {isLoggedIn ? (
                  <li onClick={handleLogout}>Logout</li>
                ) : (
                  <li onClick={() => navigate("/login")}>Login</li>
                )}
              </ul>
            </div>
          )}
          {/* Render the NotificationCard dropdown when isNotificationDropdownOpen is true */}
          {isNotificationDropdownOpen && (
            <NotificationCard
              messages={notificationMessages}
              onClose={handleNotificationClose}
            />
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
