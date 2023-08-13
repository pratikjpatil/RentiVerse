import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import maleImage from "../../assets/male.png";
import femaleImage from "../../assets/female.png";
import "./Register.css";
import toast from 'react-hot-toast';

const Register = () => {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    village: "",
    city: "",
    district: "",
    state: "",
    pincode: "",
    password: "",
    gender: "",
  });
  const { isLoggedIn, setIsLoggedIn, setFirstName } = useContext(AuthContext);
  const [selectedGender, setSelectedGender] = useState(false);


  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();
    const toastId = toast.loading('Loading...');
    try {
      if (!selectedGender) {
        toast.error("Please select your gender.");
        return;
      }

      const response = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/api/user/register",
        user,
        {withCredentials: true}
      );
      console.log(response);
      
      if (response.status === 200) {
        toast.success(response.data.message, {
          id: toastId,
        })
        setFirstName(response.data.firstName);
        setIsLoggedIn(true);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        id: toastId,
      });
      if(error.response.status===405){
        navigate('/verify')
      }
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
                    onChange={(e) =>
                      setUser({ ...user, firstname: e.target.value })
                    }
                    required
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
                    onChange={(e) =>
                      setUser({ ...user, lastname: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <label className="register-lable">Gender</label>
                  <div className="gender-buttons">
                    <button
                      type="button"
                      className={
                        user.gender === "male" ? "blue" : "transparent-blue"
                      }
                      onClick={() => {
                        setSelectedGender(true);
                        setUser({ ...user, gender: "male" });
                      }}
                    >
                      <img src={maleImage} alt="Male" className="gender-icon" />
                      Male
                    </button>
                    <button
                      type="button"
                      className={
                        user.gender === "female" ? "blue" : "transparent-blue"
                      }
                      onClick={() => {
                        setSelectedGender(true);
                        setUser({ ...user, gender: "female" });
                      }}
                    >
                      <img
                        src={femaleImage}
                        alt="Female"
                        className="gender-icon"
                      />
                      Female
                    </button>
                    <button
                      type="button"
                      className={
                        user.gender === "other" ? "blue" : "transparent-blue"
                      }
                      onClick={() => {
                        setSelectedGender(true);
                        setUser({ ...user, gender: "other" });
                      }}
                    >
                      Other
                    </button>
                  </div>
                </div>

                {/* <div className="col">
                  <label htmlFor="mobile" className="register-lable">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    placeholder="9598929100"
                    pattern="[0-9]{10}"
                    title="Enter 10 digit number"
                    value={user.phone}
                    onChange={(e) =>
                      setUser({ ...user, phone: e.target.value })
                    }
                    required
                  />
                </div> */}
              </div>

              {/* <div className="row">
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
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div> */}

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
                    onChange={(e) =>
                      setUser({ ...user, village: e.target.value })
                    }
                    required
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
                    onChange={(e) =>
                      setUser({ ...user, district: e.target.value })
                    }
                    required
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
                    required
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
                    onChange={(e) =>
                      setUser({ ...user, state: e.target.value })
                    }
                    required
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
                    onChange={(e) =>
                      setUser({ ...user, pincode: e.target.value })
                    }
                    required
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
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <button type="submit" className="transparent-register">
                Register
              </button>
              <div onClick={() => navigate("/login")}>
                Already registered? click here.
              </div>
            </form>
          </div>
        </div>
    </>
  );
};

export default Register;
