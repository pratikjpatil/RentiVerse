const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const userInformation = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const profile = {
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            email: user.email,
            address: user.address.area,
            pincode: user.address.pincode,
        }
        res.status(200).json(profile);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }

}

const updateUser = async (req, res) => {
    try {
        const { pincode, phone, email, address, password } = req.body;
        const update = {};

        if (phone && phone!="") {
            // Check if the phone number already exists in the database
            const existingPhoneUser = await User.findOne({ phone });
            if (existingPhoneUser && existingPhoneUser._id.toString() !== req.user.id) {
                return res.status(400).json({ message: "Phone number already in use by another user." });
            }
            update.phone = phone;
        }

        if (email && email!="") {
            // Check if the email already exists in the database
            const existingEmailUser = await User.findOne({ email: email.toLowerCase() });
            if (existingEmailUser && existingEmailUser._id.toString() !== req.user.id) {
                return res.status(400).json({ message: "Email already in use by another user." });
            }
            update.email = email.toLowerCase();
        }
        update.address = {}
        if (address && address != "") update.address.area = address;
        if (pincode && pincode != "") update.address.pincode = pincode;

        if (password && password != "") {
            const hashedPassword = await bcrypt.hash(password, 10);
            update.password = hashedPassword;
        }

        update.modifiedAt = Date.now();

        const result = await User.findByIdAndUpdate(req.user.id, update, { new: true });

        res.status(200).json(result);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};



module.exports = { userInformation, updateUser };