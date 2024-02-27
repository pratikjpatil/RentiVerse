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
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("takenOnRent");
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
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    try {
      setIsLoading(true);
      setOrders([])
      let result;
      if (filter === "givenOnRent") {
        result = await axios.get(
          `${backendUrl}/api/products/givenonrent/?returnsPage=true`,
          { withCredentials: true }
        );
      } else {
        result = await axios.get(
          `${backendUrl}/api/products/takenonrent/?returnsPage=true`,
          { withCredentials: true }
        );
      }

      if (result.status === 200) {
        setOrders(result.data.reverse());
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [filter]);

  const handleConfirmReturn = async (requestId) => {
    const toastId = toast.loading("Loading...");
    const backendUrl = `${process.env.REACT_APP_BACKEND_URL}/api/productreturn/confirm/${requestId}`;
    try {
      setIsLoading(true);
      const result = await axios.put(backendUrl, { withCredentials: true });
      if (result.status === 200) {
        toast.success(result.data.message, { id: toastId });
        fetchRequests();
      }
    } catch (error) {
      toast.error(error.response.data.message, { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRejectReturn = async (requestId) => {
    const toastId = toast.loading("Loading...");
    const backendUrl = `${process.env.REACT_APP_BACKEND_URL}/api/productreturn/reject/${requestId}`;
    try {
      setIsLoading(true);
      const result = await axios.put(backendUrl, { withCredentials: true });
      if (result.status === 200) {
        toast.success(result.data.message, { id: toastId });
        fetchRequests();
      }
    } catch (error) {
      toast.error(error.response.data.message, { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOrderStatusChange = async (value, requestId) => {
    const toastId = toast.loading("Loading...");
    if (value === "null") {
      toast.error("Select valid order status");
      return;
    }
    const backendUrl = `${process.env.REACT_APP_BACKEND_URL}/api/productreturn/changeorderstatus`;
    try {
      const result = await axios.put(
        backendUrl,
        { requestId, orderStatus: value },
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
      <div className="py-4 md:px-6 mt-14 md:ml-64 md:mt-20 relative">
        <div className="max-w-full flex justify-between p-4">
          <span>
          <h3 className="text-lg md:text-xl font-semibold">Returns Page</h3>
          <p className="text-xs md:text-sm text-gray-500">Manage returns of rented products</p>
          </span>

          <select
            name="filter"
            className="outline-none text-xs md:text-sm p-2 h-10 rounded-lg border border-gray-200 open:shadow-lg text-gray-700"
            onChange={handleFilterChange}
            value={filter}
          >
            <option value="takenOnRent">Taken on rent</option>
            <option value="givenOnRent">Given on rent</option>
          </select>
        </div>
      
    
      
      <div className="md:relative overflow-x-auto md:shadow-md sm:rounded-lg">
        <table className="md:w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-green-100 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                {filter === "takenOnRent" ? "Owner name" : "Renter name"}
              </th>
              <th scope="col" className="px-6 py-3">
                Return Date
              </th>
              <th scope="col" className="px-6 py-3">
                Amount Paid
              </th>
              <th scope="col" className="px-6 py-3">
                Return Status
              </th>
              <th scope="col" className="px-6 py-3">
                Chat
              </th>
            </tr>
          </thead>
          <tbody>
            {!orders ? (
              <tr>
                <th>Loading..</th>
              </tr>
            ) : !orders.length ? (
              <tr>
                <th className="p-4">No products</th>
              </tr>
            ) : (
              orders &&
              orders.map((order, index) => (
                <tr
                  key={index}
                  className={
                    index % 2 === 0
                      ? "bg-gray-100 border-b"
                      : "bg-white border-b"
                  }
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {order.productName}
                  </th>
                  <td className="px-6 py-4">{order.userName}</td>
                  <td className="px-6 py-4">
                    {order.returnDate.split("T")[0]}
                  </td>
                  <td className="px-6 py-4">{order.amountPaid}</td>
                  <td className="px-6 py-4">
                    {order.orderStatus.return === "delivered" &&
                    !order.returnConfirmation &&
                    filter === "givenOnRent" ? (
                      <>
                        <p>Confirm return?</p>
                        <button
                          type="button"
                          onClick={() => {
                            handleConfirmReturn(order.requestId);
                          }}
                        >
                          <img className="w-10 px-1" src={accept} alt="img" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            handleRejectReturn(order.requestId);
                          }}
                        >
                          <img className="w-10 px-1" src={reject} alt="img" />
                        </button>
                      </>
                    ) : order.orderStatus.return === "delivered" &&
                      !order.returnConfirmation &&
                      filter === "takenOnRent" ? (
                      "Awaiting return confirmation"
                    ) : order.orderStatus.return !== "delivered" &&
                      filter === "takenOnRent" ? (
                      <>
                        {order.orderStatus.return === "rejected" ? "confirmation rejected" : ""}
                        <select
                          id="categories"
                          value={order.orderStatus.return}
                          onChange={(e) =>
                            handleOrderStatusChange(
                              e.target.value,
                              order.requestId
                            )
                          }
                          required
                          className="h-10 p-2 block border border-gray-300 rounded-lg"
                        >
                          <option value="null" className="text-slate-500">
                            Select status
                          </option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      </>
                    ) : (
                      order.orderStatus.return
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() =>{
                        openChatModal(order.user2Id, order.userName)
                        console.log(order)}
                      }
                    >
                      Open Chat
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <ChatModal
          isOpen={isChatModalOpen}
          onRequestClose={closeChatModal}
          user2Id={selectedUserId}
          user2Name={selectedUserName}
        />
      </div>
      </div>
    </>
  );
};

export default RequestPage;
