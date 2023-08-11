const app = require("express")();
const User = require("../models/user");
const mongoose = require("mongoose");

const userIsVerified = app.use(async(req, res, next)=>{
    try {
        const user = await User.findById(req.user.id);
        if(!user.isVerified){
            return res.status(403).json({message: "User not verified."});
        }
        
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = userIsVerified;