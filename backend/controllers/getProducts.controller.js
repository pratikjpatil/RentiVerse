const mongoose = require("mongoose");
const Product = require("../models/product");
const User = require("../models/user");

const getAllOrSearchProducts = async (req, res) => {
  const searchText = req.query.searchText || "";
  console.log("\n\n", searchText);
  let searchQuery = {
    renterId: null,
    acceptedRequestId: null,
    isDrafted: false,
  };
  if (searchText !== "") {
    searchQuery = {
      $or: [
        { productName: { $regex: searchText, $options: "i" } },
        // { productCategory: { $regex: searchText, $options: "i" } },
        { productTags: { $regex: searchText, $options: "i" } },
      ],
      renterId: null,
      acceptedRequestId: null,
      isDrafted: false,
    };
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 30;
  const skip = (page - 1) * limit;

  try {
    const count = await Product.countDocuments(searchQuery);
    const totalPages = Math.ceil(count / limit);

    const products = await Product.find(searchQuery)
      .select(
        "productId productName productCategory productPrice productDescription productQuantity productTags productImages"
      )
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // console.log(count);

    res.status(200).json({ totalPages, currentPage: page, products });
  } catch (error) {
    console.error(`Error searching products: ${error}`);
    return res.status(500).json({ message: "Error searching products" });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 30;

    const skip = (page - 1) * limit;
    const products = await Product.find({
      productCategory: req.params.category,
      renterId: null,
      acceptedRequestId: null,
      isDrafted: false,
    })
      .select(
        "productId productName productCategory productPrice productDescription productQuantity productTags productImages"
      )
      .skip(skip)
      .limit(limit);
    return res.status(200).json({ products });
  } catch (error) {
    console.error(`Error fetching products by category: ${error}`);
    return res.status(500).json({ message: "Error fetching products by category" });
  }
};

const getRecentlyViewed = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("recentlyViewed");
    const products = user.recentlyViewed.filter((product) => !product.isDrafted);

    return res.status(200).json({ products });
  } catch (error) {
    console.log("Error getting recently viewed" + error);
    res.status(500).json({ message: "Error getting recently viewed" });
  }
};

const listed = async (req, res) => {
  try {
    const products = await User.findById(req.user.id).populate("listed");

    return res.status(200).json(products.listed);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const takenOnrent = async (req, res) => {
  const returnsPage = req.query.returnsPage;
  try {
    const user = await User.findById(req.user.id).populate({
      path: "takenOnRent",
      populate: {
        path: "acceptedRequestId",
        populate: "ownerId",
      },
    });

    if (returnsPage) {
      //to view on returns page
      const returnProductsInfo = user.takenOnRent.map((product) => {
        return {
          requestId: product.acceptedRequestId.requestId,
          productName: product.productName,
          userName: product.acceptedRequestId.ownerId.firstName + " " + product.acceptedRequestId.ownerId.lastName,
          returnDate: product.acceptedRequestId.dueDate,
          amountPaid: product.acceptedRequestId.amountPaid,
          user2Id: product.ownerId,
          orderStatus: product.acceptedRequestId.orderStatus,
          returnConfirmation: product.acceptedRequestId.returnConfirmation,
        };
      });
      return res.status(200).json(returnProductsInfo);
    } else {
      const takenOnRentProducts = user.takenOnRent.map((product) => {
        const {
          productId,
          productName,
          productCategory,
          productPrice,
          productDescription,
          productQuantity,
          productTags,
          productImages,
        } = product;

        return {
          productId,
          productName,
          productCategory,
          productPrice,
          productDescription,
          productQuantity,
          productTags,
          productImages,
        };
      });
      return res.status(200).json(takenOnRentProducts);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const givenOnRent = async (req, res) => {
  const returnsPage = req.query.returnsPage;
  try {
    const user = await User.findById(req.user.id).populate({
      path: "givenOnRent",
      populate: {
        path: "acceptedRequestId",
        populate: "userId",
      },
    });

    if (returnsPage) {
      //to view on returns page
      const returnProductsInfo = user.givenOnRent.map((product) => {
        return {
          requestId: product.acceptedRequestId.requestId,
          productName: product.productName,
          userName: product.acceptedRequestId.userId.firstName + " " + product.acceptedRequestId.userId.lastName,
          returnDate: product.acceptedRequestId.dueDate,
          amountPaid: product.acceptedRequestId.amountPaid,
          user2Id: product.renterId,
          orderStatus: product.acceptedRequestId.orderStatus,
          returnConfirmation: product.acceptedRequestId.returnConfirmation,
        };
      });
      return res.status(200).json(returnProductsInfo);
    } else {
      const givenOnRentProducts = user.givenOnRent.map((product) => {
        const {
          productId,
          productName,
          productCategory,
          productPrice,
          productDescription,
          productQuantity,
          productTags,
          productImages,
        } = product;

        return {
          productId,
          productName,
          productCategory,
          productPrice,
          productDescription,
          productQuantity,
          productTags,
          productImages,
        };
      });
      return res.status(200).json(givenOnRentProducts);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const draftProducts = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("draftProducts");

    return res.status(200).json(user.draftProducts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllOrSearchProducts,
  getProductsByCategory,
  getRecentlyViewed,
  listed,
  takenOnrent,
  givenOnRent,
  draftProducts,
};
