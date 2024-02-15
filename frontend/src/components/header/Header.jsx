// // Header.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logop.png"; // Import the logo image
import { useDispatch, useSelector } from "react-redux";
import SearchBox from "../searchBox/searchBox";
import { setSidebarStatus } from "../../store/sidebarSlice";
import NotificationCard from "../Notification/NotificationCard";

function Header({ setSearchText }) {
  const [showNotifications, setShowNotifications] = useState(false);

  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.userData);
  const sidebarStatus = useSelector((state) => state.sidebar.status);
  const dispatch = useDispatch();


  return (
    <>
      <div className="bg-white">
          <div className="w-full border-b-2 border-gray-200">
            <div className="fixed bg-white h-16 justify-between items-center mx-auto px-4 w-full z-50 flex shadow-xl">
              <div>
                <button
                  data-drawer-target="default-sidebar"
                  data-drawer-toggle="default-sidebar"
                  aria-controls="default-sidebar"
                  type="button"
                  className="inline-flex items-center p-1 mr-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  onClick={() => {
                    dispatch(setSidebarStatus(!sidebarStatus));
                  }}
                >
                  <span className="sr-only">Open sidebar</span>
                  <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    ></path>
                  </svg>
                </button>
              </div>

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

              {((window.location.pathname === "/" ||
              window.location.pathname === "/category/search") && window.innerWidth >= 768) ? (
                <div className="hidden md:inline-block mr-auto ml-40 relative max-w-xs">
                <SearchBox setSearchText={setSearchText} />
                </div>
                
              ) : (
                ""
              )}

              {user ? (
                <div className="md:space-x-6 justify-end items-center ml-auto flex space-x-3">
                  <div className="relative cursor-pointer select-none">
                    <p
                      className="pt-1 pr-1 pb-1 pl-1 bg-white text-gray-700 rounded-full transition-all duration-200
                hover:text-gray-900 focus:outline-none hover:bg-gray-100"
                      onClick={() => setShowNotifications(!showNotifications)} // Step 3: Toggle dropdown visibility
                    >
                      <span className="justify-center items-center flex">
                        <span className="justify-center items-center flex">
                          <span className="items-center justify-center flex">
                            <svg
                              className="w-6 h-6"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4
                        0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6
                        0H9"
                              />
                            </svg>
                          </span>
                        </span>
                      </span>
                    </p>
                    {showNotifications && ( // Step 2: Render dropdown if showNotifications is true
                      <NotificationCard />
                    )}
                  </div>
                  <div
                    className="flex justify-center items-center relative cursor-pointer"
                    onClick={() => navigate("/profile")}
                  >
                    <span
                      className="h-9 w-9 rounded-full mr-2 bg-green-100 flex justify-center items-center font-bold"
                      alt=""
                    >{user.firstName[0]}</span>
                    <p className="font-semibold text-sm hidden md:inline-block">{`${user.firstName} ${user.lastName}`}</p>
                  </div>
                </div>
              ) : null}

              
            </div>
            
          </div>

          {((window.location.pathname === "/" ||
              window.location.pathname === "/category/search") && window.innerWidth < 768) ? (
                <div className="bg-white md:hidden h-16 flex items-center mx-auto mt-16 -mb-20 px-4 w-full z-50 shadow-xl">
                  <div className="relative w-full">
                <SearchBox setSearchText={setSearchText} />
                </div>
                </div>
                
              ) : (
                ""
              )}


      </div>
    </>
  );
}

export default Header;
