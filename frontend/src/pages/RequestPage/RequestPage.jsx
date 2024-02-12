import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../components/sidebar/sidebar";
import Header from "../../components/header/Header";
import accept from "../../assets/accept.png";
import reject from "../../assets/reject.png";
import toast from "react-hot-toast";
import ChatModal from "../../components/ChatModal";
import { useSelector } from "react-redux";

const RequestPage = () => {
  const [tableData, setTableData] = useState([]);
  const [requestOption, setRequestOption] = useState("all");
  const [filter, setFilter] = useState("show-received");
  const [isLoading, setIsLoading] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState("");

  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.auth.status);
  if (!isLoggedIn) {
    navigate("/login");
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
    const backendUrl = `${process.env.REACT_APP_BACKEND_URL}/api/request/${filter}-${requestOption}`;

    try {
      setIsLoading(true);
      const result = await axios.get(backendUrl, { withCredentials: true });

      if (result.status === 200) {
        setTableData(result.data);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [requestOption, filter]);

  const handleAcceptRequest = async (requestId) => {
    const toastId = toast.loading("Loading...");
    const backendUrl = `${process.env.REACT_APP_BACKEND_URL}/api/request/accept/${requestId}`;
    try {
      setIsLoading(true);
      const result = await axios.put(backendUrl, { withCredentials: true });
      if (result.status === 200) {
        toast.success("Request accepted", { id: toastId });
        fetchRequests();
      }
    } catch (error) {
      toast.error(error.response.data.message, { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRejectRequest = async (requestId) => {
    const toastId = toast.loading("Loading...");
    const backendUrl = `${process.env.REACT_APP_BACKEND_URL}/api/request/reject/${requestId}`;
    try {
      setIsLoading(true);
      const result = await axios.post(backendUrl, { withCredentials: true });
      if (result.status === 200) {
        toast.success("Request rejected", { id: toastId });
        fetchRequests();
      }
    } catch (error) {
      toast.error(error.response.data.message, { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  const initPayment = (data, productName, requestId) => {
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
          navigate("/dashboard");
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
      const { data } = await axios.post(
        orderUrl,
        { requestId },
        {
          withCredentials: true,
        }
      );

      initPayment(data.data, productName, requestId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOrderStatusChange = async (value, requestId) => {
    const toastId = toast.loading("Loading...");
    if (value === "null") {
      toast.error("Select valid order status");
      return;
    }
    const backendUrl = `${process.env.REACT_APP_BACKEND_URL}/api/request/changeorderstatus`;
    try {
      const result = await axios.put(
        backendUrl,
        { requestId, orderType: "buy", orderStatus: value },
        { withCredentials: true }
      );
      toast.success(result.data.message, { id: toastId });
      fetchRequests();
    } catch (error) {
      toast.error(error.response.data.message, { id: toastId });
    }
  };

  return (
    <>
      <Header />
      <Sidebar />

      {!isChatModalOpen && (
        <details
          open
          className="z-10 max-w-md w-screen bg-white overflow-hidden rounded-lg border border-gray-200 open:shadow-lg text-gray-700 fixed top-20 md:right-8 md:top-24"
        >
          <summary className="flex cursor-pointer select-none items-center justify-between bg-gray-100 px-5 py-3">
            <span className="text-sm font-medium"> Toggle Filters </span>

            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </summary>

          <div className="flex border-t border-gray-200 lg:border-t-0">
            <div className="w-full">
              <p className="block w-full bg-gray-50 px-5 py-3 text-xs font-medium">
                Request
              </p>

              <div className="space-y-2 px-5 py-6">
                <div className="flex items-center">
                  <input
                    id="received"
                    type="radio"
                    name="request"
                    value="show-received"
                    className="h-5 w-5 rounded border-gray-300 cursor-pointer"
                    checked={filter === "show-received"}
                    onChange={handleFilterChange}
                  />

                  <label
                    htmlFor="received"
                    className="ml-3 text-sm font-medium cursor-pointer"
                  >
                    {" "}
                    Received{" "}
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="sent"
                    type="radio"
                    name="request"
                    value="show-sent"
                    className="h-5 w-5 rounded border-gray-300 cursor-pointer"
                    checked={filter === "show-sent"}
                    onChange={handleFilterChange}
                  />

                  <label
                    htmlFor="sent"
                    className="ml-3 text-sm font-medium cursor-pointer"
                  >
                    {" "}
                    Sent{" "}
                  </label>
                </div>
              </div>
            </div>

            <div className="w-full">
              <p className="block w-full bg-gray-50 px-5 py-3 text-xs font-medium">
                Type
              </p>

              <div className="space-y-2 px-5 py-6">
                <div className="flex items-center">
                  <input
                    id="All"
                    type="radio"
                    name="Type"
                    value="all"
                    className="h-5 w-5 rounded border-gray-300 cursor-pointer"
                    checked={requestOption === "all"}
                    onChange={handleRequestOptionChange}
                  />

                  <label
                    htmlFor="All"
                    className="ml-3 text-sm font-medium cursor-pointer"
                  >
                    {" "}
                    All{" "}
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="Pending"
                    type="radio"
                    name="Type"
                    value="pending"
                    className="h-5 w-5 rounded border-gray-300 cursor-pointer"
                    checked={requestOption === "pending"}
                    onChange={handleRequestOptionChange}
                  />

                  <label
                    htmlFor="Pending"
                    className="ml-3 text-sm font-medium cursor-pointer"
                  >
                    {" "}
                    Pending{" "}
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="Accepted"
                    type="radio"
                    name="Type"
                    value="accepted"
                    className="h-5 w-5 rounded border-gray-300 cursor-pointer"
                    checked={requestOption === "accepted"}
                    onChange={handleRequestOptionChange}
                  />

                  <label
                    htmlFor="Accepted"
                    className="ml-3 text-sm font-medium cursor-pointer"
                  >
                    {" "}
                    Accepted{" "}
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="Rejected"
                    type="radio"
                    name="Type"
                    value="rejected"
                    className="h-5 w-5 rounded border-gray-300 cursor-pointer"
                    checked={requestOption === "rejected"}
                    onChange={handleRequestOptionChange}
                  />

                  <label
                    htmlFor="Rejected"
                    className="ml-3 text-sm font-medium cursor-pointer"
                  >
                    {" "}
                    Rejected{" "}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </details>
      )}

      <div className="mt-32 mx-auto md:ml-80 md:mr-10 md:mt-40 md:relative overflow-x-auto md:shadow-md sm:rounded-lg">
        <table className="md:w-full text-sm text-left rtl:text-right text-gray-500">
          
          <thead className="text-xs text-gray-700 uppercase bg-green-100 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                User name
              </th>
              <th scope="col" className="px-6 py-3">
                Due Date
              </th>
              <th scope="col" className="px-6 py-3">
                Message
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
              <th scope="col" className="px-6 py-3">
                Chat
              </th>
            </tr>
          </thead>
          <tbody>
            {!tableData
              ? <tr><th>Loading..</th></tr>
              : !tableData.length
              ? <tr><th>No requests</th></tr>
              : tableData &&
                tableData.map((rowData, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-100 border-b" : "bg-white border-b"}>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {rowData.productName}
                    </th>
                    <td className="px-6 py-4">{rowData.userName}</td>
                    <td className="px-6 py-4">{rowData.dueDate.split("T")[0]}</td>
                    <td className="px-6 py-4">{rowData.message}</td>
                    <td className="px-6 py-4">
                      {rowData.requestStatus === "pending" &&
                      filter === "show-received" ? (
                        <>
                          <button
                            type="button"
                            onClick={() => {
                              handleAcceptRequest(rowData.requestId);
                            }}
                          >
                            <img className="w-10 px-1" src={accept} alt="img" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              handleRejectRequest(rowData.requestId);
                            }}
                          >
                            <img className="w-10 px-1" src={reject} alt="img" />
                          </button>
                        </>
                      ) : rowData.requestStatus === "accepted" &&
                        filter === "show-sent" &&
                        !rowData.paymentStatus ? (
                        <>
                          <button
                            className="bg-green-400 text-white w-20 rounded-lg h-6 hover:bg-white hover:text-green-500"
                            type="button"
                            onClick={() => {
                              handlePayment(
                                rowData.requestId,
                                rowData.toolName
                              );
                            }}
                          >
                            Pay Now
                          </button>
                        </>
                      ) : rowData.paymentStatus &&
                        filter === "show-received" ? (
                        <>
                          <select
                            id="categories"
                            value={rowData.orderStatus.buy}
                            onChange={(e) =>
                              handleOrderStatusChange(
                                e.target.value,
                                rowData.requestId
                              )
                            }
                            required
                            className="h-10 p-2 block border border-gray-300 rounded-lg"
                          >
                            <option value="null" className="text-slate-500">
                              Select Category
                            </option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                          </select>
                        </>
                      ) : rowData.paymentStatus &&
                        !Object.keys(rowData.orderStatus).length &&
                        filter === "show-sent" ? (
                        "Paid"
                      ) : rowData.paymentStatus && filter === "show-sent" ? (
                        rowData.orderStatus.buy
                      ) : (
                        rowData.requestStatus
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() =>
                          openChatModal(rowData.user2Id, rowData.userName)
                        }
                      >
                        Open Chat
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
        <ChatModal
          isOpen={isChatModalOpen}
          onRequestClose={closeChatModal}
          user2Id={selectedUserId}
          user2Name={selectedUserName}
        />
      </div>
    </>
  );
};

export default RequestPage;
