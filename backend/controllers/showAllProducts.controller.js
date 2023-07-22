const mongoose = require("mongoose");
const Tool = require("../models/tool");

const showAllProds = async (req, res) => {

  try {

    const tools = await Tool.find({});
    return res.status(200).json(tools);

  } catch (error) {
    console.log(error);
    return res.status(500).json({message: "Internal server error"});
  }
  
};

module.exports = { showAllProds };
