import React from 'react';
import "./OTP.css";
import otpimg from "../../assets/otp.png";

const OTP = () => {
  return (
    <div className="card-container"> {/* Add 'card-container' class here */}
      <div className="card">
        <div className="logo-container">
          <img src={otpimg} alt="Logo" className="logo-otp" />
          <h1 className='head-otp'>Enter OTP</h1>
        </div>
        <div className="otp-label">Sent on Mobile Number</div>
        <div className="otp-inputs">
          <input type="text" className="otp-input" id='otp'/>
          <input type="text" className="otp-input" id='otp'/>
          <input type="text" className="otp-input" id='otp'/>
          <input type="text" className="otp-input" id='otp'/>
        </div>
        <div className="otp-label-email">Sent on Email</div>
        <div className="otp-inputs">
          <input type="text" className="otp-input" id='otp'/>
          <input type="text" className="otp-input" id='otp'/>
          <input type="text" className="otp-input" id='otp'/>
          <input type="text" className="otp-input" id='otp'/>
        </div>
        <div className="time-container">
          <p>Time Left: 00:10</p>
        </div>
        <div className="button-container">
          <button className="verify-button">Verify</button>
        </div>
        <div className="resend-otp">Resend OTP</div>
        <div className="incorrect-number">Entered Incorrect Number?</div>
      </div>
    </div>
  );
};

export default OTP;
