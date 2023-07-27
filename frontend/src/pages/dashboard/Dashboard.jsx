import React, { useState, useEffect, useContext } from "react";
import { Header, Sidebar } from "../../components";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import "./dashboard.css";
import ToolCard from "../../components/card/ToolCard";
axios.defaults.withCredentials = true;

const Dashboard = () => {
  const [listedTools, setListedTools] = useState([]);
  const [givenTools, setGivenTools] = useState([]);
  const [takenTools, setTakenTools] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);



  useEffect(() => {

    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    
    // Fetch tools if user is authenticated
    const fetchListedTools = async () => {
      try {

        const listed = await axios.get(`${backendUrl}/api/tools/listed`, { withCredentials: true });
        const given = await axios.get(`${backendUrl}/api/tools/givenonrent`, { withCredentials: true });
        const taken = await axios.get(`${backendUrl}/api/tools/takenonrent`, { withCredentials: true });

        if (listed.status === 200) {
          setListedTools(listed.data);
        }
        if (given.status === 200) {
          setGivenTools(given.data);
        }
        if (taken.status === 200) {
          setTakenTools(taken.data);
        }
      } catch (error) {
        
        if(!isLoggedIn){
          window.alert("You are not logged in!");
          navigate('/');
          }
        else{
          console.log(error);
          window.alert("Error");
        }  
        
      }
    };

    fetchListedTools(); // Fetch tools

  }, [isLoggedIn]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  if(!isLoggedIn){
    return <div>Loading...</div>
  }


  return (
    <>
      <Header onSearch={handleSearch} />
      <Sidebar />
      <div className="dashboard-page-content">
        <div className="dashboard-page-content-heading">
          <span>Dashboard</span>
          <p>Home / Dashboard</p>
        </div>
        <div className="dashboard-page-content-acivity-cards">
          <div className="dashboard-page-content-acivity-cards-card">
            <div className="dashboard-page-content-acivity-cards-card-header">
              <span>Listed</span>
              <p>{listedTools.length}</p>
            </div>
            <div className="dashboard-page-content-acivity-cards-card-icon" onClick={()=>navigate('/addonrent')}>
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
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </div>
          </div>
          <div className="dashboard-page-content-acivity-cards-card">
            <div className="dashboard-page-content-acivity-cards-card-header">
              <span>Given on rent</span>
              <p>{givenTools.length}</p>
            </div>
            <div className="dashboard-page-content-acivity-cards-card-icon">
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
                  d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                />
              </svg>
            </div>
          </div>
          <div className="dashboard-page-content-acivity-cards-card">
            <div className="dashboard-page-content-acivity-cards-card-header">
              <span>Taken on rent</span>
              <p>{takenTools.length}</p>
            </div>
            <div className="dashboard-page-content-acivity-cards-card-icon">
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
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="dashboard-page-content-main">
          <div className="dashboard-page-content-main-content">
            <div className="dashboard-page-content-main-content-header">
              <span>Listed</span>
              <p>Overall Information</p>
            </div>
            <div className="dashboard-page-content-main-content-button">
              <button className="owned-button-listed">Owned</button>
            </div>
          </div><br /> <br />

          {
            listedTools.length === 0 ? (
              <p>No items found</p>
            ) : (
              listedTools
                .filter((tool) =>
                  searchTerm === ""
                    ? true
                    : tool.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    tool.category
                      ?.toLowerCase()
                      .includes(searchTerm.toLowerCase())
                )
                .map((tool, index) => <ToolCard data={tool} index={index} />)

            )
          }

        </div>
        <div className="dashboard-page-content-main">
          <div className="dashboard-page-content-main-content">
            <div className="dashboard-page-content-main-content-header">
              <span>Given on Rent</span>
              <p>Overall Information</p>
            </div>
            <div className="dashboard-page-content-main-content-button">
              <button>Given</button>
            </div>
          </div><br /> <br />

          {
            givenTools.length === 0 ? (

              <p>No items found</p>

            ) : (
              givenTools
                .filter((tool) =>
                  searchTerm === ""
                    ? true
                    : tool.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    tool.category
                      ?.toLowerCase()
                      .includes(searchTerm.toLowerCase())
                )
                .map((tool, index) => <ToolCard data={tool} index={index} />)

            )
          }


        </div>
        <div className="dashboard-page-content-main">
          <div className="dashboard-page-content-main-content">
            <div className="dashboard-page-content-main-content-header">
              <span>Taken on Rent</span>
              <p>Overall Information</p>
            </div>
            <div className="dashboard-page-content-main-content-button">
              <button>Taken</button>
            </div>
          </div><br /> <br />

          {
            takenTools.length === 0 ? (
              <p>No items found</p>
            ) : (
              takenTools
                .filter((tool) =>
                  searchTerm === ""
                    ? true
                    : tool.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    tool.category
                      ?.toLowerCase()
                      .includes(searchTerm.toLowerCase())
                )
                .map((tool, index) => <ToolCard data={tool} index={index} />)

            )
          }

        </div>
      </div>
    </>
  );
};

export default Dashboard;
