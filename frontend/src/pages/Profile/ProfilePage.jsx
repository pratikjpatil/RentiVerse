import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Sidebar from "../../components/sidebar/sidebar";
import Header from "../../components/header/Header";
import maleImage from "../../assets/male.png";
import femaleImage from "../../assets/female.png";
import toast from "react-hot-toast";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({});
  const [activeTab, setActiveTab] = useState(1);

  const navigate = useNavigate();

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await axios.get(backendUrl + "/api/profile/me", {
          withCredentials: true,
        });
        setUserData(profile.data);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    };

    fetchProfile();
  }, []);

  const handleEditClick = () => {
    setEditMode((prev)=>!prev);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleFormSubmit = async () => {
    const toastId = toast.loading("updating...");
    try {
      const response = await axios.put(
        backendUrl + "/api/profile/edit",
        userData,
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success("Profile updated successfully!", { id: toastId });
        setEditMode(false);
      }
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message, { id: toastId });
        navigate("/");
      
    }
  };


  const handleToggleTab = (tabIndex) => {
    setActiveTab(tabIndex);
  };


  const activeTabStyles =
    "inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500";
  const inactiveTabStyles =
    "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300";
  const editModeStyles =
    "w-fit ml-6 p-0 text-base font-medium bg-transparent text-blue-700 text-right";

  const simpleStyles =
    "w-fit ml-6 p-0 text-base font-medium bg-transparent text-blue-700 text-right border-transparent";



  return (
    <>
      <Header />
      <Sidebar />

      <div className="flex justify-center">
        <div className="p-6 mt-5 sm:ml-64 md:w-1/2 lg:mt-28 flex flex-col justify-center">
          <div className="w-full flex justify-between">
            <h3 className="text-2xl font-semibold">Pratik Patil</h3>

            <button
              className="bg-gray-300 font-medium text-gray-800 rounded-2xl px-3"
              onClick={handleEditClick}
            >
              {editMode ? "cancel" : "edit"}
            </button>
          </div>

          <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px">
              <li className="me-2 cursor-pointer">
                <span
                  className={
                    activeTab === 1 ? activeTabStyles : inactiveTabStyles
                  }
                  onClick={() => {
                    handleToggleTab(1);
                  }}
                >
                  About
                </span>
              </li>
              <li className="me-2 cursor-pointer">
                <span
                  className={
                    activeTab === 2 ? activeTabStyles : inactiveTabStyles
                  }
                  onClick={() => {
                    handleToggleTab(2);
                  }}
                >
                  Timeline
                </span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col mt-8 px-4">
            {activeTab === 1 ? (
              <>
                <div className="flex justify-between flex-wrap pt-2 border-b-2">
                  <label htmlFor="name" className="text-base font-medium mr-4">
                    Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    className={`${
                      editMode ? editModeStyles : simpleStyles
                    } border-transparent`}
                    value={userData.firstName + " " + userData.lastName}
                    readOnly
                    disabled
                  />
                </div>
                <div className="flex justify-between flex-wrap pt-2 border-b-2">
                  <label htmlFor="email" className="text-base font-medium mr-4">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    className={editMode ? editModeStyles : simpleStyles}
                    value={userData.email}
                    onChange={handleInputChange}
                    readOnly={!editMode}
                    disabled={!editMode}
                  />
                </div>

                <div className="flex justify-between flex-wrap pt-2 border-b-2">
                  <label htmlFor="phone" className="text-base font-medium mr-4">
                    Phone
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    className={editMode ? editModeStyles : simpleStyles}
                    value={userData.phone}
                    onChange={handleInputChange}
                    readOnly={!editMode}
                    disabled={!editMode}
                  />
                </div>
                <div className="flex justify-between flex-wrap pt-2 border-b-2">
                  <label
                    htmlFor="address"
                    className="text-base font-medium mr-4"
                  >
                    Address
                  </label>

                  <textarea
                    type="text"
                    name="address"
                    className={`${
                      editMode ? editModeStyles : simpleStyles
                    } w-full md:w-2/3 `}
                    value={userData.address}
                    onChange={handleInputChange}
                    readOnly={!editMode}
                    disabled={!editMode}
                  />
                </div>

                <div className="flex justify-between flex-wrap pt-2 border-b-2">
                  <label
                    htmlFor="pincode"
                    className="text-base font-medium mr-4"
                  >
                    Pincode
                  </label>

                  <input
                    type="number"
                    name="pincode"
                    className={editMode ? editModeStyles : simpleStyles}
                    value={userData.pincode}
                    onChange={handleInputChange}
                    readOnly={!editMode}
                    disabled={!editMode}
                  />
                </div>
                {editMode ? (
                  <div className="mt-10 flex justify-end">
                    <button
                      className="bg-blue-600 text-white rounded-xl h-10 w-20"
                      onClick={handleFormSubmit}
                    >
                      Update
                    </button>
                  </div>
                ) : null}
              </>
            ) : (
              <>
                <div className="flex justify-between flex-wrap pt-2">
                  <label
                    htmlFor="customerName"
                    className="text-base font-medium mr-4"
                  >
                    {userData.firstName + " " + userData.lastName}
                  </label>

                  <input
                    type="text"
                    name="pincode"
                    className="w-32 p-0 text-base font-medium bg-transparent text-blue-700 text-right border-transparent"
                    value="Supra mk4"
                    readOnly
                    disabled
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
