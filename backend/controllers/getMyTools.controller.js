const mongoose = require("mongoose");
const User = require("../models/user");
const Tool = require("../models/tool");

const listed = async (req, res) => {
    try {
        const tools = await User.findById(req.user.id).populate("listed");
        if(!tools){
            return res.status(404).json({message: "No tools are listed"});
        }

        return res.status(200).json(tools.listed);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
  
};
const takenOnrent = async (req, res) => {

    try {
        const tools = await User.findById(req.user.id).populate("takenOnRent");
        if(!tools){
            return res.status(404).json({message: "No tools are taken on rent"});
        }
        return res.status(200).json(tools.takenOnRent);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
   
};
const givenOnRent = async (req, res) => {

    try {
        const tools = await User.findById(req.user.id).populate("givenOnRent");
        if(!tools){
            return res.status(404).json({message: "No tools are given on rent"});
        }
        return res.status(200).json(tools.givenOnRent);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
  
};

module.exports = { listed, takenOnrent, givenOnRent};
