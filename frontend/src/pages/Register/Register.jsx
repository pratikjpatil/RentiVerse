import React from "react";
import "./Register.css";
import Image from "../../assets/logo.png";

const Register = () => {
  return (
    <form>
      <img src={Image} alt="Logo" className="logo-regsiter" />
      <div className="card-register-page">
        <div className="card-content-register">
          <h2>Register</h2>
          <div className="form-group-register-page">
            <input
              type="text"
              placeholder="Full Name"
              className="form-control-register"
              required
            />
          </div>
          <div className="form-group-register-page">
            <textarea
              style={{ height: "76px", width: " 352px" }}
              type="text"
              placeholder="Address"
              className="form-control-register-address"
              required
            />
          </div>
          <div className="form-group-register-page">
            <input
              type="pincode"
              placeholder="Pincode"
              className="form-control-register"
              required
            />
          </div>
          <div className="form-group-register-page">
            <input
              type="email"
              placeholder="E-mail"
              className="form-control-register"
              required
            />
          </div>
          <div className="form-group-register-page">
            <input
              type="tel"
              placeholder="Phone"
              className="form-control-register"
              required
            />
          </div>
          <div className="form-group-register-page">
            <input
              type="password"
              placeholder="Password"
              className="form-control-register"
              required
            />
          </div>
          <div className="form-group-register-page">
            <input
              type="password"
              placeholder="Confirm Password"
              className="form-control-register"
              required
            />
          </div>
          <button type="submit" className="btn-register">
            Register
          </button>
          <button type="submit" className="btn-regsiter-login">
            Have account? Login
          </button>
        </div>
      </div>
    </form>
  );
};

export default Register;
