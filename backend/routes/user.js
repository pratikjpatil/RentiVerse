const router = require('express').Router();
const {registerUser, userLogin, userLogout} = require("../controllers/user.controller");

router.post("/register", registerUser);
router.post("/login", userLogin);

module.exports=router;