const {verifyOtpPhone} = require("../utils/otp");

const router = require("express").Router();

router.post('/verify/:phone/:OTP', async(req, res)=>{
    const ppp = verifyOtpPhone(req.params.phone, req.params.OTP);
    console.log(ppp);

    res.status(200).json({message: "Yayyyyy your phone number is verified"})
})

module.exports = router;