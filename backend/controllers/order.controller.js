const User = require("../models/user");
const Product = require("../models/product");
const RentRequest = require("../models/rentRequest");

const orderDetails = async (req, res) => {
  try {
  
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


const getTakenOnRentProducts = (req, res) => {
  
}

module.exports = { orderDetails };
