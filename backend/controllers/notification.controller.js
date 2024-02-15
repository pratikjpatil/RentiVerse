const User = require("../models/user");
const Product = require("../models/product");
const Notification = require("../models/notification")
const RentRequest = require("../models/rentRequest");

const getAllNotifications = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("notifications");
    if(!user){
        return res.status(400).json({ message: "User not found" });
    }

    const notifications = user.notifications.map(notification => ({
        notificationId: notification._id,
        content: notification.content,
        readStatus: notification.readStatus,
        createdAt: notification.createdAt
    }));
    
    return res.status(200).json(notifications);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getAllNotifications };