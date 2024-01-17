const router = require("express").Router();
const multerConfig = require("../config/multerConfig");
const auth = require("../middlewares/auth");
const userIsVerified = require("../middlewares/checkUserVerification");

const { addProduct, productInfo } = require("../controllers/product.controller");

router.post("/add-product", auth, userIsVerified, multerConfig.array("images", 4), addProduct);

router.get("/product-info/:productId", productInfo);

module.exports = router;

