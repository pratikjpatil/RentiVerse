const mongoose = require("mongoose");
const Tool = require("../models/tool");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const addOnRent = async (req, res) => {
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
    const processedImages = [];
    let imgCnt = 1;
    // Process and save the images using streams in parallel
    await Promise.all(
      req.files.map(async (image) => {
        if (!image.buffer) {
          throw new Error("Invalid image buffer.");
        }

        // Extract the file extension from the original image file
        const ext = path.extname(image.originalname);

        const imagePath = `../public/images/items/${Date.now()}-${toolName}-${imgCnt++}-${req.user.id}${ext}`;
        const imageStream = sharp(image.buffer).resize({ width: 800 }).jpeg({ quality: 80 });

        // Save the processed image to disk
        await new Promise((resolve, reject) => {
          const writeStream = fs.createWriteStream(path.join(__dirname, imagePath));
          imageStream.pipe(writeStream);
          writeStream.on("finish", resolve);
          writeStream.on("error", reject);
        });

        processedImages.push(`/public/images/items/${path.basename(imagePath)}`);
      })
    );

    // Add the processed images to the newTool
    newTool.toolImages = processedImages;

    await newTool.save();

    return res.status(201).json(newTool);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = addOnRent;
