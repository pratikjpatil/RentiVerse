const mongoose = require("mongoose");
const Tool = require("../models/tool");
const RentRequest = require("../models/rentRequest");
const User = require("../models/user");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const createOrder = async (req, res) => {
  const { requestId } = req.body;
  try {

    const request = await RentRequest.findOne({requestId}).populate("itemId");

    if(request.payment.status===true){
      return res.status(400).json({message: "Payment already done!"});
    }

    const productPrice = request.itemId.toolPrice;

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: productPrice * 100,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    instance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Something Went Wrong!" });
      }

      const data = order;
      data.productImage = request.itemId.toolImages[0].secure_url;
      res.status(200).json({ data });
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
};

const verifyPayment = async (req, res) => {
  
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, requestId } = req.body;
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
            'payment.status': true,
            'payment.sign': sign,
          },
        },
        { new: true }
      );

      if (!updatedRequest) {
        console.error(`No rent request found with requestId: ${requestId}`);
        return res.status(400).json({ message: "Invalid rent request ID!\nContact support if money is deducted." });;
      }

      await Tool.findOneAndUpdate({_id: updatedRequest.itemId}, {$set:{renterId: updatedRequest.userId}});

      await User.findOneAndUpdate(
        { _id: updatedRequest.ownerId},
        {
          $pull: { listed: updatedRequest.itemId, receivedRequests: updatedRequest._id},
          $addToSet: { givenOnRent: updatedRequest.itemId }
        }
      );

      await User.findOneAndUpdate(
        { _id: updatedRequest.userId},
        {
          $pull: { sentRequests: updatedRequest._id },        
          $addToSet: { takenOnRent: updatedRequest.itemId } 
        }
      );

      return res.status(200).json({ message: "Payment verified successfully" });
    } else {
      return res.status(400).json({ message: "Invalid signature sent!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
};

module.exports = { createOrder, verifyPayment };
