const mongoose = require("mongoose");
const User = require("../models/user");
const Product = require("../models/product");
const RentRequest = require("../models/rentRequest");
const {createNotification} = require("../utils/notification");

const sendRequest = async (req, res) => {
  const productId = req.params.productId;
  const userId = req.user.id;
  let { dueDate, message } = req.body;

  try {
    const product = await Product.findOne({ productId }).populate(
      "receivedRequests"
    );

    const isAlreadyAccepted = product.receivedRequests.some((request) => {
      return request.requestStatus === "accepted";
    });

    if (isAlreadyAccepted) {
      return res
        .status(400)
        .json({ message: "Another request is already accepted" });
    }

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.ownerId == userId) {
      return res
        .status(400)
        .json({ message: "Cannot send request to own product" });
    }

    const exists = await RentRequest.findOne({
      productId: product._id,
      userId: userId,
    });

    if (exists) {
      return res.status(400).json({ message: "Request already sent" });
    }

    if (!dueDate) {
      dueDate = product.dueDate;
    }

    const result = await RentRequest.create({
      productId: product._id,
      userId: userId,
      ownerId: product.ownerId,
      dueDate: dueDate,
      message: message,
      requestStatus: "pending",
    });

    // Add rentRequest _id to the sentRequests field of the user
    await User.findByIdAndUpdate(result.userId, {
      $push: { sentRequests: result._id },
    });

    // Add rentRequest _id to the receivedRequests field of the owner
    await User.findByIdAndUpdate(result.ownerId, {
      $push: { receivedRequests: result._id },
    });

    // Add rentRequest _id to the receivedRequests field of product
    product.receivedRequests.push(result._id);
    await product.save();

    return res.status(201).json({ message: "Rent request sent successfully" });
  } catch (error) {
    console.error("Error sending request: ", error);
    return res.status(500).json({ message: "Error sending request" });
  }
};

const acceptRequest = async (req, res) => {
  const requestId = req.params.requestId;

  try {
    const request = await RentRequest.findOne({ requestId }).populate({
      path: "productId",
    });

    // console.log(JSON.stringify(request.productId.receivedRequests));

    if (!request) {
      return res.status(404).json({ message: "Request does not exist" });
    }

    const ownerId = request.ownerId;

    // If the logged-in user is not the owner of the product
    if (req.user.id != ownerId) {
      return res
        .status(403)
        .json({ message: "Only owner can accept the request" });
    }

    // Check if the request is already accepted
    if (request.requestStatus === "accepted") {
      return res.status(400).json({ message: "Request already accepted" });
    }

    if (request.requestStatus === "rejected") {
      return res.status(400).json({ message: "Request already rejected" });
    }

    request.requestStatus = "accepted";
    request.acceptedAt = new Date();

    await request.save(); // Save changes to the main request

    // Update all pending receivedRequests to "rejected"
    await RentRequest.updateMany(
      {
        _id: { $in: request.productId.receivedRequests },
        requestStatus: "pending",
      },
      { $set: { requestStatus: "rejected", rejectedAt: new Date() } }
    );

    await Product.findOneAndUpdate(
      { _id: request.productId._id },
      { $set: { acceptedRequestId: request._id } }
    );
    const result = await createNotification(request.userId, `Your sent product request for ${request.productId.productName} is accepted.`)
    if(!result.success){
      return res.status(400).json({ message: result.message });
    }
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
      return res
        .status(403)
        .json({ message: "Only owner can perform the action" });
    }

    if (request.requestStatus === "accepted") {
      return res
        .status(400)
        .json({ message: "Request already accepted you can't reject it now" });
    }

    // Check if the request is already rejected
    if (request.requestStatus === "rejected") {
      return res.status(400).json({ message: "Request already rejected" });
    }

    // Update the requestStatus to "rejected" and set the rejectedAt timestamp
    request.requestStatus = "rejected";
    request.rejectedAt = new Date();
    await request.save();
    
    const result = await createNotification(request.userId, `Your sent product request for ${request.productId.productName} is rejected.`)
    if(!result.success){
      return res.status(400).json({ message: result.message });
    }
    res.status(200).json({ message: "Request rejected successfully" });
  } catch (error) {
    console.error("Error rejecting request:", error);
    return res.status(500).json({ message: "Error rejecting request" });
  }
};

