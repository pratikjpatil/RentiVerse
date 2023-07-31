const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const toolSchema = new mongoose.Schema({
    itemId: {
        type: String,
        default: uuidv4,
        unique: true,
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
    toolImages: {
        type: [{
            public_id: { type: String, required: true },
            secure_url: { type: String, required: true },
        }],
        required: true,
    },

    dueDate: {
        type: Date,
        required: true
    },
    toolQuantity: {
        type: Number,
        default: 1,
    },
    toolTags: {
        type: [String]
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }, //owner of this tool

    renterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }, //person who has taken this tool on rent

    receivedRequests: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "RentRequest",
    },  //requests received for this product for renting

    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Tool = new mongoose.model("Tool", toolSchema);

module.exports = Tool;