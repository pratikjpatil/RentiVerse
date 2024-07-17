import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Dashboard from "./pages/dashboard/Dashboard";
import AddOnRent from "./pages/AddOnRent/AddOnRent";
import LandingPage from "./pages/LandingPage/LandingPage";
import CategoryProducts from "./pages/CategoryProducts/CategoryProducts";
import ProductPage from "./pages/ProductPage/ProductPage";
import RequestPage from "./pages/RequestPage/RequestPage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ProfilePage from "./pages/Profile/ProfilePage";
import ReturnsPage from "./pages/ReturnsPage/ReturnsPage";
import OrderDetailsPage from "./pages/orderDetails/orderDetailsPage";
import { Toaster } from "react-hot-toast";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import axios from "axios";
import SearchPage from "./pages/SearchPage/SearchPage";

function App() {
  Modal.setAppElement("#root");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/loginstatus`, {
          withCredentials: true,
        });
        if (response.status === 200) {
          dispatch(login(response.data.userData));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  return !loading ? (
    <div className='App'>
      <div>
        <Toaster
          position='top-right'
          toastOptions={{
            success: {
              theme: {
                primary: "#4aed88",
              },
            },
          }}
        ></Toaster>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/category/:category' element={<CategoryProducts />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/product/:productId' element={<ProductPage />} />
          <Route path='/addonrent' element={<AddOnRent />} />
          <Route path='/requests' element={<RequestPage />} />
          <Route path='/returns' element={<ReturnsPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/orderdetails' element={<OrderDetailsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  ) : null;
}

export default App;
