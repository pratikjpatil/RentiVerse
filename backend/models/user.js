const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        default: uuidv4,
        unique: true,
    },
    profilePicture: {

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
    address: {
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        pincode: {
            type: Number,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
    },
    givenOnRent:[givenOnRent],
    takenOnRent:[takenOnRent],
    wishlist:[wishlist]

});     

const User = new mongoose.model("user", userSchema);

module.exports = User;