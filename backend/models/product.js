const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const productSchema = new mongoose.Schema({
    productId: {
        type: String,
        default: uuidv4,
        unique: true,
        required: true
    },
    productName: {
        type: String,
        required: true,
    },
    productCategory: {
        type: String,
        required: true,
    },
    productPrice: {
        type: Number,
        required: true,
    },
    productDescription: {
        type: String,
        required: true
    },
    productImages: {
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
    productQuantity: {
        type: Number,
        default: 1,
    },
    productTags: {
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
        default: null,
    }, //person who has taken this tool on rent

    receivedRequests: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "RentRequest",
    },  //requests received for this product for renting

    acceptedRequestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RentRequest",
        default: null,
    }, 

},{timestamps: true});

const Product = new mongoose.model("Product", productSchema);

module.exports = Product;