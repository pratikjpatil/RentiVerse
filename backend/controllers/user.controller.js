const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { sendOtpToPhone, verifyOtpPhone } = require("../utils/otp");

const registerUser = async (req, res) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    res.json(validationErrors);
    return;
  }
  const {
    pincode,
    phone,
    email,
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

    if (existingUser && existingUser.isVerified === true) {
      return res
        .status(400)
        .json({ message: "User already exists and verified" });
    }

    const isOtpSent = await sendOtpToPhone(phone);
    if(!isOtpSent.success){
      return isOtpSent.message;
    }

    if (existingUser && existingUser.isVerified === false) {
      return res
        .status(202)
        .json({ message: "User not verified. OTP sent successfully." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await User.create({
      firstName:
        firstname.charAt(0).toUpperCase() + firstname.slice(1).toLowerCase(),
      lastName:
        lastname.charAt(0).toUpperCase() + lastname.slice(1).toLowerCase(),
      phone,
      email: email.toLowerCase(),
      gender: gender.toLowerCase(),
      address: {
        village: village.toLowerCase(),
        city: city.toLowerCase(),
        district: district.toLowerCase(),
        state: state.toLowerCase(),
        pincode,
      },
      password: hashedPassword,
    });

    return res
      .status(200)
      .json({ message: "OTP sent to phone", firstName: result.firstName });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ message: "Registration failed" });
  }
};

const verifyOtp = async (req, res) => {
  const { phone, otp } = req.body;

  try {
    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(404).json({ message: "you are not registered" });
    }

    const isOtpValid = await verifyOtpPhone(phone, otp);

    if (!isOtpValid) {
      return res.status(400).json({ message: "Invalid OTP" });
    } else {
      user.isVerified = true;
      await user.save();

      const token = jwt.sign(
        { email: user.email, id: user._id },
        process.env.SECRET_KEY,
        {
          expiresIn: process.env.JWT_TOKEN_EXPIRATION,
        }
      );

      const cookieExpiration = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000); // 2 days in milliseconds

      res.cookie("token", token, { httpOnly: true, expires: cookieExpiration });

      return res.status(200).json({ message: "OTP verification successful" });
    }
  } catch (error) {
    console.error("Error during OTP verification:", error);
    return res.status(500).json({ message: "OTP verification failed" });
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
  const user = await User.findById(req.user.id);
  return res
    .status(200)
    .json({ message: "User is logged in", firstName: user.firstName });
};

module.exports = {
  registerUser,
  userLogin,
  userLogout,
  checkIfLoggedIn,
  verifyOtp,
};
