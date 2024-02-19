const mongoose = require("mongoose");
const Product = require("../models/product");
const RentRequest = require("../models/rentRequest");
const User = require("../models/user");
const moment = require('moment');
const {createNotification} = require("../utils/notification");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const { log } = require("console");

const createOrder = async (req, res) => {
  const { requestId } = req.body;

  try {
    const request = await RentRequest.findOne({ requestId }).populate("productId");

    if (request.payment.status === true) {
      return res.status(400).json({ message: "Payment already done!" });
    }

    const dueDate = moment(request.dueDate);
    const currentDate = moment();

    let rentingDays = Math.ceil(dueDate.diff(currentDate, 'days') + 1); 
    if(rentingDays>=10){ // Calculating the total number of renting days excluding 2 days for delivery
      rentingDays -= 2; 
    } 
    const productPrice = request.productId.productPrice * rentingDays;
    
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: productPrice * 100,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    const order = await new Promise((resolve, reject) => {
      instance.orders.create(options, (error, order) => {
        if (error) {
          reject(error);
        } else {
          resolve(order);
        }
      });
    });

    order.productImage = request.productId.productImages[0].secure_url;

    return res.status(200).json({ order });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};


const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      requestId,
      amountPaid
    } = req.body;
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      const updatedRequest = await RentRequest.findOneAndUpdate(
        { requestId },
        {
          $set: {
            "payment.status": true,
            "payment.sign": sign,
          },
          amountPaid: Number(amountPaid)/100
        },
        { new: true }
      ).populate("productId");

      if (!updatedRequest) {
        console.error(`No rent request found with requestId: ${requestId}`);
        return res
          .status(400)
          .json({
            message:
              "Invalid rent request ID!\nContact support if money is deducted.",
          });
      }
      const notificationResult = await createNotification(
        updatedRequest.ownerId,
        `Payment of ${updatedRequest.amountPaid}rs received for ${updatedRequest.productId.productName}`
      );
      if (!notificationResult.success) {
        return res.status(400).json({ message: result.message });
      }
      return res.status(200).json({ message: "Payment verified successfully" });
    } else {
      return res.status(400).json({ message: "Invalid signature sent!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
    
  }
};

module.exports = { createOrder, verifyPayment };
