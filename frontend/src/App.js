import Dashboard from "./pages/dashboard/Dashboard";
import AddOnRent from "./pages/AddOnRent/AddOnRent";
import LandingPage from "./pages/LandingPage/LandingPage";
import Login from "../src/pages/Login/Login";
import Regsiter from "../src/pages/Register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Regsiter />} />
          <Route path="/addonrent" element={<AddOnRent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
