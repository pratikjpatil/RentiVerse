import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Sidebar from "../../components/sidebar/sidebar";
import Header from "../../components/header/Header";
import maleImage from "../../assets/male.png";
import femaleImage from "../../assets/female.png"
import toast from 'react-hot-toast';
import "./ProfilePage.css";

const ProfilePage = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    phone: "",
    email: "",
    password: "",
    village: "",
    district: "",
    city: "",
    state: "",
    pincode: "",
  });
  const navigate = useNavigate();

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {

    const fetchProfile = async () => {

      try {
        
        const profile = await axios.get(backendUrl + "/api/profile/me", { withCredentials: true });
        setFormData(profile.data);

      } catch (error) {

        console.log(error);
        toast.error(error.response.data.message);
      }
    }

    fetchProfile();
  }, []);




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

  const handleFormSubmit = async () => {
    const toastId = toast.loading("updating...");
    try {
      
      const response = await axios.put(backendUrl + "/api/profile/edit", formData, { withCredentials: true });
      if (response.status === 200) {
        toast.success("Profile updated successfully!", {id: toastId});
      }
    } catch (error) {

      if (error.response && error.response.status === 401) {
        toast.error("Oops! you are not logged in.", {id: toastId});

        // Redirect to login page when unauthenticated
        navigate("/login");

      } else {
        console.log(error);
        toast.error(error.response.data.message);
        navigate('/');
      }
    }

  }



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
            <form className="profile-form" onSubmit={handleFormSubmit}>
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
                    disabled={true}
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
                    disabled={true}
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <label className="profile-label">Gender</label>
                  <div className="gender-buttons">

                    {
                      formData.gender === "male" ?
                        <div className="transparent-blue-profile">
                          <img src={maleImage} alt="Male" className="gender-icon" />
                          &nbsp; Male
                        </div>
                        :
                        <div className="transparent-blue-profile">
                          <img src={femaleImage} alt="Female" className="gender-icon" />
                          &nbsp; Female
                        </div>

                    }


                    {/* Add more gender buttons here */}
                  </div>
                </div>
                <div className="col">
                  <label htmlFor="phone" className="profile-label">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="+91 0000000000"
                    disabled={!isEditMode}
                    value={formData.phone}
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
                  <label htmlFor="village" className="profile-label">
                    Village/Town
                  </label>
                  <input
                    type="text"
                    id="village"
                    name="village"
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
                  {
                    isEditMode ?
                      <>
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
                      </>
                      :
                      ""
                  }

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
