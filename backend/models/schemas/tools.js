const mongoose = require("mongoose");

const toolSchema = new mongoose.Schema({
    toolId:{
        type: String,
        required: true
    },
    toolName: {
        type: String,
        required: true,
    },
    toolCategory: {
        type: String,
        required: true,
    },
    toolPrice: {
        type: String,
        required: true,
    },
    toolDesc: {
        type: String,
        required: true
    }

});     

const Tool = new mongoose.model("tool", toolSchema);

module.exports = Tool;