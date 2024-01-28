// // Header.js

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext"; // Import the AuthContext for user authentication
import logo from "../../assets/logop.png"; // Import the logo image
import {useDispatch, useSelector} from "react-redux";
import SearchBox from "../searchBox/searchBox";
import toast from "react-hot-toast";
import { setSidebarStatus } from "../../store/sidebarSlice";

function Header({ setSearchText }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.userData);
  const sidebarStatus = useSelector((state) => state.sidebar.status);
  const dispatch = useDispatch();

  return (
    <div>
      <div className="bg-white">
        <div className="flex-col flex">
          <div className="w-full border-b-2 border-gray-200">
            <div className="fixed bg-white h-16 justify-between items-center mx-auto px-4 w-full z-50 flex shadow-xl">

              <div>
              <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-1 mr-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        onClick={()=>{dispatch(setSidebarStatus(!sidebarStatus))}}
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
            clip-rule="evenodd"
            fill-rule="evenodd"
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
                    <p className="font-semibold text-sm hidden md:inline-block">{`${user.firstName} ${user.lastName}`}</p>
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
