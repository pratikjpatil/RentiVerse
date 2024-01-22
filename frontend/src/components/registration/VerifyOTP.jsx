import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function VerifyOTP({ formData, setFormData, handleSendOtp, handleVerifyOTPAndRegister }) {
  const [otp, setOtp] = useState({
    phone: { otp1: "", otp2: "", otp3: "", otp4: "", otp5: "" },
    email: { otp1: "", otp2: "", otp3: "", otp4: "", otp5: "" },
  });
  const [clickedVerify, setClickedVerify] = useState(true);

  const [resendTime, setResendTime] = useState(90); //90secs

  const navigate = useNavigate();

 
  useEffect(() => {
    let timer;
    if (resendTime > 0) {
      timer = setInterval(() => {
        setResendTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [resendTime]);

  const handleResend = (e) => {
    if (resendTime === 0) {

      handleSendOtp(e);
      
      setResendTime(90);
    } else {
      toast.error(`Please wait ${resendTime} seconds before resending.`);
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
  
    const { phone, email } = otp;
    const newFormData = {
      ...formData,
      phoneOtp: Object.values(phone).join(""),
      emailOtp: Object.values(email).join("")
    };
  
    if (isNaN(newFormData.phoneOtp) || isNaN(newFormData.emailOtp)) {
      toast.error("Enter numeric value only");
      return;
    }
  
    if (newFormData.phoneOtp.length !== 5 || newFormData.emailOtp.length !== 5) {
      toast.error("Enter 5 digit code");
      return;
    }
  
    // Set the formData state with the updated values
    setFormData(newFormData);
    setClickedVerify((prev)=>{return !prev})
  };
  
  useEffect(() => {
    // useEffect will be triggered whenever formData changes
    if (formData.phoneOtp && formData.emailOtp) {
      handleVerifyOTPAndRegister();
    }
  }, [clickedVerify]);
  

    
  

  const handleChange = (value, e, type) => {
    const updatedOtp = { ...otp };
    updatedOtp[type][value] = e.target.value;
    setOtp(updatedOtp);
  };

  const inputfocus = (e) => {
    if (e.key === "Delete" || e.key === "Backspace") {
      const next = e.target.tabIndex - 2;
      if (next > -1) {
        e.target.form.elements[next].focus();
      }
    } else {
      const next = e.target.tabIndex;
      if (next < 11) {
        e.target.form.elements[next].focus();
      }
    }
  };

  const renderInputs = (type) => {
    const otpValues = otp[type];
    return Array.from({ length: 5 }, (_, index) => (
      <div key={index} className="w-16 h-16 ">
        <input
          className="w-3/5 h-full flex flex-col items-center justify-center text-center outline-none rounded-xl border border-gray-200 text-lg text-black bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
          type="text"
          name={`otp${index + 1}`}
          autoComplete="off"
          value={otpValues[`otp${index + 1}`]}
          onChange={(e) => handleChange(`otp${index + 1}`, e, type)}
          tabIndex={index + (type === "phone" ? 1 : 6)}
          maxLength="1"
          onKeyUp={(e) => inputfocus(e)}
          pattern="[0-9]*" 
        />
      </div>
    ));
  };
  

  return (
    <>
      <div className="flex min-h-screen justify-center">
      <div className="relative flex flex-col justify-center overflow-hidden">
        <div className="relative bg-white px-6 pt-9 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-8">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl">
                <p>OTP Verification</p>
              </div>
              
              <div className="flex flex-row text-sm font-medium text-gray-400">
                <p>
                  Enter code sent to your phone{": "}
                  <span className="text-slate-600">{formData && formData.phone}</span>
                  <br />
                  If you didnt received code enter 111111 (for twilio unverified numbers)
                </p>
              </div>
            </div>

            <div>
              <form onSubmit={handleVerify}>
                <div className="flex flex-col space-y-8">
                  <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                    {renderInputs("phone")}
                  </div>

                  <div className="flex flex-col items-center justify-center text-center space-y-2">
                    <div className="flex flex-row text-sm font-medium text-gray-400">
                      <p>
                        Enter code sent to your email{": "}
                        <span className="text-slate-600">{formData && formData.email}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                    {renderInputs("email")}
                  </div>

                  <div className="flex flex-col space-y-5">
                    <button type="submit" className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                      Verify Account
                    </button>

                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                      <p>Didn't recieve code?</p>{" "}
                      <a
                        className="flex flex-row items-center cursor-pointer text-blue-600"
                        onClick={handleResend}
                      >
                        Resend
                      </a>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default VerifyOTP;
