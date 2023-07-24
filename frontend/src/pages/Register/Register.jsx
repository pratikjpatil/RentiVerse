import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import axios from 'axios';
import "./Register.css";
import Image from "../../assets/logo.png";

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    address: '',
    pincode: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const { isLoggedIn, setIsLoggedIn} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {

      const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'/api/user/register', user); 
      if (response.status === 200) {
        setIsLoggedIn(true);
        window.alert("Registration successful");
        navigate('/dashboard'); 
      }
    } catch (error) {
      console.log(error);
      window.alert("There was an error");
    }
  };

  return (
    <form onSubmit={handleRegistration}>
      <img src={Image} alt="Logo" className="logo-regsiter" />
      <div className="card-register-page">
        <div className="card-content-register">
          <h2>Register</h2>
          <div className="form-group-register-page">
            <input
              type="text"
              placeholder="Full Name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group-register-page">
            <textarea
              style={{ height: "76px", width: " 352px" }}
              placeholder="Address"
              value={user.address}
              onChange={(e) => setUser({ ...user, address: e.target.value })}
              required
            />
          </div>
          <div className="form-group-register-page">
            <input
              type="text"
              placeholder="Pincode"
              value={user.pincode}
              onChange={(e) => setUser({ ...user, pincode: e.target.value })}
              required
            />
          </div>
          <div className="form-group-register-page">
            <input
              type="email"
              placeholder="E-mail"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group-register-page">
            <input
              type="tel"
              placeholder="Phone"
              value={user.phone}
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
              required
            />
          </div>
          <div className="form-group-register-page">
            <input
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
            />
          </div>
          <div className="form-group-register-page">
            <input
              type="password"
              placeholder="Confirm Password"
              value={user.confirmPassword}
              onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn-register">
            Register
          </button>
          <button type="button" className="btn-regsiter-login" onClick={handleLoginRedirect}>
            Have an account? Login
          </button>
        </div>
      </div>
    </form>
  );
};

export default Register;
