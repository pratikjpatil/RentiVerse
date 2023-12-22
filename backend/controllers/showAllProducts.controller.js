const mongoose = require("mongoose");
const Tool = require("../models/tool");

const showAllProds = async (req, res) => {
  try {
    const tools = await Tool.find({
      renterId: null,
      acceptedRequestId: null,
    }).select(
      "itemId toolName toolCategory toolPrice toolDesc toolQuantity toolTags toolImages"
    );

    return res.status(200).json(tools);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { showAllProds };
