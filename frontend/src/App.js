import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import Dashboard from "./pages/dashboard/Dashboard";
import AddOnRent from "./pages/AddOnRent/AddOnRent";
import LandingPage from "./pages/LandingPage/LandingPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import RequestPage from "./pages/RequestPage/RequestPage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ProfilePage from "./pages/Profile/ProfilePage";
import OTPPage from "./pages/OTP/OTP";
import loadingPage from "./pages/loadingPage";
import { AuthContext } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

function App() {
  const { initialLoading } = useContext(AuthContext);

  return (
    <div className="App">
      <div>
        <Toaster
          position="top-right"
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
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/addonrent" element={<AddOnRent />} />
          <Route path="/requests" element={<RequestPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify" element={<OTPPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
