const router = require("express").Router();
const auth = require("../middlewares/auth");
const { check, validationResult } = require('express-validator');

const {
    registerUser,
    userLogin,
    userLogout,
    checkIfLoggedIn,
    verifyOtp,
} = require("../controllers/user.controller");

router.post(
    "/register",
    [
        check("email", "Email length should be 3 to 30 characters")
            .trim()
            .isEmail()
            .isLength({ max: 30 }),
        check("firstname", "Name length should be 10 to 20 characters")
            .trim()
            .isLength({ min: 1, max: 20, }),
        check("lastname", "Password length should be 3 to 20 characters")
            .trim()
            .isLength({ min: 1, max: 20 }),
        check("phone", "Mobile number should contains 10 digits")
            .trim()
            .isInt()
            .isLength({ min: 10, max: 10 }),
        check("password", "Password length should be 6 to 20 characters")
            .trim()
            .isLength({ min: 6, max: 20 }),
        check("gender", "gender should be male, female or other")
            .trim()
            .isIn(['male', 'female', 'other']),
        check("pincode", "Pincode length should be 1 to 10 characters")
            .trim()
            .isLength({ min: 1, max: 10 }),
        check("state", "State length should be 1 to 20 characters")
            .trim()
            .isLength({ min: 1, max: 20 }),
        check("village", "Village length should be 1 to 20 characters")
            .trim()
            .isLength({ min: 1, max: 20 }),
        check("district", "District length should be 1 to 20 characters")
            .trim()
            .isLength({ min: 1, max: 20 }),
        check("city", "City length should be 1 to 20 characters")
            .trim()
            .isLength({ min: 1, max: 20 }),
    ],
    registerUser
);
router.post("/verify-otp", verifyOtp);
router.post("/login", userLogin);
router.delete("/logout", auth, userLogout);
router.get("/loginstatus", auth, checkIfLoggedIn);

module.exports = router;
