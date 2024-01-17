import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function VerifyOTP({ formData, setFormData, handleVerifyOTPAndRegister }) {
  const [otp, setOtp] = useState({
    phone: { otp1: "", otp2: "", otp3: "", otp4: "", otp5: "" },
    email: { otp1: "", otp2: "", otp3: "", otp4: "", otp5: "" },
  });

  const navigate = useNavigate();

  const handleVerify = (e) => {
    e.preventDefault();
    const { phone, email } = otp;

    const firstOtp = Object.values(phone).join("");
    const secondOtp = Object.values(email).join("");

    setFormData((prevState) => ({
        ...prevState,
        phoneOtp: firstOtp,
        emailOtp: secondOtp,
    }));

    if(isNaN(firstOtp) || isNaN(secondOtp)){
        toast.error("Enter numeric value only");
        return;
    }
    
    if (firstOtp.length === 5 && secondOtp.length === 5) {
      
      handleVerifyOTPAndRegister(e);
    }
    else{
        toast.error("Enter 5 digit code");
        return;
    }
  };

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
          className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
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
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
        <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-8">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl">
                <p>OTP Verification</p>
              </div>
              
              <div className="flex flex-row text-sm font-medium text-gray-400">
                <p>
                  Enter code sent to your phone{": "}
                  {formData && formData.phone}
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
                        {formData && formData.email}
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
                        className="flex flex-row items-center text-blue-600"
                        href="http://"
                        target="_blank"
                        rel="noopener noreferrer"
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
    </>
  );
}

export default VerifyOTP;
