const router = require("express").Router();
const auth = require("../middlewares/auth");
const { createOrder, verifyPayment } = require("../controllers/payment.controller");

router.post("/orders", auth, createOrder);

router.post("/verify", auth, verifyPayment);

module.exports = router;