const changeOrderStatus = async (req, res) => {
  const { requestId, orderStatus } = req.body;
  try {
    const request = await RentRequest.findOne({ requestId }).populate("productId");
    if (!request) {
      return res.status(404).json({ message: "Request does not exist" });
    }

    // If the logged-in user is not the owner of the product
    if (req.user.id !== request.ownerId.toString()) {
      return res
        .status(403)
        .json({ message: "Only owner can perform the action" });
    }

    if (request.requestStatus !== "accepted") {
      return res
        .status(400)
        .json({ message: "You have not yet accepted the request" });
    }

    if (request.payment.status === false) {
      return res.status(400).json({ message: "Payment not yet done" });
    }

    if (orderStatus === "delivered") {
      await Product.findOneAndUpdate(
        { _id: request.productId },
        { $set: { renterId: request.userId } }
      );

      await User.findOneAndUpdate(
        { _id: request.ownerId },
        {
          $pull: {
            listed: request.productId,
            receivedRequests: request._id,
          },
          $addToSet: { givenOnRent: request.productId },
        }
      );

      await User.findOneAndUpdate(
        { _id: request.userId },
        {
          $pull: { sentRequests: request._id },
          $addToSet: { takenOnRent: request.productId },
        }
      );
    }

    request.orderStatus.buy = orderStatus;
    await request.save();

    
    const result = await createNotification(request.userId, `Status of your order for product ${request.productId.productName} is changed to ${orderStatus}.`)
    if(!result.success){
      return res.status(400).json({ message: result.message });
    }
    res.status(200).json({ message: "Order Status changed" });
  } catch (error) {
    console.error("Error changing order status:", error);
    return res.status(500).json({ message: "Error changing order status" });
  }
};

async function getRequestsByStatusAndPopulate(
  userId,
  requestType,
  requestStatus,
  userType,
  res
) {
  try {
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000); // 2 days ago

    const user = await User.findById(userId).populate({
      path: requestType, // sentRequests or receivedRequests
      match:
        requestStatus !== null
          ? {
              $and: [
                { requestStatus: requestStatus },
                requestStatus === "rejected"
                  ? { rejectedAt: { $gte: twoDaysAgo } }
                  : {},
              ],
            }
          : {},
      populate: [
        {
          path: "productId",
          select: "productName",
        },
        {
          path: userType, // ownerId or userId. If you request received requests then userId & if sent then ownerId
          select: "firstName lastName",
        },
      ],
    });

    if (requestType === "sentRequests") {
      user.requestType = user.sentRequests;
    } else {
      user.requestType = user.receivedRequests;
    } //have to do this to iterate over sent or received request using map.

    const requests = user.requestType.map((request) => {
      let user2Id = request.userId._id;
      if (userType === "ownerId") {
        request.userId = request.ownerId;
        user2Id = request.ownerId._id;
      } //if requested for received requests then need to send the userName thats why userId & if req for sent requests then send the ownerName in response

      return {
        requestId: request.requestId,
        user2Id: user2Id,
        productName: request.productId.productName,
        userName: request.userId.firstName + " " + request.userId.lastName,
        dueDate: request.dueDate,
        message: request.message,
        requestStatus: request.requestStatus,
        orderStatus: request.orderStatus,
        paymentStatus: request.payment.status,
      };
    });

    res.status(200).json(requests);
  } catch (error) {
    console.error(`Error fetching ${requestStatus} ${requestType} :  `, error);
    return res
      .status(500)
      .json({ message: `Error fetching ${requestStatus} ${requestType}` });
  }
}

const showSentRequests = async (req, res) => {
  getRequestsByStatusAndPopulate(
    req.user.id,
    "sentRequests",
    null,
    "ownerId",
    res
  );
};

const showReceivedRequests = async (req, res) => {
  getRequestsByStatusAndPopulate(
    req.user.id,
    "receivedRequests",
    null,
    "userId",
    res
  );
};

const showAcceptedRequests_received = async (req, res) => {
  getRequestsByStatusAndPopulate(
    req.user.id,
    "receivedRequests",
    "accepted",
    "userId",
    res
  );
};

const showAcceptedRequests_sent = async (req, res) => {
  getRequestsByStatusAndPopulate(
    req.user.id,
    "sentRequests",
    "accepted",
    "ownerId",
    res
  );
};

const showRejectedRequests_received = async (req, res) => {
  getRequestsByStatusAndPopulate(
    req.user.id,
    "receivedRequests",
    "rejected",
    "userId",
    res
  );
};

const showRejectedRequests_sent = async (req, res) => {
  getRequestsByStatusAndPopulate(
    req.user.id,
    "sentRequests",
    "rejected",
    "ownerId",
    res
  );
};

const showPendingRequests_received = async (req, res) => {
  getRequestsByStatusAndPopulate(
    req.user.id,
    "receivedRequests",
    "pending",
    "userId",
    res
  );
};

const showPendingRequests_sent = async (req, res) => {
  getRequestsByStatusAndPopulate(
    req.user.id,
    "sentRequests",
    "pending",
    "ownerId",
    res
  );
};

module.exports = {
  sendRequest,
  showSentRequests,
  showReceivedRequests,
  acceptRequest,
  showAcceptedRequests_received,
  showAcceptedRequests_sent,
  rejectRequest,
  showRejectedRequests_received,
  showRejectedRequests_sent,
  showPendingRequests_received,
  showPendingRequests_sent,
  changeOrderStatus,
};
