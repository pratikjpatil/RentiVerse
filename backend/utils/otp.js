
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const sendOtpToPhone = async (phoneNumber) => {

    await client.verify.v2.services(process.env.TWILIO_SERVICE_ID)
        .verifications
        .create({ to: `+91${phoneNumber}`, channel: 'sms' })
        .then(verification => { return (verification) });

}

const verifyOtpPhone = async (phoneNumber, userOTP) => {


    await client.verify.v2.services(process.env.TWILIO_SERVICE_ID)
        .verificationChecks
        .create({ to: `+91${phoneNumber}`, code: userOTP })
        .then(verification_check => console.log(verification_check.status));

}

module.exports = { sendOtpToPhone, verifyOtpPhone }

