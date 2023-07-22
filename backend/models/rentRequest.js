const mongoose = require("mongoose");

const rentSchema = new mongoose.Schema({

    tool: { type: mongoose.Schema.Types.ObjectId, ref: "Tool" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    dueDate: { 
        type: Date,
    },
    quantity: { 
        type: Number,
    }

});     

const Rent = new mongoose.model("rent", rentSchema);

module.exports = Rent;