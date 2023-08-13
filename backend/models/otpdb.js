const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  emailOtp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
    expires: 600, // TTL (Time-to-Live) in seconds, here 10 minutes
  },
  expiresAt: {
    type: Date,
    default: Date.now() + 600 * 1000,
    required: true,
  },
});

const OTP = mongoose.model("OTP", otpSchema);

module.exports = OTP;
