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
            gender: user.gender,
            phone: user.phone,
            email: user.email,
            village: user.address.village,
            district: user.address.district,
            city: user.address.city,
            state: user.address.state,
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
        const { pincode, phone, email, state, village, district, city, password } = req.body;
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

        update.address = {};
        if (state && state != "") update.address.state = state.toLowerCase();
        if (village && village != "") update.address.village = village.toLowerCase();
        if (district && district != "") update.address.district = district.toLowerCase();
        if (city && city != "") update.address.city = city.toLowerCase();
        if (pincode && pincode != "") update.address.pincode = pincode;

        if (password && password != "") {
            const hashedPassword = await bcrypt.hash(password, 10);
            update.password = hashedPassword;
        }

        update.modifiedAt = Date.now();

        const result = await User.findByIdAndUpdate(req.user.id, update, { new: true });

        if(email){
            const token = jwt.sign({ email: result.email, id: result._id }, process.env.SECRET_KEY, {
                expiresIn: process.env.JWT_TOKEN_EXPIRATION,
            });
    
            const cookieExpiration = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000); // 2 days in milliseconds
            res.cookie("token", token, { httpOnly: true, expires: cookieExpiration });
        }

        res.status(200).json(result);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};



module.exports = { userInformation, updateUser };