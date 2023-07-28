const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const rentSchema = new mongoose.Schema({
    requestId: {
        type: String,
        default: uuidv4,
        required: true,
    },
    toolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tool",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    requestStatus: {
        type: String,
        required: true,
        enum: ["pending", "accepted", "rejected"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    acceptedAt: {
        type: Date,
        default: null,
    },

    rejectedAt: {
        type: Date,
        default: null,
    },
});


const RentRequest = mongoose.model("RentRequest", rentSchema);

module.exports = RentRequest;
