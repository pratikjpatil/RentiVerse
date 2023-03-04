import React from "react";
import "./sidebar.css";

const Sidebar = () => {
  return (
    <aside>
      <div className="sidebar">
        <ul>
          <li>
            <a href="#Home">Home</a>
          </li>
          <li>
            <a href="#Posts">Posts</a>
          </li>
          <li>
            <a href="#Users">Users</a>
          </li>
          <li>
            <a href="#dashboard">Dashboard</a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
