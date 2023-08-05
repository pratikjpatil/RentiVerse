const router = require('express').Router();
const auth = require("../middlewares/auth");

const {registerUser, userLogin, userLogout, checkIfLoggedIn, verifyOtp} = require("../controllers/user.controller");

router.post("/register", registerUser);
router.post("/verify-otp", verifyOtp);
router.post("/login", userLogin);
router.delete("/logout",auth, userLogout);
router.get('/loginstatus',auth, checkIfLoggedIn);

module.exports=router;