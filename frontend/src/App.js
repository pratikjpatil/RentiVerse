import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import AddOnRent from "./pages/AddOnRent/AddOnRent";
import LandingPage from "./pages/LandingPage/LandingPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import RequestPage from "./pages/RequestPage/RequestPage";
import Login from "./pages/Login/Login";
import Regsiter from "./pages/Register/Register";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/productpage" element={<ProductPage />} />
          <Route path="/addonrent" element={<AddOnRent />} />
          <Route path="/requestpage" element={<RequestPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Regsiter />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
