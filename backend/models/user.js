const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema({
    // userId: {
    //     type: String,
    //     default: uuidv4,
    //     unique: true,
    // },
    profilePicture: {
        type: String
    },  
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    
    phone: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    address: {
        area:{
            type: String
        },
        pincode: {
            type: Number,
            // required: true,
        }
    },
    isVerified : {
        type: Boolean,
        default: false
    },
    listed: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }], //tools listed for rent
    givenOnRent:[{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }], //tools which are given on rent
    takenOnRent:[{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }], //tools which are taken on rent
    wishlist:[{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    sentRequests: [{type: mongoose.Schema.Types.ObjectId, ref: "RentRequest" }],   //rent requests sent to item owners
    receivedRequests: [{type: mongoose.Schema.Types.ObjectId, ref: "RentRequest" }],   //rent requests received from others

    chats: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chat" }], //chats of the user with other users
},{timestamps: true});     

const User = new mongoose.model("User", userSchema);

module.exports = User;