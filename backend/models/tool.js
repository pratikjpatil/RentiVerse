const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const toolSchema = new mongoose.Schema({
    toolId:{
        type: String,
        default: uuidv4,
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
        type: String,       //temp field used for testing purpose of frontend , contains https://picsum.photos/1500/1000/?blur url for all tools
       
    },
    toolImg:{
        type: [String],         //temp field used for testing purpose of frontend , contains https://picsum.photos/200 url for all tools
        required: true
    },
    toolImages:{
        type: [String],             //main field for storing img urls uploaded from add-on-rent api
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
    ownerId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true,    
    }, //owner of this tool

    renterId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
    }, //person who has taken this tool on rent

    receivedRequests: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "RentRequest",
    },  //requests received for this product for renting

    createdAt : {
        type: Date,
        default: Date.now,
    }
});     

const Tool = new mongoose.model("Tool", toolSchema);

module.exports = Tool;