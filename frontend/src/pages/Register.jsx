import React from "react";
import "./Register.css";
import Image from "../assets/logo.png";

const Register = () => {
  return (
    <form action="">
      <img src={Image} alt="Logo" class="logo" />
      <div class="card">
        <div class="card-content">
          <h2>Register</h2>
          <div class="form-group">
            <input
              type="text"
              placeholder="Full Name"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <textarea
              cols="2"
              rows="3"
              style={{ height: "76px", width: " 352px" }}
              type="text"
              placeholder="Address"
              class="form-control address"
              required
            />
          </div>
          <div class="form-group">
            <input
              type="pincode"
              placeholder="Pincode"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <input
              type="email"
              placeholder="E-mail"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <input
              type="tel"
              placeholder="Phone"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              placeholder="Password"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              class="form-control"
              required
            />
          </div>
          <button type="submit" class="btn">
            Register
          </button>
        </div>
      </div>
    </form>
  );
};

export default Register;
