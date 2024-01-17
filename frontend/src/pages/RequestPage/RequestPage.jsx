// RequestPage.js
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
import toast from "react-hot-toast";
import rentiVerseLoadingGif from "../../assets/rentiVerseLoadingGif.gif";
import ChatModal from "../../components/ChatModal";
import { useSelector } from "react-redux";

const RequestPage = () => {
  const [tableData, setTableData] = useState([]);
  const [requestOption, setRequestOption] = useState("show-received");
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState("");

  const navigate = useNavigate();

  const isLoggedIn = useSelector(state => state.auth.status);
  if(!isLoggedIn){
    navigate('/login')
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleRequestOptionChange = (event) => {
    setRequestOption(event.target.value);
  };

  const openChatModal = (user2Id, user2Name) => {
    setSelectedUserId(user2Id);
    setSelectedUserName(user2Name);
    setIsChatModalOpen(true);
  };

  const closeChatModal = () => {
    setSelectedUserId(null);
    setIsChatModalOpen(false);
  };

  const fetchRequests = async () => {
    const backendUrl = `${process.env.REACT_APP_BACKEND_URL}/api/request/${requestOption}-${filter}`;

    try {
      setIsLoading(true);
      const result = await axios.get(backendUrl, { withCredentials: true });

      if (result.status === 200) {
        setTableData(result.data);
      }
    } catch (error) {
      toast.error(error.response.data.message);
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
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const initPayment = (data, productName, requestId) => {
    console.log(process.env.REACT_APP_RAZORPAY_KEY_ID)
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: productName,
      description: "Test Transaction",
      image: data.productImage,
      order_id: data.id,
      handler: async (response) => {
        response.requestId = requestId;
        try {
          const verifyUrl = `${process.env.REACT_APP_BACKEND_URL}/api/payment/verify`;
          const { data } = await axios.post(verifyUrl, response, {
            withCredentials: true,
          });
          toast.success("Payment Successfull!");
          navigate('/dashboard');
        } catch (error) {
          toast.error("Payment failed!");
          toast.error(error.response.data.message);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async (requestId, productName) => {
    try {
      const orderUrl = `${process.env.REACT_APP_BACKEND_URL}/api/payment/orders`;
      const { data } = await axios.post(orderUrl, {requestId}, {
        withCredentials: true,
      });
      // console.log(data);
    
      initPayment(data.data, productName, requestId);
    } catch (error) {
      console.log(error);
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
            <div className="filter-image-container">
              <img src={Filter} alt="Filter Icon" className="filter-image" />
              <div className="filter-vertical-line"></div>
            </div>
            <div className="filter-image-container-1">
              <img src={Filter1} alt="Filter Icon" className="filter-image-1" />
              <div className="filter-vertical-line-1"></div>
            </div>
            <select
              className="head-request-filter"
              value={requestOption}
              onChange={handleRequestOptionChange}
            >
              <option value="show-received">Received</option>
              <option value="show-sent">Sent</option>
            </select>
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
                              <img
                                className="accept-img"
                                src={accept}
                                alt="img"
                              />
                            </button>
                            <button
                              className="request-button reject"
                              type="button"
                              onClick={() => {
                                handleRejectRequest(rowData.requestId);
                              }}
                            >
                              <img
                                className="reject-img"
                                src={reject}
                                alt="img"
                              />
                            </button>
                          </>
                        ) : rowData.requestStatus === "accepted" &&
                          requestOption === "show-sent" ? (
                          <>
                            {rowData.requestStatus}
                            <button
                              className="request-button accept"
                              type="button"
                              onClick={() => {
                                handlePayment(rowData.requestId, rowData.toolName);
                              }}
                            >
                              Pay Now
                            </button>
                          </>
                        ) : (
                          rowData.requestStatus
                        )}
                        {/* Add a button or icon to open the chat modal */}
                        <button
                          onClick={() =>
                            openChatModal(rowData.user2Id, rowData.userName)
                          }
                        >
                          Open Chat
                        </button>
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
          {/* Render the ChatModal component */}
          <ChatModal
            isOpen={isChatModalOpen}
            onRequestClose={closeChatModal}
            user2Id={selectedUserId}
            user2Name={selectedUserName}
          />
        </div>
      )}
    </>
  );
};

export default RequestPage;
