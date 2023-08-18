import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../components/sidebar/sidebar";
import Header from "../../components/header/Header";
import Filter from "../../assets/filter.png";
import Filter1 from "../../assets/filter1.png";
import accept from "../../assets/accept.png";
import reject from "../../assets/reject.png";
import "./RequestPage.css";
import toast from 'react-hot-toast';
import rentiVerseLoadingGif from "../../assets/rentiVerseLoadingGif.gif";

const RequestPage = () => {
  const [tableData, setTableData] = useState([]);
  const [requestOption, setRequestOption] = useState("show-received");
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleRequestOptionChange = (event) => {
    setRequestOption(event.target.value);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        setIsLoading(true);
        await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/user/loginstatus`,
          { withCredentials: true }
        );
      } catch (error) {
        toast.error("You are not logged in");
        navigate("/login");
        return;
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  const fetchRequests = async () => {
    const backendUrl = `${process.env.REACT_APP_BACKEND_URL}/api/request/${requestOption}-${filter}`;

    try {
      setIsLoading(true);
      const result = await axios.get(backendUrl, { withCredentials: true });

      if (result.status === 200) {
        setTableData(result.data);
        console.log(result.data);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      return;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [requestOption, filter]);

  const handleAcceptRequest = async (requestId) => {
    const backendUrl = `${process.env.REACT_APP_BACKEND_URL}/api/request/accept/${requestId}`;
    try {
      setIsLoading(true);
      const result = await axios.put(backendUrl, { withCredentials: true });
      if (result.status === 200) {
        toast.success("Request accepted");
        fetchRequests();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRejectRequest = async (requestId) => {
    const backendUrl = `${process.env.REACT_APP_BACKEND_URL}/api/request/reject/${requestId}`;
    try {
      setIsLoading(true);
      const result = await axios.post(backendUrl, { withCredentials: true });
      if (result.status === 200) {
        toast.success("Request rejected");
        fetchRequests();
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Sidebar />
      {isLoading ? (
        <div>
          <img
            src={rentiVerseLoadingGif}
            className="rentiVerseLoadingGif"
            alt="Loading..."
          />
        </div>
      ) : (
        <div className="body-requestpage">
          <h1 className="head-request">Renting Request</h1>
          <div className="filter-button">
            {/* Filter image */}
            <div className="filter-image-container">
              <img src={Filter} alt="Filter Icon" className="filter-image" />
              <div className="filter-vertical-line"></div>
            </div>
            <div className="filter-image-container-1">
              <img
                src={Filter1}
                alt="Filter Icon"
                className="filter-image-1"
              />
              <div className="filter-vertical-line-1"></div>
            </div>

            {/* Select menu for request options */}
            <select
              className="head-request-filter"
              value={requestOption}
              onChange={handleRequestOptionChange}
            >
              <option value="show-received">Received</option>
              <option value="show-sent">Sent</option>
            </select>

            {/* Select menu for filter options */}
            <select
              className="head-request-filter-1"
              value={filter}
              onChange={handleFilterChange}
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div className="container-requestpage">
            <table id="customers" className="table-requestpage">
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>Tool</th>
                  <th>Till Date</th>
                  <th>Message</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="5">
                    <hr className="hr-line-requestpage" />
                  </td>
                </tr>
                {tableData.length > 0 ? (
                  tableData.map((rowData, index) => (
                    <tr key={index}>
                      <td>{rowData.userName}</td>
                      <td>{rowData.toolName}</td>
                      <td>{rowData.dueDate.split("T")[0]}</td>
                      <td>{rowData.message}</td>
                      <td>
                        {rowData.requestStatus === "pending" &&
                        requestOption === "show-received" ? (
                          <>
                            <button
                              className="request-button accept"
                              type="button"
                              onClick={() => {
                                handleAcceptRequest(rowData.requestId);
                              }}
                            >
                              <img className="accept-img" src={accept} alt="img" />
                            </button>
                            <button
                              className="request-button reject"
                              type="button"
                              onClick={() => {
                                handleRejectRequest(rowData.requestId);
                              }}
                            >
                              <img className="reject-img" src={reject} alt="img" />
                            </button>
                          </>
                        ) : rowData.requestStatus === "accepted" && requestOption === "show-sent" ? (
                          <>
                           { rowData.requestStatus}
                            {/* Display "Pay Now" button */}
                            <button
                              className="request-button accept"
                              type="button"
                              onClick={() => {
                                console.log("clicked on pay now")
                              }}
                            >
                              Pay Now
                            </button>
                          </>
                        ) : (
                          rowData.requestStatus
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No requests found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default RequestPage;
