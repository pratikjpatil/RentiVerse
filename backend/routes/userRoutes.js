const router = require("express").Router();
const auth = require("../middlewares/auth");
const { check, validationResult } = require('express-validator');

const {
    userLogin,
    userLogout,
    checkIfLoggedIn,
    sendRegistrationOtp,
    verifyOtpAndRegisterUser,
} = require("../controllers/user.controller");

router.post("/sendRegistrationOtp", [
    check("email", "Enter valid email")
        .trim()
        .isEmail()
        .isLength({ min : 3, max: 30 }),
    check("phone", "Phone number should contains 10 digits")
        .trim()
        .isInt()
        .isLength({ min: 10, max: 10 }),
    ], sendRegistrationOtp);

router.post("/verifyOtpAndRegisterUser",[
            check("email", "Email length should be max 50 characters")
                .trim()
                .isEmail()
                .isLength({ max: 50 }),
            check("firstName", "First name length should be 1 to 30 characters")
                .trim()
                .isLength({ min: 1, max: 30, }),
            check("lastName", "Last name length should be 1 to 30 characters")
                .trim()
                .isLength({ min: 1, max: 30 }),
            check("phone", "Phone number should contain 10 digits")
                .trim()
                .isInt()
                .isLength({ min: 10, max: 10 }),
            check("password", "Password length should be 6 to 20 characters")
                .trim()
                .isLength({ min: 6, max: 20 }),
            check("pincode", "Pincode length should be 6 characters")
                .trim()
                .isInt()
                .isLength({ min: 6, max: 6 }),
            check("address", "Address length should be max 80 characters")
                .trim()
                .isLength({ max: 80 })
        ],verifyOtpAndRegisterUser
    );

router.post("/login", userLogin);
router.delete("/logout", auth, userLogout);
router.get("/loginstatus", auth, checkIfLoggedIn);

module.exports = router;
