// // Header.js

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext"; // Import the AuthContext for user authentication
import logo from "../../assets/logop.png"; // Import the logo image
import notification from "../../assets/notification.png"; // Import the notification icon
import NotificationCard from "../Notification/NotificationCard";
import SearchBox from "../searchBox/searchBox";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
// const Header = ({ onSearch }) => {
//   // Define state variables using the useState hook
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
//   const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);
//   const [notificationMessages, setNotificationMessages] = useState([]);

//   // Use the useNavigate hook to get the navigate function for programmatic navigation
//   const navigate = useNavigate();

//   // Use the useContext hook to get the AuthContext data for user authentication
//   const { isLoggedIn, setIsLoggedIn, firstName, setFirstName } =
//     useContext(AuthContext);

//   // Event handler for input change in the search bar
//   const handleInputChange = (event) => {
//     setSearchTerm(event.target.value);
//     onSearch(event.target.value);
//   };

//   // Event handler for search form submission
//   const handleSearch = (event) => {
//     event.preventDefault();
//     onSearch(searchTerm);
//   };

//   // Event handler for profile menu click (toggling profile dropdown)
//   const handleProfileClick = () => {
//     setIsProfileDropdownOpen((prevState) => !prevState);
//     // Close the notification dropdown when profile dropdown is opened
//     if (isNotificationDropdownOpen) {
//       setIsNotificationDropdownOpen(false);
//     }
//   };

//   // Event handler for user logout
//   const handleLogout = async () => {
//     try {
//       // Make an API call to logout the user
//       const result = await axios.delete(
//         `${process.env.REACT_APP_BACKEND_URL}/api/user/logout`,
//         { withCredentials: true }
//       );

//       // If logout is successful, update the state and navigate to login page
//       if (result.status === 200) {
//         setIsProfileDropdownOpen(false);
//         setFirstName("?");
//         setIsLoggedIn(false);
//         navigate("/login");
//       } else {
//         // If logout fails, show an error message
//         window.alert("Failed to logout.");
//       }
//     } catch (error) {
//       // If an error occurs during logout, show an error message
//       console.error("Logout error:", error);
//       window.alert("Failed to logout. Please try again.");
//     }
//   };

//   // Event handler for notification icon click (toggling notification dropdown)
//   const handleNotificationClick = () => {
//     setIsNotificationDropdownOpen((prev) => !prev);
//     // Close the profile dropdown when notification dropdown is opened
//     if (isProfileDropdownOpen) {
//       setIsProfileDropdownOpen(false);
//     }
//     // For demonstration purposes, set some example notification messages
//     setNotificationMessages([
//       "Your Request is accepted or not",
//       "Your Request is accepted or not",
//       "Your Request is accepted or not",
//       "Notification 2",
//       "Notification 3",
//     ]);
//   };

//   // Event handler for closing the notification dropdown
//   const handleNotificationClose = () => {
//     setIsNotificationDropdownOpen(false);
//     setNotificationMessages([]);
//   };

//   return (
//     <>
//       <header style={{ position: "fixed", width: "100%", zIndex: 2 }}>
//         <div className="logo flex-center">
//           <img
//             src={logo}
//             alt="logos"
//             onClick={() => {
//               navigate("/");
//             }}
//           />
//         </div>

//         {/* Search Bar */}
//         {window.location.href !== "http://localhost:3000/addonrent" &&
//           window.location.href !== "http://localhost:3000/product" &&
//           window.location.href !== "http://localhost:3000/request" &&
//           window.location.href !== "http://localhost:3000/profile" && (
//             <div className="search flex-center">
//               <div className="search-logo flex-center">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth="1.5"
//                   stroke="currentColor"
//                   className="w-6 h-6"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
//                   />
//                 </svg>
//               </div>

