// Register.js

import React from "react";
import { Link } from "react-router-dom";
import maleImage from "../../assets/male.png";
import femaleImage from "../../assets/female.png";
import "./Register.css";

const Register = () => {
  return (
    <div className="register">
      <div className="reegister-heading-content">
      <h1 className="register-header">Register on RentiVerse</h1>
      </div>
      <div className="register-container">
        <form className="register-form">
          <div className="row">
            <div className="col">
              <label htmlFor="firstName" className="register-lable">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Type your First name"
              />
            </div>
            <div className="col">
              <label htmlFor="lastName" className="register-lable">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Type your Last name"
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label className="register-lable">Gender</label>
              <div className="gender-buttons">
                <button className="transparent-blue">
                  <img src={maleImage} alt="Male" className="gender-icon" />
                  Male
                </button>
                <button className="transparent-blue">
                  <img src={femaleImage} alt="Female" className="gender-icon" />
                  Female
                </button>
                <button className="transparent-blue">Other</button>
              </div>
            </div>
            <div className="col">
              <label htmlFor="mobile" className="register-lable">
                Mobile Number
              </label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                placeholder="+91 9595729100"
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label htmlFor="email" className="register-lable">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="example@email.com"
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label htmlFor="town" className="register-lable">
                Village/Town
              </label>
              <input
                type="text"
                id="town"
                name="town"
                placeholder="Type your village"
              />
            </div>
            <div className="col">
              <label htmlFor="district" className="register-lable">
                District
              </label>
              <input
                type="text"
                id="district"
                name="district"
                placeholder="Type your district"
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="city" className="register-lable">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="Type Your city"
              />
            </div>
            <div className="col">
              <label htmlFor="state" className="register-lable">
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                placeholder="Type your State"
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="pincode" className="register-lable">
                Pincode
              </label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                placeholder="Type your pincode"
              />
            </div>
            <div className="col">
              <label htmlFor="password" className="register-lable">
                Set Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Type your password"
              />
            </div>
          </div>

          <button type="submit" className="transparent-register">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
