const mongoose = require("mongoose");
const Tool = require("../models/schemas/tools");

const showAllProds = async (req, res) => {
  Tool.find({})
    .then((tools) => res.send(tools))
    .catch((err) => console.error(err));
};

module.exports = { showAllProds };
