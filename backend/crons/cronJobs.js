const cron = require('node-cron');
const moment = require('moment');
const Product = require("../models/product");
const RentRequest = require("../models/rentRequest");
const { createNotification } = require("../utils/notification");

const cronJobs = async () => {
    try {
        // Cron job to move expired products to drafts at 12 midnight
        cron.schedule('0 0 * * *', async () => {
            try {
                const expiredProducts = await Product.updateMany(
                    { dueDate: { $lt: new Date() }, renterId: null, isDrafted: false },
                    { $set: { isDrafted: true, receivedRequests: [], acceptedRequestId: null } }
                );

                if (expiredProducts && expiredProducts.nModified !== undefined) {
                    console.log('Expired products moved to drafts successfully:', expiredProducts.nModified);
                } else {
                    console.log('No products were modified.');
                }
            } catch (error) {
                console.error('Error moving expired products to drafts:', error);
            }
        });

        // Cron job to send notification one day before return period expires at 8 AM
        cron.schedule('0 8 * * *', async () => {
            try {
                const tomorrow = moment().add(1, 'days').startOf('day');
                const tomorrowEnd = moment().add(1, 'days').endOf('day');

                const expiringOrders = await RentRequest.find({
                    returnConfirmation: false,
                    "orderStatus.buy": "delivered",
                    returnDate: { $gte: tomorrow.toDate(), $lte: tomorrowEnd.toDate() }
                }).populate("productId");

                if (expiringOrders && expiringOrders.length > 0) {
                    for (const order of expiringOrders) {
                        const userNotificationResult = await createNotification(order.userId, `The return period for ${order.productId.productName} is expiring tomorrow.`);
                        const ownerNotificationResult = await createNotification(order.ownerId, `The return period for ${order.productId.productName} from ${moment(order.returnDate).format('MMMM Do YYYY')} is expiring tomorrow.`);

                        if (!ownerNotificationResult.success || !userNotificationResult.success) {
                            console.error('Error sending notification about expiring return period:', ownerNotificationResult.message || userNotificationResult.message);
                        }
                    }

                    console.log('Notifications sent for expiring return period:', expiringOrders.length);
                } else {
                    console.log('No expiring orders found.');
                }
            } catch (error) {
                console.error('Error sending notifications about expiring return period:', error);
            }
        });

        // Cron job to send notification when return period has expired at 7 AM
        cron.schedule('0 7 * * *', async () => {
            try {
                const expiredOrders = await RentRequest.find({
                    returnConfirmation: false,
                    "orderStatus.buy": "delivered",
                    returnDate: { $lt: new Date() }
                }).populate("productId");

                if (expiredOrders && expiredOrders.length > 0) {
                    for (const order of expiredOrders) {
                        const userNotificationResult = await createNotification(order.userId, `The return period for ${order.productId.productName} has expired.`);
                        const ownerNotificationResult = await createNotification(order.ownerId, `The return period for ${order.productId.productName} from ${moment(order.returnDate).format('MMMM Do YYYY')} has expired.`);

                        if (!ownerNotificationResult.success || !userNotificationResult.success) {
                            console.error('Error sending notification about expired return period:', ownerNotificationResult.message || userNotificationResult.message);
                        }
                    }

                    console.log('Notifications sent for expired return period:', expiredOrders.length);
                } else {
                    console.log('No expired orders found.');
                }
            } catch (error) {
                console.error('Error sending notifications about expired return period:', error);
            }
        });
    } catch (error) {
        console.error('Error setting up cron jobs:', error);
    }
}

module.exports = cronJobs;
