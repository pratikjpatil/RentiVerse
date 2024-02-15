const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const rentSchema = new mongoose.Schema({
  requestId: {
    type: String,
    default: uuidv4,
    unique: true,
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  requestStatus: {
    type: String,
    required: true,
    enum: ["pending", "accepted", "rejected"],
  },
  payment: {
    status: {
      type: Boolean,
      default: false
    },
    sign: {
        type: String, //contains razorpay_order_id + "|" + razorpay_payment_id, will be further used to check payment on razorpay portal
        default: null
    }
  },

  
  orderStatus: {
    buy: {
      type: String,
      enum: ["processing", "shipped", "delivered"],
    },
    return: {
      type: String,
      enum: ["shipped", "delivered", "rejected"] //rejected means owner have rejected the returnConfirmation
    }
  },

  returnConfirmation : {
    type: Boolean,
    default: false
  },

  amountPaid : {
    type: Number,
    default: 0
  },

  acceptedAt: {
    type: Date,
    default: null,
  },
  rejectedAt: {
    type: Date,
    default: null,
  },
},{timestamps: true});

const RentRequest = mongoose.model("RentRequest", rentSchema);

module.exports = RentRequest;
