const mongoose = require("mongoose");
const User = require("../models/user");
const Tool = require("../models/tool");

const addOnRent = async(req, res)=>{

    const {toolName, dueDate, toolPrice, toolQuantity, toolTags, toolCategory, toolDesc} = req.body;

    const newTool = new Tool({
        toolName, dueDate, toolPrice, toolQuantity, toolTags, toolCategory, toolDesc
    });

    try {

        await newTool.save();
        
        const userId = req.user.id;
        await User.findByIdAndUpdate(userId, { $push: { listed: newTool._id } });

        return res.status(201).json(newTool);

    } catch (error) {

        console.log(error);
        return res.status(500).json({message: "Something went wrong"});
    }

}

module.exports = addOnRent;