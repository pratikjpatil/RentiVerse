const mongoose = require("mongoose");
const Tool = require("../models/tool");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const addOnRent = async (req, res) => {
  const { toolName, dueDate, toolPrice, toolQuantity, toolTags, toolCategory, toolDesc } = req.body;

  // Check if there are images in the request
  if (!req.files || req.files.length !== 4) {
    return res.status(400).json({ message: "Please upload 4 images." });
  }

  const newTool = new Tool({
    ownerId : req.user.id,
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

        const imagePath = `../public/images/tools/${Date.now()}-${req.user.id}-${toolName}-${imgCnt++}`;
        const imageStream = sharp(image.buffer).resize({ width: 800 }).jpeg({ quality: 80 });

        // Save the processed image to disk
        await new Promise((resolve, reject) => {
          const writeStream = fs.createWriteStream(path.join(__dirname, imagePath));
          imageStream.pipe(writeStream);
          writeStream.on("finish", resolve);
          writeStream.on("error", reject);
        });

        processedImages.push(`${process.env.TOOL_IMG_PATH}/images/tools/${path.basename(imagePath)}`);
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