//               <form onSubmit={handleSearch}>
//                 <input
//                   id="input_search"
//                   type="text"
//                   name="input"
//                   placeholder="Search what you want"
//                   value={searchTerm}
//                   onChange={handleInputChange}
//                 />
//                 <button className="search-button" type="submit">
//                   Search
//                 </button>
//               </form>
//             </div>
//           )}

//         {/* Profile Section */}
//         <div className="profile flex-center">
//           <div className="profile-cart flex-center">
//             <img
//               className="notification-img"
//               src={notification}
//               alt="notification"
//               onClick={handleNotificationClick}
//             />
//           </div>

//           {/* Profile Menu */}
//           <div className="profile-menu flex-center" onClick={handleProfileClick}>
//             <div className="profile-logo">{firstName.charAt(0)}</div>
//             <div className="flex-center">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth="1.5"
//                 stroke="currentColor"
//                 className="w-6 h-6"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M19.5 8.25l-7.5 7.5-7.5-7.5"
//                 />
//               </svg>
//             </div>
//           </div>

//           {/* Render the profile dropdown when isProfileDropdownOpen is true */}
//           {isProfileDropdownOpen && (
//             <div className="dropdown-menu">
//               <ul>
//                 <li onClick={() => navigate("/profile")}>Profile</li>
//                 {isLoggedIn ? (
//                   <li onClick={handleLogout}>Logout</li>
//                 ) : (
//                   <li onClick={() => navigate("/login")}>Login</li>
//                 )}
//               </ul>
//             </div>
//           )}
//           {/* Render the NotificationCard dropdown when isNotificationDropdownOpen is true */}
//           {isNotificationDropdownOpen && (
//             <NotificationCard
//               messages={notificationMessages}
//               onClose={handleNotificationClose}
//             />
//           )}
//         </div>
//       </header>
//     </>
//   );
// };

// export default Header;

function Header({ setSearchText }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.userData);

  return (
    <div>
      <div className="pt-0 pr-0 pb-0 pl-0 mt-0 mr-0 mb-0 ml-0"></div>
      <div className="bg-white">
        <div className="flex-col flex">
          <div className="w-full border-b-2 border-gray-200">
            <div className="fixed bg-white h-16 justify-between items-center mx-auto px-4 w-full flex z-10 shadow-xl">
              <div>
                <img
                  src={logo}
                  onClick={() => {
                    navigate("/");
                  }}
                  className="block object-contain w-auto h-full"
                  alt="Rentiverse"
                />
              </div>

              {window.location.pathname === "/" ? (
                <SearchBox setSearchText={setSearchText} />
              ) : (
                ""
              )}

              {user ? (
                <div className="md:space-x-6 justify-end items-center ml-auto flex space-x-3">
                  
                  <div className="relative">
                    <p
                      className="pt-1 pr-1 pb-1 pl-1 bg-white text-gray-700 rounded-full transition-all duration-200
                hover:text-gray-900 focus:outline-none hover:bg-gray-100"
                    >
                      <span className="justify-center items-center flex">
                        <span className="justify-center items-center flex">
                          <span className="items-center justify-center flex">
                            <svg
                              className="w-6 h-6"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewbox="0 0 24 24"
                              stroke="currentColor"
                              stroke-width="2"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4
                        0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6
                        0H9"
                              />
                            </svg>
                          </span>
                        </span>
                      </span>
                    </p>
                    <p
                      className="px-1.5 py-0.5 font-semibold text-xs items-center bg-indigo-600 text-white rounded-full inline-flex
                absolute -top-px -right-1"
                    >
                      2
                    </p>
                  </div>
                  <div className="justify-center items-center flex relative cursor-pointer" onClick={()=>navigate("/profile")}>
                    <img
                      src="https://static01.nyt.com/images/2019/11/08/world/08quebec/08quebec-superJumbo.jpg"
                      className="object-cover btn- h-9 w-9 rounded-full mr-2 bg-gray-300"
                      alt=""
                    />
                    <p className="font-semibold text-sm">{`${user.firstName} ${user.lastName}`}</p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
