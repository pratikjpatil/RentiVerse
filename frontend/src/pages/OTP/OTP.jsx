import React, { useState } from 'react';
import "./OTP.css";
import otpimg from "../../assets/otp.png";
import axios from 'axios';

const OTP = ({ otp, setOtp, handleOtpVerification }) => {
  const [error, setError] = useState(null);

  const handleVerify = async () => {
    setError(null);
  
    // Check if all OTP inputs are filled
    if (otp.length !== 4 || otp.includes('')) {
      setError("Please enter a valid OTP.");
      return;
    }
  
    // The OTP verification will be handled in the Register component
    handleOtpVerification();
  };
  

  return (
    <div className="card-container">
      <div className="card">
        <div className="logo-container">
          <img src={otpimg} alt="Logo" className="logo-otp" />
          <h1 className='head-otp'>Enter OTP</h1>
        </div>
        <div className="otp-label">Sent on Mobile Number</div>
        <div className="otp-inputs">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              className="otp-input"
              maxLength="1"
              value={digit}
              onChange={(e) => {
                const newOtp = [...otp];
                newOtp[index] = e.target.value;
                setOtp(newOtp);
              }}
            />
          ))}
        </div>
        <div className="time-container">
          <p>Time Left: 00:10</p>
        </div>
        <div className="button-container">
          <button className="verify-button" onClick={handleVerify}>Verify</button>
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="resend-otp">Resend OTP</div>
        <div className="incorrect-number">Entered Incorrect Number?</div>
      </div>
    </div>
  );
};

export default OTP;
