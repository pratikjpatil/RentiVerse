const Notification = require("../models/notification");
const User = require("../models/user")
const sendMail = require("./sendMail");

const createNotification = async(userId, content)=>{
    try {
        const notification = await Notification.create({
            userId, content
        });
        
        const user = await User.findByIdAndUpdate(userId, {$push:{notifications: notification._id}});
        
        await sendMail(user.email, "Rentiverse Notification", content);

        return { success: true, message: "Notification sent successfully" };
        
    } catch (error) {
        console.log("error sending notification: " +error);
        return { success: false, message: "Failed to send notification" };
    }
}

module.exports = {createNotification};