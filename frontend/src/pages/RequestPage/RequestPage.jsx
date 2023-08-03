import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../components/sidebar/sidebar";
import Header from "../../components/header/Header";
import Filter from "../../assets/filter.png";
import accept from "../../assets/accept.png";
import reject from "../../assets/reject.png";
import "./RequestPage.css";
import rentiVerseLoadingGif from "../../assets/rentiVerseLoadingGif.gif";

const RequestPage = () => {
  const [tableData, setTableData] = useState([]);
  const [requestOption, setRequestOption] = useState("show-received");
  const [isLoading, setIsLoading] = useState(false);
  const [isDataReady, setIsDataReady] = useState(false);

  const [filter, setFilter] = useState("all"); // State to hold the selected filter option

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
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
        window.alert("You are not logged in");
        navigate("/login");
        return;
      } finally {
        setIsLoading(false);
      }
    };
    checkLoginStatus();
  }, []);

  useEffect(() => {
    const fetchRequests = async () => {
      const backendUrl = `${process.env.REACT_APP_BACKEND_URL}/api/request/${requestOption}`;

      try {
        setIsLoading(true);
        const result = await axios.get(backendUrl, { withCredentials: true });

        if (result.status === 200) {
          setTableData(result.data);
          console.log(result.data);
        }
      } catch (error) {
        console.log(error.message);
        window.alert(error.message);
        return;
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequests();
  }, [requestOption]);

  useEffect(() => {
    if (tableData.length > 0) {
      setIsDataReady(true);
    }
  }, [tableData]);

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
            <div className="filter-image-container">
              <img
                src={Filter} // Add the image source here
                alt="Filter Icon"
                className="filter-image"
              />
              <div className="filter-vertical-line"></div>
            </div>

            <select
              className="head-request-filter"
              value={filter}
              onChange={handleFilterChange}
            >
              <option value="recivedrequest">Recived Request</option>
              <option value="recivedpendingrequest">
                Recived Pending Request
              </option>
              <option value="recivedacceptedrequest">
                Recived Accepted Request
              </option>
              <option value="recivedrejectedrequest">
                Recived Rejected Request
              </option>
              <option value="sentrequest">Sent Request</option>
              <option value="sentpendingrequest">Sent Pending Request</option>
              <option value="sentacceptedrequest">Sent Accepted Request</option>
              <option value="sentrejectedrequest">Sent Rejected Request</option>
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
                        {rowData.requestStatus === "pending" ? ( // Conditionally render action buttons
                          <>
                            <button
                              className="request-button accept"
                              type="submit"
                            >
                              <img
                                className="accept-img"
                                src={accept}
                                alt="img"
                              />
                            </button>
                            <button
                              className="request-button reject"
                              type="submit"
                            >
                              <img
                                className="reject-img"
                                src={reject}
                                alt="img"
                              />
                            </button>
                          </>
                        ) : (
                          rowData.requestStatus // Show the requestStatus for accepted or rejected requests
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
