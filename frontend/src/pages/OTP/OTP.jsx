import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import otpimg from "../../assets/otp.png";
import toast from 'react-hot-toast';

const OTP = () => {
  const [phoneOtp, setPhoneOtp] = useState(["", "", "", "", ""]);
  const [emailOtp, setEmailOtp] = useState(["", "", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(600); // Initial time left in seconds (10 minutes)

  const [data, setData] = useState({
    phone: "",
    email: "",
    phoneOtp: "",
    emailOtp: "",
  });

  const navigate = useNavigate();

  useEffect(()=>{
    if (otpSent && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    
      return () => {
        clearInterval(timer);
      };
    }
  },[otpSent, timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  useEffect(() => {
    setData({
      ...data,
      phoneOtp: phoneOtp.join(""),
      emailOtp: emailOtp.join(""),
    });
  }, [phoneOtp, emailOtp]);


  const handleSendOtpRegister = async () => {
    setError(null);
    const toastId = toast.loading('Sending OTP...');
    try {
      
      const response = await axios.post(process.env.REACT_APP_BACKEND_URL + "/api/user/send-otp", data);

      if (response.status === 200) {
        toast.success(response.data.message, {
          id: toastId,
        })
        console.log(response);
        setOtpSent(true);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        id: toastId,
      })
      setError(error.response.data.message);
      setOtpSent(false);
    }
  };

  const handleVerifyOtpRegister = async () => {
    setError(null);
    const toastId = toast.loading('Verifying...');
    // Check if all OTP inputs are filled
    if ((phoneOtp.length !== 5 || emailOtp.length !== 5) || (phoneOtp.includes("") || emailOtp.includes(""))) {
      toast.error("Please enter a valid OTP.", {
        id: toastId,
      })
      return;
    }

    console.log(data)

    try {
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/api/user/verify-otp",
        data
      );
      if (response.status === 200) {
        console.log(response);
        toast.success("Verification successful",{id: toastId});
        navigate("/register");
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message, {
        id: toastId,
      })
      setError(error.response.data.message)
    }
  };

  return (
    <div className="card-container">
      <div className="card">
        <div className="logo-container">
          <img src={otpimg} alt="Logo" className="logo-otp" />
          <h1 className="head-otp">Verify OTP</h1>
        </div>
        <div className="otp-label">Enter Phone Number</div>

        <div className="num-input-div">
          <input
            type="tel"
            pattern="[0-9]{10}"
            title="Enter 10 digit number"
            autoComplete="false"
            className="data-input"
            disabled={otpSent}
            value={data.phone}
            onChange={(e) => setData({ ...data, phone: e.target.value })}
          />
        </div>

        {!otpSent ? (
          <></>
        ) : (
          <div className="otp-inputs">
            {phoneOtp.map((digit, index) => (
              <input
                key={index}
                type="text"
                className="otp-input"
                maxLength="1"
                value={digit}
                onInput={(e) => {
                  const newPhoneOtp = [...phoneOtp];
                  newPhoneOtp[index] = e.target.value;
                  setPhoneOtp(newPhoneOtp);

                  if (e.target.value !== "" && index < 4) {
                    e.target.nextSibling.focus();
                  }
                }}
                required
              />
            ))}
          </div>
        )}

        <div className="otp-label">Enter Email</div>

        <div className="num-input-div">
          <input
            type="email"
            className="data-input"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            disabled={otpSent}
            required
          />
        </div>

        {!otpSent ? (
          <></>
        ) : (
          <>
            <div className="otp-inputs">
              {emailOtp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  className="otp-input"
                  maxLength="1"
                  value={digit}
                  onInput={(e) => {
                    const newEmailOtp = [...emailOtp];
                    newEmailOtp[index] = e.target.value;
                    setEmailOtp(newEmailOtp);

                    if (e.target.value !== "" && index < 4) {
                      e.target.nextSibling.focus();
                    }
                  }}
                  
                />
              ))}
            </div>

            <div className="time-container">
              <p>Time Left: {formatTime(timeLeft)}</p>
            </div>
          </>
        )}

        {!otpSent ? (
          <>
            <div className="button-container">
              <button
                className="verify-button"
                onClick={handleSendOtpRegister}
              >
                Send OTP
              </button>
            </div>
            <div className="bottom-text">
              Verify your phone number and email to proceed further for
              registration
            </div>
          </>
        ) : (
          <>
            <div className="button-container">
              <button className="verify-button" onClick={handleVerifyOtpRegister}>
                Verify
              </button>
            </div>
            <div className="resend-otp" onClick={handleSendOtpRegister}>Resend OTP</div>
            <div className="incorrect-number" onClick={()=>{setOtpSent(false)}}>Entered Incorrect Number?</div>
          </>
        )}

        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default OTP;
