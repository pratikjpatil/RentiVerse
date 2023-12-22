const mongoose = require("mongoose");
const cloudinary = require("../config/cloudinaryConfig");
const Tool = require("../models/tool");
const User = require("../models/user");
const Razorpay = require('razorpay');



const payment = async(req, res)=>{
  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
  
  const options = {
    amount: 50000,  // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11"
  };
  instance.orders.create(options, function(err, order) {
    console.log(order);
  });

  res.status(200).json({message: "Payment controller"});
}

module.exports = {payment};