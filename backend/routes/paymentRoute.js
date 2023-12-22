const router = require('express').Router();
const auth = require("../middlewares/auth");
const {payment} = require("../controllers/payment.controller")

router.get("/payment", payment);

module.exports=router;