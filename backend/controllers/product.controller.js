const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cloudinary = require("../config/cloudinaryConfig");
const Product = require("../models/product");
const {createNotification} = require("../utils/notification");
const User = require("../models/user");
const fs = require("fs");
const RentRequest = require("../models/rentRequest");
// const sharp = require("sharp");
// const path = require("path");

const addProduct = async (req, res) => {
  const {
    productName,
    dueDate,
    productPrice,
    productQuantity,
    productTags,
    productCategory,
    productDescription,
  } = req.body;

  if (!req.files || req.files.length !== 4) {
    return res.status(400).json({ message: "Please upload 4 images." });
  }

  const tags = productTags
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag !== "");

  try {
    const newProduct = new Product({
      ownerId: req.user.id,
      productName,
      dueDate,
      productPrice,
      productQuantity,
      productTags: tags,
      productCategory,
      productDescription,
    });

    console.log(newProduct, req.files.length)
    //This code is to compress and store images in local-storage but for this the multer storage should be memoryStorage

    // const processedImages = [];
    // let imgCnt = 1;
    // // Process and save the images using streams in parallel
    // await Promise.all(
    //   req.files.map(async (image) => {
    //     if (!image.buffer) {
    //       throw new Error("Invalid image buffer.");
    //     }

    //     // Extract the file extension from the original image file
    //     const ext = path.extname(image.originalname);

    //     const imagePath = `../public/images/products/${Date.now()}-${productName}-${imgCnt++}-${req.user.id}${ext}`;
    //     const imageStream = sharp(image.buffer).resize({ width: 600 }).jpeg({ quality: 80 });

    //     // Save the processed image to disk
    //     await new Promise((resolve, reject) => {
    //       const writeStream = fs.createWriteStream(path.join(__dirname, imagePath));
    //       imageStream.pipe(writeStream);
    //       writeStream.on("finish", resolve);
    //       writeStream.on("error", reject);
    //     });

    //     processedImages.push(`/public/images/products/${path.basename(imagePath)}`);
    //   })
    // );

    const images = req.files;
    const urls = await Promise.all(
      images.map(async (image) => {
        const { public_id, secure_url } = await cloudinary.uploader.upload(
          image.path,
          {
            folder: "RentiVerse/addProduct",
            width: 600,
          }
        );
        console.log(`cloudinary uploaded ${image.path}`)

        // Delete the file from disk after successful upload
        fs.unlink(image.path, (err) => {
          if (err) {
            console.error("Error deleting the file:", err);
          }
        });

        console.log(`image deleted ${image.path}`)


        return { public_id, secure_url };
      })
    );

    newProduct.productImages = urls;
    console.log("urls "+ urls)
    await newProduct.save();

    await User.findByIdAndUpdate(req.user.id, {
      $push: { listed: newProduct._id },
    });

    console.log("user updated")

    return res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const productInfo = async (req, res) => {

  //to determine the recently viewed items by the user
  const token = req.cookies.token;

  if (token) {
    const user = jwt.verify(token, process.env.SECRET_KEY);
    req.user = user;
  }

  try {
    const productInfo = await Product.findOne({
      productId: req.params.productId,
    }).populate("ownerId receivedRequests");

    if (!productInfo) {
      return res.status(404).json({ message: "Product not found" });
    }

    //if the user is logged in then add this viewed product in recentlyViewed of user
    let requestStatus = "notSent"
    if (req.user && req.user.id) {
      const productId = productInfo._id;

      // Remove the existing product from recentlyViewed array
      await User.findByIdAndUpdate(req.user.id, {
        $pull: { recentlyViewed: productId },
      });

      // Add the new product to the beginning of recentlyViewed array
      await User.findByIdAndUpdate(req.user.id, {
        $push: {
          recentlyViewed: {
            $each: [productId],
            $position: 0,
            $slice: -20,
          },
        },
      });

      //check if the loggedin user has already sent request to this product
      
      const request = productInfo.receivedRequests.find(request => request.userId.toString() === req.user.id); 

      if(request){
        requestStatus = request.requestStatus;
      }
      
    }

    const {
      productId,
      productName,
      productCategory,
      productDescription,
      productImages,
      productPrice,
      productQuantity,
      dueDate,
    } = productInfo;

    res.status(200).json({
      productId,
      productName,
      productCategory,
      productDescription,
      productImages,
      productPrice,
      productQuantity,
      dueDate,
      productImages,
      requestStatus,
      ownerName:
        productInfo.ownerId.firstName + " " + productInfo.ownerId.lastName,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;

    const product = await Product.findOne({productId});

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the product is under renting process
    if (product.acceptedRequestId !== null || product.renterId !== null) {
      return res.status(400).json({ message: "Cannot delete the product as it is under renting process" });
    }
    
    // Delete the product
    await Product.findOneAndDelete({productId});

    // Update user's listed products and draftProducts, remove the deleted product from the lists
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { listed: product._id, draftProducts: product._id },
    });

    // Delete associated rent requests
    await RentRequest.deleteMany({ productId: product._id });

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//update product in draft and move to listed
const updateAndMoveToListed = async (req, res) => {
  try {
    const productId = req.params.productId;

    // Find the product by ID
    const product = await Product.findOne({productId});

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (!product.isDrafted) {
      return res.status(400).json({ message: "Cannot update the product as it is not in drafts" });
    }

    // Update product details
    product.productName = req.body.productName;
    product.dueDate = req.body.dueDate;
    product.productPrice = req.body.productPrice;
    product.productDescription = req.body.productDescription;
    product.isDrafted = false;
    await product.save();

    await User.findByIdAndUpdate(req.user.id, {
      $pull: { draftProducts: product._id },
      $push: { listed: product._id }
    });
    

    return res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



module.exports = { addProduct, productInfo, deleteProduct, updateAndMoveToListed };
