const mongoose = require("mongoose");
const cloudinary = require("../config/cloudinaryConfig");
const Tool = require("../models/tool");
const User = require("../models/user");
const fs = require("fs");
// const sharp = require("sharp");
// const path = require("path");


const addItems = async (req, res) => {

  const { toolName, dueDate, toolPrice, toolQuantity, toolTags, toolCategory, toolDesc } = req.body;


  if (!req.files || req.files.length !== 4) {
    return res.status(400).json({ message: "Please upload 4 images." });
  }

  const newTool = new Tool({
    ownerId: req.user.id,
    toolName,
    dueDate,
    toolPrice,
    toolQuantity,
    toolTags,
    toolCategory,
    toolDesc,
  });

  try {

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

    //     const imagePath = `../public/images/items/${Date.now()}-${toolName}-${imgCnt++}-${req.user.id}${ext}`;
    //     const imageStream = sharp(image.buffer).resize({ width: 600 }).jpeg({ quality: 80 });

    //     // Save the processed image to disk
    //     await new Promise((resolve, reject) => {
    //       const writeStream = fs.createWriteStream(path.join(__dirname, imagePath));
    //       imageStream.pipe(writeStream);
    //       writeStream.on("finish", resolve);
    //       writeStream.on("error", reject);
    //     });

    //     processedImages.push(`/public/images/items/${path.basename(imagePath)}`);
    //   })
    // );


    const images = req.files;
    const urls = await Promise.all(
      images.map(async (image) => {
        const { public_id, secure_url } = await cloudinary.uploader.upload(image.path, {
          folder: "RentiVerse/addItems",
          width: 600,
        });

        // Delete the file from disk after successful upload
        fs.unlink(image.path, (err) => {
          if (err) {
            console.error('Error deleting the file:', err);
          }
        });

        return { public_id, secure_url };
      })
    );

    newTool.toolImages = urls;

    await newTool.save();

    await User.findByIdAndUpdate(req.user.id, { $push: { listed: newTool._id } });

    return res.status(201).json({ message: "Item added successfully" });

  } catch (error) {

    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });

  }
};


const itemInfo = async(req, res)=>{
    try {
      const productId = req.params.itemId;

      const itemInfo = await Tool.findOne({itemId: productId}).populate("ownerId");

      if(!itemInfo){
        return res.status(404).json({message: "Product not found"})
      }

      const {itemId, toolName, toolCategory, toolDesc, toolImages, toolPrice, toolQuantity, dueDate} = itemInfo;

      res.status(200).json({itemId, toolName, toolCategory, toolDesc, toolImages, toolPrice, toolQuantity, dueDate, toolImages, ownerName: itemInfo.ownerId.firstName+" "+itemInfo.ownerId.lastName});

    } catch (error) {
      console.log(error);
      return res.status(500).json({message: "Internal server error"});
    }
}

module.exports = { addItems, itemInfo };
