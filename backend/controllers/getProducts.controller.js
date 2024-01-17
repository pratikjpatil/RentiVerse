const mongoose = require("mongoose");
const Product = require("../models/product");
const User = require("../models/user");

const getProducts = async(req, res) => {
  const searchText = req.query.searchText || "";
  console.log(searchText)
  let searchQuery = {
    renterId: null,
    acceptedRequestId: null,
  };
  if (searchText!=="") {
    searchQuery = {
      $or: [
        { productName: { $regex: searchText, $options: "i" } },
        { productCategory: { $regex: searchText, $options: "i" } },
        { productTags: { $regex: searchText, $options: "i" } },
      ],
      renterId: null,
      acceptedRequestId: null,
    };
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 30;
  const skip = (page - 1) * limit;

  try {
    const count = await Product.countDocuments(searchQuery);
    const totalPages = Math.ceil(count / limit);

    const products = await Product.find(searchQuery)
      .select("productId productName productCategory productPrice productDescription productQuantity productTags productImages")
      .skip(skip)
      .limit(limit);

    res.status(200).json({ totalPages, currentPage: page, products });
  } catch (error) {
    console.error(`Error searching products: ${error}`);
    return res.status(500).json({ message: "Error searching products" });
  }
}

const listed = async (req, res) => {
  try {
    const products = await User.findById(req.user.id).populate("listed");
    if (!products) {
      return res.status(404).json({ message: "No products are listed" });
    }

    return res.status(200).json(products.listed);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const takenOnrent = async (req, res) => {
  try {
    const products = await User.findById(req.user.id).populate("takenOnRent");
    if (!products) {
      return res.status(404).json({ message: "No products are taken on rent" });
    }
    return res.status(200).json(products.takenOnRent);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const givenOnRent = async (req, res) => {
  try {
    const products = await User.findById(req.user.id).populate("givenOnRent");
    if (!products) {
      return res.status(404).json({ message: "No products are given on rent" });
    }
    return res.status(200).json(products.givenOnRent);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getProducts, listed, takenOnrent, givenOnRent };
