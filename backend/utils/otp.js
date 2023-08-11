const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const sendOtpToPhone = async (phoneNumber) => {
    try {
        await client.verify.v2.services(process.env.TWILIO_SERVICE_ID)
            .verifications
            .create({ to: `+91${phoneNumber}`, channel: 'sms' });
        return { success: true, message: "OTP sent successfully" };
    } catch (error) {
        console.error("Error sending OTP:", error.message);
        return { success: false, message: "Failed to send OTP" };
    }
};

const verifyOtpPhone = async (phoneNumber, userOTP) => {
    try {
        const verification_check = await client.verify.v2.services(process.env.TWILIO_SERVICE_ID)
            .verificationChecks
            .create({ to: `+91${phoneNumber}`, code: userOTP });

        if (verification_check.status === 'approved') {
            return { success: true, message: "OTP verified successfully" };
        } else {
            return { success: false, message: "Invalid OTP" };
        }
    } catch (error) {
        console.error("Error during OTP verification:", error.message);
        return { success: false, message: "OTP verification failed" };
    }
};

module.exports = { sendOtpToPhone, verifyOtpPhone };
