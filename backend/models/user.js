const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        default: uuidv4,
        unique: true,
    },
    profilePicture: {
        type: String
    },  
    firstName: {
        type: String,
        // required: true,
    },
    lastName: {
        type: String,
        // required: true,
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        //required: true
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
        default: null,
        // required: true
    },
    address: {
        village: {
            type: String,
            // required: true
        },
        city: {
            type: String,
            // required: true,
        },
        district: {
            type: String,
            // required: true
        },
        state: {
            type: String,
            // required: true,
        },
        pincode: {
            type: Number,
            // required: true,
        },

        country: {
            type: String,
            default: 'India'
            //required: true,
        },
    },
    isVerified : {
        type: Boolean,
        default: false
    },
    otp : {
        type: Number,
    },
    createdAt : {
        type: Date,
        default: Date.now,
    },
    modifiedAt :{
        type: Date,
    },
    listed: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tool" }], //tools listed for rent
    givenOnRent:[{ type: mongoose.Schema.Types.ObjectId, ref: "Tool" }], //tools which are given on rent
    takenOnRent:[{ type: mongoose.Schema.Types.ObjectId, ref: "Tool" }], //tools which are taken on rent
    wishlist:[{ type: mongoose.Schema.Types.ObjectId, ref: "Tool" }],
    sentRequests: [{type: mongoose.Schema.Types.ObjectId, ref: "RentRequest" }],   //rent requests sent to item owners
    receivedRequests: [{type: mongoose.Schema.Types.ObjectId, ref: "RentRequest" }],   //rent requests received from others

    chats: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chat" }], //chats of the user with other users
});     

const User = new mongoose.model("User", userSchema);

module.exports = User;