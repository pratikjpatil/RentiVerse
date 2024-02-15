const User = require("../models/user");
const Product = require("../models/product");
const RentRequest = require("../models/rentRequest");
const {createNotification} = require("../utils/notification");

const confirmReturn = async(req, res) => {
    const requestId = req.params.requestId;
  try {
    
    const order = await RentRequest.findOne({requestId}).populate("productId");

    if(order.orderStatus.return!=="delivered"){
        return res.status(400).json({ message: "cannot confirm return order." });
    }
    order.returnConfirmation = true;
    await order.save();
    
    await User.findByIdAndUpdate(order.ownerId, {$pull: {givenOnRent: order.productId}});
    await User.findByIdAndUpdate(order.ownerId, {$addToSet: {draftProducts: order.productId}});
    await User.findByIdAndUpdate(order.userId, {$pull: {takenOnRent: order.productId}});

    await Product.findByIdAndUpdate(order.productId, {
        renterId: null,
        acceptedRequestId: null,
        receivedRequests: []
      });

    const userNotificationResult = await createNotification(order.userId, `Your return of ${order.productId.productName} is confirmed.`)
    const ownerNotificationResult = await createNotification(order.ownerId, `Your have successfully confirmed return order of ${order.productId.productName}.`)

    if(!ownerNotificationResult.success || !userNotificationResult.success){
        return res.status(400).json({ message: ownerNotificationResult.message });
      }

    return res.status(200).json({message: "Product return confirmed!"})
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
}

const rejectReturn = async(req, res) => {
  const requestId = req.params.requestId;
  try {

    const order = await RentRequest.findOne({requestId}).populate("productId");
    console.log(order)
    if(order.returnConfirmation){
        return res.status(400).json({message: "You have already confirmed the return cannot reject it now."});
    }

    order.returnConfirmation = false;
    order.orderStatus.return = "rejected";
    await order.save();
    
    const notificationResult = await createNotification(order.userId, `Your return of ${order.productId.productName} is REJECTED.`)
    if(!notificationResult.success){
      return res.status(400).json({ message: notificationResult.message });
    }

    return res.status(200).json({message: "Product return rejected!"})
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
};


const changeReturnOrderStatus = async (req, res) => {
    const { requestId, orderStatus } = req.body;
    try {
      const request = await RentRequest.findOne({ requestId }).populate("productId");
      if (!request) {
        return res.status(404).json({ message: "Request does not exist" });
      }
  
      // If the logged-in user is not customer of the product
      if (req.user.id !== request.userId.toString()) {
        return res
          .status(403)
          .json({ message: "Only customer can perform the action" });
      }

  
      request.orderStatus.return = orderStatus;
      await request.save();
  
      
      const result = await createNotification(request.ownerId, `Status of return order of ${request.productId.productName} is changed to ${orderStatus}.`)
      if(!result.success){
        return res.status(400).json({ message: result.message });
      }
      res.status(200).json({ message: "Order Status changed" });
    } catch (error) {
      console.error("Error changing order status:", error);
      return res.status(500).json({ message: "Error changing order status" });
    }
  };

module.exports = { confirmReturn, rejectReturn, changeReturnOrderStatus };
