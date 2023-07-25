import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import AddOnRent from "./pages/AddOnRent/AddOnRent";
import LandingPage from "./pages/LandingPage/LandingPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import RequestPage from "./pages/RequestPage/RequestPage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ProfilePage from "./pages/Profile/ProfilePage";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/addonrent" element={<AddOnRent />} />
          <Route path="/request" element={<RequestPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
