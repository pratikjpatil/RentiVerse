import React, { useState } from "react";
import logop from "../../assets/logop.png";
import "./header.css";

const Header = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(searchTerm);
    console.log(searchTerm);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <header style={{ position: "fixed", width: "100%", zIndex: 2 }}>
      <div className="logo flex-center">
        <img src={logop} alt="logos" />
      </div>
      {window.location.href !== "http://localhost:3000/addonrent" &&
        window.location.href !== "http://localhost:3000/productpage" &&
        window.location.href !== "http://localhost:3000/requestPage" && (
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

      <div className="profile flex-center">
        <div className="profile-cart flex-center">
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
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
          <span>Cart</span>
        </div>
        <div className="profile-menu flex-center">
          <div className="profile-logo">G</div>
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
      </div>
    </header>
  );
};

export default Header;
