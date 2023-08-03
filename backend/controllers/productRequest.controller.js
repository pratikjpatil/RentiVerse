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

        if (tool.ownerId == userId) {
            return res.status(400).json({ message: "Owner cant send request to self" });
        }

        const exists = await RentRequest.findOne({ itemId: tool._id, userId: userId });

        if (exists) {
            console.log(exists)
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

        return res.status(201).json({ message: "Request for renting tool sent successful" });

    } catch (error) {

        console.error("Error sending request: ", error);
        return res.status(500).json({ message: "Error sending request" });

    }


};



const acceptRequest = async (req, res) => {
    const requestId = req.params.requestId;

    try {
        const request = await RentRequest.findOne({ requestId: requestId }).populate({
            path: "itemId",
        });

        // console.log(JSON.stringify(request.itemId.receivedRequests));

        if (!request) {
            return res.status(404).json({ message: "Request does not exist" });
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
            return res.status(400).json({ message: "Request is already rejected. You cannot accept it now." });
        }

        request.requestStatus = "accepted";
        request.acceptedAt = new Date();

        await request.save(); // Save changes to the main request

        // Update all pending receivedRequests to "rejected"
        await RentRequest.updateMany(
            { _id: { $in: request.itemId.receivedRequests }, requestStatus: "pending" },
            { $set: { requestStatus: "rejected", rejectedAt: new Date() } }
        );

        res.status(200).json({ message: "Request accepted successfully" });

    } catch (error) {
        console.error("Error accepting request: ", error);
        return res.status(500).json({ message: "Error accepting request" });
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



async function getRequestsByStatusAndPopulate(userId, requestType, requestStatus, userType, res) {
    try {
        const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000); // 2 days ago

        const user = await User.findById(userId).populate({
            path: requestType, // sentRequests or receivedRequests
            match: requestStatus !== null ? {
                $and: [   // used to combine two objects
                    { requestStatus: requestStatus },
                    requestStatus === "rejected" ? { rejectedAt: { $gte: twoDaysAgo } } : {}
                ]
            } : {},
            populate: [
                {
                    path: "itemId",
                    select: "toolName",
                },
                {
                    path: userType, // ownerId or userId. If you request received requests then userId & if sent then ownerId
                    select: "firstName lastName",
                },
            ],
        });


        if (requestType === "sentRequests") {
            user.requestType = user.sentRequests;
        }
        else {
            user.requestType = user.receivedRequests;
        }    //have to do this to iterate over sent or received request using map.


        const pendingRequests = user.requestType.map((request) => {

            if (userType === "ownerId") {  
                request.userId = request.ownerId;
            }   //if requested for received requests then need to sent the userName thats why userId & if req for sent requests then send the ownerName in response 

            return {
                requestId: request.requestId,
                toolName: request.itemId.toolName,
                userName: request.userId.firstName + " " + request.userId.lastName,
                dueDate: request.dueDate,
                message: request.message,
                requestStatus: request.requestStatus,
            }

        });

        res.status(200).json(pendingRequests);
    } catch (error) {
        console.error(`Error fetching ${requestStatus} ${requestType} :  `, error);
        return res
            .status(500)
            .json({ message: `Error fetching ${requestStatus} ${requestType}` });
    }
}





const showSentRequests = async (req, res) => {
 
    getRequestsByStatusAndPopulate(req.user.id, "sentRequests", null, "ownerId", res);

};


const showReceivedRequests = async (req, res) => {

    getRequestsByStatusAndPopulate(req.user.id, "receivedRequests", null, "userId", res);

}



const showAcceptedRequests_received = async (req, res) => {

    getRequestsByStatusAndPopulate(req.user.id, "receivedRequests", "accepted", "userId", res);

};



const showAcceptedRequests_sent = async (req, res) => {

    getRequestsByStatusAndPopulate(req.user.id, "sentRequests", "accepted", "ownerId", res);

};



const showRejectedRequests_received = async (req, res) => {

    getRequestsByStatusAndPopulate(req.user.id, "receivedRequests", "rejected", "userId", res);

}



const showRejectedRequests_sent = async (req, res) => {

    getRequestsByStatusAndPopulate(req.user.id, "sentRequests", "rejected", "ownerId", res);

}



const showPendingRequests_received = async (req, res) => {
    getRequestsByStatusAndPopulate(req.user.id, "receivedRequests", "pending", "userId", res);
};


const showPendingRequests_sent = async (req, res) => {
    getRequestsByStatusAndPopulate(req.user.id, "sentRequests", "pending", "ownerId", res);
}



module.exports = { sendRequest, showSentRequests, showReceivedRequests, acceptRequest, showAcceptedRequests_received, showAcceptedRequests_sent, rejectRequest, showRejectedRequests_received, showRejectedRequests_sent, showPendingRequests_received, showPendingRequests_sent };