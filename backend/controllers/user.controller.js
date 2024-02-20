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
} = require("../utils/otp");
const mongoose = require("mongoose");

const sendRegistrationOtp = async (req, res) => {
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

    if (existingUserByPhone) {
      return res.status(400).json({ message: "Phone number already exists" });
    } else if (existingUserByEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const isOtpSentToEmail = await sendOtpToEmail(email);
    if (!isOtpSentToEmail.success) {
      return res.status(400).json({ message: isOtpSentToEmail.message });
    }

    const isOtpSentToPhone = await sendOtpToPhone(phone);
    if (!isOtpSentToPhone.success) {
      return res.status(400).json({ message: isOtpSentToPhone.message });
    }

    return res.status(200).json({ message: "OTP sent to phone and email" });
  } catch (error) {
    console.error("Error sending otp:", error);
    return res.status(500).json({ message: "Error sending otp" });
  }
};

const verifyOtpAndRegisterUser = async (req, res) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    console.log(validationErrors);
    res.status(403).json({ message: validationErrors.errors[0].msg });
    return;
  }

  const {
    phone,
    email,
    phoneOtp,
    emailOtp,
    firstName,
    lastName,
    address,
    pincode,
    password,
  } = req.body;
  try {
    const existingUserByPhone = await User.findOne({ phone: phone });
    const existingUserByEmail = await User.findOne({ email: email });

    if (existingUserByPhone) {
      return res
        .status(400)
        .json({ message: "Phone number already registered" });
    } else if (existingUserByEmail) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const isPhoneOtpValid = await verifyOtpPhone(phone, phoneOtp);
    const isEmailOtpValid = await verifyOtpEmail(email.toLowerCase(), emailOtp);

    if (!isPhoneOtpValid.success) {
      return res.status(400).json({ message: isPhoneOtpValid.message });
    }
    if (!isEmailOtpValid.success) {
      return res.status(400).json({ message: isEmailOtpValid.message });
    }

    await OTP.deleteOne({ email: email });
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      phone: Number(phone),
      firstName:
        firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase(),
      lastName:
        lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase(),
      address: {
        area: address,
        pincode: Number(pincode),
      },
      password: hashedPassword,
      isVerified: true,
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "30d",
    });

    const expirationTime = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

    // Calculate the expiration date for the cookie
    const expirationDate = new Date(Date.now() + expirationTime);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "Development" ? false : true,
      expires: expirationDate,
      sameSite: "none",
    });
    const userData = {
      firstName,
      lastName,
      isVerified: true,
    };
    return res.status(201).json({
      message: "Registration successfull",
      userData,
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
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "30d",
      });

      const expirationTime = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

      // Calculate the expiration date for the cookie
      const expirationDate = new Date(Date.now() + expirationTime);

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "Development" ? false : true,
        expires: expirationDate,
        sameSite: "none",
      });

      const userData = {
        firstName: user.firstName,
        lastName: user.lastName,
        isVerified: user.isVerified,
      };
      return res.status(200).json({ message: "Authenticated", userData });
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
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "none",
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error during logout:", error);
    return res.status(500).json({ message: "Logout failed" });
  }
};

const checkIfLoggedIn = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User does not exists", userData: null });
    }

    const userData = {
      firstName: user.firstName,
      lastName: user.lastName,
      isVerified: user.isVerified,
    };
    return res.status(200).json({ message: "User is logged in", userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", userData: null });
  }
};

module.exports = {
  userLogin,
  userLogout,
  checkIfLoggedIn,
  sendRegistrationOtp,
  verifyOtpAndRegisterUser,
};
