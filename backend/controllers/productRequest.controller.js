const mongoose = require("mongoose");
const User = require("../models/user");
const Tool = require("../models/tool");
const RentRequest = require("../models/rentRequest");

const sendRequest = async (req, res) => {

    const itemId = req.params.itemId;
    const userId = req.user.id;
    let { dueDate, message } = req.body;

    try {

        const tool = await Tool.findOne({ itemId: itemId });
        if (!tool) {
            return res.status(404).json({ message: "Tool not found" });
        }

        const exists = await RentRequest.findOne({ itemId: tool._id, userId: userId });

        if (exists) {
            return res.status(409).json({ message: "Request already sent by this user for this tool" });
        }

        if (!dueDate) {
            dueDate = tool.dueDate;
        }

        const result = await RentRequest.create({
            itemId: tool._id,
            userId: userId,
            ownerId: tool.ownerId,
            dueDate: dueDate,
            message: message,
            requestStatus: "pending",
        });

        // Add rentRequest _id to the sentRequests field of the user
        await User.findByIdAndUpdate(result.userId, { $push: { sentRequests: result._id } });

        // Add rentRequest _id to the receivedRequests field of the owner
        await User.findByIdAndUpdate(result.ownerId, { $push: { receivedRequests: result._id } });

        // Add rentRequest _id to the receivedRequests field of tool
        tool.receivedRequests.push(result._id);
        await tool.save();

        res.status(201).json({ message: "Request for renting tool sent successful" });

    } catch (error) {

        console.error("Error sending request: ", error);
        return res.status(500).json({ message: "Error sending request" });

    }


};

const showSentRequests = async (req, res) => {
    try {

        const user = await User.findById(req.user.id).populate({
            path: "sentRequests"
        });

        res.status(200).json(user.sentRequests);

    } catch (error) {

        console.error("Error fetching sent requests: ", error);
        return res.status(500).json({ message: "Error fetching sent requests" });
    }
};


const showReceivedRequests = async (req, res) => {

    try {

        const user = await User.findById(req.user.id).populate({
            path: "receivedRequests"
        });

        res.status(200).json(user.receivedRequests);

    } catch (error) {

        console.error("Error fetching sent requests: ", error);
        return res.status(500).json({ message: "Error fetching sent requests" });
    }

}



const acceptRequest = async (req, res) => {

    const requestId = req.params.requestId;

    try {

        const request = await RentRequest.findOne({ requestId: requestId });
        if (!request) {
            return res.status(404).json({ message: "request does not exists" });
        }

        const ownerId = request.ownerId;

        // If the logged-in user is not the owner of the product
        if (req.user.id != ownerId) {
            return res.status(403).json({ message: "You are not authorized to perform this action. Only the owner of this product can do this." });
        }

        // Check if the request is already accepted
        if (request.requestStatus === "accepted") {
            return res.status(400).json({ message: "Request is already accepted" });
        }

        if (request.requestStatus === "rejected") {
            return res.status(400).json({ message: "Request is already rejected you cannot accept it now" });
        }

        request.requestStatus = "accepted";
        request.acceptedAt = new Date();

        await request.save();
        res.status(200).json({ message: "Request accepted successfully" });


    } catch (error) {

        console.error("Error accepting request: ", error);
        return res.status(500).json({ message: "Error accepting request" });

    }

};


const showAcceptedRequests_received = async (req, res) => {

    try {

        const user = await User.findById(req.user.id).populate({
            path: "receivedRequests",
            match: { requestStatus: "accepted" },
        });
        //the receivedRequests field will only contains the requests whose requestStatus is "accepted"

        res.status(200).json(user.receivedRequests);

    } catch (error) {

        console.error("Error fetching accepted requests: ", error);
        return res.status(500).json({ message: "Error fetching accepted requests" });
    }

};



const showAcceptedRequests_sent = async (req, res) => {

    try {

        const user = await User.findById(req.user.id).populate({
            path: "sentRequests",
            match: { requestStatus: "accepted" },
        });
        //the sentRequests field will only contains the requests whose requestStatus is "accepted"

        res.status(200).json(user.sentRequests);

    } catch (error) {

        console.error("Error fetching accepted requests: ", error);
        return res.status(500).json({ message: "Error fetching accepted requests" });
    }

};



const rejectRequest = async (req, res) => {
    const requestId = req.params.requestId;

    try {
        const request = await RentRequest.findOne({ requestId: requestId });
        if (!request) {
            return res.status(404).json({ message: "Request does not exist" });
        }

        const ownerId = request.ownerId;

        // If the logged-in user is not the owner of the product
        if (req.user.id != ownerId) {
            return res.status(403).json({ message: "You are not authorized to perform this action. Only the owner of this product can do this." });
        }

        if (request.requestStatus === "accepted") {
            return res.status(400).json({ message: "Request is already accepted you can't reject it now" });
        }

        // Check if the request is already rejected
        if (request.requestStatus === "rejected") {
            return res.status(400).json({ message: "Request is already rejected" });
        }

        // Update the requestStatus to "rejected" and set the rejectedAt timestamp
        request.requestStatus = "rejected";
        request.rejectedAt = new Date();
        await request.save();

        res.status(200).json({ message: "Request rejected successfully" });

    } catch (error) {

        console.error("Error rejecting request:", error);
        return res.status(500).json({ message: "Error rejecting request" });

    }
};




const showRejectedRequests_received = async (req, res) => {

    try {

        const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000); // 2 days ago

        const user = await User.findById(req.user.id).populate({
            path: "receivedRequests",
            match: {
                requestStatus: "rejected",
                rejectedAt: { $gte: twoDaysAgo }, // Show only rejected requests within the last 2 days
            },
        });
        //the receivedRequests field will only contains the requests whose requestStatus is "rejected"

        res.status(200).json(user.receivedRequests);

    } catch (error) {

        console.error("Error fetching accepted requests: ", error);
        return res.status(500).json({ message: "Error fetching accepted requests" });
    }

}



const showRejectedRequests_sent = async (req, res) => {

    try {

        const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000); // 2 days ago

        const user = await User.findById(req.user.id).populate({
            path: "sentRequests",
            match: {
                requestStatus: "rejected",
                rejectedAt: { $gte: twoDaysAgo }, // Show only rejected requests within the last 2 days
            },
        });
        //the receivedRequests field will only contains the requests whose requestStatus is "rejected"

        res.status(200).json(user.sentRequests);

    } catch (error) {

        console.error("Error fetching accepted requests: ", error);
        return res.status(500).json({ message: "Error fetching accepted requests" });
    }
    
}   





module.exports = { sendRequest, showSentRequests, showReceivedRequests, acceptRequest, showAcceptedRequests_received, showAcceptedRequests_sent, rejectRequest, showRejectedRequests_received, showRejectedRequests_sent };