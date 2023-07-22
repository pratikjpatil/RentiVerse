import React from "react";
import "./sidebar.css";

const Sidebar = () => {
  return (
    <aside style={{ zIndex: 1 }}>
      <div className="sidebar">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="#Posts">My Listings</a>
          </li>
          <li>
            <a href="/requestPage">Requests</a>
          </li>
          <li>
            <a href="/addonrent">Add on Rent</a>
          </li>
          <li>
            <a href="/productpage">Product Page</a>
          </li>
          {/* <li>
            <a href="#Users">Users</a>
          </li> */}
          <li>
            <a href="/dashboard">Dashboard</a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
