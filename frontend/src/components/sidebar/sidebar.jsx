import React from "react";
import { useNavigate } from 'react-router-dom';
import "./sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <aside style={{ zIndex: 1 }}>
      <div className="sidebar">
        <ul>
          <li>
            <a onClick={()=>{navigate('/')}}>Home</a>
          </li>
          <li>
            <a onClick={()=>{navigate('/dashboard')}}>My Listings</a>
          </li>
          <li>
            <a onClick={()=>{navigate('/requests')}}>Requests</a>
          </li>
          <li>
            <a onClick={()=>{navigate('/addonrent')}}>Add on Rent</a>
          </li>
          <li>
            <a onClick={()=>{navigate('/product')}}>Product Page</a>
          </li>
          <li>
            <a onClick={()=>{navigate('/profile')}}>Profile</a>
          </li>
          {/* <li>
            <a href="#Users">Users</a>
          </li> */}
          <li>
            <a onClick={()=>{navigate('/dashboard')}}>Dashboard</a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
