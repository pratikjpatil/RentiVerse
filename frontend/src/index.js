import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "../src/context/AuthContext";
import { Provider } from "react-redux";
import store from "./store/store";
import "./index.css";
import {
  RouterProvider,
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
// import Layout from "./layout";

// import Dashboard from "./pages/dashboard/Dashboard";
// import AddOnRent from "./pages/AddOnRent/AddOnRent";
// import LandingPage from "./pages/LandingPage/LandingPage";
// import ProductPage from "./pages/ProductPage/ProductPage";
// import RequestPage from "./pages/RequestPage/RequestPage";
// import Login from "./pages/Login/Login";
// import Register from "./pages/Register/Register";
// import ProfilePage from "./pages/Profile/ProfilePage";
// import OTPPage from "./pages/OTP/OTP";
// import OrderDetailsPage from "./pages/orderDetails/orderDetailsPage";

const root = ReactDOM.createRoot(document.getElementById("root"));

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<Layout />}>
//       <Route path="home" element={<LandingPage />} />
//       <Route path="dashboard" element={<Dashboard />} />
//       <Route path="product/:productId" element={<ProductPage />} />
//       <Route path="addonrent" element={<AddOnRent />} />
//       <Route path="requests" element={<RequestPage />} />
//       <Route path="profile" element={<ProfilePage />} />
//       <Route path="orderdetails" element={<OrderDetailsPage />} />

//       <Route path="login" element={<Login />} />
//       <Route path="register" element={<Register />} />
//       <Route path="verify" element={<OTPPage />} />
//     </Route>
//   )
// );
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <App />
      {/* <RouterProvider router={router} /> */}
    </Provider>
  // </React.StrictMode>
);
