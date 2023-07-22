import React, { useState } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import Header from "../../components/header/Header";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleInputChange = (event) => {
    // Do any additional logic here if needed when the user updates the input fields.
    // For simplicity, we are not implementing the actual saving functionality in this example.
  };

  return (
    <>
      <Header />
      <Sidebar />
      <div className="body">
        <div className="container">
          <div className="header-content">
            <h1>Profile</h1>
          </div>
          <div className="form-box">
            <form className="form-group">
              <div className="input-wrapper">
                <label htmlFor="fullname">Full Name</label>
                <input
                  className="input-same"
                  type="text"
                  id="fullname"
                  name="fullname"
                  placeholder="Full Name"
                  autoFocus={isEditMode} // Autofocus when in edit mode
                  onChange={handleInputChange} // Listen for changes in the input field
                  disabled={!isEditMode} // Disable the input field when not in edit mode
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="address">Address</label>
                <input
                  className="input-same"
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Address"
                  disabled={!isEditMode} // Disable the input field when not in edit mode
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="pincode">PinCode</label>
                <input
                  type="number"
                  id="pincode"
                  name="pincode"
                  placeholder="Pincode"
                  disabled={!isEditMode} // Disable the input field when not in edit mode
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="email">Email Address</label>
                <input
                  className="input-same"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="tejas@gmail.com"
                  disabled={!isEditMode} // Disable the input field when not in edit mode
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="phone">Phone</label>
                <input
                  className="input-same"
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Phone Number"
                  disabled={!isEditMode} // Disable the input field when not in edit mode
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input
                  className="input-same"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  disabled={!isEditMode} // Disable the input field when not in edit mode
                />
              </div>

              <input
                className="button-change"
                type="button"
                value={isEditMode ? "SAVE CHANGES" : "EDIT"}
                onClick={
                  isEditMode ? () => setIsEditMode(false) : handleEditClick
                }
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
