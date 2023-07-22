const mongoose = require("mongoose");

const toolSchema = new mongoose.Schema({

    ownerId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true,    
    }, //owner of this tool

    renterId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
    }, //person who has taken this tool on rent

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
        type: Number,
        required: true,
    },
    toolDesc: {
        type: String,
        required: true
    },
    toolbgImg:{
        type: String,
       
    },
    toolImg:{
        type: [String],
        required: true
    },
    dueDate:{
        type: Date,
        required: true
    },
    toolQuantity:{
        type: Number,
        default: 1,
    },
    toolTags:{
        type: [String]
    },


});     

const Tool = new mongoose.model("Tool", toolSchema);

module.exports = Tool;