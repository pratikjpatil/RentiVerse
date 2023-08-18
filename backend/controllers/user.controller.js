const User = require("../models/user");
const OTP = require("../models/otpdb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const {
  sendOtpToPhone,
  verifyOtpPhone,
  sendOtpToEmail,
  verifyOtpEmail,
} = require("../utils/Otp");
const mongoose = require("mongoose");

const sendOtp = async (req, res) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    console.log(validationErrors);
    res.status(403).json({ message: validationErrors.errors[0].msg });
    return;
  }
  const { phone, email } = req.body;

  try {
    const existingUserByPhone = await User.findOne({ phone: phone });
    const existingUserByEmail = await User.findOne({ email: email });

    //checking if user already registered by looking the password field is not null.
    //because if the user has leaved the process of registration in-between after verifying his phone and email then the password field is null
    //so we can reverify the user to let him register.
    if (existingUserByPhone && existingUserByPhone.password !== null) {
      return res.status(400).json({ message: "Phone number already exists" });
    } else if (existingUserByEmail && existingUserByEmail.password !== null) {
      return res.status(400).json({ message: "Email already exists" });
    }
    //if any user has previously used the phone or email while registering with different email or phone
    //and if the registration was not successfull then we are deleting the user with email id and updating user with given phone number by adding that email
    else if (
      existingUserByEmail &&
      existingUserByPhone &&
      existingUserByEmail._id !== existingUserByPhone._id
    ) {
      await User.deleteOne({ email });
      existingUserByPhone.email = email;

      await existingUserByPhone.save();
    } else if (existingUserByEmail && !existingUserByPhone) {
      existingUserByEmail.phone = phone;

      await existingUserByEmail.save();
    } else if (!existingUserByEmail && existingUserByPhone) {
      existingUserByPhone.email = email;

      await existingUserByPhone.save();
    }

    const isOtpSentToEmail = await sendOtpToEmail(email);
    if (!isOtpSentToEmail.success) {
      console.log(isOtpSentToEmail);
      return res.status(400).json({ message: isOtpSentToEmail.message });
    }


    const isOtpSentToPhone = await sendOtpToPhone(phone);
    if (!isOtpSentToPhone.success) {
      console.log(isOtpSentToPhone);
      return res.status(400).json({ message: isOtpSentToPhone.message });
    }

    return res.status(200).json({ message: "OTP sent to phone and email" });
  } catch (error) {
    console.error("Error during sending otp:", error);
    return res.status(500).json({ message: "Error sending otp" });
  }
};

const verifyOtp = async (req, res) => {
  const { phone, email, phoneOtp, emailOtp } = req.body;
  try {
    const isPhoneOtpValid = await verifyOtpPhone(phone, phoneOtp);
    const isEmailOtpValid = await verifyOtpEmail(email.toLowerCase(), emailOtp);

    if (!isPhoneOtpValid.success) {
      console.log(isPhoneOtpValid);
      return res.status(400).json({ message: isPhoneOtpValid.message });
    } else if (!isEmailOtpValid.success) {
      console.log(isEmailOtpValid);
      return res.status(400).json({ message: isEmailOtpValid.message });
    } else {

      await OTP.deleteOne({email: email});

      await User.create({
        email: email.toLowerCase(),
        phone: Number(phone),
        isVerified: true,
      });

      const cookieData = {
        phone: phone,
        email: email.toLowerCase(),
      };
      res.cookie("registerTemp", cookieData, {
        httpOnly: true,
        expires: new Date(Date.now() + 30 * 60 * 1000),
      });
      return res.status(200).json({
        message: "OTP verification successful",
      });
    }
  } catch (error) {
    console.error("Error during OTP verification:", error);
    return res.status(500).json({ message: "OTP verification failed" });
  }
};

const registerUser = async (req, res) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    console.log(validationErrors);
    res.status(403).json({ message: validationErrors.errors[0].msg });
    return;
  }

  //if there is no register-temp cookie in request means the user has not verified his email and phone
  // as we are sending the email and phone in cookie in verify-otp route
  if (!req.cookies.registerTemp) {
    return res
      .status(405)
      .json({ message: "first verify your phone number and email" });
  }

  const { email, phone } = req.cookies.registerTemp;

  const {
    pincode,
    gender,
    password,
    firstname,
    lastname,
    state,
    village,
    district,
    city,
  } = req.body;

  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser && existingUser.password !== null) {
      console.log(existingUser);
      console.log("User already registered");
      return res.status(400).json({ message: "You have already registered" });
    }

    if (!existingUser || (existingUser && existingUser.isVerified === false)) {
      console.log("User has not verified email and phone");
      return res
        .status(405)
        .json({ message: "You have not verified phone and email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    existingUser.firstName =
      firstname.charAt(0).toUpperCase() + firstname.slice(1).toLowerCase();
    existingUser.lastName =
      lastname.charAt(0).toUpperCase() + lastname.slice(1).toLowerCase();
    existingUser.gender = gender.toLowerCase();

    existingUser.address.village = village.toLowerCase();
    existingUser.address.city = city.toLowerCase();
    existingUser.address.district = district.toLowerCase();
    existingUser.address.state = state.toLowerCase();
    existingUser.address.pincode = pincode;

    existingUser.password = hashedPassword;

    await existingUser.save();

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.SECRET_KEY,
      {
        expiresIn: process.env.JWT_TOKEN_EXPIRATION,
      }
    );

    const cookieExpiration = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000); // 2 days in milliseconds

    res.clearCookie("registerTemp", { httpOnly: true });
    res.cookie("token", token, { httpOnly: true, expires: cookieExpiration });

    return res.status(200).json({
      message: "Registration successfull",
      firstName: firstname,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ message: "Registration failed" });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ message: "User not registered" });

    const match = await bcrypt.compare(password, user.password);

    if (match) {
      const token = jwt.sign(
        { email: user.email, id: user._id },
        process.env.SECRET_KEY,
        {
          expiresIn: process.env.JWT_TOKEN_EXPIRATION,
        }
      );

      const cookieExpiration = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000); // 2 days in milliseconds

      res.cookie("token", token, { httpOnly: true, expires: cookieExpiration });

      return res
        .status(200)
        .json({ message: "Authenticated", firstName: user.firstName });
    } else {
      return res.status(400).json({ message: "Incorrect password" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Login failed" });
  }
};

const userLogout = async (req, res) => {
  try {
    res.clearCookie("token", { httpOnly: true });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error during logout:", error);
    return res.status(500).json({ message: "Logout failed" });
  }
};

const checkIfLoggedIn = async (req, res) => {
  try{
    const user = await User.findById(req.user.id);
  if(!user){
    return res
    .status(404)
    .json({ message: "User does not exists", firstName: "?" });
  }
  if (user && user.firstName === "") {
    user.firstName = "!";
  }
  return res
    .status(200)
    .json({ message: "User is logged in", firstName: user.firstName });
  }
  catch(error){
    console.error(error);
    res.status(500).json({message: "Internal server error", firstName: "?"});
  }
  
};

module.exports = {
  registerUser,
  userLogin,
  userLogout,
  checkIfLoggedIn,
  sendOtp,
  verifyOtp,
};
