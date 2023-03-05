import React from "react";
import "./Register.css";
import Image from "../assets/logo.png";

const Register = () => {
  return (
    <form>
      <img src={Image} alt="Logo" className="logo" />
      <div className="card">
        <div className="card-content">
          <h2>Register</h2>
          <div className="form-group">
            <input
              type="text"
              placeholder="Full Name"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <textarea
              style={{ height: "76px", width: " 352px" }}
              type="text"
              placeholder="Address"
              className="form-control address"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="pincode"
              placeholder="Pincode"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="E-mail"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="tel"
              placeholder="Phone"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn">
            Register
          </button>
          <button type="submit" className="btn">
            Have account? Login
          </button>
        </div>
      </div>
    </form>
  );
};

export default Register;
