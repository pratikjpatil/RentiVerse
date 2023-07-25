import React, { useState } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import Header from "../../components/header/Header";
import maleImage from "../../assets/male.png";

import "./ProfilePage.css";

const ProfilePage = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    gender: "Male",
    mobile: "+91 9595729100",
    email: "example@email.com",
    village: "Your Village",
    district: "Your District",
    city: "Your City",
    state: "Your State",
    pincode: "Your Pincode",
    password: "",
  });

  const handleEditClick = () => {
    setIsEditMode(!isEditMode);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <Header />
      <Sidebar />
      <div className="body">
        <div className="profile-header">
          <h1>
            Personal Information
            {isEditMode ? (
              <button className="edit-button" onClick={handleEditClick}>
                Cancel
              </button>
            ) : (
              <button className="edit-button" onClick={handleEditClick}>
                Edit
              </button>
            )}
          </h1>
        </div>
        <div className="profile-container">
          <div className="form-box">
            <form className="profile-form">
              <div className="row">
                <div className="col">
                  <label htmlFor="firstName" className="profile-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Type your First name"
                    disabled={!isEditMode}
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col">
                  <label htmlFor="lastName" className="profile-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Type your Last name"
                    disabled={!isEditMode}
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <label className="profile-label">Gender</label>
                  <div className="gender-buttons">
                    <button className="transparent-blue">
                      <img src={maleImage} alt="Male" className="gender-icon" />
                      Male
                    </button>
                    {/* Add more gender buttons here */}
                  </div>
                </div>
                <div className="col">
                  <label htmlFor="mobile" className="profile-label">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    placeholder="+91 9595729100"
                    disabled={!isEditMode}
                    value={formData.mobile}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <label htmlFor="email" className="profile-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="example@email.com"
                    disabled={!isEditMode}
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <label htmlFor="town" className="profile-label">
                    Village/Town
                  </label>
                  <input
                    type="text"
                    id="town"
                    name="town"
                    placeholder="Type your village"
                    disabled={!isEditMode}
                    value={formData.village}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col">
                  <label htmlFor="district" className="profile-label">
                    District
                  </label>
                  <input
                    type="text"
                    id="district"
                    name="district"
                    placeholder="Type your district"
                    disabled={!isEditMode}
                    value={formData.district}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <label htmlFor="city" className="profile-label">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="Type Your city"
                    disabled={!isEditMode}
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col">
                  <label htmlFor="state" className="profile-label">
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    placeholder="Type your State"
                    disabled={!isEditMode}
                    value={formData.state}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <label htmlFor="pincode" className="profile-label">
                    Pincode
                  </label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    placeholder="Type your pincode"
                    disabled={!isEditMode}
                    value={formData.pincode}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col">
                  <label htmlFor="password" className="profile-label">
                    Set Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Type your password"
                    disabled={!isEditMode}
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {isEditMode && (
                <button type="submit" className="transparent-profile">
                  Save
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
