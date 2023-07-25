
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import axios from 'axios';
import maleImage from "../../assets/male.png";
import femaleImage from "../../assets/female.png";
import "./Register.css";

const Register = () => {
  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    village: '',
    city: '',
    district: '',
    state: '',
    pincode: '',
    email: '',
    phone: '',
    password: '',
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
    <>

    <div className="register">
      <div className="reegister-heading-content">
      <h1 className="register-header">Register on RentiVerse</h1>
      </div>
      <div className="register-container">
        <form className="register-form" onSubmit={handleRegistration}>
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
                value={user.firstname}
                onChange={(e) => setUser({ ...user, firstname: e.target.value })}
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
                value={user.lastname}
                onChange={(e) => setUser({ ...user, lastname: e.target.value })}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label className="register-lable">Gender</label>
              <div className="gender-buttons">
                <button className="transparent-blue" 
                  onClick={(e) => setUser({ ...user, gender: "male" })}>
                  <img src={maleImage} alt="Male" className="gender-icon" />
                  Male
                </button>
                <button className="transparent-blue" 
                  onClick={(e) => setUser({ ...user, gender: "female" })}>
                  <img src={femaleImage} alt="Female" className="gender-icon" />
                  Female
                </button>
                <button className="transparent-blue"
                  onClick={(e) => setUser({ ...user, gender: "other" })}>
                  Other
                </button>
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
                placeholder="+91 9598929100"
                value={user.phone}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
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
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
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
                value={user.village}
                onChange={(e) => setUser({ ...user, village: e.target.value })}
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
                value={user.district}
                onChange={(e) => setUser({ ...user, district: e.target.value })}
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
                value={user.city}
                onChange={(e) => setUser({ ...user, city: e.target.value })}
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
                value={user.state}
                onChange={(e) => setUser({ ...user, state: e.target.value })}
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
                value={user.pincode}
                onChange={(e) => setUser({ ...user, pincode: e.target.value })}
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
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                required
              />
            </div>
          </div>

          <button type="submit" className="transparent-register">
            Register
          </button>
        </form>

      </div>
    </div>
    </>
  );
};

export default Register;
