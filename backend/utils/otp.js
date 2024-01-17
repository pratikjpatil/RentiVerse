const bcrypt = require("bcrypt");

const sendMail = require("../utils/sendMail");
const OTP = require("../models/otpdb");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const sendOtpToPhone = async (phoneNumber) => {
  try {
    await client.verify.v2
      .services(process.env.TWILIO_SERVICE_ID)
      .verifications.create({ to: `+91${phoneNumber}`, channel: "sms" });
    return { success: true, message: "OTP sent to phone successfully" };
  } catch (error) {
    console.error("Error sending OTP:", error.message);
    return { success: false, message: "Failed to send OTP to phone" };
  }
};

const verifyOtpPhone = async (phoneNumber, userOTP) => {
  try {
    const verification_check = await client.verify.v2
      .services(process.env.TWILIO_SERVICE_ID)
      .verificationChecks.create({ to: `+91${phoneNumber}`, code: userOTP });

    if (verification_check.status === "approved") {
      return { success: true, message: "Phone OTP verified successfully" };
    } else {
      return { success: false, message: "Invalid Phone OTP" };
    }
  } catch (error) {
    console.error("Error during phone OTP verification:", error.message);
    return { success: false, message: "OTP verification failed" };
  }
};

const sendOtpToEmail = async (email) => {
  const generatedOTP = Math.floor(10000 + Math.random() * 90000).toString();

  try {
    const alreadySentToEmail = await OTP.findOne({ email: email });

    const hashedOTP = await bcrypt.hash(generatedOTP, 10);

    const content = `<p>Hello,

            Welcome to RentiVerse! Your OTP is here</p><p style="color:tomato; font-size : 25px; letter-spacing : 2px;">
                    <b>${generatedOTP}</b>
                    </p>
                    <p>This code <b>expires in 10 min</b>.</p>`;
    const subject = `Your RentiVerse email verification OTP`;

    const isSent = await sendMail(email, subject, content);

    if (alreadySentToEmail) {
      alreadySentToEmail.emailOtp = hashedOTP;
      alreadySentToEmail.createdAt = Date.now();
      alreadySentToEmail.expiresAt = Date.now() + Date.now() + 600 * 1000;
      await alreadySentToEmail.save();
    } else {
      await OTP.create({
        email: email,
        emailOtp: hashedOTP,
      });
    }

    if (isSent) {
      return { success: true, message: "OTP sent to email successfully" };
    } else {
      return { success: false, message: "Failed to send OTP to email" };
    }
  } catch (error) {
    console.error("Error sending OTP:", error.message);
    return { success: false, message: "Failed to send OTP to email" };
  }
};


const verifyOtpEmail = async (email, emailOtp) => {
  try {
      const existing = await OTP.findOne({email: email});
      if(existing){
        const isMatched = await bcrypt.compare(emailOtp, existing.emailOtp);
        if(isMatched){
          return { success: true, message: "Email OTP verified successfully" };
        }
        else{
          return { success: false, message: "Invalid Email OTP" };
        }
      
      }
      else {
        return { success: false, message: "Email OTP expired" };
      }
    } 
   catch (error) {
    console.error("Error during email OTP verification:", error.message);
    return { success: false, message: "OTP verification failed" };
  }
};

module.exports = { sendOtpToPhone, verifyOtpPhone, sendOtpToEmail, verifyOtpEmail };
